// Real data, pulled from https://mithradevi.substack.com (Aug 2026).
// Add a new post by adding one entry here — newest first.

export const substackUrl = "https://mithradevi.substack.com";

export type WritingPost = {
  title: string;
  excerpt: string;
  url: string;
  date: string;
  image: string;
};

export const writingPosts: WritingPost[] = [
  {
    title: "What's Your Siren Going to Say?",
    excerpt: "I went in to watch Odysseus get home. I came out and journaled about myself instead.",
    url: "https://mithradevi.substack.com/p/whats-your-siren-going-to-say",
    date: "Jul 2026",
    image: "/images/writing/siren.jpg",
  },
  {
    title: "no wishes left to beg",
    excerpt: "have you ever heard of sadness",
    url: "https://mithradevi.substack.com/p/no-wishes-left-to-beg",
    date: "Apr 2026",
    image: "/images/writing/no-wishes.jpg",
  },
  {
    title: "the unwitnessed corner",
    excerpt: "does home have a home too —",
    url: "https://mithradevi.substack.com/p/the-unwitnessed-corner",
    date: "Apr 2026",
    image: "/images/writing/unwitnessed-corner.jpg",
  },
  {
    title: "Some poems save your life while you're writing them",
    excerpt: "My body is a rehearsal.",
    url: "https://mithradevi.substack.com/p/some-poems-save-your-life-while-youre",
    date: "Apr 2026",
    image: "/images/writing/some-poems.jpg",
  },
  {
    title: "Apparently, Apathy Is Hot Now. Cool. (Pun Intended.)",
    excerpt: "Because nothing says confidence like pretending you don't have a pulse :(",
    url: "https://mithradevi.substack.com/p/apparently-apathy-is-hot-now-cool",
    date: "Nov 2025",
    image: "/images/writing/apathy.jpg",
  },
];
