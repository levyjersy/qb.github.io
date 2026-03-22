"use client";

export type PortraitKind = "person" | "group";

const AVATAR_PALETTES = [
  "from-slate-500 to-slate-700",
  "from-[var(--ui-navy)] to-slate-800",
  "from-emerald-600 to-emerald-800",
  "from-teal-600 to-cyan-800",
  "from-indigo-500 to-indigo-700",
  "from-[var(--ui-coral)]/90 to-rose-700",
  "from-amber-600 to-orange-800",
  "from-sky-600 to-blue-800",
];

function hashIndex(key: string, mod: number) {
  let h = 0;
  for (let i = 0; i < key.length; i += 1) {
    h = (h * 31 + key.charCodeAt(i)) >>> 0;
  }
  return h % mod;
}

export function PortraitAvatar({
  name,
  kind = "person",
}: {
  name: string;
  kind?: PortraitKind;
}) {
  const displayName = name.replace(/（[^）]*）/g, "").trim();
  const initial =
    kind === "group"
      ? displayName.slice(0, 1)
      : displayName.slice(0, 1) || "?";
  const grad = AVATAR_PALETTES[hashIndex(displayName, AVATAR_PALETTES.length)];

  return (
    <div
      className="relative h-12 w-12 shrink-0 overflow-hidden rounded-full border-2 border-white shadow-md ring-1 ring-black/10"
      aria-hidden
    >
      <div
        className={`absolute inset-0 bg-gradient-to-br ${grad} opacity-95`}
      />
      <div
        className="absolute inset-0 opacity-[0.18]"
        style={{
          backgroundImage:
            "radial-gradient(circle at 30% 25%, white 0%, transparent 45%)",
        }}
      />
      {kind === "person" ? (
        <svg
          className="absolute bottom-0 left-1/2 z-0 h-[55%] w-[70%] -translate-x-1/2 text-white/22"
          viewBox="0 0 64 64"
          fill="currentColor"
          aria-hidden
        >
          <ellipse cx="32" cy="22" rx="14" ry="16" />
          <path d="M12 58c4-14 12-22 20-22s16 8 20 22" />
        </svg>
      ) : null}
      <span className="relative z-10 flex h-full w-full items-center justify-center text-base font-bold tracking-tight text-white drop-shadow-sm">
        {initial}
      </span>
    </div>
  );
}
