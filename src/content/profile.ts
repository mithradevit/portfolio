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
    "4+ years designing for domains where getting it wrong has real consequences — Public Safety, Healthcare, IoT.",
    "I take messy, high-stakes data and turn it into workflows people can actually use under pressure. I move fast, work close to engineering, and increasingly build alongside AI tools instead of just designing around them.",
    "I have a soft spot for data-dense systems, impossible workflows, and problems that come with too many tabs open.",
  ],

  // Drives the live clock in the intro block.
  timezone: "Asia/Kolkata",

  // Pills under the intro paragraph — the shorthand for what she works on.
  tags: ["Public safety", "Healthcare", "Clinical systems", "Connected health", "AI"],

  resumeUrl: "https://drive.google.com/file/d/1E3nt7TDm6jTCg5RmGJRj487b71H2yAhl/view?usp=sharing",

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
