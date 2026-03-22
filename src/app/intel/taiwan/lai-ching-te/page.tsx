import { LaiChingTeContent } from "@/components/intel/LaiChingTeContent";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "赖清德",
  description: "目标人物分析档案",
};

export default function LaiChingTePage() {
  return <LaiChingTeContent />;
}
