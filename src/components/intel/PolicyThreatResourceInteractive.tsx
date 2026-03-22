"use client";

import Image from "next/image";
import { useId } from "react";

import zhengce from "@root-image/zhengce.png";

const P1_SECTIONS: {
  id: string;
  label: string;
  body: string;
}[] = [
  {
    id: "p1-core",
    label: "核心判断",
    body: "认为对岸最有效的手段未必是全面登陆作战，而是透过内部对立与社会动员，造成政府与社会「功能性瘫痪」。",
  },
  {
    id: "p1-resource",
    label: "资源投向",
    body: "数位发展部（moda）、国安局等面向社群监测、假讯息溯源的预算显著加码，体现对认知域与渗透链路的优先配置。",
  },
  {
    id: "p1-law",
    label: "法律修订",
    body: "推动《反渗透条例》等修法讨论，将「AI 驱动的认知战」等新型态纳入规范与裁罚框架。",
  },
];

const P2_SECTIONS: {
  id: string;
  label: string;
  body: string;
}[] = [
  {
    id: "p2-core",
    label: "核心判断",
    body: "应对主轴强调「韧性化」：目标未必是在正面战场决胜，而是在封锁与灰色地带压力下维持社会基本运转。",
  },
  {
    id: "p2-infra",
    label: "资源与基础设施",
    body: "海巡大型舰艇建置、能源与粮食储备的去中心化配置，以降低单点中断风险。",
  },
  {
    id: "p2-hr",
    label: "人事布局",
    body: "在经济、能源等部会倾向任用具「自主防卫」取向的技术官僚，使产业与能源政策与安全叙事同轨。",
  },
];

