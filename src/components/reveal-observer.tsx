"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";

declare global {
  interface Window {
    __revealReady?: boolean;
  }
}

// Plays the [data-reveal] entrance animations (styles in globals.css) as elements scroll into view,
// and resets them once they leave, so they replay on the way back.
export function RevealObserver() {
  const pathname = usePathname();

  useEffect(() => {
    window.__revealReady = true;
    if (document.documentElement.dataset.motion !== "on") return;

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          entry.target.classList.toggle("is-visible", entry.isIntersecting);
        }
      },
      // Trigger slightly before the element is fully in view
      { threshold: 0.12, rootMargin: "0px 0px -8% 0px" },
    );

    // Rescan on every route change: each page brings new elements
    document.querySelectorAll("[data-reveal]").forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [pathname]);

  return null;
}
