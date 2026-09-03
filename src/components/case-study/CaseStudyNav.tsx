"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { sectionId } from "./CaseStudySection";
import { CONTENT_HEADING } from "./typography";

/**
 * Sticky section index for a case study.
 *
 * The active item is tracked with an IntersectionObserver rather than scroll
 * maths: the rootMargin pins the trigger line near the top of the viewport, so
 * a heading becomes "current" when it reaches reading position rather than when
 * it first peeks into view.
 */
type NavItem = { heading: string; navLabel?: string };

/** The least clearance to the article we're willing to show the rail at. */
const MIN_CLEARANCE = 16;

export function CaseStudyNav({ items }: { items: NavItem[] }) {
  const headings = items.map((i) => i.heading);
  const navRef = useRef<HTMLElement>(null);

  // Stores the section *id*, not the heading — they aren't the same string.
  const [active, setActive] = useState(() => (headings[0] ? sectionId(headings[0]) : ""));

  // The index stays out of the way over the title and cover image, and fades in
  // once the first section reaches the rail's own line. An index is only useful
  // once there is something to be indexed into.
  const [revealed, setRevealed] = useState(false);

  // Whether the rail actually clears the article, measured directly rather
  // than assumed from a viewport-width threshold. A hardcoded `min-[Npx]`
  // breakpoint has to be hand-recomputed — 24 gutter + widest label + 16
  // clearance — every time a navLabel changes anywhere in the app, and that
  // arithmetic has already been wrong three times this session as labels
  // changed. Measuring the real rendered gap means a longer label added later
  // just makes the rail stay hidden a little longer, never silently overlap.
  const [fits, setFits] = useState(false);

  useEffect(() => {
    const check = () => {
      const nav = navRef.current;
      const content = document.querySelector<HTMLElement>("[data-case-study-content]");
      if (!nav || !content) return;
      const gap = content.getBoundingClientRect().left - nav.getBoundingClientRect().right;
      setFits(gap >= MIN_CLEARANCE);
    };

    check();
    window.addEventListener("resize", check);
    // The article can still reflow after first paint — webfonts swapping in,
    // images loading and pushing the layout — so one follow-up check catches
    // that without polling indefinitely.
    const settle = setTimeout(check, 300);
    return () => {
      window.removeEventListener("resize", check);
      clearTimeout(settle);
    };
  }, [items]);

  useEffect(() => {
    const first = headings[0] ? document.getElementById(sectionId(headings[0])) : null;
    if (!first) return;
    // The global footer, not part of this component's own markup — the rail
    // is `position: fixed`, so without an upper bound it stays glued to the
    // same band of the viewport even once the reader has scrolled past every
    // section and the footer has scrolled up underneath it, sitting on top of
    // "Designed + coded by…" and the social links.
    const footer = document.querySelector("footer");

    // A scroll listener rather than an IntersectionObserver: both triggers are
    // *lines* something crosses, and an observer reports entering and leaving a
    // band, which gives no stable answer for "has it passed yet".
    let frame = 0;
    const update = () => {
      frame = 0;
      const pastFirst = first.getBoundingClientRect().top <= window.innerHeight * 0.28;
      // Measured against the rail's own actual bottom edge, not a flat
      // fraction of the viewport. Comparing to `window.innerHeight` hid the
      // rail the instant *any* pixel of the footer entered the viewport, even
      // on a page where the (short) rail sits nowhere near tall enough to
      // reach that far down — hiding it long before there was any real risk
      // of overlap. This only fires once the footer would actually reach the
      // rail's own footprint, with a small safety margin.
      const navBottom = navRef.current?.getBoundingClientRect().bottom ?? 0;
      const footerArrived = footer ? footer.getBoundingClientRect().top < navBottom + 24 : false;
      setRevealed(pastFirst && !footerArrived);
    };
    const onScroll = () => {
      if (frame) return;
      frame = requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (frame) cancelAnimationFrame(frame);
    };
  }, [headings]);

  useEffect(() => {
    const sections = headings
      .map((h) => document.getElementById(sectionId(h)))
      .filter((el): el is HTMLElement => el !== null);
    if (sections.length === 0) return;

    // Track which sections are currently in the band rather than reacting to
    // each entry: the observer only reports *changes*, so a section that was
    // already intersecting when its neighbour left would never fire, and the
    // highlight would stick on the section above.
    const inBand = new Set<string>();

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) inBand.add(entry.target.id);
          else inBand.delete(entry.target.id);
        }

        // Several can straddle the band at once. Take the one that entered
        // most recently — the lowest of them — not the topmost: the section
        // above is the one being scrolled *away* from, and preferring it means
        // the last item can never win, since its predecessor is still in view.
        const current = sections
          .filter((el) => inBand.has(el.id))
          .sort((a, b) => b.getBoundingClientRect().top - a.getBoundingClientRect().top)[0];

        if (current) setActive(current.id);
      },
      { rootMargin: "-80px 0px -70% 0px", threshold: 0 },
    );

    sections.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [headings]);

  /**
   * Jumps straight to a section instead of letting the browser smooth-scroll.
   *
   * `globals.css` sets `scroll-behavior: smooth` site-wide, which is right for
   * most links and wrong for this one. A case study runs to ~20,000px, so a
   * jump from the top of the index to the bottom of it is a ~15,000px animated
   * scroll: measured at roughly six seconds, and it visibly stalls ~2,000px
   * short for five of them before snapping to the target — the browser
   * animates toward where the section was when the click landed, while images
   * further down finish loading and move it. It also blurs a dozen sections
   * past the reader on the way, which is not navigation, it's a slideshow.
   *
   * An index into a long document should behave like one: land immediately,
   * where you asked. `history.replaceState` rather than letting the default
   * fire keeps the URL honest (deep links and back still work) without the
   * browser queueing its own scroll on top of ours.
   */
  const jumpTo = (id: string) => (event: React.MouseEvent<HTMLAnchorElement>) => {
    // Let modified clicks (open in new tab, etc.) behave natively.
    if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
    const target = document.getElementById(id);
    if (!target) return;
    event.preventDefault();
    target.scrollIntoView({ behavior: "instant", block: "start" });
    history.replaceState(null, "", `#${id}`);
    setActive(id);
  };

  return (
    <>
      {/* Pinned to the viewport's top-left corner, separately from the index
          below it. It is the one control that has to stay reachable at every
          width, so unlike the index it is never hidden.

          `z-[60]`, above the global header's `z-50`, because that header is a
          full-width sticky bar: its only visible content is the centred pill,
          but its *box* spans the whole top strip with `pointer-events: auto`,
          so it sat on top of this link and swallowed every click on it —
          `elementFromPoint` over Back returned the header, not the link. They
          don't overlap visually (Back is at the left edge, the pill is
          centred), so winning the stacking order costs nothing here. The real
          fix is arguably in the header itself — `pointer-events-none` on the
          bar with `pointer-events-auto` on the pill, so it stops intercepting
          the whole strip for anything placed there — but that's a global
          component and this bug is local to the case study. */}
      <Link
        href="/#selected-work"
        data-cursor="pointer"
        className="text-foreground-light hover:text-primary fixed top-6 left-6 z-[60] flex w-fit items-center gap-2 transition-colors duration-300"
      >
        <ArrowLeft size={14} />
        <h4 className={CONTENT_HEADING}>Back</h4>
      </Link>

      {/* `fixed` at the reference's own `28vh`, rather than sticky: the index
          holds one position on screen for the whole read instead of travelling
          with the article, and — being out of flow — it leaves the article
          centred in the full viewport rather than in a leftover column.

          `left-6`, flat, matching the Back link directly above it: a sidebar
          reads as a sidebar because it stays parked at the edge. A version of
          this computed the rail's `left` from the article's own centring to
          hold a constant gap to the content column — but on a wide screen that
          formula pushes `left` deep toward the middle of the viewport, so the
          "rail" visibly drifts away from Back and toward the centre as the
          window widens. Wrong instinct: the gap widening on a big screen is
          normal for a narrow centred column with an edge-pinned sidebar, and
          is what the reference itself would also do if its content were this
          narrow (it isn't — see the note in page.tsx).

          Shown only once `fits` (computed above from the real rendered gap)
          agrees, on top of the existing `revealed` scroll gate — both have to
          be true. `visibility` rather than `display: none` for the hidden
          state: a `display: none` element can't be measured (zero-size
          bounding rect), so gating with it would make the very check that
          decides visibility unable to run. `visibility: hidden` still lays the
          element out — real dimensions, real position — while removing it from
          hit-testing and (in every browser that matters here) from the
          keyboard tab order and accessibility tree, same as `display: none`
          would. Always `flex`, never `hidden`, for the same reason. */}
      <nav
        ref={navRef}
        aria-hidden={!(revealed && fits)}
        className={`fixed top-[28vh] left-6 z-40 flex flex-col items-start gap-2.5 transition-opacity duration-[220ms] ${
          revealed && fits ? "visible opacity-100" : "invisible pointer-events-none opacity-0"
        }`}
      >
        <ul className="flex list-none flex-col gap-2.5">
          {items.map(({ heading, navLabel }) => {
            const id = sectionId(heading);
            const isActive = active === id;
            return (
              <li key={heading}>
                <a
                  href={`#${id}`}
                  data-cursor="pointer"
                  aria-current={isActive ? "true" : undefined}
                  tabIndex={revealed && fits ? undefined : -1}
                  onClick={jumpTo(id)}
                  // `!` because the unlayered bare `a` rule in globals.css beats
                  // a plain utility — without it the size stays at 15px.
                  // `whitespace-nowrap` now that labels are chosen to fit one
                  // line — `max-w` no longer needs to force a wrap.
                  className={`text-[14px]! block whitespace-nowrap leading-[1.3]! transition-colors duration-300 ${
                    isActive ? "text-foreground" : "text-foreground-light hover:text-foreground"
                  }`}
                >
                  {navLabel ?? heading}
                </a>
              </li>
            );
          })}
        </ul>
      </nav>
    </>
  );
}
