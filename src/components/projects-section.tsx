import Link from "next/link";
import { getFeaturedProjects, getOtherProjects } from "@/lib/content";
import { revealDelay } from "@/lib/reveal";
import type { Project } from "@/lib/types";
import { ExternalLink } from "./external-link";
import { TagList } from "./tag-list";

export function ProjectsSection() {
  const others = getOtherProjects();

  return (
    <>
      <div className="grid gap-5 md:grid-cols-2">
        {getFeaturedProjects().map((project, i) => (
          <FeaturedCard key={project.slug} project={project} index={i} />
        ))}
      </div>

      {others.length > 0 && (
        <>
          <h3 data-reveal="up" className="mt-14 font-mono text-xs uppercase tracking-widest text-muted">
            Also built
          </h3>
          <ul className="mt-4 divide-y divide-border border-t border-border">
            {others.map((project, i) => (
              <li key={project.slug} data-reveal="up" style={revealDelay(i * 100)} className="flex flex-col gap-3 py-5 sm:flex-row sm:items-start sm:justify-between sm:gap-8">
                <div>
                  <p className="font-medium">
                    {project.title}
                    <span className="ml-2 font-mono text-xs text-muted">{project.kind}</span>
                  </p>
                  <p className="mt-1 text-sm leading-relaxed text-muted">{project.tagline}</p>
                  <div className="mt-3">
                    <TagList tags={project.tags} />
                  </div>
                </div>
                {project.links.github && (
                  <ExternalLink href={project.links.github} label="GitHub" />
                )}
              </li>
            ))}
          </ul>
        </>
      )}
    </>
  );
}

function FeaturedCard({ project, index }: { project: Project; index: number }) {
  return (
    // Right-column tiles start a beat later so each row cascades
    <article data-reveal="up" style={revealDelay((index % 2) * 150)} className="group relative flex flex-col rounded-xl border border-border bg-surface p-6 transition-colors hover:border-accent-bright hover:shadow-[0_18px_40px_-24px_var(--accent-glow)]">
      <p className="font-mono text-xs font-semibold text-accent-bright">{project.kind}</p>
      <h3 className="mt-2 text-xl font-semibold tracking-tight">
        {/* Stretched link: the whole card opens the case study */}
        <Link href={`/projects/${project.slug}`} className="after:absolute after:inset-0 after:rounded-xl">
          {project.title}
        </Link>
      </h3>
      <p className="mt-3 text-sm leading-relaxed text-muted">{project.tagline}</p>

      <ul className="mt-5 flex flex-col gap-1.5 text-sm">
        {project.highlights.map((h) => (
          <li key={h} className="flex items-center gap-2.5">
            <span className="h-1 w-1 shrink-0 rounded-full bg-accent" aria-hidden="true" />
            {h}
          </li>
        ))}
      </ul>

      <div className="mt-5">
        <TagList tags={project.tags} />
      </div>

      <p className="mt-auto pt-6 text-sm font-medium text-accent">
        Read case study <span aria-hidden="true" className="inline-block transition-transform group-hover:translate-x-1">→</span>
      </p>
    </article>
  );
}
