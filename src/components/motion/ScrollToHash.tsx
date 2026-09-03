"use client";

import { useEffect } from "react";

/**
 * Re-runs a hash jump once the page has finished growing.
 *
 * A browser scrolls to `#thing` as soon as it parses the hash, using whatever
 * layout exists at that moment. On a page like the homepage — lazy images,
 * animated sections, a font swap — that layout is still short, so the target
 * sits near the bottom of a document that is about to get much taller. The
 * browser scrolls as far as it can, the document then grows underneath it, and
 * the reader is left somewhere past what they asked for. Arriving from a case
 * study's Back link, `#selected-work` overshot by ~1,700px this way: the scroll
 * landed at the page's maximum, which stopped being the right number a moment
 * later.
 *
 * So: scroll again after the growth. Once on the next frame, once more after a
 * short settle, and once on `load` when images have actually arrived — cheap,
 * idempotent, and it stops as soon as the element is already where it belongs.
 *
 * Only ever corrects an *existing* hash. With no hash it does nothing at all,
 * so a normal visit to the page is untouched.
 */
export function ScrollToHash() {
  useEffect(() => {
    const id = decodeURIComponent(window.location.hash.slice(1));
    if (!id) return;

    let cancelled = false;
    const settle = () => {
      if (cancelled) return;
      const target = document.getElementById(id);
      if (!target) return;
      // Already in the right place — don't fight a reader who has scrolled
      // away in the meantime.
      const { top } = target.getBoundingClientRect();
      if (Math.abs(top) < 4) return;
      target.scrollIntoView({ behavior: "instant", block: "start" });
    };

    const frame = requestAnimationFrame(settle);
    const timer = setTimeout(settle, 350);
    window.addEventListener("load", settle);

    return () => {
      cancelled = true;
      cancelAnimationFrame(frame);
      clearTimeout(timer);
      window.removeEventListener("load", settle);
    };
  }, []);

  return null;
}
