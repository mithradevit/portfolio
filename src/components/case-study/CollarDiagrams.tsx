import { ArrowRight } from "lucide-react";

/**
 * Diagrams for the pet collar case study.
 *
 * Same approach as TrialDiagrams: built from the site's own tokens
 * (`foreground` / `foreground-light` / `background` / `primary`) rather than a
 * palette of their own, so they follow the theme toggle instead of staying
 * pinned to one set of colours.
 *
 * The source for this one is the system architecture written as a Mermaid
 * flowchart. Rendered here as ordered layers rather than a node graph: the
 * point being made is that six layers sit between a sensor reading and an
 * owner's decision, and a layered stack says that more plainly than a web of
 * edges — and stays legible on a phone, which a wide graph does not.
 */

function Frame({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="border-foreground/10 bg-foreground/[0.02] flex w-full flex-col gap-3 rounded-[12px] border p-4">
      <span className="text-primary font-mono text-[11px] tracking-[0.08em] uppercase">
        {label}
      </span>
      {children}
    </div>
  );
}

/** One horizontal band: the layer's number and name, then what sits in it. */
function Layer({
  index,
  name,
  note,
  items,
  accent = false,
}: {
  index: number;
  name: string;
  note?: string;
  items: { label: string; note?: string }[];
  accent?: boolean;
}) {
  return (
    <div
      className={[
        // Three shapes, one markup: stacked on a phone, label-beside-items on a
        // tablet, and a column of the six-across rail on a desktop.
        "flex flex-col gap-3 rounded-[11px] border p-3.5 sm:flex-row sm:gap-4 lg:min-w-0 lg:flex-1 lg:flex-col lg:gap-2 lg:p-2.5",
        accent ? "border-primary/40 bg-primary/[0.06]" : "border-foreground/10 bg-background",
      ].join(" ")}
    >
      <div className="flex shrink-0 items-baseline gap-2.5 sm:w-[132px] sm:flex-col sm:gap-1 lg:w-auto">
        <span className="text-primary font-mono text-[11px] tracking-[0.08em]">
          {String(index).padStart(2, "0")}
        </span>
        <span className="text-foreground text-[12.5px] font-medium lg:text-[11.5px]">{name}</span>
        {note && (
          <span className="text-foreground-light hidden text-[11px] leading-[1.45] sm:block lg:text-[10px] lg:leading-[1.3]">
            {note}
          </span>
        )}
      </div>

      <div className="grid min-w-0 flex-1 grid-cols-1 gap-2 sm:grid-cols-2 lg:grid-cols-1 lg:gap-1.5">
        {items.map((item) => (
          <div
            key={item.label}
            className="border-foreground/10 bg-foreground/[0.02] flex min-w-0 flex-col gap-0.5 rounded-[9px] border px-2.5 py-2 lg:rounded-[7px] lg:px-2 lg:py-1.5"
          >
            <span className="text-foreground text-[12px] leading-[1.35] font-medium lg:text-[11px]">
              {item.label}
            </span>
            {item.note && (
              <span className="text-foreground-light text-[11px] leading-[1.45] lg:text-[10px] lg:leading-[1.35]">
                {item.note}
              </span>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

/** Between layers — points down while the stack reads top to bottom, and turns
 *  with it when the six layers become a left-to-right rail. */
function Down() {
  return (
    <ArrowRight
      size={13}
      aria-hidden
      className="text-foreground-light/50 shrink-0 rotate-90 self-center lg:rotate-0"
    />
  );
}

/** Collar → connectivity → broker → cloud → app → the owner's decision. */
function CollarArchitectureDiagram() {
  return (
    <Frame label="System architecture · sensor to decision">
      <div className="flex flex-col gap-2 lg:flex-row lg:items-stretch lg:gap-1">
        <Layer
          index={1}
          name="Device"
          note="The collar"
          items={[
            { label: "GPS", note: "Location" },
            { label: "Accelerometer", note: "Movement" },
            { label: "Gyroscope", note: "Orientation" },
            { label: "Temperature", note: "Body temp" },
            { label: "Heart rate", note: "Pulse" },
            { label: "Microcontroller", note: "Sensor hub" },
          ]}
        />
        <Down />
        <Layer
          index={2}
          name="Connectivity"
          note="How the data leaves the animal"
          items={[
            { label: "GPS satellite", note: "Location fix" },
            { label: "Cellular", note: "GSM / LTE" },
            { label: "Bluetooth LE", note: "Phone sync" },
            { label: "Wi-Fi", note: "Home sync" },
          ]}
        />
        <Down />
        <Layer
          index={3}
          name="Broker"
          note="Telemetry up, control down"
          items={[{ label: "MQTT broker", note: "Two-way" }]}
        />
        <Down />
        <Layer
          index={4}
          name="Cloud"
          note="Telemetry becomes pattern"
          items={[
            { label: "Backend", note: "APIs, devices" },
            { label: "Processing", note: "Validate, aggregate" },
            { label: "Insights", note: "Sleep, activity" },
            { label: "Storage", note: "Time-series" },
          ]}
        />
        <Down />
        <Layer
          index={5}
          name="App"
          note="The only layer owners see"
          accent
          items={[
            { label: "Live location", note: "Safe zones" },
            { label: "Health", note: "Activity, sleep" },
            { label: "Trends", note: "Change over time" },
            { label: "Alerts", note: "What to do" },
          ]}
        />
        <Down />
        <Layer
          index={6}
          name="Decision"
          note="What the owner asked"
          items={[
            { label: "Is my pet safe?" },
            { label: "Anything unusual?" },
            { label: "Has behaviour changed?" },
            { label: "Do I act?" },
          ]}
        />
      </div>
    </Frame>
  );
}

export const collarDiagrams = {
  "collar-architecture": CollarArchitectureDiagram,
};
