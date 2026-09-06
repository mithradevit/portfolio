import fs from "fs";

const file = "src/content/case-studies/frontline-safety.ts";
let src = fs.readFileSync(file, "utf8");

// A second labelled rail inside The Mobile App. `imageGroups` doesn't exist on
// the type, so the clips ride in `videos`-style order under their own heading
// by splitting the section: map stays as the section's `images`, and clips get
// their own section immediately after, carrying the same surface treatment.
const CLIPS = `    {
      heading: "Clips",
      navLabel: "Clips",
      body: [
        "Capture was never the hard part. The hard part is that a clip with no description is evidence nobody can find later, and the description has to be written while the officer still remembers what happened — which is exactly when they have the least time to write it.",
      ],
      imagesSurface: true,
      imagesLabel: "Clips · describing footage before it goes cold",
      imagesScroll: true,
      imagesRailHeight: 560,
      images: [
        {
          src: "/images/projects/frontline-safety/clips-3.svg",
          alt: "The Clips list: seven clips held on the camera and in the cloud, filtered by All, Not described, and Uploading. Each row shows duration, time and upload state — one still uploading at 64%, two already uploaded, one flagged Not described.",
          width: 482,
          height: 954,
          caption:
            "The list leads with what is missing — “Not described” is a filter, not a badge you have to hunt for.",
        },
        {
          src: "/images/projects/frontline-safety/clips-2.svg",
          alt: "Describe this clip: the footage with its location and timestamp, a What happened field prompting that a colleague should understand this without watching it, four category chips, an optional notice or case number, and a Save and upload button.",
          width: 482,
          height: 954,
          caption:
            "The prompt sets the standard — write it so a colleague never has to watch the footage.",
        },
        {
          src: "/images/projects/frontline-safety/clips-1.svg",
          alt: "The same screen with an assistive panel drawn from the audio, offering a draft description of the incident, with accept and dismiss controls beside it.",
          width: 482,
          height: 954,
          caption:
            "Drawn from the audio, offered rather than applied — the officer accepts or dismisses it, and the record stays theirs.",
        },
      ],
    },
`;

const anchor = `    {\n      heading: "Designing Across the Ecosystem",`;
if (!src.includes(anchor)) throw new Error("ecosystem anchor not found");
src = src.replace(anchor, CLIPS + anchor);

fs.writeFileSync(file, src);
console.log("added Clips section after The Mobile App");
