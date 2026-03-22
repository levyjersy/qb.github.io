"use client";

import Link from "next/link";

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-50 border-b border-[var(--ui-border)] bg-[var(--ui-surface)]/95 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-6xl items-center px-4 md:px-8">
        <Link
          href="/"
          className="text-lg font-bold tracking-tight text-[var(--ui-navy)]"
        >
          目标人物分析
        </Link>
      </div>
    </header>
  );
}
