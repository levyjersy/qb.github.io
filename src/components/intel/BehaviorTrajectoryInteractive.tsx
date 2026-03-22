"use client";

import { useId, useState } from "react";

import { BehaviorPatternRecognition } from "@/components/intel/BehaviorPatternRecognition";
import { BehaviorTrendForecast } from "@/components/intel/BehaviorTrendForecast";

type TabId = "trend" | "elements" | "pattern";

const TABS: { id: TabId; label: string; hint: string }[] = [
  { id: "trend", label: "趋势预判", hint: "结构化解读与近期归纳" },
  { id: "elements", label: "轨迹元素", hint: "构成公开轨迹的观测单元" },
  { id: "pattern", label: "模式识别", hint: "重复路径与行为簇" },
];

/** 2026 年公开行程与活动示意表（轨迹元素样本） */
const TRAJECTORY_ELEMENTS_ROWS: {
  time: string;
  location: string;
  behavior: string;
  people: string;
  source: string;
}[] = [
  {
    time: "1月1日",
    location: "台北（总统府）",
    behavior:
      "发表元旦讲话：强调国防预算（约 1.25 万亿新台币）与社会韧性。",
    people: "府内幕僚、各部会首长",
    source: "官方公报 / Focus Taiwan",
  },
  {
    time: "1月6日",
    location: "台北",
    behavior: "会晤外交访问团：强调民主供应链韧性。",
    people: "欧洲议会访问团（加勒率领）",
    source: "总统府新闻稿",
  },
  {
    time: "1月13日",
    location: "台北",
    behavior: "闭门会谈：讨论印太安全与跨太平洋伙伴关系。",
    people: "加拿大议员访问团",
    source: "总统府新闻稿",
  },
  {
    time: "3月3日",
    location: "嘉义县",
    behavior:
      "主持灯会开幕：视察无人机基地规划，谈及台积电先进封装厂。",
    people: "嘉义县长、台积电相关人员",
    source: "Taiwan Today",
  },
  {
    time: "3月12日",
    location: "台北（外交部）",
    behavior: "出席春宴：感谢邦交国支持，强调台海现状不变。",
    people: "各国驻台使节、外交部长林佳龙",
    source: "总统府新闻稿",
  },
  {
    time: "3月中旬",
    location: "未公开（活动现场）",
    behavior:
      "发表争议性言论：谈及日本殖民历史与「东亚共荣」相关表述。",
    people: "社会团体、媒体",
    source: "中国外交部例行记者会",
  },
  {
    time: "3月21日",
    location: "兴达电厂",
    behavior:
      "出席体育／基层活动：参加台电杯足球赛（注：示意表中标注为当日正在发生的活动）。",
    people: "基层球员、国营事业管理层",
    source: "焦点时报",
  },
];

const TRAJECTORY_ELEMENTS_OBSERVATION =
  "可以观察到：在防务预算审查与对岸压力加大的时间窗前后，军队视察和对外安全话语有同步加码的趋势，体现出将总统行程与国会攻防、对外吁求相互配合的时序安排。";

