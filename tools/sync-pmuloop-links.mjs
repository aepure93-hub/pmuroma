import fs from "node:fs";
import path from "node:path";

const root = process.cwd();
const pmuloopUrl = "https://pmuloop.com/?utm_source=pmuroma&utm_medium=referral&utm_campaign=studio_origin";
const link = `<a href="${pmuloopUrl}" data-track="pmuloop" rel="noopener">PMULoop · progetto professionale</a>`;

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

let changed = 0;
for (const file of htmlFiles) {
  const original = fs.readFileSync(file, "utf8");
  const footer = original.match(/<footer class="site-footer"[\s\S]*?<\/footer>/)?.[0] || "";
  if (!footer || footer.includes('data-track="pmuloop"')) continue;
  const updated = original.replace(
    /(<footer class="site-footer"[\s\S]*?<nav[^>]*>[\s\S]*?)(\s*<\/nav>)/,
    `$1\n      ${link}$2`,
  );
  if (updated === original) throw new Error(`Unable to locate footer navigation in ${path.relative(root, file)}`);
  fs.writeFileSync(file, updated);
  changed += 1;
}

console.log(`PMULoop footer sync complete: ${changed} files changed, ${htmlFiles.length} HTML files checked.`);
