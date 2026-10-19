import { site } from "@/lib/content";

export function ExperienceSection() {
  return (
    <ol className="relative border-l border-border">
      {site.experience.map((job) => (
        <li key={`${job.company}-${job.role}`} data-reveal="left" className="relative pb-12 pl-8 last:pb-0">
          <span
            className="absolute -left-[5px] top-2 h-2.5 w-2.5 rounded-full border-2 border-bg bg-accent"
            aria-hidden="true"
          />
          <div className="flex flex-col gap-1 sm:flex-row sm:items-baseline sm:justify-between sm:gap-6">
            <h3 className="text-lg font-semibold tracking-tight">
              {job.role}
              <span className="text-muted"> · {job.company}</span>
            </h3>
            <p className="shrink-0 font-mono text-xs text-muted">{job.dates}</p>
          </div>
          <p className="mt-3 max-w-3xl leading-relaxed text-muted">{job.description}</p>
        </li>
      ))}
    </ol>
  );
}
