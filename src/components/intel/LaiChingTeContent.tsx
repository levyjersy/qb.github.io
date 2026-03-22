"use client";

import Image from "next/image";
import Link from "next/link";
import { useCallback, type ReactNode } from "react";
import { BirthContextMap } from "@/components/intel/BirthContextMap";
import { EliteTrajectoryMap } from "@/components/intel/EliteTrajectoryMap";
import { MedicalCareerMap } from "@/components/intel/MedicalCareerMap";
import { PoliticalExperienceMap } from "@/components/intel/PoliticalExperienceMap";
import { TaiwanIdentityInteractive } from "@/components/intel/TaiwanIdentityInteractive";
import { DiplomacyInteractive } from "@/components/intel/DiplomacyInteractive";
import { DomesticPoliticsInteractive } from "@/components/intel/DomesticPoliticsInteractive";
import { DecisionStyleInteractive } from "@/components/intel/DecisionStyleInteractive";
import { NetworkRelationshipTabs } from "@/components/intel/NetworkRelationshipTabs";
import { BehaviorTrajectoryInteractive } from "@/components/intel/BehaviorTrajectoryInteractive";
import { PolicyForecastInteractive } from "@/components/intel/PolicyForecastInteractive";
import {
  getLaiProfileSectionIds,
  LAI_PROFILE_NAV,
} from "@/lib/lai-profile-nav";
import { useScrollspy } from "@/hooks/useScrollspy";

const SECTION_IDS = getLaiProfileSectionIds();

function LaiSectionHeading({
  id,
  children,
}: {
  id: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex gap-3 border-b border-[var(--ui-border)] pb-4 md:gap-4 md:pb-5">
      <span
        className="mt-1.5 h-9 w-1 shrink-0 rounded-full bg-gradient-to-b from-[var(--ui-coral)] via-[var(--ui-coral)] to-[var(--ui-navy)] shadow-[0_2px_10px_rgba(255,107,107,0.28)]"
        aria-hidden
      />
      <h2
        id={id}
        className="text-2xl font-bold leading-tight tracking-tight text-[var(--ui-navy)] md:text-3xl"
      >
        {children}
      </h2>
    </div>
  );
}

function scrollToId(id: string) {
  const el = document.getElementById(id);
  if (!el) return;
  el.scrollIntoView({ behavior: "smooth", block: "start" });
}

