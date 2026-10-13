import { site } from "@/lib/content";

export function SiteFooter() {
  return (
    <footer className="border-t border-border">
      <div className="mx-auto flex max-w-5xl flex-col items-center justify-between gap-4 px-4 py-8 text-sm text-muted sm:flex-row sm:px-6">
        <p className="font-mono text-xs">
          © {new Date().getFullYear()} {site.person.name}
        </p>
        <ul className="flex items-center gap-5">
          <li>
            <a href={site.social.github} target="_blank" rel="noopener noreferrer" className="transition-colors hover:text-accent">
              GitHub
            </a>
          </li>
          <li>
            <a href={site.social.linkedin} target="_blank" rel="noopener noreferrer" className="transition-colors hover:text-accent">
              LinkedIn
            </a>
          </li>
          <li>
            <a href={site.person.resumePath} target="_blank" rel="noopener noreferrer" className="transition-colors hover:text-accent">
              Resume
            </a>
          </li>
        </ul>
      </div>
    </footer>
  );
}
