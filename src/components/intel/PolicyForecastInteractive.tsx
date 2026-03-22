"use client";

import { type ReactNode, useId, useState } from "react";

import { PolicyThreatResourceInteractive } from "@/components/intel/PolicyThreatResourceInteractive";

/** 政策—行动矩阵（四列）与行为模式观察文案 */
const POLICY_ACTION_MATRIX_ROWS: {
  id: string;
  core: ReactNode;
  preAction: string;
  postDeclare: string;
  audience: ReactNode;
}[] = [
  {
    id: "wos",
    core: (
      <>
        强化
        <strong className="text-[var(--ui-navy)]">「全社会防御韧性」</strong>
      </>
    ),
    preAction:
      "频繁视察民防训练中心、参与模拟断电/断网演习。",
    postDeclare:
      "成立「全社会防御韧性委员会」，强调非军事人员的战时动员。",
    audience: (
      <ul className="m-0 flex max-w-full list-none flex-col gap-2 p-0">
        <li className="max-w-full rounded-lg border border-slate-200/80 bg-gradient-to-br from-white to-slate-50/90 px-2 py-2 shadow-sm sm:px-3 sm:py-2.5">
          <span className="inline-flex rounded-md bg-emerald-500/12 px-2 py-0.5 text-[10px] font-bold tracking-wide text-emerald-900">
            对内
          </span>
          <p className="mt-1.5 text-[13px] leading-relaxed text-[var(--report-text)]">
            提升民众危机意识。
          </p>
        </li>
        <li className="max-w-full rounded-lg border border-slate-200/80 bg-gradient-to-br from-white to-slate-50/90 px-2 py-2 shadow-sm sm:px-3 sm:py-2.5">
          <span className="inline-flex rounded-md bg-sky-500/12 px-2 py-0.5 text-[10px] font-bold tracking-wide text-sky-950">
            对外
          </span>
          <p className="mt-1.5 text-[13px] leading-relaxed text-[var(--report-text)]">
            展示抵抗意志。
          </p>
        </li>
      </ul>
    ),
  },
  {
    id: "threat-cn",
    core: (
      <>
        定义大陆为
        <strong className="text-[var(--ui-navy)]">「实质威胁/境外势力」</strong>
      </>
    ),
    preAction:
      "加强对两岸学术、宗教交流的背景审查与资金来源追溯。",
    postDeclare:
      "在重要演说（如双十或 520 周年）中明确主权论述，强化「互不隶属」。",
    audience: (
      <ul className="m-0 flex max-w-full list-none flex-col gap-2 p-0">
        <li className="max-w-full rounded-lg border border-slate-200/80 bg-gradient-to-br from-white to-slate-50/90 px-2 py-2 shadow-sm sm:px-3 sm:py-2.5">
          <span className="inline-flex rounded-md bg-emerald-500/12 px-2 py-0.5 text-[10px] font-bold tracking-wide text-emerald-900">
            对内
          </span>
          <p className="mt-1.5 text-[13px] leading-relaxed text-[var(--report-text)]">
            巩固绿营基本盘。
          </p>
        </li>
        <li className="max-w-full rounded-lg border border-slate-200/80 bg-gradient-to-br from-white to-slate-50/90 px-2 py-2 shadow-sm sm:px-3 sm:py-2.5">
          <span className="inline-flex rounded-md bg-rose-500/12 px-2 py-0.5 text-[10px] font-bold tracking-wide text-rose-950">
            对大陆
          </span>
          <p className="mt-1.5 text-[13px] leading-relaxed text-[var(--report-text)]">
            划清法律与政治界限。
          </p>
        </li>
      </ul>
    ),
  },
  {
    id: "military-law",
    core: (
      <strong className="font-semibold text-[var(--ui-navy)]">
        恢复部分军事审判权/严惩间谍
      </strong>
    ),
    preAction:
      "军队内部进行大规模「政治教育」与保密检查。",
    postDeclare:
      "修订《陆海空军刑法》，针对和平时期泄密行为引入更严厉制裁。",
    audience: (
      <ul className="m-0 flex max-w-full list-none flex-col gap-2 p-0">
        <li className="max-w-full rounded-lg border border-slate-200/80 bg-gradient-to-br from-white to-slate-50/90 px-2 py-2 shadow-sm sm:px-3 sm:py-2.5">
          <span className="inline-flex rounded-md bg-indigo-500/12 px-2 py-0.5 text-[10px] font-bold tracking-wide text-indigo-950">
            对军方
          </span>
          <p className="mt-1.5 text-[13px] leading-relaxed text-[var(--report-text)]">
            肃清整顿，确保忠诚。
          </p>
        </li>
        <li className="max-w-full rounded-lg border border-slate-200/80 bg-gradient-to-br from-white to-slate-50/90 px-2 py-2 shadow-sm sm:px-3 sm:py-2.5">
          <span className="inline-flex rounded-md bg-amber-500/15 px-2 py-0.5 text-[10px] font-bold tracking-wide text-amber-950">
            对美
          </span>
          <p className="mt-1.5 text-[13px] leading-relaxed text-[var(--report-text)]">
            展现保护敏感技术的决心。
          </p>
        </li>
      </ul>
    ),
  },
];

