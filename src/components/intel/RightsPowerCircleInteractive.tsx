"use client";

import Image from "next/image";
import { useId, useState } from "react";

import { PortraitAvatar } from "@/components/intel/PortraitAvatar";
import relationship2 from "@root-image/relationship2.png";

type LayerId = "inner" | "middle" | "outer" | "summary";

const LAYERS: { id: LayerId; label: string; short: string }[] = [
  { id: "inner", label: "内核与核心人事", short: "政务中枢与小圈子幕僚" },
  { id: "middle", label: "中间层路径", short: "党内重塑与运作模式" },
  { id: "outer", label: "外围功能域", short: "专业官僚与领域分工" },
  { id: "summary", label: "网络特征", short: "控制体系与理性支持" },
];

const INNER_PEOPLE: { name: string; role: string; note: string }[] = [
  {
    name: "卓荣泰",
    role: "政务中枢 · 行政院长",
    note: "内阁政策推动与行政系统枢纽。",
  },
  {
    name: "郑丽君",
    role: "副院长 · 小圈子幕僚体系",
    note: "政策话术与执行一致性等幕僚功能。",
  },
  {
    name: "潘孟安",
    role: "总统府秘书长",
    note: "府院协调与高层事务串联。",
  },
  {
    name: "邱垂亮",
    role: "非赖系人事布局",
    note: "图示中标注为「非赖系」的代表性人事。",
  },
];

