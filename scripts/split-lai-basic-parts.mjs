/**
 * 将 public/content/lai-basic-life.html 拆为：引言（生平与职业路径标题）+ 四节 HTML
 * 依赖 Word 小节编号 >1.1 … >1.4
 * 运行: node scripts/split-lai-basic-parts.mjs
 */
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, "..");

const fullPath = path.join(root, "public", "content", "lai-basic-life.html");
if (!fs.existsSync(fullPath)) {
  console.error("请先运行: node scripts/extract-lai-basic-profile.mjs");
  process.exit(1);
}

const full = fs.readFileSync(fullPath, "utf8");

function findPBefore(marker) {
  const i = full.indexOf(marker);
  if (i < 0) throw new Error(`未找到标记: ${marker}`);
  return full.lastIndexOf("<p ", i);
}

const i1 = findPBefore(">1.1 </span>");
const i2 = findPBefore(">1.2 </span>");
const i3 = findPBefore(">1.3 </span>");
const i4 = findPBefore(">1.4 </span>");

const introHtml = full.slice(0, i1);
const birthHtml = full.slice(i1, i2);
const familyEducationHtml = full.slice(i2, i3);
const medicalHtml = full.slice(i3, i4);
const politicalHtml = full.slice(i4);

const outDir = path.join(root, "public", "content", "lai-basic");
fs.mkdirSync(outDir, { recursive: true });

fs.writeFileSync(path.join(outDir, "intro.html"), introHtml, "utf8");
fs.writeFileSync(path.join(outDir, "01-birth.html"), birthHtml, "utf8");
fs.writeFileSync(path.join(outDir, "02-family-education.html"), familyEducationHtml, "utf8");
fs.writeFileSync(path.join(outDir, "03-medical.html"), medicalHtml, "utf8");
fs.writeFileSync(path.join(outDir, "04-political.html"), politicalHtml, "utf8");

console.log("OK:", outDir);
console.log({
  intro: introHtml.length,
  birth: birthHtml.length,
  familyEducation: familyEducationHtml.length,
  medical: medicalHtml.length,
  political: politicalHtml.length,
});
