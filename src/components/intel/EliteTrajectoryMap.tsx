"use client";

import Image from "next/image";
import { Fragment, useCallback, useId, useState } from "react";

type StepId = "s1" | "s2" | "s3" | "s4" | "s5";

type Step = {
  id: StepId;
  title: string;
  icon: string;
  badge?: string;
  lines: string[];
};

const ESSENCE =
  "路径本质：一条高度依赖考试与专业技能、而非家庭资源或政治背景的「技术性上升通道」。整体结论：典型「草根家庭通过教育实现阶层跃迁」的案例。";

const STEPS: Step[] = [
  {
    id: "s1",
    title: "底层家庭与基础教育",
    icon: "🏘️",
    lines: [
      "情境：北台湾矿区（万里区）基础教育环境。",
      "家庭：居住于底层劳动者聚居区；父亲矿工、矿难早逝；母亲独自抚养六名子女。",
    ],
  },
  {
    id: "s2",
    title: "顶级中学筛选",
    icon: "🎓",
    lines: [
      "考入台北市立建国中学（顶尖高中之一）。",
      "象征突破原有阶层环境，为万里乡首位考入该校者。",
    ],
  },
  {
    id: "s3",
    title: "顶级大学专业教育",
    icon: "🏛️",
    lines: [
      "进入台湾大学复健医学系。",
      "标志从底层进入精英教育体系的第一次重大跃迁。",
    ],
  },
  {
    id: "s4",
    title: "医学职业训练",
    icon: "⚕️",
    lines: [
      "考入成功大学学士后医学系，完成医学专业训练。",
      "进入医疗体系（成大医院、新楼医院等任住院/主治医师）。",
      "由「教育跃迁」转向「职业跃迁」，进入中产/专业精英阶段。",
    ],
  },
  {
    id: "s5",
    title: "国际公共卫生深造",
    icon: "🌐",
    badge: "关键转折点",
    lines: [
      "取得哈佛大学公共卫生硕士学位。",
      "强化专业能力与国际视野下的公共政策认知。",
      "由临床医师走向公共事务与社会治理，为进入政治体系的重要转折。",
    ],
  },
];

const LEGITIMACY =
  "政治合法性来源：「医学专业背景」与「草根出身」的组合，构成其政治正当性的核心叙事基础。";

const DRIVERS = [
  { label: "家庭", text: "提供压力与方向指引。" },
  { label: "教育", text: "提供制度化的上升渠道。" },
  { label: "职业", text: "医学职业成为衔接社会与政治的桥梁，最终推动其进入公共权力体系。" },
];

const stepCardClass =
  "border-[var(--ui-border)] bg-[var(--ui-surface)] hover:bg-slate-50/90";

