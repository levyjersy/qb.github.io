"use client";

import Image from "next/image";
import { useId, useState } from "react";

import mailuo3 from "@root-image/mailuo3.png";

type ModuleId = "m1" | "m2" | "m3" | "m4" | "m5" | "m6";

type Module = {
  id: ModuleId;
  num: string;
  period: string;
  title: string;
  lines: string[];
};

/** 与脉络图顶部六阶段对应 */
const MODULES: Module[] = [
  {
    id: "m1",
    num: "①",
    period: "约 1990 年代初—1996",
    title: "入门期：从医界进入政治外围",
    lines: [
      "台南医师身份；1994 年参与陈定南选战团队，由专业领域接触选举与政治动员。",
      "1996 年当选国大代表，取得体制内政治参与身份。",
      "要义：由「专业者」转为「体制内政治参与者」的过渡。",
    ],
  },
  {
    id: "m2",
    num: "②",
    period: "约 1998—2008",
    title: "能力累积期：长期民意代表",
    lines: [
      "台南选区立法委员，多届连任，近十年国会经验。",
      "累积面向：政策能力、党内地位、地方基层支持。",
      "要义：由国会新面孔成长为可倚重的核心成员。",
    ],
  },
  {
    id: "m3",
    num: "③",
    period: "2010—2017",
    title: "从立法到行政：直辖市长",
    lines: [
      "台南市升格后首任市长，从参与立法与监督转向直接承担施政。",
      "面对财政、规划、公共服务、防灾等一线治理考验；施政评价稳健、支持度较高。",
      "要义：由政策参与者转为治理执行者。",
    ],
  },
  {
    id: "m4",
    num: "④",
    period: "约 2017—2019",
    title: "区域层级跃升：行政院院长",
    lines: [
      "统筹经济、社会、产业与政治等跨域协调，承受国会、在野党与舆论压力。",
      "要义：在区域（全台）层级验证综合领导与协调能力。",
    ],
  },
  {
    id: "m5",
    num: "⑤",
    period: "副手与党务",
    title: "副领导人到接班布局",
    lines: [
      "副领导人任内协助政务并提高能见度；2023 年兼任民进党主席。",
      "制度与组织基础：党内资源与动员体系的衔接。",
    ],
  },
  {
    id: "m6",
    num: "⑥",
    period: "2024",
    title: "领导人阶段：权力结构顶端",
    lines: [
      "地区领导人；多阶段晋升路径的范例性呈现。",
      "掌握行政权、党务与议程设定能力；立法机关非绝对多数的政治环境。",
    ],
  },
];

const moduleBtnClass =
  "border-[var(--ui-border)] bg-[var(--ui-surface)] hover:bg-slate-50/90";

/** 图中「整体结构模型」七步抽象流程 */
const STRUCTURAL_FLOW = [
  "以专业身份（医师）入场",
  "基层选举进入体制",
  "长期国会历练",
  "地方治理验证",
  "中央行政核心",
  "副手过渡",
  "最高权力",
] as const;

