import Link from "next/link";
import { site } from "@/lib/content";
import { navLinks } from "@/lib/nav";
import { CommandPalette } from "./command-palette";
import { BrandName } from "./brand-name";
import { HomeLink } from "./home-link";
import { ThemeToggle } from "./theme-toggle";
import { MobileMenu } from "./mobile-menu";

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 border-b border-border bg-bg/85 backdrop-blur">
      <div aria-hidden="true" className="pointer-events-none absolute inset-x-0 -bottom-px h-px bg-linear-to-r from-transparent via-accent-bright/60 to-transparent" />
      <div className="mx-auto flex h-16 max-w-5xl items-center justify-between gap-4 px-4 sm:px-6">
        <HomeLink className="flex shrink-0 items-center gap-2 whitespace-nowrap font-bold tracking-tight">
          <span className="h-2.5 w-2.5 rounded-sm bg-accent" aria-hidden="true" />
          <BrandName name={site.person.name} />
        </HomeLink>

        <nav aria-label="Main" className="hidden lg:block">
          <ul className="flex items-center gap-6 text-sm font-medium">
            {navLinks.map((link) => (
              <li key={link.href}>
                <Link href={link.href} className="relative text-text transition-colors duration-300 after:absolute after:-bottom-1 after:left-0 after:h-0.5 after:w-full after:origin-left after:scale-x-0 after:rounded-full after:bg-accent-bright after:transition-transform after:duration-300 hover:text-accent-bright hover:after:scale-x-100">
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex items-center gap-2">
          <CommandPalette />
          <a
            href={site.person.resumePath}
            target="_blank"
            rel="noopener noreferrer"
            className="hidden rounded-md bg-accent px-3 py-1.5 text-sm font-medium text-accent-contrast transition-colors duration-300 hover:bg-accent-bright sm:inline-block"
          >
            Resume
          </a>
          <ThemeToggle />
          <MobileMenu />
        </div>
      </div>
    </header>
  );
}
