import type { WritingPost } from "@/content/writing";

export function WritingList({ posts }: { posts: WritingPost[] }) {
  return (
    <div className="flex w-full flex-col gap-6">
      {posts.map((post) => (
        <a
          key={post.url}
          href={post.url}
          target="_blank"
          rel="noopener noreferrer"
          data-cursor="pointer"
          className="group border-foreground/10 flex flex-col gap-1 border-b pb-6 last:border-b-0"
        >
          <div className="flex flex-col justify-between gap-0.5 lg:flex-row lg:items-baseline">
            <h3 className="group-hover:text-primary text-[19px] transition-colors duration-200">
              {post.title}
            </h3>
            <h4 className="text-foreground-light">{post.date}</h4>
          </div>
          <p className="text-foreground-light max-w-[600px] text-[15px] italic">{post.excerpt}</p>
        </a>
      ))}
    </div>
  );
}
