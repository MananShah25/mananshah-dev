import type { CSSProperties } from "react";

// Stagger for [data-reveal] items that enter the viewport together (e.g. tiles in one row)
export function revealDelay(ms: number): CSSProperties {
  return { "--reveal-delay": `${ms}ms` } as CSSProperties;
}
