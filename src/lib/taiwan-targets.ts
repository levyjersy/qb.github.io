/** 台湾模块人物列表；仅开放赖清德详情页 */
export type TaiwanTarget = {
  slug: string | null;
  name: string;
  unlocked: boolean;
  /** 已解锁人物头像路径（public 下） */
  portraitSrc?: string;
};

const RAW_NAMES = [
  "赖清德",
  "苏贞昌",
  "游锡堃",
  "吴钊燮",
  "萧美琴",
  "顾立雄",
  "蔡其昌",
  "柯建铭",
  "林飞帆",
  "陈椒华",
  "王定宇",
  "沈伯洋",
  "曹兴诚",
  "刘世芳",
  "郑英耀",
  "陈舒怡",
  "刘世芳",
  "沈伯洋",
  "吴思瑶",
  "黄捷",
  "林达",
  "林俊言",
  "林俊廷",
  "曹兴诚",
  "史书华",
  "温子渝",
  "陈柏源",
] as const;

function dedupePreserveOrder(names: readonly string[]): string[] {
  const seen = new Set<string>();
  const out: string[] = [];
  for (const n of names) {
    if (seen.has(n)) continue;
    seen.add(n);
    out.push(n);
  }
  return out;
}

const UNIQUE_NAMES = dedupePreserveOrder(RAW_NAMES);

export const TAIWAN_TARGETS: TaiwanTarget[] = UNIQUE_NAMES.map((name) => {
  if (name === "赖清德") {
    return {
      name,
      slug: "lai-ching-te",
      unlocked: true,
      portraitSrc: "/image/laiqingde.jpg",
    };
  }
  return { name, slug: null, unlocked: false };
});
