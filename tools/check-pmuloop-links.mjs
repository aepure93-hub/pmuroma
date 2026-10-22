import fs from "node:fs";
import path from "node:path";

const root = process.cwd();
const errors = [];
const expectedUrl = "https://pmuloop.com/?utm_source=pmuroma&utm_medium=referral&utm_campaign=studio_origin";

const htmlFiles = [];
const walk = (dir) => {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    if ([".git", ".vercel", "node_modules"].includes(entry.name)) continue;
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) walk(full);
    if (entry.isFile() && entry.name.endsWith(".html")) htmlFiles.push(full);
  }
};
walk(root);

const standardPages = htmlFiles.filter((file) => fs.readFileSync(file, "utf8").includes('class="site-footer"'));
for (const file of standardPages) {
  const html = fs.readFileSync(file, "utf8");
  const footer = html.match(/<footer class="site-footer"[\s\S]*?<\/footer>/)?.[0] || "";
  const count = (footer.match(/data-track="pmuloop"/g) || []).length;
  if (count !== 1) errors.push(`${path.relative(root, file)} has ${count} PMULoop footer links; expected 1`);
  if (!footer.includes(expectedUrl)) errors.push(`${path.relative(root, file)} is missing the attributed PMULoop footer URL`);
}

const generator = fs.readFileSync(path.join(root, "tools/generate-blog.mjs"), "utf8");
if (!generator.includes(expectedUrl) || !generator.includes('data-track="pmuloop"')) {
  errors.push("Blog generator is not the canonical source for the PMULoop footer link");
}

const about = fs.readFileSync(path.join(root, "chi-e-paola-benchea.html"), "utf8");
if (!about.includes("Dal lavoro quotidiano nasce PMULoop")) errors.push("Paola profile is missing the PMULoop collaboration section");

const home = fs.readFileSync(path.join(root, "index.html"), "utf8");
const attributedHomeCta = `<a class="button secondary" href="${expectedUrl}" data-track="pmuloop" rel="noopener">Scopri PMULoop</a>`;
if (!home.includes(attributedHomeCta)) errors.push("Homepage PMULoop CTA is missing attribution or tracking");

const consent = fs.readFileSync(path.join(root, "assets/js/consent.js"), "utf8");
if (!consent.includes('"pmuloop_click"')) errors.push("Consent-aware PMULoop click event is missing");

if (errors.length) {
  console.error(errors.join("\n"));
  process.exit(1);
}

console.log(`PMULoop link matrix ok: ${standardPages.length} standard pages.`);