export function PoliticalExperienceMap() {
  const baseId = useId();
  const [active, setActive] = useState<ModuleId>("m1");

  const current = MODULES.find((m) => m.id === active)!;

  return (
    <div className="political-experience-map mt-4 space-y-6">
      <div className="overflow-hidden rounded-xl border border-[var(--ui-border)] bg-white shadow-sm">
        <Image
          src={mailuo3}
          alt="赖清德政治晋升路径脉络图：分阶段、逐层验证能力的完整成长链条"
          width={mailuo3.width}
          height={mailuo3.height}
          className="h-auto w-full object-contain"
          sizes="(max-width: 1024px) 100vw, 896px"
          priority={false}
        />
      </div>

      <div
        className="grid grid-cols-2 gap-2 sm:grid-cols-3 md:gap-3"
        role="tablist"
        aria-label="政治晋升阶段"
      >
        {MODULES.map((m) => {
          const isActive = active === m.id;
          return (
            <button
              key={m.id}
              type="button"
              role="tab"
              aria-selected={isActive}
              aria-controls={`${baseId}-panel`}
              id={`${baseId}-tab-${m.id}`}
              onClick={() => setActive(m.id)}
              className={`flex min-h-[4.5rem] flex-col items-center justify-center rounded-xl border-2 px-2 py-3 text-center text-xs font-bold leading-tight transition-all duration-200 md:min-h-[5.25rem] md:text-sm ${moduleBtnClass} ${
                isActive
                  ? "scale-[1.02] border-[var(--ui-coral)] bg-[var(--ui-coral-soft)] ring-2 ring-[var(--ui-coral)] ring-offset-2"
                  : "opacity-95"
              }`}
            >
              <span className="mb-0.5 text-[10px] text-[var(--ui-muted)] md:text-xs">
                {m.num} {m.period}
              </span>
              <span className="text-[var(--ui-navy)]">{m.title}</span>
            </button>
          );
        })}
      </div>

      <div
        id={`${baseId}-panel`}
        role="tabpanel"
        aria-labelledby={`${baseId}-tab-${active}`}
        className="rounded-xl border-2 border-[var(--ui-border)] bg-[var(--ui-surface)] p-4 shadow-sm md:p-6"
      >
        <h4 className="mb-1 flex flex-wrap items-baseline gap-2 text-base font-bold text-[var(--ui-navy)]">
          <span className="text-[var(--ui-muted)]">{current.num}</span>
          {current.title}
        </h4>
        <p className="mb-4 text-xs text-[var(--ui-muted)] md:text-sm">
          {current.period}
        </p>
        <ul className="space-y-3 text-sm leading-relaxed text-[var(--report-text)]">
          {current.lines.map((line, i) => (
            <li key={i} className="flex gap-2">
              <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-[var(--ui-muted)]/50" />
              <span>{line}</span>
            </li>
          ))}
        </ul>
      </div>

      <div className="space-y-3 rounded-xl border border-[var(--ui-border)] bg-white/80 p-4 md:p-5">
        <h5 className="text-sm font-bold text-[var(--ui-navy)]">
          整体结构模型（标准政治晋升抽象流程）
        </h5>
        <div className="flex flex-wrap items-center gap-x-1 gap-y-2 text-xs text-[var(--report-text)] md:text-sm">
          {STRUCTURAL_FLOW.map((label, i) => (
            <span key={label} className="flex flex-wrap items-center gap-1">
              <span className="rounded-md border border-[var(--ui-border)] bg-[var(--ui-surface)] px-2 py-1">
                {label}
              </span>
              {i < STRUCTURAL_FLOW.length - 1 && (
                <span className="text-[var(--ui-muted)]" aria-hidden>
                  →
                </span>
              )}
            </span>
          ))}
        </div>
      </div>

      <div className="grid gap-4 rounded-xl border border-[var(--ui-border)] bg-white/80 p-4 md:grid-cols-2 md:p-5">
        <div>
          <p className="mb-2 text-xs font-semibold text-[var(--ui-navy)]">体制内路径（正当性）</p>
          <p className="text-sm leading-relaxed text-[var(--report-text)]">
            选举、任命与党务职务层层衔接，形成可对外说明的晋升链条。
          </p>
        </div>
        <div>
          <p className="mb-2 text-xs font-semibold text-[var(--ui-navy)]">能力路径（站得住）</p>
          <p className="text-sm leading-relaxed text-[var(--report-text)]">
            医疗专业 → 政策能力 → 治理能力 → 跨域协调与领导能力，与体制路径并行累积。
          </p>
        </div>
        <p className="md:col-span-2 rounded-lg border border-dashed border-[var(--ui-border)] bg-[var(--ui-surface)] px-3 py-2 text-center text-sm font-medium text-[var(--ui-navy)]">
          双轨合流：政治晋升的最终稳定度来自两条线索的叠加验证。
        </p>
      </div>
    </div>
  );
}
