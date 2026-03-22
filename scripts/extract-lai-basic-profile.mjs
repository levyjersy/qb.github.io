/**
 * 从 Desktop/lqd.mhtml 截取「生平与职业路径」至「二、」之前，解码 quoted-printable，输出 public/content/lai-basic-life.html
 * 运行: node scripts/extract-lai-basic-profile.mjs
 */
import { spawnSync } from "child_process";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, "..");

function decodeQuotedPrintable(str) {
  str = str.replace(/=\r\n/g, "").replace(/=\n/g, "");
  return str.replace(/=([0-9A-F]{2})/gi, (_, hex) =>
    String.fromCharCode(parseInt(hex, 16)),
  );
}

const srcPath = path.join("C:", "Users", "PC", "Desktop", "lqd.mhtml");
const raw = fs.readFileSync(srcPath, "utf8");
// 从「生平与职业路径」所在小节顶部的 <p>（heading_1）起，保证标题与样式闭合完整
const headingAnchor = raw.indexOf("heading_1");
if (headingAnchor < 0) throw new Error("未找到 heading_1 锚点");
const start = raw.lastIndexOf("<p ", headingAnchor);
if (start < 0) throw new Error("未找到小节起始 <p>");

const fromStart = raw.slice(start);
const endRel = fromStart.indexOf("二、");
if (endRel < 0) throw new Error("未找到「二、」作为结束标记");

let fragment = fromStart.slice(0, endRel);
fragment = decodeQuotedPrintable(fragment);

const outDir = path.join(root, "public", "content");
fs.mkdirSync(outDir, { recursive: true });
const outPath = path.join(outDir, "lai-basic-life.html");
fs.writeFileSync(outPath, fragment, "utf8");

console.log("OK:", outPath, "bytes:", Buffer.byteLength(fragment, "utf8"));

const splitScript = path.join(__dirname, "split-lai-basic-parts.mjs");
spawnSync(process.execPath, [splitScript], { stdio: "inherit", cwd: root });
