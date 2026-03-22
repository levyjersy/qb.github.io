"use client";

import Image from "next/image";
import { useId, useState } from "react";

import zhengzhi3 from "@root-image/zhengzhi3.png";

type BranchId = "identity" | "values" | "governance";

const BRANCHES: Record<
  BranchId,
  { title: string; lines: string[]; summary: string }
> = {
  identity: {
    title: "国家认同与社会整合",
    lines: [
      "双轨策略：整合与区隔并存。",
      "新论述框架：在「台湾人认同」与「中华民国」认同之间寻求叙事整合。",
      "引用「团结国家」等论述，主张两种认同可在「台湾人民主体性」下统一理解。",
      "目标包括缓解认同撕裂、扩大政治支持基础（超越传统深绿结构）。",
      "同步强化「两岸互不隶属」等表述，使认同整合发生在「拒统」框架内。",
    ],
    summary: "对内整合认同，对外强化区隔。",
  },
  values: {
    title: "民主与价值观叙事",
    lines: [
      "长期自我定位为「民主阵营一员」。",
      "将民主、自由等价值视为正当性基石。",
      "对外与安全：强化与美、日等民主国家的协作。",
      "对内政治：「民主防卫」——警惕渗透与认知战等。",
    ],
    summary:
      "价值不仅是理念工具，也是外交与安全政策正当性的基础。",
  },
  governance: {
    title: "治理风格与政治方法论",
    lines: [
      "形象：体制内、技术官僚型政治人物。",
      "基调：以民主、自由、人权等普世价值为轴，置于「民主对专制」前线叙事。",
      "操作：制度理性与政治博弈并存——依托体制与政策、渐进改革多于激进动员。",
      "强调程序、协商与利益平衡，维持主导权；在制衡环境下需在冲突与谈判间取舍。",
    ],
    summary: "技术理性 + 政治博弈的混合治理。",
  },
};

export function DomesticPoliticsInteractive() {
  const baseId = useId();
  const [active, setActive] = useState<BranchId>("identity");
  const b = BRANCHES[active];

  const btnBase =
    "rounded-xl border-2 px-2 py-3 text-center text-[11px] font-semibold leading-snug transition-all sm:text-xs md:text-sm";
  const btnIdle =
    "border-[var(--ui-border)] bg-[var(--ui-surface)] hover:bg-slate-50/90";
  const btnActive =
    "border-[var(--ui-coral)] bg-[var(--ui-coral-soft)] ring-2 ring-[var(--ui-coral)] ring-offset-2";

  return (
    <div className="mt-4 space-y-6">
      <div className="overflow-hidden rounded-xl border border-[var(--ui-border)] bg-white shadow-sm">
        <Image
          src={zhengzhi3}
          alt="赖清德政治特征与策略脉络图"
          width={zhengzhi3.width}
          height={zhengzhi3.height}
          className="h-auto w-full object-contain"
          sizes="(max-width: 1024px) 100vw, 896px"
          priority={false}
        />
      </div>

      <div
        className="grid grid-cols-1 gap-2 sm:grid-cols-3"
        role="tablist"
        aria-label="岛内政治：策略分支"
      >
        {(Object.keys(BRANCHES) as BranchId[]).map((id) => (
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
            {BRANCHES[id].title}
          </button>
        ))}
      </div>

      <div
        id={`${baseId}-panel`}
        role="tabpanel"
        aria-labelledby={`${baseId}-tab-${active}`}
        className="rounded-xl border-2 border-[var(--ui-border)] bg-[var(--ui-surface)] p-4 md:p-6"
      >
        <h4 className="mb-3 text-base font-bold text-[var(--ui-navy)]">
          {b.title}
        </h4>
        <ul className="space-y-2.5 text-sm leading-relaxed text-[var(--report-text)]">
          {b.lines.map((line, i) => (
            <li key={i} className="flex gap-2">
              <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-[var(--ui-muted)]/50" />
              <span>{line}</span>
            </li>
          ))}
        </ul>
        <p className="mt-4 border-t border-[var(--ui-border)] pt-4 text-sm font-medium text-[var(--ui-navy)]">
          小结：{b.summary}
        </p>
      </div>
    </div>
  );
}
