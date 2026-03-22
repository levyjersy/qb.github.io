"use client";

import Image from "next/image";
import { useId, useState } from "react";

import zhengzhi2 from "@root-image/zhengzhi2.png";

type ModuleId = "frame" | "us" | "jp" | "defense";

const MODULES: Record<
  ModuleId,
  { title: string; subtitle?: string; lines: string[]; essence?: string }
> = {
  frame: {
    title: "核心逻辑与切入点",
    subtitle: "价值观／阵营化外交的上层框架",
    lines: [
      "外交工具化，服务于安全与认同战略。",
      "切入点常包括民主与人权、全球供应链、公共卫生、科技合作等，以扩大国际空间、参与国际话语。",
      "外交与安全政策高度耦合：外部支撑内部安全定位。",
    ],
  },
  us: {
    title: "对美关系",
    lines: [
      "核心立场强调民主阵营与深化合作的一贯性。",
      "军购与安全协同：涉台安全立法、资金与协防论述等。",
      "经贸与产业对接：扩大投资、降低摩擦。",
      "军事与安全绑定加深：呼应集体防御论述、提高防务预算等。",
    ],
    essence: "本质：由伙伴关系向安全依赖结构倾斜的趋势讨论。",
  },
  jp: {
    title: "对日关系",
    lines: [
      "常被视为对美路线的延伸与区域支点。",
      "强调历史、经济、安全等紧密联系。",
      "延续民进党传统路径：亲美日、与大陆保持距离。",
      "政策体现包括区域安全联动、供应链合作等。",
    ],
    essence: "本质：区域联盟结构中的一环。",
  },
  defense: {
    title: "国防与安全",
    lines: [
      "防务预算持续上调，朝向占 GDP 更高比例目标。",
      "体系强化：不对称作战、防卫韧性、全民防卫等。",
      "战略论述调整：由「滨海决胜」转向「本岛决战」与多层防御等讨论。",
      "军工与科技产业绑定；安全叙事从传统军事扩展到认知、网络、经济等全域。",
    ],
    essence:
      "整体呈现：话语上的防御／和平与实务上的体系化备战、长期对抗能力建构并存。",
  },
};

export function DiplomacyInteractive() {
  const baseId = useId();
  const [active, setActive] = useState<ModuleId>("frame");

  const m = MODULES[active];
  const btnBase =
    "rounded-xl border-2 px-2 py-3 text-center text-[11px] font-semibold leading-tight transition-all sm:text-xs md:text-sm";
  const btnIdle =
    "border-[var(--ui-border)] bg-[var(--ui-surface)] hover:bg-slate-50/90";
  const btnActive =
    "border-[var(--ui-coral)] bg-[var(--ui-coral-soft)] ring-2 ring-[var(--ui-coral)] ring-offset-2";

  return (
    <div className="mt-4 space-y-6">
      <div className="overflow-hidden rounded-xl border border-[var(--ui-border)] bg-white shadow-sm">
        <Image
          src={zhengzhi2}
          alt="赖清德「价值观外交」与「阵营化外交」分析图解"
          width={zhengzhi2.width}
          height={zhengzhi2.height}
          className="h-auto w-full object-contain"
          sizes="(max-width: 1024px) 100vw, 896px"
          priority={false}
        />
      </div>

      <div
        className="grid grid-cols-2 gap-2 lg:grid-cols-4"
        role="tablist"
        aria-label="外交与国际参与：模块"
      >
        {(Object.keys(MODULES) as ModuleId[]).map((id) => (
          <button
            key={id}
            type="button"
            role="tab"
            aria-selected={active === id}
            id={`${baseId}-tab-${id}`}
            aria-controls={`${baseId}-panel`}
            className={`${btnBase} ${active === id ? btnActive : btnIdle}`}
            onClick={() => setActive(id)}
          >
            {MODULES[id].title}
          </button>
        ))}
      </div>

      <div
        id={`${baseId}-panel`}
        role="tabpanel"
        aria-labelledby={`${baseId}-tab-${active}`}
        className="rounded-xl border-2 border-[var(--ui-border)] bg-[var(--ui-surface)] p-4 md:p-6"
      >
        {m.subtitle ? (
          <p className="mb-2 text-xs text-[var(--ui-muted)]">{m.subtitle}</p>
        ) : null}
        <h4 className="mb-3 text-base font-bold text-[var(--ui-navy)]">
          {m.title}
        </h4>
        <ul className="space-y-2.5 text-sm leading-relaxed text-[var(--report-text)]">
          {m.lines.map((line, i) => (
            <li key={i} className="flex gap-2">
              <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-[var(--ui-muted)]/50" />
              <span>{line}</span>
            </li>
          ))}
        </ul>
        {m.essence ? (
          <p className="mt-4 border-t border-[var(--ui-border)] pt-4 text-sm font-medium text-[var(--ui-navy)]">
            {m.essence}
          </p>
        ) : null}
      </div>
    </div>
  );
}
