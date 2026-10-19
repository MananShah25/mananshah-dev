import Image from "next/image";
import Link from "next/link";
import { site } from "@/lib/content";

const outlineBtn =
  "inline-flex items-center gap-2 rounded-md border border-border px-4 py-2 text-sm font-medium transition-colors hover:border-accent hover:text-accent";

export function Hero() {
  const { person, social } = site;

  return (
    <section className="hero-in grid items-center gap-10 py-14 md:grid-cols-[1fr_auto] md:gap-14 md:py-24">
      <div className="order-2 md:order-1">
        <p className="font-mono text-xs uppercase tracking-widest text-accent">{person.tagline}</p>
        <h1 className="mt-4 text-5xl font-semibold tracking-tight sm:text-6xl">{person.name}</h1>

        <ul className="mt-5 flex flex-col gap-1.5 text-lg font-medium">
          {person.roles.map((role) => (
            <li key={role} className="flex items-center gap-3">
              <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-accent" aria-hidden="true" />
              {role}
            </li>
          ))}
        </ul>

        <p className="mt-6 max-w-2xl leading-relaxed text-muted">{person.about}</p>

        <div className="mt-8 flex flex-wrap gap-3">
          <a
            href={person.resumePath}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-md bg-accent px-4 py-2 text-sm font-medium text-accent-contrast transition-opacity hover:opacity-90"
          >
            Resume
          </a>
          <a href={social.github} target="_blank" rel="noopener noreferrer" className={outlineBtn}>
            GitHub
          </a>
          <a href={social.linkedin} target="_blank" rel="noopener noreferrer" className={outlineBtn}>
            LinkedIn
          </a>
          <Link href="/#contact" className={outlineBtn}>
            Contact
          </Link>
        </div>
      </div>

      <div className="order-1 mx-auto md:order-2">
        <div className="relative aspect-[4/5] w-56 overflow-hidden rounded-2xl border border-border bg-[radial-gradient(circle_at_50%_30%,color-mix(in_srgb,var(--accent)_35%,transparent),var(--surface)_70%)] sm:w-64 md:w-72">
          <Image
            src={person.photo}
            alt={`Portrait of ${person.name}`}
            fill
            preload
            fetchPriority="high"
            sizes="(min-width: 768px) 288px, 256px"
            className="object-cover object-[center_20px]"
          />
        </div>
      </div>
    </section>
  );
}
