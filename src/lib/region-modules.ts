export type RegionModule = {
  id: string;
  label: string;
  labelEn: string;
  /** 未开放时为 null，卡片显示锁定 */
  href: string | null;
};

export const REGION_MODULES: RegionModule[] = [
  {
    id: "us",
    label: "美国",
    labelEn: "United States",
    href: null,
  },
  {
    id: "jp",
    label: "日本",
    labelEn: "Japan",
    href: null,
  },
  {
    id: "in",
    label: "印度",
    labelEn: "India",
    href: null,
  },
  {
    id: "tw",
    label: "台湾",
    labelEn: "Taiwan",
    href: "/intel/taiwan",
  },
];
