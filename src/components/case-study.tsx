import type { ReactNode } from "react";
import Link from "next/link";
import type { CaseStudy as CaseStudyContent, Project } from "@/lib/types";
import { ExternalLink } from "./external-link";
import { TagList } from "./tag-list";

export function CaseStudy({ project, caseStudy }: { project: Project; caseStudy: CaseStudyContent }) {
  const { links } = project;

  return (
    <article className="mx-auto max-w-3xl px-4 py-14 sm:px-6 md:py-20">
      <Link href="/#projects" className="font-mono text-sm text-muted transition-colors hover:text-accent">
        ← All projects
      </Link>

      <header data-reveal="up" className="mt-8">
        <p className="font-mono text-xs font-bold uppercase tracking-widest text-accent-bright">{project.kind}</p>
        <h1 className="mt-3 text-4xl font-bold tracking-tight sm:text-5xl">{project.title}</h1>
        <p className="mt-5 text-lg leading-relaxed text-muted">{project.tagline}</p>
        {caseStudy.credits && <p className="mt-4 text-sm text-muted">{caseStudy.credits}</p>}

        <div className="mt-6">
          <TagList tags={project.tags} />
        </div>

        <div className="mt-6 flex flex-wrap gap-3">
          {links.github && <ExternalLink href={links.github} label="GitHub" />}
          {links.paper && <ExternalLink href={links.paper} label="Read the paper" />}
          {links.demo && <ExternalLink href={links.demo} label="Live demo" />}
        </div>
      </header>

      <Block title="Problem">
        <p>{caseStudy.problem}</p>
      </Block>

      <Block title="Approach">
        <List items={caseStudy.approach} />
      </Block>

      {caseStudy.myRole && (
        <Block title="My role">
          <p>{caseStudy.myRole}</p>
        </Block>
      )}

      {caseStudy.results && (
        <Block title="Results">
          {caseStudy.results.rows && (
            <div className="overflow-x-auto rounded-xl border border-border">
              <table className="w-full text-left text-sm">
                <thead className="bg-surface font-mono text-xs uppercase tracking-wider text-muted">
                  <tr>
                    <th scope="col" className="px-4 py-3 font-normal">Metric</th>
                    <th scope="col" className="px-4 py-3 font-normal">Value</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border">
                  {caseStudy.results.rows.map((row) => (
                    <tr key={row.metric}>
                      <td className="px-4 py-3">{row.metric}</td>
                      <td className="px-4 py-3 font-mono text-accent">{row.value}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
          {caseStudy.results.note && <p className={caseStudy.results.rows ? "mt-4" : ""}>{caseStudy.results.note}</p>}
        </Block>
      )}

      {caseStudy.limitations && (
        <Block title="Limitations">
          <List items={caseStudy.limitations} />
        </Block>
      )}
    </article>
  );
}

function Block({ title, children }: { title: string; children: ReactNode }) {
  return (
    <section data-reveal="up" className="mt-12 border-t border-border pt-10">
      <h2 className="font-mono text-xs font-bold uppercase tracking-widest text-accent-bright">{title}</h2>
      <div className="mt-4 leading-relaxed text-muted">{children}</div>
    </section>
  );
}

function List({ items }: { items: string[] }) {
  return (
    <ul className="flex flex-col gap-3">
      {items.map((item) => (
        <li key={item} className="flex gap-3">
          <span className="mt-2.5 h-1 w-1 shrink-0 rounded-full bg-accent" aria-hidden="true" />
          <span>{item}</span>
        </li>
      ))}
    </ul>
  );
}
