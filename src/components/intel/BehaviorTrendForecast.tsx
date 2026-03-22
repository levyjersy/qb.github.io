"use client";

import { useId, useState } from "react";

type TrendSection = "analysis" | "recent";

const SECTIONS: { id: TrendSection; label: string; desc: string }[] = [
  {
    id: "analysis",
    label: "结构化解读",
    desc: "战略重点与政策脚本",
  },
  {
    id: "recent",
    label: "近期归纳",
    desc: "强度变化与信号",
  },
];

const RECENT_SUMMARY_LEAD =
  "近期几项特征值得注意，但更像是强度变化而非方向突变。";

const RECENT_SUMMARY_POINTS: {
  id: string;
  title: string;
  body: string;
}[] = [
  {
    id: "inspect",
    title: "军事视察密度与象征性提高",
    body: "在短时间内选择潜舰这一高度敏感且具象征意义的武器系统，且与特别防务预算审查与对岸灰色地带行动时间点叠合，显示其在防务议题上的前台曝光意愿提高，较一般基地或演训视察更具信号性。",
  },
  {
    id: "indo",
    title: "对「印太伙伴」叙事的持续放大",
    body: "玉山论坛与外交春宴相连，使 3 月中旬几乎成为「印太多边周」，与单一双边访问相比，更强调区域框架与多边网络，也反映对美、日等伙伴安全与经贸连结的持续依赖。",
  },
  {
    id: "discourse",
    title: "话语上强化「韧性、团队、团结」",
    body: "从 1 月新年谈话到 3 月多边场合，赖一再使用「韧性台湾」「国家团队＋国际团队」「民主团结」等关键词，说明在内外压力叠加的环境下，其行动轨迹背后的叙事已经从纯粹「抗压」升级为「需内外同步结盟」的结构性话语。",
  },
];