export function RightsPowerCircleInteractive() {
  const baseId = useId();
  const [layer, setLayer] = useState<LayerId>("inner");
  const [focusPerson, setFocusPerson] = useState<string | null>(null);

  const tabBtn =
    "rounded-lg border-2 px-2 py-2 text-center text-[10px] font-semibold leading-tight transition-all sm:text-xs md:px-3 md:py-2.5 md:text-sm";
  const tabIdle =
    "border-[var(--ui-border)] bg-white hover:bg-slate-50/90";
  const tabOn =
    "border-[var(--ui-coral)] bg-[var(--ui-coral-soft)] ring-2 ring-[var(--ui-coral)]/40";

  return (
    <div className="rights-power-circle space-y-5">
      <div className="overflow-hidden rounded-xl border border-[var(--ui-border)] bg-slate-950/5 shadow-sm ring-1 ring-[var(--ui-navy)]/10">
        <Image
          src={relationship2}
          alt="赖清德权力内核与高度信任圈层：同心圆式权力网络示意图"
          width={relationship2.width}
          height={relationship2.height}
          className="h-auto w-full object-contain"
          sizes="(max-width: 1024px) 100vw, 896px"
          priority={false}
        />
      </div>

      <p className="text-center text-xs text-[var(--ui-muted)]">
        下图可结合下方分层说明交互阅读；人名为示意图谱整理。
      </p>

      <div className="rounded-2xl border border-[var(--ui-border)] bg-gradient-to-b from-slate-50/90 to-white p-1.5 shadow-inner md:p-2">
        <div
          className="grid grid-cols-2 gap-1.5 lg:grid-cols-4"
          role="tablist"
          aria-label="权力圈层分层"
        >
          {LAYERS.map((L) => {
            const on = layer === L.id;
            return (
              <button
                key={L.id}
                type="button"
                role="tab"
                aria-selected={on}
                id={`${baseId}-layer-${L.id}`}
                aria-controls={`${baseId}-layer-panel`}
                className={`${tabBtn} ${on ? tabOn : tabIdle}`}
                onClick={() => {
                  setLayer(L.id);
                  setFocusPerson(null);
                }}
              >
                <span className="block">{L.label}</span>
                <span className="mt-0.5 block text-[9px] font-normal text-[var(--ui-muted)] md:text-[10px]">
                  {L.short}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      <div
        id={`${baseId}-layer-panel`}
        role="tabpanel"
        aria-labelledby={`${baseId}-layer-${layer}`}
        className="rounded-xl border-2 border-[var(--ui-border)] bg-[var(--ui-surface)] p-4 md:p-6"
      >
        {layer === "inner" ? (
          <div className="space-y-4">
            <div className="rounded-lg border border-dashed border-[var(--ui-coral)]/40 bg-[var(--ui-coral-soft)]/20 px-3 py-2 text-center text-sm font-semibold text-[var(--ui-navy)]">
              赖清德权力内核（高度信任圈层）
            </div>
            <ul className="space-y-2">
              {INNER_PEOPLE.map((p) => {
                const open = focusPerson === p.name;
                return (
                  <li key={p.name}>
                    <button
                      type="button"
                      onClick={() =>
                        setFocusPerson((prev) =>
                          prev === p.name ? null : p.name,
                        )
                      }
                      className={`flex w-full gap-3 rounded-xl border p-3 text-left transition-colors ${
                        open
                          ? "border-[var(--ui-coral)] bg-white shadow-sm"
                          : "border-[var(--ui-border)] bg-white/80 hover:border-[var(--ui-navy)]/20"
                      }`}
                      aria-expanded={open}
                    >
                      <PortraitAvatar name={p.name} />
                      <div className="min-w-0 flex-1">
                        <p className="font-semibold text-[var(--ui-navy)]">
                          {p.name}
                        </p>
                        <p className="text-xs text-[var(--ui-coral)]">
                          {p.role}
                        </p>
                        {open ? (
                          <p className="mt-2 text-sm leading-relaxed text-[var(--report-text)]">
                            {p.note}
                          </p>
                        ) : (
                          <p className="mt-1 text-[11px] text-[var(--ui-muted)]">
                            点击展开说明
                          </p>
                        )}
                      </div>
                    </button>
                  </li>
                );
              })}
            </ul>
          </div>
        ) : null}

        {layer === "middle" ? (
          <div className="grid gap-4 md:grid-cols-2">
            <div className="rounded-xl border border-[var(--ui-border)] bg-gradient-to-b from-violet-50/80 to-white p-4">
              <h4 className="text-sm font-bold text-[var(--ui-navy)]">
                党内权力重塑路径
              </h4>
              <p className="mt-1 text-xs font-medium text-violet-800/90">
                核心高度集中
              </p>
              <p className="mt-2 text-sm leading-relaxed text-[var(--report-text)]">
                优先部署亲信与可信任人事，强化对党务与行政议程的掌控。
              </p>
            </div>
            <div className="rounded-xl border border-[var(--ui-border)] bg-gradient-to-b from-emerald-50/80 to-white p-4">
              <h4 className="text-sm font-bold text-[var(--ui-navy)]">
                中间层运作模式
              </h4>
              <p className="mt-1 text-xs font-medium text-emerald-800/90">
                外围多元分配
              </p>
              <p className="mt-2 text-sm leading-relaxed text-[var(--report-text)]">
                将非派系或跨派系人士安排于两岸等相关领域，形成外围缓冲与专业分工。
              </p>
            </div>
          </div>
        ) : null}

        {layer === "outer" ? (
          <div className="space-y-5">
            <p className="text-sm font-semibold text-[var(--ui-navy)]">
              专业导向的技术官僚网络
            </p>
            <div className="space-y-3">
              <div className="rounded-xl border border-[var(--ui-border)] bg-white p-3">
                <p className="text-xs font-bold text-[var(--ui-muted)]">
                  安全与防务领域
                </p>
                <div className="mt-2 flex flex-col gap-2 sm:flex-row sm:flex-wrap">
                  {["林右昌", "蔡明彦"].map((n) => (
                    <div
                      key={n}
                      className="flex min-w-0 flex-1 items-start gap-2 rounded-lg bg-slate-50/90 p-2"
                    >
                      <PortraitAvatar name={n} />
                      <div>
                        <p className="text-sm font-semibold text-[var(--ui-navy)]">
                          {n}
                        </p>
                        <p className="text-xs text-[var(--report-text)]">
                          {n === "林右昌"
                            ? "民进党秘书长等党务要职。"
                            : "国安相关单位首长。"}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <div className="rounded-xl border border-[var(--ui-border)] bg-white p-3">
                <p className="text-xs font-bold text-[var(--ui-muted)]">
                  财政与公共服务
                </p>
                <div className="mt-2 flex items-start gap-2">
                  <PortraitAvatar name="庄翠云" />
                  <div>
                    <p className="text-sm font-semibold text-[var(--ui-navy)]">
                      庄翠云
                    </p>
                    <p className="text-xs text-[var(--report-text)]">
                      财政体系与公共资源配置。
                    </p>
                  </div>
                </div>
              </div>
              <div className="rounded-xl border border-[var(--ui-border)] bg-white p-3">
                <p className="text-xs font-bold text-[var(--ui-muted)]">
                  经济与科技产业
                </p>
                <div className="mt-2 grid gap-2 sm:grid-cols-2">
                  {[
                    { name: "刘镜清", note: "产业政策协调。" },
                    { name: "郭智辉", note: "能源与经贸布局。" },
                    { name: "吴诚文", note: "科技政务与专案。" },
                    { name: "黄彦男", note: "数位与资安等面向。" },
                  ].map((x) => (
                    <div
                      key={x.name}
                      className="flex items-start gap-2 rounded-lg bg-slate-50/90 p-2"
                    >
                      <PortraitAvatar name={x.name} />
                      <div>
                        <p className="text-sm font-semibold text-[var(--ui-navy)]">
                          {x.name}
                        </p>
                        <p className="text-xs text-[var(--report-text)]">
                          {x.note}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        ) : null}

        {layer === "summary" ? (
          <div className="grid gap-4 md:grid-cols-2">
            <div className="rounded-xl border-2 border-[var(--ui-navy)]/15 bg-[var(--ui-navy)]/[0.04] p-4 md:p-5">
              <p className="text-[11px] font-semibold uppercase tracking-wider text-[var(--ui-muted)]">
                核心特征
              </p>
              <p className="mt-2 text-sm font-semibold leading-relaxed text-[var(--ui-navy)]">
                权力网络呈现「内核高度集中 + 外围分层整合」的控制体系。
              </p>
            </div>
            <div className="rounded-xl border border-[var(--ui-border)] bg-white p-4 md:p-5">
              <p className="text-[11px] font-semibold uppercase tracking-wider text-[var(--ui-muted)]">
                技术官僚网络
              </p>
              <p className="mt-2 text-sm leading-relaxed text-[var(--report-text)]">
                外围专业网络提供知识支持与技术理性，使政策在可辩护性与执行之间取得平衡。
              </p>
            </div>
          </div>
        ) : null}
      </div>

      <p className="text-center text-[11px] text-[var(--ui-muted)]">
        圆形头像为姓名首字示意，非真实照片。图示风格与配色以原图为准。
      </p>
    </div>
  );
}
