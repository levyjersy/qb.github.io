"use client";

import Image from "next/image";
import { useId, useState } from "react";

import behavior1 from "@root-image/behavior1.png";

type SpatialId = "core" | "mid" | "outer";
type BehaviorId = "ny" | "soft" | "abnormal";

const SPATIAL_LAYERS: {
  id: SpatialId;
  label: string;
  month: string;
  focus: string;
  bullets: string[];
  icons: string;
}[] = [
  {
    id: "core",
    label: "核心层",
    month: "1 月",
    focus: "台北 · 总统府周边议程",
    icons: "🏛️ 🎤",
    bullets: [
      "价值观外交：密集会见欧、美、加等代表团，强化民主供应链叙事。",
      "在立法预算受阻背景下，将外部压力转化为对内正当性论述。",
      "主轴：台北高密度外交与媒体曝光。",
    ],
  },
  {
    id: "mid",
    label: "中间层",
    month: "3 月",
    focus: "中南部 · 嘉义、高雄一带",
    icons: "🛰️ 💠",
    bullets: [
      "「南向」轨迹位移：灯会、产业与防务韧性场景并举。",
      "结合半导体先进封装、无人机基地等，锚定地方经济与防务意象。",
      "巩固印太盟友与供应链话语的实地展示。",
    ],
  },
  {
    id: "outer",
    label: "外延层",
    month: "4 月（预告）",
    focus: "全球外交 · 非洲与过境议程",
    icons: "🌍 ✈️",
    bullets: [
      "强化非洲邦交（如斯威士兰等）与全球南方连结。",
      "观察美、日过境或高层互动的窗口与时机。",
      "将台湾节点嵌入更广域的战略移动叙事。",
    ],
  },
];

const BEHAVIOR_NODES: {
  id: BehaviorId;
  kind: "fixed" | "abnormal";
  title: string;
  period: string;
  summary: string;
  bullets: string[];
}[] = [
  {
    id: "ny",
    kind: "fixed",
    title: "元旦讲话",
    period: "固定节点",
    summary: "应对脚本：以「军事威胁」「民主团结」等关键词突破预算攻防僵局。",
    bullets: [
      "话语上同步拉高防务与社会韧性预期。",
      "与国会审议、媒体周期形成固定开场节拍。",
    ],
  },
  {
    id: "soft",
    kind: "fixed",
    title: "非政治场合",
    period: "灯会、体育等",
    summary: "在高压军事与外交议程下释放「亲民」与柔性形象。",
    bullets: [
      "弱化对抗感、平衡舆论温度。",
      "与强硬安全话语形成「硬软并陈」的固定搭配。",
    ],
  },
  {
    id: "abnormal",
    kind: "abnormal",
    title: "历史论述激化",
    period: "约 3 月中旬",
    summary: "异常偏离：对日本殖民史与「东亚共荣」等议题的激进化表述，削弱「维持现状」一贯逻辑。",
    bullets: [
      "北京方面强烈反弹，易触发高强度回应与外交连锁。",
      "可解读为在任期后半段争夺意识形态「定标权」的试探。",
      "与既有「固定脚本」相比，舆情与对岸反应的不确定性显著上升。",
    ],
  },
];