export function BehaviorTrendForecast() {
  const uid = useId();
  const [section, setSection] = useState<TrendSection>("analysis");
  const [openPoint, setOpenPoint] = useState<string | null>(
    RECENT_SUMMARY_POINTS[0]?.id ?? null,
  );

  const segBase =
    "flex-1 rounded-xl border-2 px-3 py-2.5 text-center transition-all duration-200 md:px-4 md:py-3";
  const segIdle =
    "border-[var(--ui-border)] bg-white/90 hover:bg-slate-50/90 hover:shadow-sm";
  const segOn =
    "border-[var(--ui-coral)] bg-[var(--ui-coral-soft)] shadow-sm ring-2 ring-[var(--ui-coral)]/35";

  return (
    <div className="behavior-trend-forecast space-y-5 text-sm leading-relaxed text-[var(--report-text)]">
      <div
        className="rounded-2xl border border-[var(--ui-border)] bg-gradient-to-b from-slate-50/90 to-white p-1.5 shadow-inner md:p-2"
        role="tablist"
        aria-label="趋势预判阅读视图"
      >
        <div className="flex gap-1.5 md:gap-2">
          {SECTIONS.map((s) => {
            const on = section === s.id;
            return (
              <button
                key={s.id}
                type="button"
                role="tab"
                aria-selected={on}
                id={`${uid}-sec-${s.id}`}
                aria-controls={`${uid}-panel-${s.id}`}
                className={`${segBase} ${on ? segOn : segIdle}`}
                onClick={() => setSection(s.id)}
              >
                <span className="block text-xs font-semibold text-[var(--ui-navy)] md:text-sm">
                  {s.label}
                </span>
                <span className="mt-0.5 block text-[10px] font-normal text-[var(--ui-muted)] md:text-[11px]">
                  {s.desc}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {section === "analysis" ? (
        <div
          id={`${uid}-panel-analysis`}
          role="tabpanel"
          aria-labelledby={`${uid}-sec-analysis`}
          className="space-y-5"
        >
          <div>
            <p className="font-semibold text-[var(--ui-navy)]">
              轨迹反映的战略重点
            </p>
            <p className="mt-2">
              从 2026 年 1 月到 3 月的轨迹来看，赖清德正处于
              <strong className="font-semibold text-[var(--ui-navy)]">
                「内部预算防御」
              </strong>
              与
              <strong className="font-semibold text-[var(--ui-navy)]">
                「外部价值突围」
              </strong>
              的交织期。
            </p>
          </div>

          <ul className="space-y-4 border-l-2 border-[var(--ui-coral)]/35 pl-4">
            <li>
              <p className="font-semibold text-[var(--ui-navy)]">军事层面</p>
              <p className="mt-1 text-[var(--report-text)]">
                约 1.25 万亿新台币的国防预算是其轨迹核心，所有接见外宾的行为均在为该预算的合理性做背书。
              </p>
            </li>
            <li>
              <p className="font-semibold text-[var(--ui-navy)]">外交层面</p>
              <p className="mt-1 text-[var(--report-text)]">
                避开近期频繁的「过境美方」传闻（官方多次否认），采取先稳固非洲、太平洋友邦的「迂回战术」，等待更合适的政治窗口。在外交部春宴与玉山论坛上，赖采用公开演讲＋与会宾客寒暄会谈的组合，一方面向驻台使节及印太伙伴传递「民主、和平、韧性」叙事，一方面强化台湾在区域合作中的节点角色，典型对象为外国大使、国会议员及智库代表。
              </p>
            </li>
            <li>
              <p className="font-semibold text-[var(--ui-navy)]">对内政策脚本</p>
              <p className="mt-1 text-[var(--report-text)]">
                新年谈话中，通过全国性演说设定「安全、智慧、均衡、民主团结」的四大政策目标，属于对内塑造执政正当性和优先序的年度级话语节点，通常配合媒体联播与各部会后续政策包装。
              </p>
            </li>
            <li>
              <p className="font-semibold text-[var(--ui-navy)]">军事与威慑脚本</p>
              <p className="mt-1 text-[var(--report-text)]">
                高雄潜舰视察将「登舰检查＋战力说明＋对外公开画面」三者结合，在中国海警与灰色地带活动增加、以及特别防务预算即将审查的背景下，形成「外有威胁—内有强军—需国会支持预算」的连续叙事，典型对象为海军高层、造舰团队与国内外舆论。
              </p>
            </li>
          </ul>

          <p className="rounded-lg border border-dashed border-[var(--ui-border)] bg-slate-50/80 px-3 py-3 text-sm md:px-4">
            从长期轨迹视角来看，这些脚本与赖过去担任副总统、总统候选人时期「危机中必有对内讲话和对外沟通」的模式相符，属于稳定的行为模式而非突然转向。
          </p>
        </div>
      ) : null}

      {section === "recent" ? (
        <div
          id={`${uid}-panel-recent`}
          role="tabpanel"
          aria-labelledby={`${uid}-sec-recent`}
          className="space-y-4"
        >
          <div className="rounded-xl border border-[var(--ui-navy)]/15 bg-gradient-to-br from-[var(--ui-navy)]/[0.06] to-white px-4 py-4 shadow-sm md:px-5 md:py-5">
            <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-[var(--ui-coral)]">
              总结
            </p>
            <p className="mt-2 text-base font-semibold leading-snug text-[var(--ui-navy)] md:text-lg">
              {RECENT_SUMMARY_LEAD}
            </p>
          </div>

          <div className="space-y-2" role="list">
            {RECENT_SUMMARY_POINTS.map((item) => {
              const expanded = openPoint === item.id;
              return (
                <div
                  key={item.id}
                  role="listitem"
                  className="overflow-hidden rounded-xl border border-[var(--ui-border)] bg-white shadow-sm transition-shadow hover:shadow-md"
                >
                  <button
                    type="button"
                    aria-expanded={expanded}
                    aria-controls={`${uid}-pt-${item.id}`}
                    className="flex w-full items-start gap-3 px-4 py-3 text-left md:px-4 md:py-3.5"
                    onClick={() =>
                      setOpenPoint((prev) =>
                        prev === item.id ? null : item.id,
                      )
                    }
                  >
                    <span
                      className={`mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-lg text-xs font-bold ${
                        expanded
                          ? "bg-[var(--ui-coral)] text-white"
                          : "bg-slate-100 text-[var(--ui-navy)]"
                      }`}
                      aria-hidden
                    >
                      {expanded ? "−" : "+"}
                    </span>
                    <span className="min-w-0 flex-1 pt-0.5 font-semibold text-[var(--ui-navy)] md:text-[15px]">
                      {item.title}
                    </span>
                  </button>
                  <div
                    id={`${uid}-pt-${item.id}`}
                    role="region"
                    aria-hidden={!expanded}
                    className={`grid transition-[grid-template-rows] duration-200 ease-out ${
                      expanded ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
                    }`}
                  >
                    <div className="min-h-0 overflow-hidden">
                      <p className="border-t border-[var(--ui-border)]/80 px-4 pb-4 pl-[4.25rem] pr-4 text-sm leading-relaxed text-[var(--report-text)] md:pl-[4.5rem]">
                        {item.body}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          <p className="text-center text-[11px] text-[var(--ui-muted)]">
            点击标题可展开或收起全文；默认为展开第一项。
          </p>
        </div>
      ) : null}

      <div className="rounded-xl border-2 border-amber-200/80 bg-gradient-to-br from-amber-50/90 to-orange-50/40 p-4 md:p-5">
        <p className="text-xs font-bold uppercase tracking-wider text-amber-900/90">
          未来轨迹预判
        </p>
        <p className="mt-2 text-[var(--report-text)]">
          由于其在 3 月中旬发表了针对日本历史的敏感言论，未来 1–2
          周内需密切观察其是否会前往前线岛屿（如金门、马祖）或空军基地进行巡视。按照其「应对脚本」，在言论引发外部高压后，他通常会通过视察军队来展现「无惧威慑」的姿态。
        </p>
      </div>
    </div>
  );
}
