import { REGION_MODULES } from "@/lib/region-modules";
import { KiddoCard, RegionBannerImage } from "@/components/ui/KiddoCard";

/** 与 `public/image` 中文件对应：美、日、印、台 */
const REGION_IMAGES: Record<string, { src: string; alt: string }> = {
  us: { src: "/image/America.jpg", alt: "美国" },
  jp: { src: "/image/Japan.webp", alt: "日本" },
  in: { src: "/image/India.webp", alt: "印度" },
  tw: { src: "/image/taiwan.webp", alt: "台湾" },
};

export default function HomePage() {
  return (
    <div className="bg-[var(--ui-page-bg)] text-[var(--report-text)]">
      <section className="mx-auto max-w-6xl px-4 pb-6 pt-10 text-center md:px-8 md:pt-14">
        <p className="text-sm font-medium tracking-[0.2em] text-[var(--ui-coral)]">
          — 人物模块 —
        </p>
        <h1 className="mt-3 text-3xl font-bold tracking-tight text-[var(--ui-navy)] md:text-[2.75rem] md:leading-tight">
          目标人物分析
        </h1>
        <p className="mx-auto mt-4 max-w-2xl text-sm leading-relaxed text-[var(--ui-muted)] md:text-base">
          按国家与地区浏览情报资产。已开放模块可进入详情；未开放模块保持锁定。
        </p>
      </section>

      <section
        className="mx-auto max-w-6xl px-4 pb-16 md:px-8"
        aria-label="国家与地区模块"
      >
        <h2 className="sr-only">国家与地区</h2>
        <ul className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {REGION_MODULES.map((region) => {
            const img = REGION_IMAGES[region.id];
            return (
              <li key={region.id}>
                <KiddoCard
                  title={region.label}
                  tagline={region.href ? "已开放 · 可进入" : "未开放 · 锁定"}
                  description={
                    region.href
                      ? `进入 ${region.label}（${region.labelEn}）人物子模块，查看关注对象与档案。`
                      : `${region.label}（${region.labelEn}）模块尚未开放，敬请期待后续更新。`
                  }
                  footer={`MODULE · ${region.labelEn.toUpperCase().slice(0, 2)} | ${region.href ? "ACTIVE" : "LOCKED"}`}
                  banner={
                    img ? (
                      <RegionBannerImage src={img.src} alt={img.alt} />
                    ) : (
                      <div className="h-44 w-full rounded-t-2xl bg-slate-200" />
                    )
                  }
                  href={region.href ?? undefined}
                  locked={!region.href}
                />
              </li>
            );
          })}
        </ul>
      </section>
    </div>
  );
}
