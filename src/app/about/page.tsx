import { about } from "@/content/about";
import { profile } from "@/content/profile";
import { InterestList } from "@/components/about/InterestList";
import { PhotoGrid } from "@/components/about/PhotoGrid";
import { Reveal } from "@/components/motion/Reveal";

export default function AboutPage() {
  return (
    <div className="flex w-full flex-col items-center gap-16 p-6">
      <Reveal className="flex w-full max-w-[1800px] flex-col gap-16">
        <div className="grid w-full grid-cols-1 gap-12 pt-8 lg:grid-cols-2 lg:pt-[16vh]">
          <h1 className="max-w-[600px]">{about.tagline}</h1>
          <div className="flex flex-col gap-6">
            <p className="text-foreground-light max-w-[500px] leading-relaxed">{about.bio}</p>
            <div>
              <h4 className="mb-2">Outside of work</h4>
              <InterestList interests={about.interests} />
            </div>
            <p className="text-foreground-light text-[15px]">
              {about.contactPrompt}{" "}
              <a href={`mailto:${profile.email}`} data-cursor="pointer" className="text-primary">
                {profile.email}
              </a>
            </p>
          </div>
        </div>

        <PhotoGrid categories={about.photoCategories} />
      </Reveal>
    </div>
  );
}
