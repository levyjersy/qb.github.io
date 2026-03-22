"use client";

import Image from "next/image";
import { useId, useMemo, useState } from "react";

import {
  PortraitAvatar,
  type PortraitKind,
} from "@/components/intel/PortraitAvatar";
import relationshipMap from "@root-image/relationship.png";

type QuadrantId = "core" | "exec" | "dpp" | "opp";

type LineKind = "ally" | "opp" | "faction";

type RelationEntry = {
  name: string;
  desc: string;
  kind?: PortraitKind;
};

const LEGEND: {
  id: LineKind;
  label: string;
  short: string;
  lineClass: string;
}[] = [
  {
    id: "ally",
    label: "盟友 / 支持",
    short: "绿色实线表示盟友与支持关系。",
    lineClass: "bg-emerald-500",
  },
  {
    id: "opp",
    label: "反对 / 平衡",
    short: "红色虚线表示在野、制衡或竞争关系。",
    lineClass: "border-2 border-dashed border-red-500 bg-transparent",
  },
  {
    id: "faction",
    label: "派系 / 战略联盟",
    short: "黄色实线表示派系连结或战略联盟。",
    lineClass: "bg-amber-400",
  },
];

const QUADRANTS: {
  id: QuadrantId;
  title: string;
  subtitle: string;
  lines: LineKind[];
  entries: RelationEntry[];
}[] = [
  {
    id: "core",
    title: "核心团队",
    subtitle: "总统办公室与国家安全系统",
    lines: ["ally"],
    entries: [
      { name: "潘孟安", desc: "总统府秘书长，与核心顾问连结。" },
      { name: "蔡明彦", desc: "国安相关单位。" },
      { name: "吴钊燮", desc: "国安会秘书长，涉外政策顾问角色。" },
      { name: "张敦涵", desc: "总统府副秘书长，行政联络与情报协调等分工。" },
    ],
  },
  {
    id: "exec",
    title: "行政院",
    subtitle: "「行动创新内阁」",
    lines: ["ally"],
    entries: [
      { name: "卓荣泰", desc: "院长，政策架构与内阁领导。" },
      { name: "郑丽君", desc: "副院长，重要盟友与信任副手。" },
      { name: "林佳龙", desc: "外交。" },
      { name: "顾立雄", desc: "防务。" },
      {
        name: "部会首长",
        desc: "经济产业等部会首长布局。",
        kind: "group",
      },
    ],
  },
  {
    id: "dpp",
    title: "民进党派系与盟友",
    subtitle: "派系与地方执政连结",
    lines: ["ally", "faction"],
    entries: [
      {
        name: "新潮流",
        desc: "等派系与长期政治基础。",
        kind: "group",
      },
      { name: "正国会", desc: "等派系网络。", kind: "group" },
      {
        name: "陈其迈（高雄市长）",
        desc: "战略联盟与地方桩脚。",
      },
    ],
  },
  {
    id: "opp",
    title: "政治环境与对手",
    subtitle: "制衡与在野互动（示意图为 2026+ 语境）",
    lines: ["opp"],
    entries: [
      { name: "卢秀燕", desc: "地方首长与在野制衡。" },
      { name: "柯文哲", desc: "第三势力与媒体战场。" },
      { name: "韩国瑜", desc: "立法院与议事对抗面向。" },
    ],
  },
];