type TabId = "overview" | "matrix" | "threat" | "scenarios";

const TABS: { id: TabId; label: string; hint: string }[] = [
  { id: "overview", label: "概览", hint: "章节目标与阅读路径" },
  {
    id: "matrix",
    label: "政策—行动矩阵分析",
    hint: "政策宣示与可观察行动",
  },
  {
    id: "threat",
    label: "威胁认知与资源投向分析",
    hint: "威胁框架与预算配置",
  },
  {
    id: "scenarios",
    label: "情景推演",
    hint: "分支情景与公开轨迹对照",
  },
];

export function PolicyForecastInteractive() {
  const baseId = useId();
  const [active, setActive] = useState<TabId>("overview");

  const btnBase =
    "rounded-xl border-2 px-2 py-2 text-center text-[11px] font-semibold leading-tight transition-all duration-200 sm:text-xs md:px-3 md:py-2.5 md:text-sm";
  const btnIdle =
    "border-[var(--ui-border)] bg-[var(--ui-surface)] hover:bg-slate-50/90 hover:shadow-sm";
  const btnActive =
    "border-[var(--ui-coral)] bg-[var(--ui-coral-soft)] shadow-md ring-2 ring-[var(--ui-coral)] ring-offset-2";

  const panelShell =
    "rounded-2xl border border-[var(--ui-border)]/90 bg-gradient-to-b from-white via-white to-slate-50/50 p-5 shadow-[0_8px_40px_-16px_rgba(15,23,42,0.12)] ring-1 ring-black/[0.04] md:p-7";

  return (
    <div className="policy-forecast-interactive space-y-6">
      <div
        className="rounded-2xl border border-[var(--ui-border)]/80 bg-gradient-to-b from-slate-100/40 to-white p-1.5 shadow-[inset_0_1px_0_rgba(255,255,255,0.8)] md:p-2"
        role="tablist"
        aria-label="政策预判子章节"
      >
        <div className="grid grid-cols-2 gap-2 lg:grid-cols-4">
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
                <span className="block">{t.label}</span>
                <span className="mt-0.5 block text-[9px] font-normal text-[var(--ui-muted)] md:text-[10px]">
                  {t.hint}
                </span>
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
          className={panelShell}
        >
          {t.id === "overview" ? (
            <div className="space-y-6 text-sm leading-relaxed text-[var(--report-text)]">
              <div className="border-b border-[var(--ui-border)]/70 pb-4">
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[var(--ui-coral)]">
                  概览
                </p>
                <p className="mt-2 text-lg font-bold text-[var(--ui-navy)] md:text-xl">
                  政策预判总览
                </p>
              </div>

              {/* 矩阵结论 */}
              <div className="relative overflow-hidden rounded-2xl border border-[var(--ui-border)] bg-gradient-to-br from-slate-50 via-white to-[var(--ui-coral-soft)]/30 p-1 shadow-[0_8px_32px_-12px_rgba(15,23,42,0.12)] md:p-1.5">
                <div className="absolute left-0 top-0 h-full w-1 bg-gradient-to-b from-[var(--ui-coral)] to-[var(--ui-navy)]/70" />
                <div className="relative rounded-xl bg-white/90 px-5 py-5 pl-7 backdrop-blur-sm md:px-7 md:py-6 md:pl-9">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="rounded-full bg-[var(--ui-navy)]/90 px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider text-white md:text-[11px]">
                      矩阵匹配结论
                    </span>
                    <span className="text-[11px] text-[var(--ui-muted)] md:text-xs">
                      决策风格画像
                    </span>
                  </div>
                  <p className="mt-4 text-[15px] leading-[1.75] text-[var(--report-text)] md:text-base md:leading-[1.8]">
                    通过矩阵匹配发现，赖清德的决策风格是
                    <strong className="font-bold text-[var(--ui-navy)]">
                      「战略极简、战术极硬」
                    </strong>
                    。他并不追求复杂的战略模糊，而是通过
                    <strong className="font-bold text-[var(--ui-coral)]">
                      「资源投入 = 真实意图」
                    </strong>
                    的逻辑，不断在内部法律空间和军事防御上打「地基」。
                  </p>
                </div>
              </div>

              {/* 未来一年预测 */}
              <div className="overflow-hidden rounded-2xl border-2 border-amber-200/90 bg-gradient-to-br from-amber-50/95 via-orange-50/50 to-white shadow-[0_12px_40px_-12px_rgba(245,158,11,0.35)]">
                <div className="border-b border-amber-200/60 bg-gradient-to-r from-amber-100/80 to-transparent px-5 py-3 md:px-6">
                  <p className="text-xs font-bold uppercase tracking-[0.22em] text-amber-900/90">
                    未来一年的核心预测
                  </p>
                </div>
                <div className="space-y-3 px-5 py-5 md:px-6 md:py-6">
                  <p className="text-[15px] leading-[1.75] text-amber-950/95 md:text-base md:leading-[1.8]">
                    他将利用
                    <span className="mx-0.5 inline-flex items-center rounded-md bg-amber-500/15 px-2 py-0.5 text-base font-bold text-amber-950 ring-1 ring-amber-400/40 md:text-lg">
                      「全社会防御」
                    </span>
                    这个大框架，将原本属于文教、经济、宗教领域的活动，逐步纳入广义的「国家安全」范畴。
                  </p>
                  <div className="rounded-xl border border-amber-200/70 bg-white/70 px-4 py-3 text-sm leading-relaxed text-amber-950/90 shadow-inner md:px-5 md:py-4">
                    <p>
                      这意味着，未来即便是普通的民间交流，也会因为「反渗透」逻辑的深化而面临更高的
                      <strong className="font-semibold text-amber-950">
                        合规成本
                      </strong>
                      与
                      <strong className="font-semibold text-amber-950">
                        政治审查
                      </strong>
                      。
                    </p>
                  </div>
                </div>
              </div>

              <div className="flex flex-wrap items-center justify-center gap-x-2 gap-y-1 rounded-xl border border-dashed border-[var(--ui-border)]/90 bg-gradient-to-r from-slate-50/80 via-white to-slate-50/80 px-4 py-3.5 text-center text-[11px] leading-relaxed text-[var(--ui-muted)] shadow-inner md:text-xs">
                <span className="text-[var(--ui-navy)]/70">继续阅读</span>
                <span className="inline-flex items-center gap-1.5">
                  <span className="rounded-md bg-[var(--ui-coral-soft)] px-2 py-0.5 font-medium text-[var(--ui-navy)]">
                    政策—行动矩阵
                  </span>
                  <span className="text-[var(--ui-border)]">·</span>
                  <span className="rounded-md bg-slate-100/90 px-2 py-0.5 font-medium text-[var(--ui-navy)]">
                    威胁与资源
                  </span>
                  <span className="text-[var(--ui-border)]">·</span>
                  <span className="rounded-md bg-slate-100/90 px-2 py-0.5 font-medium text-[var(--ui-navy)]">
                    情景推演
                  </span>
                </span>
              </div>
            </div>
          ) : null}

          {t.id === "matrix" ? (
            <div className="space-y-6 text-sm leading-relaxed text-[var(--report-text)]">
              <div className="border-b border-[var(--ui-border)]/70 pb-4">
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[var(--ui-coral)]">
                  矩阵
                </p>
                <p className="mt-2 text-lg font-bold text-[var(--ui-navy)] md:text-xl">
                  政策—行动矩阵分析
                </p>
                <p className="mt-3 max-w-3xl text-[var(--ui-muted)]">
                  下表按「核心政策／国安措施—前置行动—后置宣示—受众区分」排列：前置侧重
                  <strong className="font-medium text-[var(--report-text)]">
                    行动先于说法
                  </strong>
                  ，后置侧重
                  <strong className="font-medium text-[var(--report-text)]">
                    说法定调
                  </strong>
                  ，便于对照时间序与话语序。
                </p>
              </div>

              <div className="overflow-hidden rounded-2xl border border-[var(--ui-border)]/80 bg-white shadow-[0_12px_48px_-20px_rgba(15,23,42,0.18)] ring-1 ring-black/[0.04]">
                <table className="w-full table-fixed border-collapse text-left text-[11px] leading-snug text-[var(--report-text)] antialiased md:text-xs md:leading-normal">
                  <caption className="caption-top border-b border-[var(--ui-border)]/80 bg-gradient-to-r from-slate-100/95 via-white to-slate-50/90 px-3 py-3 text-left sm:px-4 md:px-5 md:py-3.5">
                    <span className="text-sm font-bold text-[var(--ui-navy)]">
                      政策—行动矩阵
                    </span>
                    <span className="mt-1 block text-[10px] font-normal text-[var(--ui-muted)] sm:text-[11px]">
                      示例整理 · 可随公开信息更新
                    </span>
                  </caption>
                  <thead>
                    <tr className="bg-gradient-to-b from-slate-100/95 to-slate-50/90 text-[var(--ui-navy)]">
                      <th className="w-[22%] min-w-0 break-words border-b border-[var(--ui-border)] px-2 py-2.5 text-left align-top text-[10px] font-bold sm:px-3 sm:text-xs md:px-4 md:py-3.5">
                        核心政策／国安措施
                      </th>
                      <th className="w-[26%] min-w-0 break-words border-b border-l border-[var(--ui-border)]/80 border-l-emerald-500/25 px-2 py-2.5 text-left align-top sm:px-3 md:px-4 md:py-3.5">
                        <span className="text-[10px] font-bold sm:text-xs">前置行动</span>
                        <span className="mt-1 block text-[9px] font-normal leading-tight text-emerald-800/90 sm:text-[10px] md:text-[11px]">
                          行动先于说法
                        </span>
                      </th>
                      <th className="w-[26%] min-w-0 break-words border-b border-l border-[var(--ui-border)]/80 border-l-[var(--ui-coral)]/35 px-2 py-2.5 text-left align-top sm:px-3 md:px-4 md:py-3.5">
                        <span className="text-[10px] font-bold sm:text-xs">后置宣示</span>
                        <span className="mt-1 block text-[9px] font-normal leading-tight text-rose-800/85 sm:text-[10px] md:text-[11px]">
                          说法定调
                        </span>
                      </th>
                      <th className="w-[26%] min-w-0 break-words border-b border-l border-[var(--ui-border)]/80 px-2 py-2.5 text-left align-top sm:px-3 md:px-4 md:py-3.5">
                        <span className="text-[10px] font-bold sm:text-xs">
                          目标受众区分
                        </span>
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {POLICY_ACTION_MATRIX_ROWS.map((row, i) => (
                      <tr
                        key={row.id}
                        className="align-top transition-colors odd:bg-white even:bg-slate-50/40 hover:bg-[var(--ui-coral-soft)]/35"
                      >
                        <td className="min-w-0 break-words border-b border-[var(--ui-border)]/70 bg-slate-50/35 px-2 py-3 font-medium sm:px-3 md:px-4 md:py-4">
                          <div className="flex gap-2 sm:gap-3">
                            <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-[var(--ui-navy)]/12 to-slate-200/50 text-[10px] font-bold text-[var(--ui-navy)] shadow-sm sm:h-7 sm:w-7 sm:text-[11px]">
                              {i + 1}
                            </span>
                            <div className="min-w-0 flex-1 pt-0.5 leading-snug">
                              {row.core}
                            </div>
                          </div>
                        </td>
                        <td className="min-w-0 break-words border-b border-l border-[var(--ui-border)]/60 border-l-emerald-500/20 px-2 py-3 sm:px-3 md:px-4 md:py-4">
                          {row.preAction}
                        </td>
                        <td className="min-w-0 break-words border-b border-l border-[var(--ui-border)]/60 border-l-[var(--ui-coral)]/25 px-2 py-3 sm:px-3 md:px-4 md:py-4">
                          {row.postDeclare}
                        </td>
                        <td className="min-w-0 break-words border-b border-l border-[var(--ui-border)]/60 px-2 py-3 sm:px-3 md:px-4 md:py-4">
                          {row.audience}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <div className="relative overflow-hidden rounded-2xl border border-[var(--ui-navy)]/15 bg-gradient-to-br from-slate-50/95 via-white to-[var(--ui-coral-soft)]/20 shadow-md">
                <div className="absolute right-0 top-0 h-24 w-24 rounded-bl-full bg-[var(--ui-coral)]/8" />
                <div className="relative border-b border-[var(--ui-border)]/60 bg-[var(--ui-navy)]/[0.07] px-5 py-4 md:px-6">
                  <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-[var(--ui-navy)] md:text-xs">
                    行为模式观察
                  </p>
                  <p className="mt-1 text-base font-bold text-[var(--ui-navy)] md:text-lg">
                    先行行动，后定调
                  </p>
                </div>
                <div className="relative px-5 py-5 md:px-6 md:py-6">
                  <p className="text-sm leading-[1.8] md:text-[15px] md:leading-[1.85]">
                    赖清德的表现更偏向
                    <strong className="rounded bg-[var(--ui-coral-soft)] px-1 font-bold text-[var(--ui-navy)]">
                      「先行行动后说法」
                    </strong>
                    。他往往先通过行政手段（如预算拨付、人事任免）完成布局，再选择特定政治时点进行「战略定调」。这种做法减少了政策预告期的阻力，同时也为外部反应留下了缓冲。
                  </p>
                </div>
              </div>

              <p className="rounded-lg bg-slate-50/80 px-3 py-2.5 text-center text-[11px] leading-relaxed text-[var(--ui-muted)] md:text-xs">
                矩阵可与公开轨迹（视察、演说、立法节点）交叉更新；潜舰视察、印太多边场合、韧性话语等可作为监测锚点。
              </p>
            </div>
          ) : null}

          {t.id === "threat" ? <PolicyThreatResourceInteractive /> : null}

          {t.id === "scenarios" ? (
            <div className="space-y-6 text-sm leading-relaxed text-[var(--report-text)]">
              <div className="border-b border-[var(--ui-border)]/70 pb-4">
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[var(--ui-coral)]">
                  推演
                </p>
                <p className="mt-2 text-lg font-bold text-[var(--ui-navy)] md:text-xl">
                  情景推演
                </p>
                <p className="mt-3 max-w-3xl text-[var(--ui-muted)]">
                  以下三种分支从外部环境特征到可观察行为一一对应；「可能性」为相对排序，须以公开轨迹与政策节点持续校验。
                </p>
              </div>

              <div className="space-y-5">
                {/* 情景 A · 刺猬化 */}
                <article className="overflow-hidden rounded-2xl border-2 border-rose-300/70 bg-gradient-to-br from-rose-50/80 via-white to-slate-50/90 shadow-[0_10px_40px_-16px_rgba(190,18,60,0.2)] ring-1 ring-rose-200/50">
                  <div className="flex flex-col sm:flex-row sm:items-stretch">
                    <div className="flex shrink-0 items-center justify-center gap-2 bg-gradient-to-br from-rose-600 to-slate-800 px-4 py-4 text-white sm:w-24 sm:flex-col sm:py-8 md:w-28">
                      <span className="text-3xl font-black leading-none md:text-4xl">
                        A
                      </span>
                      <span className="text-[10px] font-semibold uppercase tracking-[0.2em] text-rose-100">
                        情景
                      </span>
                    </div>
                    <div className="min-w-0 flex-1 border-t border-rose-100/80 p-4 sm:border-t-0 sm:border-l sm:border-rose-100/80 md:p-5">
                      <div className="flex flex-wrap items-baseline gap-2">
                        <h3 className="text-base font-bold text-rose-950 md:text-lg">
                          持续高压下的「刺猬化」延伸
                        </h3>
                        <span className="rounded-full bg-rose-600/15 px-2.5 py-0.5 text-xs font-bold text-rose-900 ring-1 ring-rose-400/40">
                          可能性：高
                        </span>
                      </div>
                      <div className="mt-4 space-y-4">
                        <div>
                          <p className="text-xs font-bold uppercase tracking-wider text-rose-800/90">
                            特征
                          </p>
                          <p className="mt-1.5 text-sm leading-relaxed text-[var(--report-text)] md:text-[15px]">
                            大陆持续环台战备警巡，但不跨越最后红线。
                          </p>
                        </div>
                        <div className="rounded-xl border border-rose-200/60 bg-white/80 px-3 py-3 md:px-4 md:py-3.5">
                          <p className="text-xs font-bold text-rose-900">
                            赖的行为匹配
                          </p>
                          <p className="mt-2 text-sm leading-relaxed md:text-[15px]">
                            他将加速推进
                            <strong className="font-bold text-rose-950">
                              「不对称战力」
                            </strong>
                            。目前的轨迹（如大力研发自制无人机、采购星链类似卫星系统）完全吻合。他会继续利用外部压力作为理由，推动内部原本难以通过的争议性法案（如更长的兵役期或更高的国防开支）。
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </article>

                {/* 情景 B · 自主转向 */}
                <article className="overflow-hidden rounded-2xl border-2 border-sky-300/70 bg-gradient-to-br from-sky-50/80 via-white to-indigo-50/40 shadow-[0_10px_40px_-16px_rgba(14,116,144,0.2)] ring-1 ring-sky-200/50">
                  <div className="flex flex-col sm:flex-row sm:items-stretch">
                    <div className="flex shrink-0 items-center justify-center gap-2 bg-gradient-to-br from-sky-600 to-indigo-800 px-4 py-4 text-white sm:w-24 sm:flex-col sm:py-8 md:w-28">
                      <span className="text-3xl font-black leading-none md:text-4xl">
                        B
                      </span>
                      <span className="text-[10px] font-semibold uppercase tracking-[0.2em] text-sky-100">
                        情景
                      </span>
                    </div>
                    <div className="min-w-0 flex-1 border-t border-sky-100/80 p-4 sm:border-t-0 sm:border-l sm:border-sky-100/80 md:p-5">
                      <div className="flex flex-wrap items-baseline gap-2">
                        <h3 className="text-base font-bold text-sky-950 md:text-lg">
                          美台关系波动下的「自主转向」
                        </h3>
                        <span className="rounded-full bg-sky-600/15 px-2.5 py-0.5 text-xs font-bold text-sky-950 ring-1 ring-sky-400/40">
                          可能性：中
                        </span>
                      </div>
                      <div className="mt-4 space-y-4">
                        <div>
                          <p className="text-xs font-bold uppercase tracking-wider text-sky-800/90">
                            特征
                          </p>
                          <p className="mt-1.5 text-sm leading-relaxed text-[var(--report-text)] md:text-[15px]">
                            若美方因内部政治波动（如 2024
                            大选后的政策调整）减少支持承诺。
                          </p>
                        </div>
                        <div className="rounded-xl border border-sky-200/60 bg-white/80 px-3 py-3 md:px-4 md:py-3.5">
                          <p className="text-xs font-bold text-sky-950">
                            赖的行为匹配
                          </p>
                          <p className="mt-2 text-sm leading-relaxed md:text-[15px]">
                            他的轨迹将从「强调国际支持」迅速转向
                            <strong className="font-bold text-indigo-950">
                              「民族主义式自主」
                            </strong>
                            。观察点在于他是否会突然增加与日本、欧洲非官方安全团体的互动，作为「美方支持下降」的补偿。
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </article>

                {/* 情景 C · 行政扩权 */}
                <article className="overflow-hidden rounded-2xl border-2 border-amber-300/70 bg-gradient-to-br from-amber-50/90 via-white to-orange-50/50 shadow-[0_10px_40px_-16px_rgba(180,83,9,0.18)] ring-1 ring-amber-200/50">
                  <div className="flex flex-col sm:flex-row sm:items-stretch">
                    <div className="flex shrink-0 items-center justify-center gap-2 bg-gradient-to-br from-amber-500 to-orange-800 px-4 py-4 text-white sm:w-24 sm:flex-col sm:py-8 md:w-28">
                      <span className="text-3xl font-black leading-none md:text-4xl">
                        C
                      </span>
                      <span className="text-[10px] font-semibold uppercase tracking-[0.2em] text-amber-100">
                        情景
                      </span>
                    </div>
                    <div className="min-w-0 flex-1 border-t border-amber-100/80 p-4 sm:border-t-0 sm:border-l sm:border-amber-100/80 md:p-5">
                      <div className="flex flex-wrap items-baseline gap-2">
                        <h3 className="text-base font-bold text-amber-950 md:text-lg">
                          内部政局僵持导致的「行政扩权」
                        </h3>
                        <span className="rounded-full bg-amber-600/15 px-2.5 py-0.5 text-xs font-bold text-amber-950 ring-1 ring-amber-400/45">
                          可能性：中
                        </span>
                      </div>
                      <div className="mt-4 space-y-4">
                        <div>
                          <p className="text-xs font-bold uppercase tracking-wider text-amber-900/90">
                            特征
                          </p>
                          <p className="mt-1.5 text-sm leading-relaxed text-[var(--report-text)] md:text-[15px]">
                            在野党在立法机构持续阻挠国安预算或反间谍法案。
                          </p>
                        </div>
                        <div className="rounded-xl border border-amber-200/70 bg-white/85 px-3 py-3 md:px-4 md:py-3.5">
                          <p className="text-xs font-bold text-amber-950">
                            赖的行为匹配
                          </p>
                          <p className="mt-2 text-sm leading-relaxed md:text-[15px]">
                            他可能绕过立法程序，通过
                            <strong className="font-bold text-amber-950">
                              「国家安全行政命令」
                            </strong>
                            或利用
                            <strong className="font-bold text-amber-950">
                              「总统」
                            </strong>
                            在国安事务上的专属裁量权进行防御性布局。最近他在人事任命上的强硬姿态（不经协商直接任命相关委员会成员）暗示了这一趋势。
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </article>
              </div>
            </div>
          ) : null}
        </div>
      ))}
    </div>
  );
}
