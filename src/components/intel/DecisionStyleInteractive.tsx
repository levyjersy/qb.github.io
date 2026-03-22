"use client";

import { useId, useState } from "react";

type ModuleId = "explicit" | "risk" | "conflict" | "power";

type ModuleEntry = {
  title: string;
  lines: string[];
};

const MODULES: Record<ModuleId, ModuleEntry> = {
  explicit: {
    title: "行为层",
    lines: [
      "他通常呈现出较强的理性克制和低情绪化反应。",
      "在公开场合或危机语境中，往往避免直接升级冲突，而是强调「稳定、对话、和平」等表述，并通过制度性语言替代对抗性表达。这种风格使其在短期冲突中表现为「降温型决策者」，即不主动制造高烈度对抗场景，而是通过延缓、模糊或转移议题来控制局势节奏。这一点在其接受国际媒体采访及多次公开讲话中均有体现，强调在「尊严与对等条件下对话」、避免冲突升级。",
      "但在隐性行为层（政策与结构），其决策逻辑则明显不同。他更倾向于通过制度、政策和长期布局来改变博弈结构，而非依赖一次性强硬行动。例如在安全与两岸议题上，他一方面保持话语克制，另一方面却持续推进制度性强化措施（如安全政策、风险管控、结构性调整等）。",
      "这种行为模式在情报分析中通常被归类为：「间接对抗型（Indirect Confrontation）」——不直接冲突，但持续提高对抗能力与对抗强度。",
    ],
  },
  risk: {
    title: "风险偏好维度",
    lines: [
      "他呈现出典型的「分散式风险管理」风格。他很少采取「一步到位」的高风险决策（例如突然性制度突破或激烈政策转向），而是通过渐进推进、多步骤叠加来实现目标。",
      "这种方式在单次决策上风险较低，但在长期会形成「累积性结构风险」，即通过连续的小幅调整改变整体格局。",
      "因此，从短期看他是「谨慎型」，但从长期看则可能产生「高强度结果」。",
    ],
  },
  conflict: {
    title: "冲突处理机制",
    lines: [
      "他具有明显的「节奏控制能力」。例如在面对政治对立或制度冲突时，他并不急于达成妥协，而是通过拖延、绕行或制度工具来应对。",
      "典型案例是其在台南市长时期，因与议会冲突曾长期拒绝进入议会，持续时间超过200天，这种行为被视为一种非妥协式抗衡策略，即不通过谈判解决冲突，而是通过制度性僵持来迫使对方让步。",
      "此外，在冲突认知层（威胁感知），他整体呈现出较高的安全敏感度，即倾向于将外部环境理解为具有潜在威胁，从而在政策上提前进行防范布局。这种「威胁预设」会使其在长期战略上更偏向强化安全与对抗能力，而不是依赖信任或合作机制。从行为结果来看，这种认知结构往往会降低短期冲突概率，但提高长期对抗强度。",
      "从外部评价来看，也存在将其归类为「偏强硬甚至鲁莽」的观点，例如部分西方舆论曾称其为「鲁莽的领导人」，认为其政策可能加剧区域紧张。但这种评价更多针对其政策结果，而非其具体决策过程本身。从行为逻辑看，他并非典型的冲动型决策者，而是在控制风险的前提下推进结构性对抗。",
    ],
  },
  power: {
    title: "权力运作与决策结构",
    lines: [
      "其风格还表现出一定的集中化倾向。有评论指出，其在人事与决策中更依赖「高信任圈层」，倾向使用熟悉或亲信团队，以确保政策执行的稳定性与一致性。",
      "这种方式提高了决策效率和可控性，但也可能带来信息来源单一、反馈不足的问题，在情报分析中通常被归类为「封闭式决策结构」。",
    ],
  },
};

