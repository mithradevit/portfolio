"use client";

import { useState } from "react";
import { faq, faqIntro } from "@/content/faq";
import { ScrambleText } from "@/components/ui/ScrambleText";
import { FaqDetail } from "./FaqDetail";

/**
 * FAQ as a chat thread: questions sit as incoming bubbles; clicking one opens
 * the answer in the same macOS-window overlay used for the About photo pane
 * and the Fun-page project detail, rather than expanding inline. Reusing that
 * chrome a third time is what makes it read as this site's system for "here's
 * more", instead of a one-off.
 */
export function FaqChat() {
  const [active, setActive] = useState<number | null>(null);

  return (
    <div className="grid w-full grid-cols-1 gap-12 lg:grid-cols-2 lg:gap-6">
      <div className="flex flex-col gap-5">
        <h2 className="max-w-[420px] leading-tight">
          <ScrambleText text={faqIntro.headingLead} />
          <br />
          <ScrambleText text={faqIntro.headingTail} delay={0.2} />
        </h2>
        <p className="max-w-[380px]">{faqIntro.blurb}</p>
      </div>

      <div className="flex flex-col gap-3">
        <h4 className="pl-1">{faqIntro.meta}</h4>

        {faq.map((item, i) => (
          <button
            key={item.question}
            type="button"
            onClick={() => setActive(i)}
            data-cursor="pointer"
            className="bubble bubble-in bg-foreground text-background hover:bg-primary max-w-[min(420px,84%)] self-start px-[15px] py-[9px] text-left text-[15px] leading-[1.35] transition-colors duration-300 active:scale-[0.97]"
          >
            {item.question}
          </button>
        ))}
      </div>

      <FaqDetail
        item={active === null ? null : faq[active]}
        index={active ?? 0}
        onClose={() => setActive(null)}
      />
    </div>
  );
}
