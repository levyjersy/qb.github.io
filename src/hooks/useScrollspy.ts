"use client";

import { useCallback, useEffect, useState } from "react";

type Options = {
  rootMargin?: string;
};

export function useScrollspy(sectionIds: string[], options: Options = {}) {
  const { rootMargin = "-42% 0px -42% 0px" } = options;
  const [activeId, setActiveId] = useState<string>(sectionIds[0] ?? "");

  const handleIntersect = useCallback(
    (entries: IntersectionObserverEntry[]) => {
      const intersecting = entries.filter((e) => e.isIntersecting);
      if (intersecting.length === 0) return;
      intersecting.sort(
        (a, b) => a.boundingClientRect.top - b.boundingClientRect.top,
      );
      const id = intersecting[0].target.id;
      if (id) setActiveId(id);
    },
    [],
  );

  useEffect(() => {
    if (sectionIds.length === 0) return;

    const observer = new IntersectionObserver(handleIntersect, {
      root: null,
      rootMargin,
      threshold: 0,
    });

    for (const sid of sectionIds) {
      const el = document.getElementById(sid);
      if (el) observer.observe(el);
    }

    return () => observer.disconnect();
  }, [sectionIds, handleIntersect, rootMargin]);

  return activeId;
}
