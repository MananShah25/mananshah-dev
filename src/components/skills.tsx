import { site } from "@/lib/content";

export function Skills() {
  return (
    <>
      <div className="gap-4 sm:columns-2">
        {site.skills.map((group) => (
          <div key={group.label} className="mb-4 break-inside-avoid rounded-xl border border-border bg-surface p-5">
            <h3 className="font-mono text-xs uppercase tracking-widest text-accent">{group.label}</h3>
            <ul className="mt-4 flex flex-wrap gap-2">
              {group.items.map((item) => (
                <li key={item} className="rounded-md border border-border px-2.5 py-1 text-sm">
                  {item}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <p className="mt-8 leading-relaxed text-muted">
        <span className="font-mono text-xs uppercase tracking-widest text-accent">Practices · </span>
        {site.practices.join(" · ")}
      </p>
    </>
  );
}
