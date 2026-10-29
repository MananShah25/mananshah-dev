"use client";

import Link from "next/link";
import { useEffect, useRef, useState, useSyncExternalStore } from "react";
import { createPortal } from "react-dom";
import { site } from "@/lib/content";
import { navLinks } from "@/lib/nav";

const noopSubscribe = () => () => {};

// Below lg: a hamburger that slides a navigation drawer in from the right.
// The drawer is portaled to <body> because the header's backdrop-blur would otherwise
// trap a position:fixed child inside the header's box.
export function MobileMenu() {
  const [open, setOpen] = useState(false);
  const mounted = useSyncExternalStore(noopSubscribe, () => true, () => false);
  const closeRef = useRef<HTMLButtonElement>(null);
  const toggleRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    const root = document.documentElement;
    const prevOverflow = root.style.overflow;
    root.style.overflow = "hidden";
    closeRef.current?.focus();
    const toggle = toggleRef.current;
    return () => {
      window.removeEventListener("keydown", onKey);
      root.style.overflow = prevOverflow;
      toggle?.focus({ preventScroll: true });
    };
  }, [open]);

  const drawer = (
    <div className="lg:hidden" inert={!open}>
      <div
        aria-hidden="true"
        onClick={() => setOpen(false)}
        className={`fixed inset-0 z-50 bg-black/40 backdrop-blur-sm transition-opacity duration-300 ${
          open ? "opacity-100" : "pointer-events-none opacity-0"
        }`}
      />
      <nav
        id="mobile-nav"
        aria-label="Mobile"
        className={`fixed inset-y-0 right-0 z-50 flex w-[min(80vw,22rem)] flex-col border-l border-accent-bright/40 bg-bg shadow-[-24px_0_60px_-30px_var(--accent-glow)] transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] ${
          open ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex h-16 items-center justify-end px-4 sm:px-6">
          <button
            ref={closeRef}
            type="button"
            onClick={() => setOpen(false)}
            aria-label="Close menu"
            className="inline-flex h-9 w-9 items-center justify-center rounded-md border border-border text-text transition-colors hover:border-accent-bright hover:text-accent-bright"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
              <path d="M6 6l12 12M18 6L6 18" />
            </svg>
          </button>
        </div>

        <ul className="flex flex-1 flex-col justify-center gap-7 px-8 text-right">
          {navLinks.map((link, i) => (
            <li
              key={link.href}
              style={{ transitionDelay: open ? `${120 + i * 50}ms` : "0ms" }}
              className={`transition-all duration-500 ${open ? "translate-x-0 opacity-100" : "translate-x-8 opacity-0"}`}
            >
              <Link
                href={link.href}
                onClick={() => setOpen(false)}
                className="group inline-flex items-baseline gap-3 text-2xl font-semibold tracking-tight text-text transition-colors duration-300 hover:text-accent-bright"
              >
                <span className="font-mono text-xs font-medium text-accent-bright">{String(i + 1).padStart(2, "0")}</span>
                <span className="relative after:absolute after:-bottom-1.5 after:right-0 after:h-0.5 after:w-full after:origin-right after:scale-x-0 after:rounded-full after:bg-accent-bright after:transition-transform after:duration-300 group-hover:after:scale-x-100">
                  {link.label}
                </span>
              </Link>
            </li>
          ))}
        </ul>

        <div className="p-6">
          <a
            href={site.person.resumePath}
            target="_blank"
            rel="noopener noreferrer"
            className="block rounded-md bg-accent py-2.5 text-center font-medium text-accent-contrast transition-colors duration-300 hover:bg-accent-bright"
          >
            Resume
          </a>
        </div>
      </nav>
    </div>
  );

  return (
    <div className="lg:hidden">
      <button
        ref={toggleRef}
        type="button"
        onClick={() => setOpen(true)}
        aria-expanded={open}
        aria-controls="mobile-nav"
        aria-label="Open menu"
        className="inline-flex h-9 w-9 items-center justify-center rounded-md border border-border text-muted transition-colors hover:border-accent hover:text-accent"
      >
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
          <path d="M4 7h16M4 12h16M4 17h16" />
        </svg>
      </button>
      {mounted && createPortal(drawer, document.body)}
    </div>
  );
}
