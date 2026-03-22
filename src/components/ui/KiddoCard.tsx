import Image from "next/image";
import Link from "next/link";
import type { ReactNode } from "react";
import { LockIcon } from "@/components/intel/LockIcon";

type Props = {
  title: string;
  tagline: string;
  description: string;
  footer: string;
  /** 顶部装饰区：渐变或自定义节点 */
  banner: ReactNode;
  href?: string;
  locked?: boolean;
};

function ArrowIcon() {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.2"
      aria-hidden
    >
      <path d="M5 12h14M13 6l6 6-6 6" />
    </svg>
  );
}

export function KiddoCard({
  title,
  tagline,
  description,
  footer,
  banner,
  href,
  locked = false,
}: Props) {
  const floating = locked ? null : href ? (
    <Link
      href={href}
      className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-[var(--ui-coral)] text-white shadow-md transition hover:bg-[var(--report-accent-hover)] hover:shadow-lg"
      aria-label={`进入 ${title}`}
    >
      <ArrowIcon />
    </Link>
  ) : null;

  return (
    <article className="group flex h-full flex-col overflow-hidden rounded-2xl bg-[var(--ui-surface)] shadow-[var(--ui-shadow)] transition hover:shadow-[var(--ui-shadow-hover)]">
      <div className="relative">
        <div className="overflow-hidden rounded-t-2xl">{banner}</div>
        {floating ? (
          <div className="absolute bottom-0 right-4 z-10 translate-y-1/2">
            {floating}
          </div>
        ) : null}
      </div>

      <div className="flex flex-1 flex-col px-5 pb-2 pt-10">
        <h3 className="text-lg font-bold text-[var(--ui-navy)]">{title}</h3>
        <p className="mt-1 text-sm font-medium text-[var(--ui-coral)]">
          {tagline}
        </p>
        <p className="mt-2 line-clamp-3 text-sm leading-relaxed text-[var(--ui-muted)]">
          {description}
        </p>
      </div>

      <div className="mt-auto rounded-b-2xl bg-[var(--ui-navy)] px-5 py-3 text-center text-[11px] font-medium uppercase tracking-wide text-white">
        {footer}
      </div>
    </article>
  );
}

/** 地区模块头图（首页配图） */
export function RegionBannerImage({
  src,
  alt,
}: {
  src: string;
  alt: string;
}) {
  return (
    <div className="relative h-44 w-full overflow-hidden rounded-t-2xl bg-slate-100">
      <Image
        src={src}
        alt={alt}
        fill
        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
        className="object-cover"
      />
    </div>
  );
}

/** 地区模块占位头图：渐变块（备用） */
export function RegionBannerGradient({
  from,
  to,
}: {
  from: string;
  to: string;
}) {
  return (
    <div
      className="h-44 w-full"
      style={{
        background: `linear-gradient(135deg, ${from} 0%, ${to} 100%)`,
      }}
    />
  );
}

/** 人物卡片头图：已解锁可传照片；未解锁显示头图区锁图标 */
export function PersonBanner({
  locked,
  src,
  alt,
}: {
  locked: boolean;
  src?: string;
  alt: string;
}) {
  if (!locked && src) {
    return (
      <div className="relative h-48 w-full overflow-hidden rounded-t-2xl bg-slate-100">
        <Image
          src={src}
          alt={alt}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          className="object-contain object-center"
        />
      </div>
    );
  }

  if (locked) {
    return (
      <div
        className="relative h-44 w-full overflow-hidden rounded-t-2xl bg-gradient-to-br from-slate-200 via-slate-100 to-slate-200"
        role="img"
        aria-label={`${alt}（未解锁）`}
      >
        <div className="absolute inset-0 flex items-center justify-center bg-[var(--ui-navy)]/20">
          <span className="inline-flex h-[4.5rem] w-[4.5rem] items-center justify-center rounded-full bg-white/95 text-slate-500 shadow-lg ring-2 ring-white/80">
            <LockIcon className="h-11 w-11" />
          </span>
        </div>
      </div>
    );
  }

  return (
    <div
      className="h-44 w-full bg-gradient-to-br from-[#e8eef5] via-[#f0f4f8] to-[var(--ui-coral-soft)]"
      role="img"
      aria-hidden
    />
  );
}
