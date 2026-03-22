"use client";

import { useId, useState } from "react";

import { PoliticalRelationshipInteractive } from "@/components/intel/PoliticalRelationshipInteractive";
import { RightsPowerCircleInteractive } from "@/components/intel/RightsPowerCircleInteractive";

type TabId = "political" | "rights";

const TABS: { id: TabId; label: string }[] = [
  { id: "political", label: "政治关系" },
  { id: "rights", label: "权利圈层" },
];

export function NetworkRelationshipTabs() {
  const baseId = useId();
  const [active, setActive] = useState<TabId>("political");

  const btnBase =
    "flex-1 rounded-xl border-2 px-4 py-3 text-center text-sm font-semibold transition-all duration-200 md:py-3.5 md:text-base";
  const btnIdle =
    "border-[var(--ui-border)] bg-[var(--ui-surface)] hover:bg-slate-50/90 hover:shadow-sm";
  const btnActive =
    "border-[var(--ui-coral)] bg-[var(--ui-coral-soft)] shadow-md ring-2 ring-[var(--ui-coral)] ring-offset-2";

  return (
    <div className="network-relationship-tabs space-y-5">
      <div
        className="rounded-2xl border border-[var(--ui-border)] bg-gradient-to-b from-slate-50/90 to-white p-1.5 shadow-inner md:p-2"
        role="tablist"
        aria-label="关系网络分类"
      >
        <div className="flex gap-1.5 md:gap-2">
          {TABS.map((t) => {
            const isOn = active === t.id;
            return (
              <button
                key={t.id}
                type="button"
                role="tab"
                aria-selected={isOn}
                id={`${baseId}-tab-${t.id}`}
                aria-controls={`${baseId}-panel-${t.id}`}
                className={`${btnBase} ${isOn ? btnActive : btnIdle}`}
                onClick={() => setActive(t.id)}
              >
                {t.label}
              </button>
            );
          })}
        </div>
      </div>

      {TABS.map((t) => (
        <div
          key={t.id}
          id={`${baseId}-panel-${t.id}`}
          role="tabpanel"
          hidden={active !== t.id}
          aria-labelledby={`${baseId}-tab-${t.id}`}
          className="rounded-2xl border border-[var(--ui-border)] bg-gradient-to-b from-white to-slate-50/40 p-5 shadow-sm ring-1 ring-black/[0.02] md:p-6"
        >
          {t.id === "political" ? (
            <PoliticalRelationshipInteractive />
          ) : (
            <RightsPowerCircleInteractive />
          )}
        </div>
      ))}
    </div>
  );
}