export function PoliticalRelationshipInteractive() {
  const baseId = useId();
  const [quadrant, setQuadrant] = useState<QuadrantId>("core");
  const [legendFocus, setLegendFocus] = useState<LineKind | null>(null);

  const q = useMemo(
    () => QUADRANTS.find((x) => x.id === quadrant)!,
    [quadrant],
  );
  const legendActive = legendFocus
    ? LEGEND.find((l) => l.id === legendFocus)
    : null;

  const tabBtn =
    "rounded-lg border-2 px-2 py-2 text-center text-[11px] font-semibold leading-tight transition-all sm:text-xs md:px-3 md:py-2.5 md:text-sm";
  const tabIdle =
    "border-[var(--ui-border)] bg-white hover:bg-slate-50/90";
  const tabOn =
    "border-[var(--ui-coral)] bg-[var(--ui-coral-soft)] ring-2 ring-[var(--ui-coral)]/40";

  return (
    <div className="space-y-5">
      <div className="overflow-hidden rounded-xl border border-[var(--ui-border)] bg-white shadow-sm">
        <Image
          src={relationshipMap}
          alt="赖清德政治关系示意图（2026+）：核心团队、行政院、民进党派系与政治环境四象限"
          width={relationshipMap.width}
          height={relationshipMap.height}
          className="h-auto w-full object-contain"
          sizes="(max-width: 1024px) 100vw, 896px"
          priority={false}
        />
      </div>

      <div>
        <p className="mb-2 text-[11px] font-semibold uppercase tracking-wider text-[var(--ui-muted)]">
          图例（点击展开说明）
        </p>
        <div
          className="flex flex-wrap gap-2"
          role="group"
          aria-label="关系线图例"
        >
          {LEGEND.map((leg) => {
            const on = legendFocus === leg.id;
            return (
              <button
                key={leg.id}
                type="button"
                className={`inline-flex items-center gap-2 rounded-full border px-3 py-1.5 text-xs font-medium transition-colors ${
                  on
                    ? "border-[var(--ui-coral)] bg-[var(--ui-coral-soft)] text-[var(--ui-navy)]"
                    : "border-[var(--ui-border)] bg-white hover:bg-slate-50"
                }`}
                aria-pressed={on}
                onClick={() =>
                  setLegendFocus((prev) => (prev === leg.id ? null : leg.id))
                }
              >
                <span
                  className={`h-0.5 w-8 rounded-full ${leg.lineClass}`}
                  aria-hidden
                />
                {leg.label}
              </button>
            );
          })}
        </div>
        {legendActive ? (
          <p
            className="mt-2 rounded-lg border border-[var(--ui-border)] bg-slate-50/90 px-3 py-2 text-sm text-[var(--report-text)]"
            role="status"
          >
            {legendActive.short}
          </p>
        ) : null}
      </div>

      <div>
        <p className="mb-2 text-[11px] font-semibold uppercase tracking-wider text-[var(--ui-muted)]">
          象限说明（点击切换）
        </p>
        <div
          className="grid grid-cols-2 gap-1.5 lg:grid-cols-4"
          role="tablist"
          aria-label="政治关系象限"
        >
          {QUADRANTS.map((item) => {
            const isOn = quadrant === item.id;
            return (
              <button
                key={item.id}
                type="button"
                role="tab"
                aria-selected={isOn}
                id={`${baseId}-q-${item.id}`}
                aria-controls={`${baseId}-q-panel`}
                className={`${tabBtn} ${isOn ? tabOn : tabIdle}`}
                onClick={() => setQuadrant(item.id)}
              >
                {item.title}
              </button>
            );
          })}
        </div>
      </div>

      <div
        id={`${baseId}-q-panel`}
        role="tabpanel"
        aria-labelledby={`${baseId}-q-${quadrant}`}
        className="rounded-xl border-2 border-[var(--ui-border)] bg-[var(--ui-surface)] p-4 md:p-5"
      >
        <h4 className="text-base font-bold text-[var(--ui-navy)]">
          {q.title}
        </h4>
        <p className="mt-1 text-xs text-[var(--ui-muted)]">{q.subtitle}</p>
        <div className="mt-2 flex flex-wrap gap-1.5">
          {q.lines.map((lk) => {
            const L = LEGEND.find((x) => x.id === lk)!;
            return (
              <span
                key={lk}
                className="inline-flex items-center gap-1 rounded-md border border-[var(--ui-border)] bg-white px-2 py-0.5 text-[10px] text-[var(--ui-muted)]"
              >
                <span className={`h-0.5 w-4 rounded-full ${L.lineClass}`} />
                {L.label}
              </span>
            );
          })}
        </div>
        <ul className="mt-4 space-y-4">
          {q.entries.map((entry, i) => (
            <li
              key={`${entry.name}-${i}`}
              className="flex gap-3 rounded-lg border border-transparent bg-white/60 p-2 transition-colors hover:border-[var(--ui-border)] hover:bg-white"
            >
              <PortraitAvatar
                name={entry.name}
                kind={entry.kind ?? "person"}
              />
              <div className="min-w-0 flex-1 pt-0.5">
                <p className="text-sm font-semibold text-[var(--ui-navy)]">
                  {entry.name}
                </p>
                <p className="mt-0.5 text-sm leading-relaxed text-[var(--report-text)]">
                  {entry.desc}
                </p>
              </div>
            </li>
          ))}
        </ul>
      </div>

      <p className="text-center text-[11px] text-[var(--ui-muted)]">
        圆形头像为姓名首字与示意剪影；非真实照片。上图与要点为脉络整理示意，可随资料更新替换。
      </p>
    </div>
  );
}
