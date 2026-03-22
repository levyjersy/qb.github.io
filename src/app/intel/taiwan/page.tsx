import Link from "next/link";
import { TAIWAN_TARGETS } from "@/lib/taiwan-targets";
import { KiddoCard, PersonBanner } from "@/components/ui/KiddoCard";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "台湾",
  description: "台湾目标人物清单",
};

export default function TaiwanModulePage() {
  return (
    <div className="bg-[var(--ui-page-bg)] text-[var(--report-text)]">
      <section className="mx-auto max-w-6xl px-4 pb-6 pt-8 text-center md:px-8 md:pt-10">
        <nav className="mb-6 text-left text-sm text-[var(--ui-muted)]">
          <Link
            href="/"
            className="hover:text-[var(--ui-coral)] hover:underline"
          >
            首页
          </Link>
          <span className="mx-2 text-[var(--ui-border)]">/</span>
          <span className="text-[var(--ui-navy)]">台湾</span>
        </nav>
        <p className="text-sm font-medium tracking-[0.2em] text-[var(--ui-coral)]">
          — 台湾 · 目标人物 —
        </p>
        <h1 className="mt-3 text-3xl font-bold tracking-tight text-[var(--ui-navy)] md:text-[2.5rem]">
          关注对象清单
        </h1>
        <p className="mx-auto mt-4 max-w-2xl text-sm leading-relaxed text-[var(--ui-muted)]">
          下列为关注对象卡片。已解锁者可查看档案；其余条目显示锁定状态，暂不可访问。
        </p>
      </section>

      <section
        className="mx-auto max-w-6xl px-4 pb-16 md:px-8"
        aria-label="台湾人物列表"
      >
        <ul className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {TAIWAN_TARGETS.map((t) => (
            <li key={t.name}>
              <KiddoCard
                title={t.name}
                tagline={
                  t.unlocked ? "已解锁 · 可查看档案" : "未解锁 · 受限访问"
                }
                description={
                  t.unlocked
                    ? "该条目已开放，可进入人物档案页查看综述与结构化情报占位。"
                    : "该条目尚未开放，完整档案处于锁定状态，暂无法浏览详情。"
                }
                footer={
                  t.unlocked
                    ? "TAIWAN · PROFILE | OPEN"
                    : "TAIWAN · PROFILE | LOCKED"
                }
                banner={
                  <PersonBanner
                    locked={!t.unlocked}
                    src={t.portraitSrc}
                    alt={t.name}
                  />
                }
                href={
                  t.unlocked && t.slug
                    ? `/intel/taiwan/${t.slug}`
                    : undefined
                }
                locked={!t.unlocked}
              />
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}