export function BehaviorTrajectoryInteractive() {
  const baseId = useId();
  const [active, setActive] = useState<TabId>("trend");

  const btnBase =
    "flex-1 rounded-xl border-2 px-2 py-2.5 text-center text-xs font-semibold transition-all duration-200 sm:px-3 md:py-3.5 md:text-sm";
  const btnIdle =
    "border-[var(--ui-border)] bg-[var(--ui-surface)] hover:bg-slate-50/90 hover:shadow-sm";
  const btnActive =
    "border-[var(--ui-coral)] bg-[var(--ui-coral-soft)] shadow-md ring-2 ring-[var(--ui-coral)] ring-offset-2";

  return (
    <div className="behavior-trajectory-interactive space-y-5">
      <div
        className="rounded-2xl border border-[var(--ui-border)] bg-gradient-to-b from-slate-50/90 to-white p-1.5 shadow-inner md:p-2"
        role="tablist"
        aria-label="行为轨迹子分类"
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
                <span className="block">{t.label}</span>
                <span className="mt-0.5 block text-[10px] font-normal text-[var(--ui-muted)] md:text-[11px]">
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
          className="rounded-xl border border-[var(--ui-border)] bg-gradient-to-b from-white to-slate-50/40 p-4 shadow-sm ring-1 ring-black/[0.02] md:p-6"
        >
          {t.id === "trend" ? (
            <div className="space-y-2">
              <p className="text-sm font-semibold text-[var(--ui-navy)]">
                趋势预判
              </p>
              <p className="text-xs text-[var(--ui-muted)]">
                可在「结构化解读」与「近期归纳」之间切换；后者支持要点展开阅读。
              </p>
              <BehaviorTrendForecast />
            </div>
          ) : null}

          {t.id === "elements" ? (
            <div className="space-y-4 text-sm leading-relaxed text-[var(--report-text)]">
              <div>
                <p className="font-semibold text-[var(--ui-navy)]">
                  轨迹元素：可分解的观测单元
                </p>
                <p className="mt-2">
                  「轨迹」在此指可记录的公开行为链条：职务变迁、政策宣示、人事布局与对外沟通。下表为
                  2026 年部分行程与活动整理，每一行可视为一条可标注来源、时间与上下文的观测记录。
                </p>
              </div>

              <div className="overflow-x-auto rounded-lg border border-[var(--ui-border)] bg-white shadow-sm">
                <table className="w-full min-w-[640px] border-collapse text-left text-xs md:text-sm">
                  <caption className="border-b border-[var(--ui-border)] bg-slate-50/90 px-3 py-2 text-left text-xs font-semibold text-[var(--ui-navy)] md:px-4">
                    2026 年行程与活动（示意）
                  </caption>
                  <thead>
                    <tr className="border-b border-[var(--ui-border)] bg-slate-100/90 text-[var(--ui-navy)]">
                      <th
                        scope="col"
                        className="border border-[var(--ui-border)] px-2 py-2 text-center font-semibold md:px-3"
                      >
                        时间（2026 年）
                      </th>
                      <th
                        scope="col"
                        className="border border-[var(--ui-border)] px-2 py-2 text-center font-semibold md:px-3"
                      >
                        地点
                      </th>
                      <th
                        scope="col"
                        className="border border-[var(--ui-border)] px-2 py-2 text-center font-semibold md:px-3"
                      >
                        行为方式
                      </th>
                      <th
                        scope="col"
                        className="border border-[var(--ui-border)] px-2 py-2 text-center font-semibold md:px-3"
                      >
                        核心人员／对象
                      </th>
                      <th
                        scope="col"
                        className="border border-[var(--ui-border)] px-2 py-2 text-center font-semibold md:px-3"
                      >
                        信息来源
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {TRAJECTORY_ELEMENTS_ROWS.map((row) => (
                      <tr
                        key={`${row.time}-${row.location}`}
                        className="align-top odd:bg-white even:bg-slate-50/50"
                      >
                        <td className="border border-[var(--ui-border)] px-2 py-2 text-center whitespace-nowrap md:px-3">
                          {row.time}
                        </td>
                        <td className="border border-[var(--ui-border)] px-2 py-2 md:px-3">
                          {row.location}
                        </td>
                        <td className="border border-[var(--ui-border)] px-2 py-2 md:px-3">
                          {row.behavior}
                        </td>
                        <td className="border border-[var(--ui-border)] px-2 py-2 md:px-3">
                          {row.people}
                        </td>
                        <td className="border border-[var(--ui-border)] px-2 py-2 md:px-3">
                          {row.source}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <div
                className="relative overflow-hidden rounded-xl border-2 border-[var(--ui-coral)]/40 bg-gradient-to-br from-[var(--ui-coral-soft)] via-white to-slate-50/95 p-1 shadow-[0_8px_30px_-8px_rgba(255,107,107,0.25)] ring-1 ring-[var(--ui-navy)]/[0.08] md:p-1.5"
                role="note"
                aria-label="观察归纳"
              >
                <div className="absolute left-0 top-0 h-full w-1.5 bg-gradient-to-b from-[var(--ui-coral)] via-[var(--ui-coral)]/90 to-[var(--ui-navy)]/70" />
                <div className="relative rounded-lg bg-white/75 px-4 py-4 pl-6 backdrop-blur-[2px] md:px-5 md:py-5 md:pl-7">
                  <div className="flex flex-wrap items-center gap-2 gap-y-1">
                    <span className="inline-flex items-center rounded-md bg-[var(--ui-coral)] px-2.5 py-1 text-[10px] font-bold uppercase tracking-[0.2em] text-white shadow-sm md:text-[11px]">
                      观察归纳
                    </span>
                    <span className="text-[10px] font-medium text-[var(--ui-muted)] md:text-xs">
                      基于上表行程的要点提炼
                    </span>
                  </div>
                  <p className="mt-3 border-t border-[var(--ui-border)]/80 pt-3 text-sm font-medium leading-relaxed text-[var(--report-text)] md:text-[15px] md:leading-[1.65]">
                    {TRAJECTORY_ELEMENTS_OBSERVATION}
                  </p>
                </div>
              </div>

              <div className="grid gap-3 sm:grid-cols-2">
                <div className="rounded-lg border border-[var(--ui-border)] bg-white/80 p-3 text-xs">
                  <p className="font-semibold text-[var(--ui-navy)]">结构元素</p>
                  <p className="mt-1 text-[var(--ui-muted)]">
                    府院角色、党职与立法互动中的位置变化。
                  </p>
                </div>
                <div className="rounded-lg border border-[var(--ui-border)] bg-white/80 p-3 text-xs">
                  <p className="font-semibold text-[var(--ui-navy)]">话语元素</p>
                  <p className="mt-1 text-[var(--ui-muted)]">
                    关键词频次、修辞框架与对特定族群的强调。
                  </p>
                </div>
              </div>
            </div>
          ) : null}

          {t.id === "pattern" ? (
            <div className="space-y-4 text-sm leading-relaxed text-[var(--report-text)]">
              <div>
                <p className="font-semibold text-[var(--ui-navy)]">
                  模式识别：战略行为与空间轨迹
                </p>
                <p className="mt-2 text-[var(--ui-muted)]">
                  在足够样本下可归纳行为簇与重复脚本；下列信息图与交互面板将「空间聚类」与「固定／异常行为」对照，便于缩小推演分支（模式不等于因果）。
                </p>
              </div>
              <BehaviorPatternRecognition />
            </div>
          ) : null}
        </div>
      ))}
    </div>
  );
}