export function EliteTrajectoryMap() {
  const baseId = useId();
  const [active, setActive] = useState<StepId>("s1");
  const [mobileOpen, setMobileOpen] = useState<StepId | null>(null);

  const select = useCallback((id: StepId) => {
    setActive(id);
    setMobileOpen((prev) => (prev === id ? null : id));
  }, []);

  return (
    <div className="elite-trajectory-map mt-4 space-y-6">
      <div className="overflow-hidden rounded-xl border border-[var(--ui-border)] bg-white shadow-sm">
        <Image
          src="/image/mialuo.png"
          alt="「精英筛选式跃迁」脉络图"
          width={1920}
          height={1080}
          className="h-auto w-full object-contain"
          sizes="(max-width: 1024px) 100vw, 896px"
          priority={false}
        />
      </div>

      <div className="text-center">
        <p className="text-sm font-bold text-[var(--ui-navy)] md:text-base">
          「精英筛选式跃迁」脉络图
        </p>
      </div>

      <div className="rounded-xl border border-[var(--ui-border)] bg-slate-50/80 px-4 py-3 text-sm leading-relaxed text-[var(--report-text)] md:px-5 md:py-4">
        {ESSENCE}
      </div>

      {/* 桌面：横向时间线 + >> */}
      <div className="hidden lg:block">
        <div className="flex flex-wrap items-stretch justify-center gap-x-1 gap-y-4 xl:flex-nowrap">
          {STEPS.map((step, idx) => (
            <Fragment key={step.id}>
              <article
                role="button"
                tabIndex={0}
                aria-pressed={active === step.id}
                aria-labelledby={`${baseId}-${step.id}-t`}
                onClick={() => setActive(step.id)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    setActive(step.id);
                  }
                }}
                className={`flex min-h-[280px] w-[200px] shrink-0 cursor-pointer flex-col rounded-xl border-2 p-3 text-left shadow-sm transition-all duration-200 xl:w-[min(18%,220px)] ${stepCardClass} ${
                  active === step.id
                    ? "scale-[1.03] ring-2 ring-[var(--ui-coral)] ring-offset-2"
                    : "opacity-90 hover:scale-[1.02] hover:shadow-md"
                }`}
              >
                <div className="mb-2 flex items-center gap-2">
                  <span className="text-xl" aria-hidden>
                    {step.icon}
                  </span>
                  <span className="text-xs font-bold text-[var(--ui-navy)]">
                    {idx + 1}/5
                  </span>
                </div>
                <h4
                  id={`${baseId}-${step.id}-t`}
                  className="text-xs font-bold leading-snug text-[var(--ui-navy)]"
                >
                  {step.title}
                  {step.badge ? (
                    <span className="mt-1 block text-[10px] font-semibold text-[var(--ui-coral)]">
                      {step.badge}
                    </span>
                  ) : null}
                </h4>
                <ul className="mt-2 space-y-1.5 text-[11px] leading-relaxed text-[var(--report-text)]">
                  {step.lines.map((line, i) => (
                    <li key={i}>· {line}</li>
                  ))}
                </ul>
              </article>
              {idx < STEPS.length - 1 ? (
                <div
                  className="flex shrink-0 items-center self-center px-0.5 text-base font-bold text-[var(--ui-muted)] xl:px-1 xl:text-lg"
                  aria-hidden
                >
                  &gt;&gt;
                </div>
              ) : null}
            </Fragment>
          ))}
        </div>
      </div>

      {/* 中小屏：手风琴 */}
      <div className="space-y-2 lg:hidden">
        {STEPS.map((step, idx) => {
          const open = mobileOpen === step.id;
          return (
            <div
              key={step.id}
              className={`overflow-hidden rounded-xl border-2 shadow-sm ${stepCardClass}`}
            >
              <button
                type="button"
                className="flex w-full items-center justify-between gap-2 px-4 py-3 text-left"
                aria-expanded={open}
                aria-controls={`${baseId}-p-${step.id}`}
                id={`${baseId}-b-${step.id}`}
                onClick={() => select(step.id)}
              >
                <span className="flex items-center gap-2 text-sm font-bold text-[var(--ui-navy)]">
                  <span aria-hidden>{step.icon}</span>
                  <span>
                    {idx + 1}. {step.title}
                    {step.badge ? (
                      <span className="ml-1 text-xs font-semibold text-[var(--ui-coral)]">
                        （{step.badge}）
                      </span>
                    ) : null}
                  </span>
                </span>
                <span
                  className={`text-[var(--ui-coral)] transition-transform ${open ? "rotate-180" : ""}`}
                  aria-hidden
                >
                  ▼
                </span>
              </button>
              {open ? (
                <div
                  id={`${baseId}-p-${step.id}`}
                  role="region"
                  aria-labelledby={`${baseId}-b-${step.id}`}
                  className="border-t border-black/5 px-4 pb-4 pt-2"
                >
                  <ul className="space-y-2 text-sm leading-relaxed text-[var(--report-text)]">
                    {step.lines.map((line, i) => (
                      <li key={i}>· {line}</li>
                    ))}
                  </ul>
                </div>
              ) : null}
            </div>
          );
        })}
      </div>

      <div className="space-y-4 rounded-xl border border-slate-200 bg-gradient-to-b from-slate-50 to-white p-4 shadow-inner md:p-5">
        <p className="text-sm font-semibold leading-relaxed text-[var(--ui-navy)]">
          {LEGITIMACY}
        </p>
        <div className="border-t border-[var(--ui-border)] pt-4">
          <p className="mb-3 text-xs font-bold uppercase tracking-wide text-[var(--ui-muted)]">
            根本驱动力
          </p>
          <ul className="space-y-3 text-sm leading-relaxed text-[var(--report-text)]">
            {DRIVERS.map((d) => (
              <li key={d.label}>
                <span className="font-semibold text-[var(--ui-navy)]">
                  {d.label}
                </span>
                ：{d.text}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