export function BehaviorPatternRecognition() {
  const uid = useId();
  const [spatialId, setSpatialId] = useState<SpatialId>("core");
  const [behaviorId, setBehaviorId] = useState<BehaviorId>("ny");

  const spatial = SPATIAL_LAYERS.find((s) => s.id === spatialId)!;
  const behavior = BEHAVIOR_NODES.find((b) => b.id === behaviorId)!;

  const layerBtn =
    "w-full rounded-xl border-2 px-3 py-3 text-left transition-all duration-200 md:px-4";
  const layerIdle =
    "border-[var(--ui-border)] bg-white/90 hover:border-[var(--ui-navy)]/25 hover:bg-slate-50/90";
  const layerOn =
    "border-[var(--ui-coral)] bg-[var(--ui-coral-soft)]/50 shadow-md ring-2 ring-[var(--ui-coral)]/30";

  const behaviorBtn =
    "rounded-lg border-2 px-3 py-2 text-left text-xs font-medium transition-all md:text-sm";
  const fixedIdle =
    "border-emerald-200/80 bg-emerald-50/40 hover:bg-emerald-50/80";
  const fixedOn =
    "border-emerald-500 bg-emerald-50 shadow-sm ring-2 ring-emerald-400/30";
  const abnormalIdle =
    "border-rose-200/90 bg-rose-50/50 hover:bg-rose-50/90";
  const abnormalOn =
    "border-rose-500 bg-rose-50 shadow-sm ring-2 ring-rose-400/35";

  return (
    <div className="behavior-pattern-recognition space-y-5">
      <figure className="overflow-hidden rounded-xl border border-[var(--ui-border)] bg-slate-950 shadow-lg ring-1 ring-black/10">
        <Image
          src={behavior1}
          alt="2026 年战略行为模式与空间轨迹分析图：左侧为以台湾为中心的同心圆空间聚类，右侧为固定模式与异常行为的时间线对照。"
          width={behavior1.width}
          height={behavior1.height}
          className="h-auto w-full object-contain"
          sizes="(max-width: 1024px) 100vw, 896px"
          priority={false}
        />
        <figcaption className="border-t border-white/10 bg-slate-900/95 px-3 py-2.5 text-center text-[11px] leading-snug text-slate-200 md:px-4 md:text-xs">
          <span className="font-semibold text-white">
            2026 年战略行为模式与空间轨迹分析图
          </span>
          <span className="mt-1 block text-slate-400">
            下图可点击左侧「空间层级」与右侧「行为节点」展开文字说明（与上图对照阅读）。
          </span>
        </figcaption>
      </figure>

      <div className="grid gap-5 lg:grid-cols-2 lg:gap-6">
        {/* 左：空间轨迹聚类 */}
        <section
          className="rounded-2xl border border-[var(--ui-border)] bg-gradient-to-b from-slate-50/80 to-white p-4 shadow-sm md:p-5"
          aria-labelledby={`${uid}-spatial-h`}
        >
          <h3
            id={`${uid}-spatial-h`}
            className="text-sm font-bold text-[var(--ui-navy)] md:text-base"
          >
            空间轨迹聚类
          </h3>
          <p className="mt-1 text-xs text-[var(--ui-muted)]">
            同心圆式策略：由核心台北外交，到中南部产业防务，再到全球外延。
          </p>
          <div
            className="mt-4 flex flex-col gap-2"
            role="group"
            aria-label="选择空间层级"
          >
            {SPATIAL_LAYERS.map((L) => {
              const on = spatialId === L.id;
              return (
                <button
                  key={L.id}
                  type="button"
                  aria-pressed={on}
                  className={`${layerBtn} ${on ? layerOn : layerIdle}`}
                  onClick={() => setSpatialId(L.id)}
                >
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <span className="text-[10px] font-semibold uppercase tracking-wide text-[var(--ui-coral)] md:text-xs">
                        {L.month}
                      </span>
                      <span className="ml-2 font-semibold text-[var(--ui-navy)]">
                        {L.label}
                      </span>
                    </div>
                    <span className="text-lg opacity-90" aria-hidden>
                      {L.icons}
                    </span>
                  </div>
                  <p className="mt-1 text-xs text-[var(--ui-muted)]">{L.focus}</p>
                </button>
              );
            })}
          </div>
          <div
            className="mt-4 rounded-xl border border-[var(--ui-border)] bg-white/95 p-4 text-sm leading-relaxed text-[var(--report-text)] shadow-inner"
            role="region"
            aria-live="polite"
          >
            <p className="text-xs font-semibold text-[var(--ui-navy)]">
              {spatial.label} · {spatial.focus}
            </p>
            <ul className="mt-2 list-inside list-disc space-y-1.5 text-xs md:text-sm">
              {spatial.bullets.map((b) => (
                <li key={b}>{b}</li>
              ))}
            </ul>
          </div>
        </section>

        {/* 右：行为模式分析 */}
        <section
          className="rounded-2xl border border-[var(--ui-border)] bg-gradient-to-b from-white to-slate-50/50 p-4 shadow-sm md:p-5"
          aria-labelledby={`${uid}-behavior-h`}
        >
          <h3
            id={`${uid}-behavior-h`}
            className="text-sm font-bold text-[var(--ui-navy)] md:text-base"
          >
            行为模式分析
          </h3>
          <p className="mt-1 text-xs text-[var(--ui-muted)]">
            绿色为可预期的「固定脚本」，红色为偏离常态的异常波动。
          </p>

          <div className="relative mt-5 pl-4">
            <div
              className="absolute bottom-2 left-[7px] top-2 w-0.5 rounded-full bg-gradient-to-b from-emerald-400 via-emerald-300 to-rose-400"
              aria-hidden
            />
            <div className="space-y-6">
              <div>
                <p className="mb-2 flex items-center gap-2 text-[11px] font-bold uppercase tracking-wider text-emerald-800">
                  <span
                    className="h-2 w-2 rounded-full bg-emerald-500 shadow-[0_0_0_3px_rgba(16,185,129,0.25)]"
                    aria-hidden
                  />
                  固定模式 · 应对脚本
                </p>
                <div className="flex flex-col gap-2">
                  {BEHAVIOR_NODES.filter((b) => b.kind === "fixed").map((b) => {
                    const on = behaviorId === b.id;
                    return (
                      <button
                        key={b.id}
                        type="button"
                        aria-pressed={on}
                        className={`${behaviorBtn} ${on ? fixedOn : fixedIdle}`}
                        onClick={() => setBehaviorId(b.id)}
                      >
                        <span className="font-semibold text-emerald-900">
                          {b.title}
                        </span>
                        <span className="mt-0.5 block text-[11px] font-normal text-emerald-800/85">
                          {b.period}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>

              <div>
                <p className="mb-2 flex items-center gap-2 text-[11px] font-bold uppercase tracking-wider text-rose-800">
                  <span
                    className="h-2 w-2 rounded-full bg-rose-500 shadow-[0_0_0_3px_rgba(244,63,94,0.28)]"
                    aria-hidden
                  />
                  异常行为 · 异常偏离
                </p>
                <div className="flex flex-col gap-2">
                  {BEHAVIOR_NODES.filter((b) => b.kind === "abnormal").map(
                    (b) => {
                      const on = behaviorId === b.id;
                      return (
                        <button
                          key={b.id}
                          type="button"
                          aria-pressed={on}
                          className={`${behaviorBtn} ${on ? abnormalOn : abnormalIdle}`}
                          onClick={() => setBehaviorId(b.id)}
                        >
                          <span className="font-semibold text-rose-900">
                            {b.title}
                          </span>
                          <span className="mt-0.5 block text-[11px] font-normal text-rose-800/90">
                            {b.period} · 对岸反应强度 ↑
                          </span>
                        </button>
                      );
                    },
                  )}
                </div>
              </div>
            </div>
          </div>

          <div
            className={`mt-4 rounded-xl border-2 p-4 text-sm leading-relaxed shadow-inner ${
              behavior.kind === "fixed"
                ? "border-emerald-200/80 bg-emerald-50/30"
                : "border-rose-200/90 bg-rose-50/35"
            }`}
            role="region"
            aria-live="polite"
          >
            <p
              className={`text-xs font-semibold ${
                behavior.kind === "fixed"
                  ? "text-emerald-900"
                  : "text-rose-900"
              }`}
            >
              {behavior.title}
            </p>
            <p className="mt-2 text-[var(--report-text)]">{behavior.summary}</p>
            <ul className="mt-2 list-inside list-disc space-y-1 text-xs text-[var(--ui-muted)] md:text-sm">
              {behavior.bullets.map((x) => (
                <li key={x}>{x}</li>
              ))}
            </ul>
          </div>
        </section>
      </div>

      <p className="text-center text-[11px] text-[var(--ui-muted)]">
        图示为分析框架示意；模式识别不等于因果判断，请结合轨迹元素与多方来源交叉验证。
      </p>
    </div>
  );
}
