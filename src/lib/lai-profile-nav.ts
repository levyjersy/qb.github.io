export type LaiProfileNavItem = {
  id: string;
  label: string;
};

/** 赖清德个人页左侧导航与正文锚点 */
export const LAI_PROFILE_NAV: LaiProfileNavItem[] = [
  { id: "lai-basic-profile", label: "基础画像" },
  { id: "lai-ideology", label: "意识形态" },
  { id: "lai-decision-style", label: "决策风格" },
  { id: "lai-network", label: "关系网络" },
  { id: "lai-behavior-trajectory", label: "行为轨迹" },
  { id: "lai-policy-forecast", label: "政策预判" },
];

export function getLaiProfileSectionIds(): string[] {
  return LAI_PROFILE_NAV.map((i) => i.id);
}
