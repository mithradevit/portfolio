import { Compass, LayoutGrid, Component, Sparkles, Radio, Accessibility } from "lucide-react";
import { services, servicesIntro, type Service } from "@/content/services";
import { ScrambleText } from "@/components/ui/ScrambleText";

/** Name → component map, so `content/services.ts` can stay JSX-free. */
const icons = { Compass, LayoutGrid, Component, Sparkles, Radio, Accessibility };

function ServiceRow({ service }: { service: Service }) {
  const Icon = icons[service.icon];

  return (
    <div className="border-foreground/10 group flex flex-col gap-3 border-t py-6 sm:flex-row sm:justify-between sm:gap-8">
      <div className="flex items-center gap-3">
        <Icon
          size={17}
          strokeWidth={1.25}
          className="text-foreground-light group-hover:text-primary shrink-0 transition-colors duration-300"
        />
        <span className="text-foreground text-[15px]">{service.name}</span>
      </div>

      <ul className="flex shrink-0 flex-col gap-1 sm:text-right">
        {service.items.map((item) => (
          <li key={item} className="text-foreground-light text-[15px] leading-snug">
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
}

export function ServicesSection() {
  return (
    <div className="grid w-full grid-cols-1 gap-12 lg:grid-cols-2 lg:gap-6">
      <ScrambleText as="h4" text="Services" delay={0.15} scrambleOnHover />

      <div className="flex flex-col gap-8">
        <p className="max-w-[520px] text-[17px] leading-snug">
          {servicesIntro.lead} <span className="text-foreground">{servicesIntro.emphasis}</span>
        </p>

        <div className="flex flex-col">
          {services.map((service) => (
            <ServiceRow key={service.name} service={service} />
          ))}
        </div>
      </div>
    </div>
  );
}
