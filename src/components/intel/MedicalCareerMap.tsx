"use client";

import Image from "next/image";
import { useId, useState } from "react";

export function MedicalCareerMap() {
  const baseId = useId();
  const [activeTrack, setActiveTrack] = useState<"ncku" | "sinlau" | null>(
    null,
  );

  return (
    <div className="medical-career-map mt-4 space-y-8">
      <div className="overflow-hidden rounded-xl border border-[var(--ui-border)] bg-white shadow-sm">
        <Image
          src="/image/medical-career-context.png"
          alt="賴清德醫療職業經歷脈絡圖"
          width={1920}
          height={1080}
          className="h-auto w-full object-contain"
          sizes="(max-width: 1024px) 100vw, 896px"
          priority={false}
        />
      </div>

      {/* 起点 */}
      <section
        className="rounded-xl border border-[var(--ui-border)] bg-gradient-to-br from-slate-50 to-white p-4 shadow-sm md:p-6"
        aria-labelledby={`${baseId}-start`}
      >
        <h4
          id={`${baseId}-start`}
          className="mb-4 flex items-center gap-2 text-sm font-bold text-[var(--ui-navy)]"
        >
          <span className="rounded border border-[var(--ui-border)] bg-slate-50/90 px-2 py-0.5 text-[var(--ui-muted)]">
            起点
          </span>
          医疗教育与训练
        </h4>
        <ol className="flex flex-col gap-3 md:flex-row md:flex-wrap md:items-center md:gap-2">
          <li className="flex items-center gap-2 rounded-lg border border-[var(--ui-border)] bg-[var(--ui-surface)] px-3 py-2 text-sm text-[var(--report-text)]">
            <span aria-hidden>①</span>
            台湾大学（台大）
          </li>
          <span className="hidden text-[var(--ui-muted)] md:inline">&gt;&gt;</span>
          <li className="flex items-center gap-2 rounded-lg border border-[var(--ui-border)] bg-[var(--ui-surface)] px-3 py-2 text-sm text-[var(--report-text)]">
            <span aria-hidden>②</span>
            服兵役
          </li>
          <span className="hidden text-[var(--ui-muted)] md:inline">&gt;&gt;</span>
          <li className="flex items-center gap-2 rounded-lg border border-[var(--ui-border)] bg-[var(--ui-surface)] px-3 py-2 text-sm text-[var(--report-text)]">
            <span aria-hidden>③</span>
            成功大学学士后医学系
          </li>
          <span className="hidden text-[var(--ui-muted)] md:inline">&gt;&gt;</span>
          <li className="rounded-lg border-2 border-dashed border-[var(--ui-border)] bg-slate-50/80 px-3 py-2 text-sm font-medium text-[var(--ui-navy)]">
            进入医疗体系
          </li>
        </ol>
      </section>

      {/* 双轨 + 双医院执业 */}
      <section aria-labelledby={`${baseId}-dual`}>
        <h4
          id={`${baseId}-dual`}
          className="mb-4 text-center text-sm font-bold text-[var(--ui-navy)]"
        >
          医疗体系历程（双轨并行）
        </h4>
        <div className="grid gap-4 md:grid-cols-2">
          <button
            type="button"
            onClick={() =>
              setActiveTrack((t) => (t === "ncku" ? null : "ncku"))
            }
            className={`rounded-xl border-2 p-4 text-left transition-all duration-200 md:p-5 ${
              activeTrack === "ncku"
                ? "scale-[1.02] border-[var(--ui-coral)] bg-[var(--ui-coral-soft)] ring-2 ring-[var(--ui-coral)]/40"
                : "border-[var(--ui-border)] bg-[var(--ui-surface)] hover:bg-slate-50/90 hover:shadow-md"
            }`}
          >
            <p className="text-xs font-bold text-[var(--ui-muted)]">成大医院时期</p>
            <p className="mt-2 text-sm font-semibold text-[var(--ui-navy)]">
              内科临床 · 总医师
            </p>
            <ul className="mt-3 space-y-1.5 text-xs leading-relaxed text-[var(--report-text)] md:text-sm">
              <li>· 教学医院、区域医学中心层级经历</li>
              <li>· 医疗能力形成期：高强度临床训练</li>
              <li>· 进入高阶专业医疗圈层</li>
            </ul>
          </button>
          <button
            type="button"
            onClick={() =>
              setActiveTrack((t) => (t === "sinlau" ? null : "sinlau"))
            }
            className={`rounded-xl border-2 p-4 text-left transition-all duration-200 md:p-5 ${
              activeTrack === "sinlau"
                ? "scale-[1.02] border-[var(--ui-coral)] bg-[var(--ui-coral-soft)] ring-2 ring-[var(--ui-coral)]/40"
                : "border-[var(--ui-border)] bg-[var(--ui-surface)] hover:bg-slate-50/90 hover:shadow-md"
            }`}
          >
            <p className="text-xs font-bold text-[var(--ui-muted)]">新楼医院时期</p>
            <p className="mt-2 text-sm font-semibold text-[var(--ui-navy)]">
              内科主治医师
            </p>
            <ul className="mt-3 space-y-1.5 text-xs leading-relaxed text-[var(--report-text)] md:text-sm">
              <li>· 具历史意义的医疗机构</li>
              <li>· 服务基层民众、贴近社区医疗需求</li>
            </ul>
          </button>
        </div>
        <div className="mt-4 flex justify-center">
          <span className="inline-flex items-center gap-2 rounded-full border border-[var(--ui-border)] bg-slate-50/90 px-4 py-2 text-xs font-semibold text-[var(--ui-navy)] shadow-sm">
            <span aria-hidden>🔗</span>
            双医院执业（同期兼任两机构）
          </span>
        </div>
      </section>

      <section className="rounded-xl border border-[var(--ui-border)] bg-white p-4 md:p-5">
        <h4 className="mb-3 text-sm font-bold text-[var(--ui-navy)]">
          外部参与与转变
        </h4>
        <ul className="space-y-2 text-sm leading-relaxed text-[var(--report-text)]">
          <li>
            · 参与专业社团与公共事务（医师公会、医事相关组织等），逐步建立专业外可见度。
          </li>
          <li>
            · 串联南部医界与地方政治网络，为「医师 → 公共人物」路径铺垫。
          </li>
        </ul>
      </section>

      <section className="rounded-xl border border-[var(--ui-border)] bg-slate-50/80 p-4 md:p-5">
        <h4 className="mb-3 text-sm font-bold text-[var(--ui-navy)]">
          职业特征与形象
        </h4>
        <ul className="space-y-2 text-sm leading-relaxed text-[var(--report-text)]">
          <li>
            · 精英性：完整现代医学院训练，并历练区域核心医院体系。
          </li>
          <li>
            · 社会信任基础：医师身份所承载的专业性与道德可信度。
          </li>
        </ul>
      </section>

      <section className="rounded-xl border-2 border-[var(--ui-navy)]/15 bg-gradient-to-b from-[var(--ui-navy)]/[0.06] to-white p-4 md:p-6">
        <h4 className="mb-3 text-sm font-bold text-[var(--ui-navy)]">
          总结与意义
        </h4>
        <ul className="space-y-3 text-sm leading-relaxed text-[var(--report-text)]">
          <li>
            ·
            <strong className="text-[var(--ui-navy)]">阶层流动：</strong>
            从「贫寒家庭子弟」到「专业中产」的典型轨迹。
          </li>
          <li>
            ·
            <strong className="text-[var(--ui-navy)]">政治转型基础：</strong>
            医师资历为其后续从政提供专业声誉、社会网络与公共事务历练。
          </li>
        </ul>
      </section>
    </div>
  );
}
