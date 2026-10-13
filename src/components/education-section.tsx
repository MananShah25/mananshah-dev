import Image from "next/image";
import { site } from "@/lib/content";

export function EducationSection() {
  return (
    <div className="grid gap-5 md:grid-cols-2">
      {site.education.map((edu) => (
        <article key={edu.school} className="flex flex-col overflow-hidden rounded-xl border border-border bg-surface">
          <div className="relative aspect-video">
            <Image
              src={edu.image}
              alt={`${edu.school} campus`}
              fill
              sizes="(min-width: 768px) 480px, 100vw"
              className="object-cover"
            />
          </div>

          <div className="flex flex-1 flex-col p-6">
            <p className="font-mono text-xs text-accent">{edu.dates}</p>
            <h3 className="mt-2 text-lg font-semibold tracking-tight">{edu.degree}</h3>
            <p className="mt-1 text-sm text-muted">
              {edu.school} · {edu.location}
            </p>

            {(edu.gpa || edu.highlights) && (
              <ul className="mt-4 flex flex-wrap gap-2">
                {edu.gpa && (
                  <li className="rounded-full border border-accent px-2.5 py-0.5 font-mono text-xs text-accent">
                    GPA {edu.gpa}
                  </li>
                )}
                {edu.highlights?.map((h) => (
                  <li key={h} className="rounded-full border border-accent px-2.5 py-0.5 font-mono text-xs text-accent">
                    {h}
                  </li>
                ))}
              </ul>
            )}

            <h4 className="mt-6 font-mono text-xs uppercase tracking-widest text-muted">Relevant coursework</h4>
            <ul className="mt-3 flex flex-wrap gap-2">
              {edu.coursework.map((course) => (
                <li key={course} className="rounded-md border border-border px-2.5 py-1 text-sm">
                  {course}
                </li>
              ))}
            </ul>
          </div>
        </article>
      ))}
    </div>
  );
}
