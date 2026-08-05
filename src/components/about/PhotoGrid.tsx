import Image from "next/image";
import type { about } from "@/content/about";

export function PhotoGrid({ categories }: { categories: (typeof about)["photoCategories"] }) {
  return (
    <div className="grid w-full grid-cols-1 gap-10 sm:grid-cols-2">
      {categories.map((category, categoryIndex) => (
        <div key={categoryIndex} className="flex flex-col gap-3">
          <h4>{category.label}</h4>
          <div className="grid grid-cols-3 gap-2">
            {Array.from({ length: 3 }).map((_, i) => {
              const src = category.images[i];
              return (
                <div key={i} className="bg-foreground/5 relative aspect-square w-full overflow-hidden">
                  {src ? (
                    <Image src={src} alt={category.label} fill className="object-cover" />
                  ) : null}
                </div>
              );
            })}
          </div>
        </div>
      ))}
    </div>
  );
}
