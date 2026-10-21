import fs from "node:fs";
import path from "node:path";

const root = process.cwd();
const htmlFiles = [];
const collectHtml = (dir) => {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    if ([".git", ".vercel", "node_modules"].includes(entry.name)) continue;
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) collectHtml(full);
    if (entry.isFile() && entry.name.endsWith(".html")) htmlFiles.push(path.relative(root, full));
  }
};
collectHtml(root);
const forbidden = [
  "Microblading",
  "Laminazione",
  "Contorno labbra",
  "Riempimento full",
  "Effetto 3D",
  "4000",
  "wing",
  "classico",
  "lash line",
  "collore labbra"
];

let errors = [];

const siteTextFiles = [
  ...htmlFiles,
  "BLOG-SCHEDULE.md",
  "content/blog-posts.json",
  "llms.txt",
  "sitemap.xml",
  "tools/generate-blog.mjs"
];

for (const file of siteTextFiles) {
  const text = fs.readFileSync(path.join(root, file), "utf8");
  if (/\bAurelia\b/i.test(text)) errors.push(`Old locality "Aurelia" in ${file}`);
}

const home = fs.readFileSync(path.join(root, "index.html"), "utf8");
if (!home.includes("5.0 / 25 recensioni")) errors.push("Homepage Google review count is not 25");
if (!/class="review-card"[^>]*href="https:\/\/maps\.app\.goo\.gl\/aXcvbN4NfMTmpTgc9"/.test(home)) {
  errors.push("Homepage review cards do not link to the Google profile");
}
if (/eyeliner[^<.]{0,80}sfumat/i.test(home)) errors.push("Homepage still presents shaded eyeliner as a service");

const massiminaPage = path.join(root, "studio-roma-massimina.html");
if (!fs.existsSync(massiminaPage)) errors.push("Missing studio-roma-massimina.html");

const vercelConfig = fs.readFileSync(path.join(root, "vercel.json"), "utf8");
if (!vercelConfig.includes('"source": "/studio-roma-aurelia"') ||
    !vercelConfig.includes('"destination": "/studio-roma-massimina"')) {
  errors.push("Missing permanent redirect from the old Aurelia studio route");
}

for (const file of htmlFiles) {
  const full = path.join(root, file);
  if (!fs.existsSync(full)) {
    errors.push(`Missing ${file}`);
    continue;
  }

  const html = fs.readFileSync(full, "utf8");
  if (/[ÃÂ�]/.test(html)) errors.push(`Encoding issue in ${file}`);

  for (const term of forbidden) {
    if (html.toLowerCase().includes(term.toLowerCase())) {
      errors.push(`Forbidden term "${term}" in ${file}`);
    }
  }

  const refs = [...html.matchAll(/(?:href|src)=["']([^"']+)["']/g)].map((match) => match[1]);
  for (const ref of refs) {
    if (/^(https?:|mailto:|tel:|#|javascript:)/.test(ref)) continue;
    const cleanRef = ref.split("?")[0].split("#")[0];
    if (!cleanRef) continue;
    const localPath = cleanRef.replace(/^\/+/, "");
    const candidates = [
      path.join(root, localPath),
      path.join(root, `${localPath}.html`),
      path.join(root, localPath, "index.html")
    ];
    if (!candidates.some((target) => fs.existsSync(target))) {
      errors.push(`Broken local asset/link in ${file}: ${ref}`);
    }
  }
}

if (errors.length) {
  console.error(errors.join("\n"));
  process.exit(1);
}

console.log(`QA ok: ${htmlFiles.length} HTML files, local links/assets present, forbidden terms absent.`);
