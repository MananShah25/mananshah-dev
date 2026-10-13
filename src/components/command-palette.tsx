"use client";

import { useRouter } from "next/navigation";
import { useEffect, useMemo, useRef, useState } from "react";
import { getFeaturedProjects, site } from "@/lib/content";
import { navLinks } from "@/lib/nav";
import { toggleTheme } from "./theme-toggle";

type Command = {
  id: string;
  group: string;
  label: string;
  run: () => void;
};

export function CommandPalette() {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [active, setActive] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const returnFocusTo = useRef<HTMLElement | null>(null);

  const commands = useMemo<Command[]>(() => {
    const openExternal = (url: string) => window.open(url, "_blank", "noopener,noreferrer");
    return [
      ...navLinks.map((l) => ({
        id: `nav-${l.href}`,
        group: "Go to",
        label: l.label,
        run: () => router.push(l.href),
      })),
      ...getFeaturedProjects().map((p) => ({
        id: `project-${p.slug}`,
        group: "Case studies",
        label: p.title,
        run: () => router.push(`/projects/${p.slug}`),
      })),
      { id: "resume", group: "Links", label: "Resume (PDF)", run: () => openExternal(site.person.resumePath) },
      { id: "github", group: "Links", label: "GitHub", run: () => openExternal(site.social.github) },
      { id: "linkedin", group: "Links", label: "LinkedIn", run: () => openExternal(site.social.linkedin) },
      { id: "theme", group: "Settings", label: "Toggle light / dark theme", run: toggleTheme },
    ];
  }, [router]);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return q ? commands.filter((c) => `${c.group} ${c.label}`.toLowerCase().includes(q)) : commands;
  }, [commands, query]);

  function show() {
    returnFocusTo.current = document.activeElement as HTMLElement | null;
    setQuery("");
    setActive(0);
    setOpen(true);
  }

  function close() {
    setOpen(false);
    returnFocusTo.current?.focus();
  }

  function runCommand(cmd: Command) {
    setOpen(false);
    cmd.run();
  }

  // Global shortcut: ⌘K on Mac, Ctrl+K elsewhere
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        if (open) close();
        else show();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  });

  useEffect(() => {
    if (!open) return;
    inputRef.current?.focus();
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prevOverflow;
    };
  }, [open]);

  function onInputKey(e: React.KeyboardEvent) {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setActive((i) => (filtered.length ? (i + 1) % filtered.length : 0));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setActive((i) => (filtered.length ? (i - 1 + filtered.length) % filtered.length : 0));
    } else if (e.key === "Enter" && filtered[active]) {
      e.preventDefault();
      runCommand(filtered[active]);
    } else if (e.key === "Escape") {
      e.preventDefault();
      close();
    }
  }

  return (
    <>
      <button
        type="button"
        onClick={show}
        aria-label="Open command menu"
        aria-keyshortcuts="Meta+K Control+K"
        className="hidden h-9 items-center gap-2 rounded-md border border-border px-2.5 text-xs text-muted transition-colors hover:border-accent hover:text-accent lg:inline-flex"
      >
        <span>Search</span>
        <kbd className="rounded border border-border px-1.5 py-0.5 font-mono text-[10px]">⌘K</kbd>
      </button>

      {open && (
        <div
          className="fixed inset-0 z-[100] flex items-start justify-center bg-black/50 p-4 pt-[15vh] backdrop-blur-sm"
          onMouseDown={close}
        >
          <div
            role="dialog"
            aria-modal="true"
            aria-label="Command menu"
            className="palette-in w-full max-w-lg overflow-hidden rounded-xl border border-border bg-surface shadow-2xl"
            onMouseDown={(e) => e.stopPropagation()}
          >
            <input
              ref={inputRef}
              value={query}
              onChange={(e) => {
                setQuery(e.target.value);
                setActive(0);
              }}
              onKeyDown={onInputKey}
              placeholder="Jump to a section, project or link…"
              role="combobox"
              aria-expanded="true"
              aria-controls="palette-list"
              aria-activedescendant={filtered[active] ? `palette-${filtered[active].id}` : undefined}
              aria-label="Search commands"
              className="w-full border-b border-border bg-transparent px-4 py-3.5 text-sm outline-none placeholder:text-muted"
            />
            <ul id="palette-list" role="listbox" className="max-h-80 overflow-y-auto p-2">
              {filtered.map((cmd, i) => (
                <li
                  key={cmd.id}
                  id={`palette-${cmd.id}`}
                  role="option"
                  aria-selected={i === active}
                  onMouseMove={() => setActive(i)}
                  onClick={() => runCommand(cmd)}
                  className={`flex cursor-pointer items-center justify-between rounded-md px-3 py-2 text-sm ${
                    i === active ? "bg-accent text-accent-contrast" : ""
                  }`}
                >
                  <span>{cmd.label}</span>
                  <span className={`font-mono text-[10px] uppercase tracking-wider ${i === active ? "" : "text-muted"}`}>
                    {cmd.group}
                  </span>
                </li>
              ))}
              {filtered.length === 0 && <li className="px-3 py-3 text-sm text-muted">No matches</li>}
            </ul>
            <p className="border-t border-border px-4 py-2 font-mono text-[10px] text-muted">
              ↑↓ to move · Enter to open · Esc to close
            </p>
          </div>
        </div>
      )}
    </>
  );
}
