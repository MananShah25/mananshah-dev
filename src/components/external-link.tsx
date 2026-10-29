export function ExternalLink({ href, label }: { href: string; label: string }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="inline-flex shrink-0 items-center gap-1.5 rounded-md border border-accent-bright px-3 py-1.5 text-sm font-medium text-accent transition-colors duration-300 hover:border-accent hover:bg-accent hover:text-accent-contrast"
    >
      {label} <span aria-hidden="true">↗</span>
    </a>
  );
}