function ExplicitLayerContent({ lines }: { lines: string[] }) {
  const uid = useId();
  const [lead, publicFace, implicitLayer, analysis] = lines;
  const explicitHeadingId = `${uid}-explicit`;
  const implicitHeadingId = `${uid}-implicit`;

  return (
    <div className="space-y-6">
      <section
        className="rounded-2xl border-2 border-[var(--ui-border)] bg-gradient-to-b from-white to-slate-50/40 p-4 shadow-sm md:p-6"
        aria-labelledby={explicitHeadingId}
      >
        <header
          id={explicitHeadingId}
          className="mb-4 border-b border-[var(--ui-border)] pb-3"
        >
          <div className="flex flex-wrap items-baseline gap-2">
            <h5 className="text-base font-bold text-[var(--ui-navy)] md:text-lg">
              显性行为
            </h5>
            <span className="rounded-md bg-[var(--ui-navy)]/[0.06] px-2 py-0.5 text-[11px] font-medium text-[var(--ui-muted)]">
              外在表现
            </span>
          </div>
          <p className="mt-1.5 text-xs leading-relaxed text-[var(--ui-muted)]">
            公开场合、话语策略与可观察反应
          </p>
        </header>

        <div className="space-y-4">
          <p className="text-base font-semibold leading-relaxed text-[var(--ui-navy)] md:text-[1.05rem] md:leading-8">
            {lead}
          </p>

          <div className="rounded-xl border border-[var(--ui-border)] bg-white/90 p-4 shadow-sm md:p-5">
            <p className="mb-3 text-[11px] font-semibold uppercase tracking-[0.12em] text-[var(--ui-muted)]">
              公开语境与危机应对
            </p>
            <p className="text-sm leading-[1.75] text-[var(--report-text)]">
              {publicFace}
            </p>
          </div>
        </div>
      </section>

      <section
        className="rounded-2xl border-2 border-[var(--ui-border)] bg-slate-50/80 p-4 shadow-sm md:p-6"
        aria-labelledby={implicitHeadingId}
      >
        <header
          id={implicitHeadingId}
          className="mb-4 border-b border-[var(--ui-border)] pb-3"
        >
          <div className="flex flex-wrap items-baseline gap-2">
            <h5 className="text-base font-bold text-[var(--ui-navy)] md:text-lg">
              隐性行为
            </h5>
            <span className="rounded-md bg-[var(--ui-navy)]/[0.08] px-2 py-0.5 text-[11px] font-medium text-[var(--ui-muted)]">
              政策与结构
            </span>
          </div>
          <p className="mt-1.5 text-xs leading-relaxed text-[var(--ui-muted)]">
            制度布局、长期博弈与结构性强化
          </p>
        </header>

        <div className="space-y-4">
          <div className="relative overflow-hidden rounded-xl border border-[var(--ui-border)] bg-white pl-4 md:pl-5">
            <div
              className="absolute bottom-0 left-0 top-0 w-1 bg-[var(--ui-navy)]/25"
              aria-hidden
            />
            <div className="py-4 pr-3 md:py-5 md:pr-5">
              <p className="text-sm leading-[1.75] text-[var(--report-text)]">
                {implicitLayer.replace(/^但在隐性行为层（政策与结构），/, "")}
              </p>
            </div>
          </div>

          <div className="rounded-xl border border-dashed border-[var(--ui-coral)]/35 bg-[var(--ui-coral-soft)]/25 px-4 py-4 md:px-5 md:py-5">
            <p className="mb-2 text-xs font-semibold text-[var(--ui-coral)]">
              情报分析归类
            </p>
            <p className="text-sm leading-[1.75] text-[var(--report-text)]">
              {analysis}
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}

function RiskPreferenceContent({ lines }: { lines: string[] }) {
  const [stylePara, cumulativePara, timeConclusion] = lines;
  return (
    <div className="space-y-5">
      <p className="text-base font-semibold leading-relaxed text-[var(--ui-navy)] md:text-[1.05rem] md:leading-8">
        {stylePara}
      </p>

      <div className="rounded-xl border border-[var(--ui-border)] bg-gradient-to-b from-white to-slate-50/80 p-4 shadow-sm md:p-5">
        <p className="mb-3 text-[11px] font-semibold uppercase tracking-[0.12em] text-[var(--ui-muted)]">
          单次决策与长期结构
        </p>
        <p className="text-sm leading-[1.75] text-[var(--report-text)]">
          {cumulativePara}
        </p>
      </div>

      <div className="overflow-hidden rounded-xl border border-dashed border-[var(--ui-coral)]/35 bg-[var(--ui-coral-soft)]/20">
        <div className="border-b border-[var(--ui-coral)]/20 bg-white/50 px-4 py-3 md:px-5">
          <p className="text-xs font-semibold text-[var(--ui-coral)]">
            时间维度结论
          </p>
          <div className="mt-3 flex flex-wrap items-stretch gap-2 sm:gap-3">
            <div className="min-w-[8.5rem] flex-1 rounded-lg border border-[var(--ui-border)] bg-white px-3 py-2.5 text-center shadow-sm">
              <p className="text-[10px] font-medium uppercase tracking-wider text-[var(--ui-muted)]">
                短期视角
              </p>
              <p className="mt-1 text-sm font-bold text-[var(--ui-navy)]">
                谨慎型
              </p>
            </div>
            <div
              className="hidden items-center text-[var(--ui-muted)] sm:flex"
              aria-hidden
            >
              →
            </div>
            <div className="min-w-[8.5rem] flex-1 rounded-lg border border-[var(--ui-coral)]/30 bg-white px-3 py-2.5 text-center shadow-sm">
              <p className="text-[10px] font-medium uppercase tracking-wider text-[var(--ui-muted)]">
                长期视角
              </p>
              <p className="mt-1 text-sm font-bold text-[var(--ui-navy)]">
                高强度结果
              </p>
            </div>
          </div>
        </div>
        <div className="px-4 py-4 md:px-5 md:py-5">
          <p className="text-sm leading-[1.75] text-[var(--report-text)]">
            {timeConclusion}
          </p>
        </div>
      </div>
    </div>
  );
}

function ConflictMechanismContent({ lines }: { lines: string[] }) {
  const uid = useId();
  const [rhythm, caseStudy, cognition, external] = lines;
  const h1 = `${uid}-conflict-rhythm`;
  const h2 = `${uid}-conflict-cognition`;
  const h3 = `${uid}-conflict-external`;

  return (
    <div className="space-y-6">
      <section
        className="rounded-2xl border-2 border-[var(--ui-border)] bg-gradient-to-b from-white to-slate-50/50 p-4 shadow-sm md:p-6"
        aria-labelledby={h1}
      >
        <header
          id={h1}
          className="mb-4 border-b border-[var(--ui-border)] pb-3"
        >
          <h5 className="text-base font-bold text-[var(--ui-navy)] md:text-lg">
            节奏控制与制度应对
          </h5>
          <p className="mt-1 text-xs leading-relaxed text-[var(--ui-muted)]">
            拖延、绕行与制度工具——非妥协式抗衡
          </p>
        </header>
        <p className="text-base font-semibold leading-relaxed text-[var(--ui-navy)] md:leading-8">
          {rhythm}
        </p>
        <div className="mt-4 rounded-xl border border-[var(--ui-border)] bg-white/95 p-4 shadow-inner md:p-5">
          <p className="mb-2 text-[11px] font-semibold uppercase tracking-[0.1em] text-[var(--ui-muted)]">
            典型案例
          </p>
          <p className="text-sm leading-[1.75] text-[var(--report-text)]">
            {caseStudy}
          </p>
        </div>
      </section>

      <section
        className="relative overflow-hidden rounded-2xl border-2 border-[var(--ui-border)] bg-slate-50/90 p-4 md:p-6"
        aria-labelledby={h2}
      >
        <div
          className="absolute bottom-0 left-0 top-0 w-1.5 bg-gradient-to-b from-[var(--ui-navy)]/25 to-[var(--ui-coral)]/20"
          aria-hidden
        />
        <header id={h2} className="mb-3 pl-1">
          <h5 className="text-base font-bold text-[var(--ui-navy)] md:text-lg">
            冲突认知层（威胁感知）
          </h5>
          <p className="mt-1 text-xs text-[var(--ui-muted)]">
            安全敏感度、「威胁预设」与长期战略取向
          </p>
        </header>
        <p className="pl-1 text-sm leading-[1.75] text-[var(--report-text)]">
          {cognition}
        </p>
      </section>

      <section
        className="rounded-2xl border border-dashed border-[var(--ui-coral)]/40 bg-[var(--ui-coral-soft)]/20 p-4 md:p-6"
        aria-labelledby={h3}
      >
        <header id={h3} className="mb-3">
          <h5 className="text-base font-bold text-[var(--ui-coral)]">
            外部评价与行为逻辑
          </h5>
          <p className="mt-1 text-xs text-[var(--ui-muted)]">
            舆论标签、政策结果与决策过程之分
          </p>
        </header>
        <p className="text-sm leading-[1.75] text-[var(--report-text)]">
          {external}
        </p>
      </section>
    </div>
  );
}

function PowerStructureContent({ lines }: { lines: string[] }) {
  const uid = useId();
  const [trustCircle, efficiencyAndType] = lines;
  const h1 = `${uid}-power-trust`;
  const h2 = `${uid}-power-efficiency`;

  const parts = efficiencyAndType.split(
    "在情报分析中通常被归类为",
  );
  const beforeClassify =
    parts[0]?.trimEnd() ?? efficiencyAndType;
  const hasClassify = parts.length > 1;

  return (
    <div className="space-y-6">
      <section
        className="rounded-2xl border-2 border-[var(--ui-border)] bg-gradient-to-br from-white via-white to-slate-50/60 p-4 shadow-sm md:p-6"
        aria-labelledby={h1}
      >
        <header id={h1} className="mb-4 border-b border-[var(--ui-border)] pb-3">
          <h5 className="text-base font-bold text-[var(--ui-navy)] md:text-lg">
            集中化与「高信任圈层」
          </h5>
          <p className="mt-1 text-xs leading-relaxed text-[var(--ui-muted)]">
            人事与决策中的稳定执行取向
          </p>
        </header>
        <p className="text-sm leading-[1.8] text-[var(--report-text)] md:text-[0.9375rem]">
          {trustCircle}
        </p>
      </section>

      <section
        className="overflow-hidden rounded-2xl border border-dashed border-[var(--ui-coral)]/35 bg-[var(--ui-coral-soft)]/15"
        aria-labelledby={h2}
      >
        <div className="border-b border-[var(--ui-coral)]/15 bg-white/60 px-4 py-3 md:px-5">
          <h5
            id={h2}
            className="text-sm font-bold text-[var(--ui-navy)] md:text-base"
          >
            效率、信息反馈与结构归类
          </h5>
          <p className="mt-1 text-xs text-[var(--ui-muted)]">
            可控性收益与封闭结构风险
          </p>
        </div>
        <div className="space-y-4 px-4 py-4 md:px-5 md:py-5">
          <p className="text-sm leading-[1.8] text-[var(--report-text)] md:text-[0.9375rem]">
            {hasClassify ? (
              <>
                {beforeClassify}
                <span className="text-[var(--report-text)]">
                  在情报分析中通常被归类为
                </span>
              </>
            ) : (
              efficiencyAndType
            )}
          </p>
          {hasClassify && parts[1] ? (
            <div className="rounded-xl border border-[var(--ui-coral)]/30 bg-white/90 px-4 py-4 text-center shadow-sm">
              <p className="text-[11px] font-semibold uppercase tracking-wider text-[var(--ui-muted)]">
                情报分析归类
              </p>
              <p className="mt-2 text-base font-bold leading-snug tracking-wide text-[var(--ui-navy)]">
                {parts[1].trim()}
              </p>
            </div>
          ) : null}
        </div>
      </section>
    </div>
  );
}

export function DecisionStyleInteractive() {
  const baseId = useId();
  const [active, setActive] = useState<ModuleId>("explicit");
  const m = MODULES[active];

  const btnBase =
    "rounded-xl border-2 px-2 py-2.5 text-center text-[11px] font-semibold leading-snug transition-all sm:text-xs md:py-3 md:text-sm";
  const btnIdle =
    "border-[var(--ui-border)] bg-[var(--ui-surface)] hover:bg-slate-50/90";
  const btnActive =
    "border-[var(--ui-coral)] bg-[var(--ui-coral-soft)] ring-2 ring-[var(--ui-coral)] ring-offset-2";

  return (
    <div className="decision-style-interactive space-y-6 md:space-y-7">
      <div
        className="relative overflow-hidden rounded-2xl border border-[var(--ui-border)] bg-gradient-to-br from-[var(--ui-navy)]/[0.06] via-white to-[var(--ui-coral-soft)]/40 px-4 py-5 shadow-md ring-1 ring-[var(--ui-navy)]/[0.06] md:px-7 md:py-6"
        role="region"
        aria-label="决策风格总述"
      >
        <div
          className="absolute left-0 right-0 top-0 h-[3px] bg-gradient-to-r from-[var(--ui-coral)]/70 via-[var(--ui-navy)]/25 to-transparent"
          aria-hidden
        />
        <div
          className="pointer-events-none absolute -right-8 -top-8 h-32 w-32 rounded-full bg-[var(--ui-coral)]/[0.06] blur-2xl"
          aria-hidden
        />
        <p className="relative pt-1 text-center text-sm font-semibold leading-relaxed text-[var(--ui-navy)] md:text-base md:leading-8">
          <span className="text-[var(--ui-coral)]">
            「低情绪表达 + 中高强度结构对抗 + 渐进式风险累积」
          </span>
          的策略型决策者
        </p>
      </div>

      <div
        className="rounded-2xl border border-[var(--ui-border)] bg-gradient-to-b from-slate-50/90 to-white p-1.5 shadow-inner md:p-2"
      >
        <div
          className="grid grid-cols-2 gap-1.5 lg:grid-cols-4 lg:gap-2"
          role="tablist"
          aria-label="决策风格模块"
        >
          {(Object.keys(MODULES) as ModuleId[]).map((id) => (
            <button
              key={id}
              type="button"
              role="tab"
              aria-selected={active === id}
              id={`${baseId}-tab-${id}`}
              aria-controls={`${baseId}-panel`}
              className={`${btnBase} shadow-sm transition-all duration-200 ${active === id ? `${btnActive} shadow-md` : `${btnIdle} hover:border-[var(--ui-navy)]/15 hover:shadow`}`}
              onClick={() => setActive(id)}
            >
              {MODULES[id].title}
            </button>
          ))}
        </div>
      </div>

      <div
        id={`${baseId}-panel`}
        role="tabpanel"
        aria-labelledby={`${baseId}-tab-${active}`}
        className="rounded-2xl border border-[var(--ui-border)] bg-gradient-to-b from-white to-slate-50/40 p-5 shadow-md ring-1 ring-black/[0.02] md:p-7"
      >
        <div className="mb-5 flex gap-3 border-b border-[var(--ui-border)]/90 pb-4">
          <div
            className="mt-0.5 hidden h-12 w-1 shrink-0 rounded-full bg-gradient-to-b from-[var(--ui-coral)] to-[var(--ui-coral)]/50 sm:block"
            aria-hidden
          />
          <div className="min-w-0 flex-1">
            <h4 className="text-base font-bold tracking-tight text-[var(--ui-navy)] md:text-lg">
              {m.title}
            </h4>
            {active === "explicit" ? (
              <p className="mt-1.5 text-xs leading-relaxed text-[var(--ui-muted)]">
                显性行为与隐性行为：话语降温与制度性长期博弈
              </p>
            ) : null}
            {active === "risk" ? (
              <p className="mt-1.5 text-xs leading-relaxed text-[var(--ui-muted)]">
                分散式风险管理：单次低风险与长期累积性结构张力
              </p>
            ) : null}
            {active === "conflict" ? (
              <p className="mt-1.5 text-xs leading-relaxed text-[var(--ui-muted)]">
                节奏控制、威胁感知与外部评价的张力
              </p>
            ) : null}
            {active === "power" ? (
              <p className="mt-1.5 text-xs leading-relaxed text-[var(--ui-muted)]">
                集中化倾向、信任圈层与决策结构归类
              </p>
            ) : null}
          </div>
        </div>
        {active === "explicit" ? (
          <ExplicitLayerContent lines={m.lines} />
        ) : active === "risk" ? (
          <RiskPreferenceContent lines={m.lines} />
        ) : active === "conflict" ? (
          <ConflictMechanismContent lines={m.lines} />
        ) : active === "power" ? (
          <PowerStructureContent lines={m.lines} />
        ) : (
          <ul className="space-y-2.5 text-sm leading-relaxed text-[var(--report-text)]">
            {m.lines.map((line, i) => (
              <li key={i} className="flex gap-2">
                <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-[var(--ui-muted)]/50" />
                <span>{line}</span>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
