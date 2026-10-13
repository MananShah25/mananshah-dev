export function TagList({ tags }: { tags: string[] }) {
  return (
    <ul className="flex flex-wrap gap-2" aria-label="Technologies">
      {tags.map((tag) => (
        <li key={tag} className="rounded-md border border-border px-2 py-0.5 font-mono text-xs text-muted">
          {tag}
        </li>
      ))}
    </ul>
  );
}
