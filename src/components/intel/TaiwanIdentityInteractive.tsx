"use client";

import Image from "next/image";
import { useId, useState } from "react";

import zhengzhi1 from "@root-image/zhengzhi1.png";

type Topic = "taidu" | "crossstrait";

type TaiduStage = "early" | "admin" | "y2024" | "trend";

type StraitLayer = "discourse" | "institution";

const TAIDU: Record<
  TaiduStage,
  { label: string; lines: string[] }
> = {
  early: {
    label: "早期：直接意识形态表述期",
    lines: [
      "明确支持「台独」相关主张，自定位为务实的「台独」工作者。",
      "强调台湾应朝向独立方向移动。",
    ],
  },
  admin: {
    label: "进入行政体系后：替代性表述期",
    lines: [
      "减少直接使用「独立」字样的公开表述。",
      "转而使用「台湾主体性」「民主自由」「由人民决定未来」等替代概念。",
    ],
  },
  y2024: {
    label: "2024 年上任后：制度化与事实独立推进期",
    lines: [
      "强调「中华人民共和国不能是台湾人民的祖国」等论述，以及「团结国家」十点等议程。",
      "在法律意义独立之外，通过教育与国际定位等强化「事实独立」面向。",
    ],
  },
  trend: {
    label: "概括趋势",
    lines: [
      "由口号式独立 → 叙事体系化独立 → 去标签化表述与结构并进。",
      "整体特征常概括为：表达收敛、内核延续。",
    ],
  },
};

const STRAIT: Record<StraitLayer, { label: string; lines: string[] }> = {
  discourse: {
    label: "话语层面：维持和平姿态",
    lines: [
      "以和平、对话、握手等符号呈现愿意在「对等、尊严」基础上恢复交流。",
      "主张对话胜于对抗，强调台海和平稳定。",
    ],
  },
  institution: {
    label: "制度层面：持续对峙与脱钩",
    lines: [
      "强化安全定位；在安全论述中将大陆界定为「境外敌对势力」等。",
      "提出跨政经领域的多项应对策略；收紧两岸交流管制，提高制度性隔离。",
    ],
  },
};

export function TaiwanIdentityInteractive() {
  const baseId = useId();
  const [topic, setTopic] = useState<Topic>("taidu");
  const [taiduKey, setTaiduKey] = useState<TaiduStage>("early");
  const [straitKey, setStraitKey] = useState<StraitLayer>("discourse");

  const btnBase =
    "rounded-xl border-2 px-3 py-2.5 text-center text-xs font-semibold transition-all md:text-sm";
  const btnIdle =
    "border-[var(--ui-border)] bg-[var(--ui-surface)] hover:bg-slate-50/90";
  const btnActive =
    "border-[var(--ui-coral)] bg-[var(--ui-coral-soft)] ring-2 ring-[var(--ui-coral)] ring-offset-2";

  return (
    <div className="mt-4 space-y-6">
      <div className="overflow-hidden rounded-xl border border-[var(--ui-border)] bg-white shadow-sm">
        <Image
          src={zhengzhi1}
          alt="赖清德政治立场与政策分析：台独问题与两岸关系"
          width={zhengzhi1.width}
          height={zhengzhi1.height}
          className="h-auto w-full object-contain"
          sizes="(max-width: 1024px) 100vw, 896px"
          priority={false}
        />
      </div>

      <div
        className="flex flex-wrap gap-2"
        role="tablist"
        aria-label="台湾身份：议题切换"
      >
        <button
          type="button"
          role="tab"
          aria-selected={topic === "taidu"}
          id={`${baseId}-topic-taidu`}
          className={`${btnBase} min-w-[8rem] flex-1 ${topic === "taidu" ? btnActive : btnIdle}`}
          onClick={() => setTopic("taidu")}
        >
          「台独」问题
        </button>
        <button
          type="button"
          role="tab"
          aria-selected={topic === "crossstrait"}
          id={`${baseId}-topic-cross`}
          className={`${btnBase} min-w-[8rem] flex-1 ${topic === "crossstrait" ? btnActive : btnIdle}`}
          onClick={() => setTopic("crossstrait")}
        >
          两岸关系
        </button>
      </div>

      {topic === "taidu" ? (
        <div
          className="grid grid-cols-2 gap-2 sm:grid-cols-4"
          role="tablist"
          aria-label="台独论述阶段"
        >
          {(Object.keys(TAIDU) as TaiduStage[]).map((k) => (
            <button
              key={k}
              type="button"
              role="tab"
              aria-selected={taiduKey === k}
              className={`${btnBase} ${taiduKey === k ? btnActive : btnIdle}`}
              onClick={() => setTaiduKey(k)}
            >
              {TAIDU[k].label.split("：")[0]}
            </button>
          ))}
        </div>
      ) : (
        <div
          className="grid grid-cols-2 gap-2"
          role="tablist"
          aria-label="两岸双层结构"
        >
          {(Object.keys(STRAIT) as StraitLayer[]).map((k) => (
            <button
              key={k}
              type="button"
              role="tab"
              aria-selected={straitKey === k}
              className={`${btnBase} ${straitKey === k ? btnActive : btnIdle}`}
              onClick={() => setStraitKey(k)}
            >
              {STRAIT[k].label.split("：")[0]}
            </button>
          ))}
        </div>
      )}

      <div
        role="tabpanel"
        className="rounded-xl border-2 border-[var(--ui-border)] bg-[var(--ui-surface)] p-4 md:p-6"
        aria-labelledby={
          topic === "taidu"
            ? `${baseId}-topic-taidu`
            : `${baseId}-topic-cross`
        }
      >
        <h4 className="mb-3 text-sm font-bold text-[var(--ui-navy)] md:text-base">
          {topic === "taidu" ? TAIDU[taiduKey].label : STRAIT[straitKey].label}
        </h4>
        <ul className="space-y-2.5 text-sm leading-relaxed text-[var(--report-text)]">
          {(topic === "taidu" ? TAIDU[taiduKey].lines : STRAIT[straitKey].lines).map(
            (line, i) => (
              <li key={i} className="flex gap-2">
                <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-[var(--ui-muted)]/50" />
                <span>{line}</span>
              </li>
            ),
          )}
        </ul>
        {topic === "crossstrait" ? (
          <p className="mt-4 border-t border-[var(--ui-border)] pt-4 text-sm text-[var(--ui-muted)]">
            结构概括：战略对抗与战术缓和并存——话语层呈现和平与对话，制度层推进安全化与管制。
          </p>
        ) : null}
      </div>
    </div>
  );
}
