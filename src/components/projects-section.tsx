import Link from "next/link";
import { getFeaturedProjects, getOtherProjects } from "@/lib/content";
import type { Project } from "@/lib/types";
import { ExternalLink } from "./external-link";
import { TagList } from "./tag-list";

export function ProjectsSection() {
  const others = getOtherProjects();

  return (
    <>
      <div className="grid gap-5 md:grid-cols-2">
        {getFeaturedProjects().map((project) => (
          <FeaturedCard key={project.slug} project={project} />
        ))}
      </div>

      {others.length > 0 && (
        <>
          <h3 className="mt-14 font-mono text-xs uppercase tracking-widest text-muted">Also built</h3>
          <ul className="mt-4 divide-y divide-border border-t border-border">
            {others.map((project) => (
              <li key={project.slug} className="flex flex-col gap-3 py-5 sm:flex-row sm:items-start sm:justify-between sm:gap-8">
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

function FeaturedCard({ project }: { project: Project }) {
  return (
    <article className="group relative flex flex-col rounded-xl border border-border bg-surface p-6 transition-colors hover:border-accent">
      <p className="font-mono text-xs text-accent">{project.kind}</p>
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
