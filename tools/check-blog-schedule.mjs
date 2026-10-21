import fs from "node:fs";
import path from "node:path";

const root = process.cwd();
const schedulePath = path.join(root, "BLOG-SCHEDULE.md");
const postsPath = path.join(root, "content", "blog-posts.json");
const schedule = fs.readFileSync(schedulePath, "utf8");
const posts = JSON.parse(fs.readFileSync(postsPath, "utf8"));

const scheduled = [...schedule.matchAll(/^\|\s*(\d{4}-\d{2}-\d{2})\s+(\d{2}:\d{2})\s*\|\s*(.+?)\s*\|$/gm)].map(
  ([, date, time, title]) => ({ date, time, title })
);

const errors = [];
const seenSlugs = new Set();
const seenTitles = new Set();
const normalizeTitle = (value) =>
  value
    .normalize("NFD")
    .replace(/\p{Diacritic}/gu, "")
    .replace(/\s+/g, " ")
    .trim()
    .toLocaleLowerCase("it");

for (const post of posts) {
  if (seenSlugs.has(post.slug)) errors.push(`Duplicate blog slug: ${post.slug}`);
  if (seenTitles.has(post.title)) errors.push(`Duplicate blog title: ${post.title}`);
  seenSlugs.add(post.slug);
  seenTitles.add(post.title);

  const imagePath = path.join(root, post.image ?? "");
  if (!post.image || !fs.existsSync(imagePath)) {
    errors.push(`Missing blog image for "${post.title}": ${post.image ?? "(not set)"}`);
  }
}

for (const entry of scheduled) {
  const post = posts.find((candidate) => normalizeTitle(candidate.title) === normalizeTitle(entry.title));
  if (!post) {
    errors.push(`Scheduled article missing from content/blog-posts.json: ${entry.date} ${entry.title}`);
    continue;
  }

  const scheduledMinute = `${entry.date}T${entry.time}`;
  if (!post.publishedAt.startsWith(scheduledMinute)) {
    errors.push(
      `Scheduled date mismatch for "${entry.title}": calendar ${entry.date} ${entry.time}, content ${post.publishedAt}`
    );
  }
}

if (errors.length) {
  console.error(errors.join("\n"));
  process.exit(1);
}

console.log(`Blog schedule ok: ${scheduled.length} calendar entries match ${posts.length} source posts.`);
