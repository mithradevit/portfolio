// Real data, sourced from Mithradevi's current resume PDF (Aug 2026).
// Edit this file to update your name, title, tagline, or bio anywhere on the site.

export const profile = {
  name: "Mithradevi Thayumanasamy",
  shortName: "Mithra",
  title: "Senior Product Designer",
  location: "Bangalore, India",
  email: "mithracreates@gmail.com",
  phone: "+91 6382773164",

  // Hero tagline on the homepage. The italicized word renders in the serif
  // accent style, matching the "who *engineers*" pattern.
  taglineLead: "I'm Mithra, a Senior Product Designer who makes",
  taglineAccent: "complex products",
  taglineTail: "easier to understand, operate, and trust.",

  bio: [
    "I've always been curious about how things work — products, people, and everything in between.",
    "I've spent the last 4+ years building digital products across B2B and enterprise software — healthcare, public safety, and connected devices. I love taking things apart, understanding how they work, and making them simpler. The rest of the time, I read psychology, make things, and look for good coffee.",
  ],

  // Drives the live clock in the intro block.
  timezone: "Asia/Kolkata",
  /** Bangalore, to four decimal places — roughly 11m of precision, which is
   *  city-centre accurate without pointing at anyone's front door. */
  coordinates: { lat: 12.9716, lon: 77.5946 },

  // Pills under the intro paragraph — the shorthand for what she works on.
  tags: ["Public safety", "Healthcare", "Clinical systems", "Connected health", "AI"],

  resumeUrl: "https://drive.google.com/file/d/1dZA6awVs6-b6YjUz_0nTGj9qmdo1DJ2a/view?usp=sharing",

  socials: {
    linkedin: "https://linkedin.com/in/mithradevi",
    substack: "https://mithradevi.substack.com",
    // Set this to a GitHub username (not a URL) to switch the activity strip on.
    // Left empty it renders nothing rather than inventing activity.
    github: "",
    x: "", // TODO: add your X/Twitter profile URL
    devpost: "", // TODO: add your Devpost profile URL
  },
} as const;