export function PolicyThreatResourceInteractive() {
  const uid = useId();

  return (
    <div className="policy-threat-resource space-y-6 text-sm leading-relaxed text-[var(--report-text)]">
      <div className="border-b border-[var(--ui-border)]/70 pb-4">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[var(--ui-coral)]">
          对照
        </p>
        <p className="mt-2 text-lg font-bold text-[var(--ui-navy)] md:text-xl">
          威胁认知与资源投向分析
        </p>
        <p className="mt-3 max-w-3xl text-[var(--ui-muted)]">
          下图整理「威胁排序」与预算、人事的对应关系；下方双栏可与图对照阅读，各小节默认全文展示。
        </p>
      </div>

      <figure className="overflow-hidden rounded-2xl border border-slate-700/40 bg-gradient-to-b from-slate-900 via-slate-950 to-slate-900 shadow-[0_20px_60px_-24px_rgba(15,23,42,0.55)] ring-1 ring-white/10">
        <Image
          src={zhengce}
          alt="赖清德「威胁排序」位移分析：2025–2026 财年预算与人事布局视角信息图"
          width={zhengce.width}
          height={zhengce.height}
          className="h-auto w-full object-contain"
          sizes="(max-width: 1024px) 100vw, 896px"
          priority={false}
        />
        <figcaption className="border-t border-white/10 bg-slate-950/90 px-4 py-3 text-center text-[11px] leading-snug text-slate-400 md:px-6 md:text-xs">
          <span className="font-semibold text-slate-200">
            赖清德「威胁排序」位移分析
          </span>
          <span className="mt-1 block text-slate-500">
            2025–2026 财年预算与人事布局视角 · 可结合下方分栏文字对照
          </span>
        </figcaption>
      </figure>

      <div className="flex flex-col gap-6 lg:flex-row lg:items-stretch lg:gap-5">
        <section
          className="min-w-0 flex-1 rounded-2xl border border-indigo-200/90 bg-gradient-to-br from-indigo-50/90 via-white to-violet-50/50 p-4 shadow-md ring-1 ring-indigo-900/5 md:p-5"
          aria-labelledby={`${uid}-p1-h`}
        >
          <div className="flex flex-wrap items-baseline justify-between gap-2 border-b border-indigo-200/70 pb-3">
            <p
              id={`${uid}-p1-h`}
              className="text-[10px] font-bold uppercase tracking-[0.25em] text-indigo-600"
            >
              第一顺位
            </p>
            <span className="rounded-full bg-indigo-600/10 px-2.5 py-0.5 text-[11px] font-semibold text-indigo-900">
              认知战与内部渗透
            </span>
          </div>
          <p className="mt-2 text-xs text-indigo-950/80 md:text-sm">
            Hybrid Warfare · 混合战叙事下的优先排序
          </p>
          <div className="mt-4 space-y-3">
            {P1_SECTIONS.map((s) => {
              const isCore = s.label === "核心判断";
              return (
                <article
                  key={s.id}
                  className={
                    isCore
                      ? "overflow-hidden rounded-xl border-2 border-indigo-500/70 border-l-4 border-l-indigo-600 bg-white shadow-[0_8px_30px_-12px_rgba(79,70,229,0.35)] ring-2 ring-indigo-400/25"
                      : "overflow-hidden rounded-xl border border-indigo-300/60 bg-white shadow-sm ring-1 ring-indigo-200/40"
                  }
                >
                  <h3
                    className={
                      isCore
                        ? "border-b border-indigo-200/80 bg-gradient-to-r from-indigo-600 to-violet-600 px-3 py-3 text-base font-bold tracking-wide text-white shadow-inner md:px-4 md:py-3.5 md:text-lg"
                        : "border-b border-indigo-100/90 bg-indigo-50/50 px-3 py-2.5 text-sm font-bold text-indigo-950 md:px-4"
                    }
                  >
                    {isCore ? (
                      <span className="mr-2 inline-flex rounded bg-white/20 px-1.5 py-0.5 text-[10px] font-bold uppercase tracking-widest text-white/95 md:text-[11px]">
                        要点
                      </span>
                    ) : null}
                    {s.label}
                  </h3>
                  <p
                    className={
                      isCore
                        ? "border-t border-indigo-100/60 bg-gradient-to-b from-indigo-50/40 to-white px-3 py-4 text-sm font-medium leading-relaxed text-indigo-950 md:px-5 md:py-5 md:text-[15px] md:leading-[1.75]"
                        : "px-3 py-3 text-xs leading-relaxed md:px-4 md:text-sm"
                    }
                  >
                    {s.body}
                  </p>
                </article>
              );
            })}
          </div>
        </section>

        <div
          className="hidden shrink-0 self-stretch px-1 lg:flex lg:flex-col lg:items-center lg:justify-center"
          aria-hidden
        >
          <div className="h-full min-h-[12rem] w-[3px] max-w-full rounded-full bg-gradient-to-b from-indigo-400/90 via-violet-400/70 to-teal-400/90 shadow-[0_0_16px_rgba(99,102,241,0.35)]" />
        </div>

        <section
          className="min-w-0 flex-1 rounded-2xl border border-teal-200/90 bg-gradient-to-br from-teal-50/90 via-white to-cyan-50/40 p-4 shadow-md ring-1 ring-teal-900/5 md:p-5"
          aria-labelledby={`${uid}-p2-h`}
        >
          <div className="flex flex-wrap items-baseline justify-between gap-2 border-b border-teal-200/70 pb-3">
            <p
              id={`${uid}-p2-h`}
              className="text-[10px] font-bold uppercase tracking-[0.25em] text-teal-700"
            >
              第二顺位
            </p>
            <span className="rounded-full bg-teal-600/10 px-2.5 py-0.5 text-[11px] font-semibold text-teal-950">
              灰色地带冲突与物资封锁
            </span>
          </div>
          <p className="mt-2 text-xs text-teal-950/80 md:text-sm">
            Gray Zone · 韧性化与海上／物资维度
          </p>
          <div className="mt-4 space-y-3">
            {P2_SECTIONS.map((s) => {
              const isCore = s.label === "核心判断";
              return (
                <article
                  key={s.id}
                  className={
                    isCore
                      ? "overflow-hidden rounded-xl border-2 border-teal-500/70 border-l-4 border-l-teal-600 bg-white shadow-[0_8px_30px_-12px_rgba(20,184,166,0.35)] ring-2 ring-teal-400/25"
                      : "overflow-hidden rounded-xl border border-teal-300/60 bg-white shadow-sm ring-1 ring-teal-200/40"
                  }
                >
                  <h3
                    className={
                      isCore
                        ? "border-b border-teal-200/80 bg-gradient-to-r from-teal-600 to-cyan-600 px-3 py-3 text-base font-bold tracking-wide text-white shadow-inner md:px-4 md:py-3.5 md:text-lg"
                        : "border-b border-teal-100/90 bg-teal-50/50 px-3 py-2.5 text-sm font-bold text-teal-950 md:px-4"
                    }
                  >
                    {isCore ? (
                      <span className="mr-2 inline-flex rounded bg-white/20 px-1.5 py-0.5 text-[10px] font-bold uppercase tracking-widest text-white/95 md:text-[11px]">
                        要点
                      </span>
                    ) : null}
                    {s.label}
                  </h3>
                  <p
                    className={
                      isCore
                        ? "relative border-t border-teal-100/60 bg-gradient-to-b from-teal-50/50 to-white px-3 py-4 text-sm font-medium leading-relaxed text-teal-950 md:px-5 md:py-5 md:pl-6 md:text-[15px] md:leading-[1.75]"
                        : "px-3 py-3 text-xs leading-relaxed md:px-4 md:text-sm"
                    }
                  >
                    {s.body}
                  </p>
                </article>
              );
            })}
          </div>
        </section>
      </div>

      <p className="rounded-lg bg-slate-50/90 px-3 py-2.5 text-center text-[11px] leading-relaxed text-[var(--ui-muted)] md:text-xs">
        紫、青两栏与信息图左右列对应；核心判断、资源投向、法律／人事等条目均为常驻展示，便于通读与图文对照。
      </p>
    </div>
  );
}
