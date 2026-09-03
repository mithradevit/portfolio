// Real, written from Mithradevi's resume + Substack voice (Aug 2026).

export const about = {
  tagline: "I'm a designer, builder, & writer — chasing good questions.",

  bio: "When I'm not deep in a Figma file, I'm usually mid-book, sketching something, or building a product with nothing but AI tools and stubbornness. I take more photos than I post and write more than I publish — the unfiltered version of my brain lives on my Substack.",

  interests: [
    "Reading & illustration",
    "Vibe-coding side projects",
    "Photography",
  ],

  contactPrompt:
    "I'm open to work. If you're hiring reach out via LinkedIn or email. Or… just say hi?",

  /**
   * The About hero. `heading` is the italic serif display line; `intro` is one
   * paragraph per entry; `facts` are the small labelled cards beneath.
   *
   * `photos` fills the window frame — the first is what loads, the rest sit in
   * the thumbnail strip. `src: ""` renders a placeholder tile, so the whole
   * thing works before the images exist: drop files into
   * public/images/about/ and fill in the paths.
   */
  hero: {
    heading: "About me",
    intro: [
      "I'm an India-based designer, and my prefrontal cortex is filled with ideas. I got into design because of psychology. I've always been fascinated by the human brain — how we think, behave, and make decisions.",
      "That curiosity shapes my design practice today: I look at technology through the lens of human behavior, exploring where people struggle and designing experiences that feel more intuitive.",
      "I'm spending my 20s aggressively pursuing one idea: what if it all works out?",
    ],
    facts: [
      { label: "Exploring", emoji: "🛠", text: "AI-native design workflows and building my own tools." },
      { label: "After hours", emoji: "📷", text: "Reading, illustration, and taking more photos than I post." },
    ],
    // TODO: replace each `alt` with what's actually in the photo — these are
    // read aloud by screen readers and shown if an image fails to load.
    photos: [
      { src: "/images/about/p2.webp", alt: "Mithra" },
      { src: "/images/about/p4.webp", alt: "Mithra" },
      { src: "/images/about/p5.webp", alt: "Mithra" },
      { src: "/images/about/p6.webp", alt: "Mithra" },
      { src: "/images/about/p7.webp", alt: "A bundle of books" },
      { src: "/images/about/p8.webp", alt: "Dorm vinyl setup with a record player and albums" },
      { src: "/images/about/p10.webp", alt: "The Career Archetypes by Joel Uili" },
    ],
  },

  // Each category needs 3 image paths once you add real photos to
  // public/images/about/. Leaving `images` empty renders a placeholder tile.
  photoCategories: [
    { label: "Designer", images: [] as string[] },
    { label: "Builder", images: [] as string[] },
    { label: "Writer", images: [] as string[] },
    { label: "Photographer", images: [] as string[] },
  ],

  /**
   * The arc carousel — a separate showcase from the category grid above.
   * One entry per card, in the order they sit on the arc.
   * `src: ""` renders a tinted placeholder card carrying just the label, so
   * the carousel is fully usable before the photos exist — drop files into
   * `public/images/about/` and fill in the paths.
   */
  gallery: [
    { src: "", alt: "", label: "Designer" },
    { src: "", alt: "", label: "Builder" },
    { src: "", alt: "", label: "Writer" },
    { src: "", alt: "", label: "Photographer" },
    { src: "", alt: "", label: "Reader" },
    { src: "", alt: "", label: "Photographer" },
    { src: "", alt: "", label: "Tinkerer" },
  ],
} as const;
