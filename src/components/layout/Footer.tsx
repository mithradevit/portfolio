import { Heart } from "lucide-react";
import { profile } from "@/content/profile";

const socialLinks = [
  { key: "linkedin", label: "Linkedin", href: profile.socials.linkedin },
  { key: "substack", label: "Substack", href: profile.socials.substack },
  { key: "x", label: "X", href: profile.socials.x },
  { key: "github", label: "Github", href: profile.socials.github },
  { key: "devpost", label: "Devpost", href: profile.socials.devpost },
].filter((link) => link.href);

export function Footer() {
  return (
    <footer className="border-foreground/10 flex w-full items-center justify-center border-t px-6 py-5">
      <div className="flex w-full max-w-[1800px] flex-col items-start justify-between gap-6 md:flex-row md:items-center">
        <div className="flex flex-wrap items-center gap-x-2 gap-y-1">
          <h4 className="font-bold">Designed + Coded with</h4>
          <Heart size={15} className="text-foreground-light" aria-hidden />
          <h4>by {profile.shortName}</h4>
        </div>

        <div className="flex flex-row flex-wrap items-center gap-3 md:gap-8">
          {socialLinks.map((link) => (
            <a
              key={link.key}
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              data-cursor="pointer"
              className="hover:text-primary"
            >
              <h4>{link.label}</h4>
            </a>
          ))}
          <a href={`mailto:${profile.email}`} data-cursor="email" className="hover:text-primary">
            <h4>Email</h4>
          </a>
        </div>
      </div>
    </footer>
  );
}
