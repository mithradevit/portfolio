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
    "Reach out on LinkedIn or by email — I'd love to hear from you.",

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