export function LaiChingTeContent() {
  const activeId = useScrollspy(SECTION_IDS);
  const onNavigate = useCallback((id: string) => {
    scrollToId(id);
  }, []);

  return (
    <div className="bg-[var(--ui-page-bg)] text-[var(--report-text)]">
      <div className="mx-auto max-w-6xl px-4 py-8 md:px-6 md:py-10">
        <nav className="mb-8 text-sm text-[var(--ui-muted)]">
          <Link
            href="/"
            className="hover:text-[var(--ui-coral)] hover:underline"
          >
            首页
          </Link>
          <span className="mx-2 text-[var(--ui-border)]">/</span>
          <Link
            href="/intel/taiwan"
            className="hover:text-[var(--ui-coral)] hover:underline"
          >
            台湾
          </Link>
          <span className="mx-2 text-[var(--ui-border)]">/</span>
          <span className="font-medium text-[var(--ui-navy)]">赖清德</span>
        </nav>

        <div className="flex flex-col gap-10 lg:flex-row lg:gap-12">
          {/* 左侧悬浮导航（大屏）；小屏为横向滚动条 */}
          <aside className="lg:w-56 lg:shrink-0 lg:sticky lg:top-24 lg:self-start">
            <p className="mb-3 hidden text-[10px] font-semibold uppercase tracking-[0.2em] text-[var(--ui-muted)] lg:block">
              目录
            </p>
            <nav
              aria-label="档案章节"
              className="flex gap-2 overflow-x-auto pb-1 lg:flex-col lg:gap-1 lg:overflow-visible lg:rounded-xl lg:border lg:border-[var(--ui-border)] lg:bg-[var(--ui-surface)] lg:p-3 lg:shadow-[var(--ui-shadow)]"
            >
              {LAI_PROFILE_NAV.map((item) => {
                const active = activeId === item.id;
                return (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => onNavigate(item.id)}
                    className={`shrink-0 rounded-full px-3 py-2 text-left text-sm font-medium transition-colors lg:w-full lg:rounded-lg lg:px-3 ${
                      active
                        ? "bg-[var(--ui-coral-soft)] text-[var(--ui-coral)] lg:bg-[var(--ui-coral)] lg:text-white"
                        : "text-[var(--ui-navy)] hover:bg-slate-50 lg:text-[var(--report-text)]"
                    }`}
                  >
                    {item.label}
                  </button>
                );
              })}
            </nav>
          </aside>

          <main className="min-w-0 flex-1">
            <header className="mb-8 text-center lg:text-left">
              <p className="text-sm font-medium tracking-[0.2em] text-[var(--ui-coral)]">
                — Profile / 人物档案 —
              </p>
              <h1 className="mt-3 text-3xl font-bold text-[var(--ui-navy)] md:text-4xl">
                赖清德
              </h1>
              <p className="mx-auto mt-4 max-w-2xl text-sm leading-relaxed text-[var(--ui-muted)] lg:mx-0">
                档案各章节可后续填充；右侧滚动时左侧导航将同步高亮。
              </p>
            </header>

            <div className="mb-12 overflow-hidden rounded-2xl bg-[var(--ui-surface)] shadow-[var(--ui-shadow)]">
              <div className="relative h-[19rem] w-full bg-slate-100 p-2 sm:h-[24rem] sm:p-4 md:h-[26rem]">
                <Image
                  src="/image/laiqingde.jpg"
                  alt="赖清德"
                  fill
                  className="object-contain object-center"
                  sizes="(max-width: 1024px) 100vw, 48rem"
                  priority
                />
              </div>
              <div className="bg-[var(--ui-navy)] px-6 py-3 text-center text-[11px] font-medium uppercase tracking-wide text-white">
                TAIWAN · INTEL · OPEN ACCESS
              </div>
            </div>

            <div className="space-y-14">
              <section
                id="lai-basic-profile"
                className="scroll-mt-28 lg:scroll-mt-24"
                aria-labelledby="lai-basic-profile-h"
              >
                <LaiSectionHeading id="lai-basic-profile-h">
                  基础画像
                </LaiSectionHeading>
                <div className="mt-4 rounded-xl border border-[var(--ui-border)] bg-[var(--ui-surface)] p-4 shadow-sm sm:p-6 md:p-8">
                  <div className="space-y-10">
                    <BasicSubSection id="lai-basic-birth" title="出生背景">
                      <BirthContextMap />
                    </BasicSubSection>
                    <BasicSubSection
                      id="lai-basic-family-education"
                      title="家庭与教育"
                    >
                      <EliteTrajectoryMap />
                    </BasicSubSection>
                    <BasicSubSection
                      id="lai-basic-medical"
                      title="医疗职业经历"
                    >
                      <MedicalCareerMap />
                    </BasicSubSection>
                    <BasicSubSection
                      id="lai-basic-political"
                      title="政治经历"
                    >
                      <PoliticalExperienceMap />
                    </BasicSubSection>
                  </div>
                </div>
              </section>
              <section
                id="lai-ideology"
                className="scroll-mt-28 lg:scroll-mt-24"
                aria-labelledby="lai-ideology-h"
              >
                <LaiSectionHeading id="lai-ideology-h">
                  意识形态
                </LaiSectionHeading>
                <div className="mt-4 rounded-xl border border-[var(--ui-border)] bg-[var(--ui-surface)] p-4 shadow-sm sm:p-6 md:p-8">
                  <div className="space-y-10">
                    <BasicSubSection
                      id="lai-ideology-identity"
                      title="台湾身份"
                    >
                      <TaiwanIdentityInteractive />
                    </BasicSubSection>
                    <BasicSubSection
                      id="lai-ideology-diplomacy"
                      title="外交与国际参与"
                    >
                      <DiplomacyInteractive />
                    </BasicSubSection>
                    <BasicSubSection
                      id="lai-ideology-domestic"
                      title="岛内政治"
                    >
                      <DomesticPoliticsInteractive />
                    </BasicSubSection>
                  </div>
                </div>
              </section>
              <section
                id="lai-decision-style"
                className="scroll-mt-28 lg:scroll-mt-24"
                aria-labelledby="lai-decision-style-h"
              >
                <LaiSectionHeading id="lai-decision-style-h">
                  决策风格
                </LaiSectionHeading>
                <p className="mt-3 max-w-2xl text-sm leading-relaxed text-[var(--ui-muted)]">
                  从行为表现、风险偏好、冲突处理到权力结构，归纳其决策特征。
                </p>
                <div className="mt-5 overflow-hidden rounded-2xl border border-[var(--ui-border)] bg-gradient-to-b from-white to-[var(--ui-surface)] p-4 shadow-[var(--ui-shadow)] ring-1 ring-black/[0.03] sm:p-6 md:p-8">
                  <DecisionStyleInteractive />
                </div>
              </section>
              <section
                id="lai-network"
                className="scroll-mt-28 lg:scroll-mt-24"
                aria-labelledby="lai-network-h"
              >
                <LaiSectionHeading id="lai-network-h">
                  关系网络
                </LaiSectionHeading>
                <div className="mt-4 rounded-xl border border-[var(--ui-border)] bg-[var(--ui-surface)] p-4 shadow-sm sm:p-6 md:p-8">
                  <NetworkRelationshipTabs />
                </div>
              </section>
              <section
                id="lai-behavior-trajectory"
                className="scroll-mt-28 lg:scroll-mt-24"
                aria-labelledby="lai-behavior-trajectory-h"
              >
                <LaiSectionHeading id="lai-behavior-trajectory-h">
                  行为轨迹
                </LaiSectionHeading>
                <p className="mt-3 max-w-2xl text-sm leading-relaxed text-[var(--ui-muted)]">
                  从趋势预判、轨迹元素到模式识别，分层阅读公开轨迹与可检验信号。
                </p>
                <div className="mt-4 rounded-xl border border-[var(--ui-border)] bg-[var(--ui-surface)] p-4 shadow-sm sm:p-6 md:p-8">
                  <BehaviorTrajectoryInteractive />
                </div>
              </section>
              <section
                id="lai-policy-forecast"
                className="scroll-mt-28 lg:scroll-mt-24"
                aria-labelledby="lai-policy-forecast-h"
              >
                <LaiSectionHeading id="lai-policy-forecast-h">
                  政策预判
                </LaiSectionHeading>
                <p className="mt-3 max-w-2xl text-sm leading-relaxed text-[var(--ui-muted)]">
                  分概览、政策—行动矩阵、威胁与资源、情景推演四块阅读；以下为可扩展的分析框架与示例占位。
                </p>
                <div className="mt-4 rounded-xl border border-[var(--ui-border)] bg-[var(--ui-surface)] p-4 shadow-sm sm:p-6 md:p-8">
                  <PolicyForecastInteractive />
                </div>
              </section>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}

function BasicSubSection({
  id,
  title,
  children,
}: {
  id: string;
  title: string;
  children?: ReactNode;
}) {
  return (
    <section
      id={id}
      className="scroll-mt-28 lg:scroll-mt-24"
      aria-labelledby={`${id}-title`}
    >
      <h3
        id={`${id}-title`}
        className="border-b border-[var(--ui-border)] pb-2 text-lg font-bold text-[var(--ui-navy)] md:text-xl"
      >
        {title}
      </h3>
      {children}
    </section>
  );
}

