import { openSource } from "@/lib/content";
import { ExternalLink } from "./external-link";
import { TagList } from "./tag-list";

export function OpenSourceSection() {
  return (
    <div className="flex flex-col gap-5">
      {openSource.map((c) => (
        <article key={c.url} className="rounded-xl border border-border bg-surface p-6">
          <div className="flex flex-wrap items-center gap-x-3 gap-y-2">
            <p className="font-semibold">{c.project}</p>
            <span className="font-mono text-xs text-muted">
              {c.repo} #{c.number}
            </span>
            <span className="rounded-full border border-accent px-2.5 py-0.5 font-mono text-xs text-accent">
              {c.status}
            </span>
          </div>

          <h3 className="mt-3 font-mono text-sm">{c.title}</h3>
          <p className="mt-3 text-sm leading-relaxed text-muted">{c.summary}</p>

          <ul className="mt-4 flex flex-wrap gap-x-5 gap-y-1.5 text-sm">
            {c.details.map((d) => (
              <li key={d} className="flex items-center gap-2">
                <span className="h-1 w-1 rounded-full bg-accent" aria-hidden="true" />
                {d}
              </li>
            ))}
          </ul>

          <div className="mt-5 flex flex-wrap items-center justify-between gap-4">
            <TagList tags={c.tags} />
            <ExternalLink href={c.url} label="View pull request" />
          </div>
        </article>
      ))}
    </div>
  );
}
