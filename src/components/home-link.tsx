"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import type { ReactNode } from "react";
import { scrollToTop } from "@/lib/scroll";

// On the home page, scrolls to the top instead of re-navigating (which wouldn't move);
// from any other page it's a normal link home.
export function HomeLink({ className, children }: { className?: string; children: ReactNode }) {
  const pathname = usePathname();

  return (
    <Link
      href="/"
      className={className}
      onClick={(e) => {
        if (pathname === "/") {
          e.preventDefault();
          scrollToTop();
        }
      }}
    >
      {children}
    </Link>
  );
}
