import type { ReactNode } from "react";

export function Section({
  id,
  eyebrow,
  title,
  children,
}: {
  id: string;
  eyebrow: string;
  title: string;
  children: ReactNode;
}) {
  return (
    <section id={id} aria-labelledby={`${id}-title`} className="border-t border-border py-20">
      <div data-reveal="up">
        <p className="font-mono text-xs uppercase tracking-widest text-accent">{eyebrow}</p>
        <h2 id={`${id}-title`} className="mt-2 text-3xl font-semibold tracking-tight">
          {title}
        </h2>
      </div>
      <div className="mt-10">{children}</div>
    </section>
  );
}
