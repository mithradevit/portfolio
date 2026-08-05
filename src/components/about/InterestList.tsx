export function InterestList({ interests }: { interests: readonly string[] }) {
  return (
    <ul className="flex flex-col gap-1">
      {interests.map((interest, i) => (
        <li key={i} className="text-foreground-light text-[15px]">
          {interest}
        </li>
      ))}
    </ul>
  );
}
