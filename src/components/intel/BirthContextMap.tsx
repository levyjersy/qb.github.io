"use client";

import { useCallback, useId, useState } from "react";

type QuadrantId = "basic" | "family" | "growth" | "roots";

type Item = { icon: string; text: string };

type Quadrant = {
  id: QuadrantId;
  title: string;
  items: Item[];
};

const QUADRANTS: Quadrant[] = [
  {
    id: "basic",
    title: "基本信息",
    items: [
      { icon: "📅", text: "出生日期：1959年10月6日" },
      { icon: "🗺️", text: "出生地：台湾台北县万里乡（今新北市万里区）" },
      { icon: "🏘️", text: "环境：北台湾矿区社区，底层劳动者聚居" },
    ],
  },
  {
    id: "family",
    title: "家庭结构与核心事实",
    items: [
      { icon: "⛏️", text: "核心结构：「矿工家庭、幼年丧父、单亲抚养」" },
      { icon: "👷", text: "父亲：煤矿工人" },
      { icon: "⚠️", text: "悲剧：父亲因矿难（一氧化碳中毒）去世，当时尚不足百日" },
      { icon: "📉", text: "影响：家庭失去主要经济来源" },
      { icon: "👩‍👧‍👦", text: "母亲：独自抚养六名子女" },
    ],
  },
  {
    id: "growth",
    title: "成长环境与生活特征",
    items: [
      { icon: "🔧", text: "矿区特征：劳动强度高、收入低、家庭抗风险能力弱" },
      { icon: "💪", text: "母亲劳动：长期从事多种体力劳动与零工" },
      { icon: "🏭", text: "经济压力：一人承担全家经济负担" },
      { icon: "📍", text: "早年：贫困、基层色彩明显" },
      { icon: "🎭", text: "公开形象：「矿工之子」「寒门出身」的重要来源" },
    ],
  },
  {
    id: "roots",
    title: "家族渊源",
    items: [
      { icon: "⛵", text: "祖先：清代自福建漳州一带迁往台湾" },
      { icon: "↔️", text: "在台湾境内逐步迁移" },
      { icon: "⛰️", text: "最终进入北部矿区从事采矿工作" },
      { icon: "🔗", text: "历史模式：「闽南移民—资源产业—劳工阶层」" },
    ],
  },
];

const SUMMARY =
  "整体概括：出身北台湾矿区的矿工家庭，幼年丧父，由母亲独自抚养长大，家庭经济条件较为困难。";

const cardClass =
  "border-[var(--ui-border)] bg-[var(--ui-surface)] hover:bg-slate-50/90";

export function BirthContextMap() {
  const baseId = useId();
  const [active, setActive] = useState<QuadrantId | null>("basic");
  const [mobileOpen, setMobileOpen] = useState<QuadrantId | null>(null);

  const select = useCallback((id: QuadrantId) => {
    setActive(id);
    setMobileOpen((prev) => (prev === id ? null : id));
  }, []);

  return (
    <div className="birth-context-map mt-4 space-y-6">
      {/* 桌面：四宫格 + 选中态 */}
      <div className="hidden gap-4 md:grid md:grid-cols-2">
        {QUADRANTS.map((q) => (
          <article
            key={q.id}
            className={`group cursor-pointer rounded-2xl border-2 p-4 shadow-sm transition-all duration-200 ${cardClass} ${
              active === q.id
                ? "scale-[1.02] ring-2 ring-[var(--ui-coral)] ring-offset-2"
                : "opacity-90 hover:scale-[1.01] hover:shadow-md"
            }`}
            onClick={() => {
              setActive(q.id);
            }}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") {
                e.preventDefault();
                setActive(q.id);
              }
            }}
            role="button"
            tabIndex={0}
            aria-pressed={active === q.id}
            aria-labelledby={`${baseId}-${q.id}-title`}
          >
            <h4
              id={`${baseId}-${q.id}-title`}
              className="mb-3 flex items-center gap-2 border-b border-black/5 pb-2 text-sm font-bold text-[var(--ui-navy)]"
            >
              <span className="inline-block h-2.5 w-2.5 shrink-0 rounded-full bg-[var(--ui-muted)]/60" />
              {q.title}
            </h4>
            <ul className="space-y-2.5 text-left text-sm leading-relaxed text-[var(--report-text)]">
              {q.items.map((it, i) => (
                <li key={i} className="flex gap-2">
                  <span className="shrink-0 text-base" aria-hidden>
                    {it.icon}
                  </span>
                  <span>{it.text}</span>
                </li>
              ))}
            </ul>
          </article>
        ))}
      </div>

      {/* 小屏：手风琴 */}
      <div className="space-y-2 md:hidden">
        {QUADRANTS.map((q) => {
          const open = mobileOpen === q.id;
          return (
            <div
              key={q.id}
              className={`overflow-hidden rounded-xl border-2 transition-colors ${cardClass}`}
            >
              <button
                type="button"
                className="flex w-full items-center justify-between gap-2 px-4 py-3 text-left text-sm font-bold text-[var(--ui-navy)]"
                aria-expanded={open}
                aria-controls={`${baseId}-panel-${q.id}`}
                id={`${baseId}-tab-${q.id}`}
                onClick={() => select(q.id)}
              >
                {q.title}
                <span
                  className={`text-[var(--ui-coral)] transition-transform ${open ? "rotate-180" : ""}`}
                  aria-hidden
                >
                  ▼
                </span>
              </button>
              {open ? (
                <div
                  id={`${baseId}-panel-${q.id}`}
                  role="region"
                  aria-labelledby={`${baseId}-tab-${q.id}`}
                >
                  <ul className="space-y-2.5 px-4 pb-4 text-sm leading-relaxed text-[var(--report-text)]">
                    {q.items.map((it, i) => (
                      <li key={i} className="flex gap-2">
                        <span className="shrink-0" aria-hidden>
                          {it.icon}
                        </span>
                        <span>{it.text}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ) : null}
            </div>
          );
        })}
      </div>

      {/* 整体概括 */}
      <div className="rounded-xl border border-slate-200 bg-slate-100/80 px-4 py-4 text-center text-sm leading-relaxed text-[var(--ui-navy)] shadow-inner md:px-6">
        {SUMMARY}
      </div>
    </div>
  );
}
