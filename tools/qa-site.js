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
