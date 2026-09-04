import fs from "node:fs";
import path from "node:path";

const root = process.cwd();
const baseUrl = "https://www.pmuroma.it";
const nowArg = process.argv.find((arg) => arg.startsWith("--now="));
const now = nowArg ? new Date(nowArg.slice("--now=".length)) : new Date();
const postsPath = path.join(root, "content", "blog-posts.json");
const posts = JSON.parse(fs.readFileSync(postsPath, "utf8"));
const published = posts
  .filter((post) => new Date(post.publishedAt) <= now)
  .sort((a, b) => new Date(b.publishedAt) - new Date(a.publishedAt));

const blogRoot = path.join(root, "blog");
fs.mkdirSync(blogRoot, { recursive: true });

for (const entry of fs.readdirSync(blogRoot, { withFileTypes: true })) {
  const fullPath = path.join(blogRoot, entry.name);
  if (entry.isDirectory()) fs.rmSync(fullPath, { recursive: true, force: true });
  if (entry.isFile() && entry.name === "index.html") fs.rmSync(fullPath);
}

const escapeHtml = (value) =>
  String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");

const formatDate = (iso) =>
  new Intl.DateTimeFormat("it-IT", {
    day: "2-digit",
    month: "long",
    year: "numeric",
    timeZone: "Europe/Rome"
  }).format(new Date(iso));

const linkLabels = new Map([
  ["#trattamenti", "Trattamenti disponibili"],
  ["#prezzi", "Listino e foto trattamento"],
  ["#contatti", "Prenota una consulenza"],
  ["#portfolio", "Guarda il portfolio"],
  ["#studio", "Studio, parcheggio e percorso"],
  ["dettagli-trattamento.html", "Come funziona il trattamento"]
]);

const nav = (active = "") => `
  <header class="site-header" data-header>
    <a class="brand" href="/" aria-label="Paola Benchea home">
      <span class="brand-mark">PB</span>
      <span>
        <strong>Paola Benchea</strong>
        <small>Trucco permanente Roma</small>
      </span>
    </a>
    <button class="nav-toggle" type="button" aria-expanded="false" aria-controls="main-nav" data-nav-toggle>
      <span></span>
      <span></span>
      <span></span>
      <span class="sr-only">Apri menu</span>
    </button>
    <nav class="main-nav" id="main-nav" aria-label="Navigazione principale" data-mobile-nav>
      <a href="/#trattamenti">Trattamenti</a>
      <a href="/dettagli-trattamento">Dettagli</a>
      <a href="/#prezzi">Prezzi</a>
      <a href="/#portfolio">Portfolio</a>
      <a href="/#studio">Studio</a>
      <a href="/blog"${active === "blog" ? ' aria-current="page"' : ""}>Blog</a>
      <a href="/#contatti">Contatti</a>
    </nav>
    <a class="header-cta" href="https://wa.me/393514260868?text=Ciao%20Paola%2C%20vorrei%20prenotare%20una%20consulenza%20per%20trucco%20permanente." rel="noopener">WhatsApp</a>
  </header>`;

const footer = `
  <footer class="site-footer">
    <div class="footer-brand">
      <strong>Trucco permanente by Paola Benchea</strong>
      <p>P.IVA 17536931003 - Ildebrando della Giovanna 83B, 00166 Roma</p>
      <div class="footer-contact">
        <a href="tel:+393514260868">+39 351 426 0868</a>
        <a href="mailto:info@pmuroma.it">info@pmuroma.it</a>
      </div>
    </div>
    <nav aria-label="Link utili e legali">
      <a href="/blog">Blog</a>
      <a href="/dettagli-trattamento">Dettagli trattamento</a>
      <a href="/privacy">Privacy</a>
      <a href="/cookie">Cookie</a>
      <a href="/termini">Termini</a>
    </nav>
  </footer>`;

const cookieBanner = `
  <div class="cookie-banner" data-cookie-banner hidden>
    <div>
      <strong>Cookie essenziali</strong>
      <p>Questo sito usa cookie tecnici necessari al funzionamento. Eventuali strumenti analytics o marketing saranno attivati solo con consenso.</p>
    </div>
    <div class="cookie-actions">
      <a href="/cookie">Dettagli</a>
      <button type="button" data-cookie-accept>Accetta</button>
    </div>
  </div>`;

function pageShell({ title, description, canonical, image, type = "website", body, structuredData }) {
  return `<!doctype html>
<html lang="it">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>${escapeHtml(title)}</title>
  <meta name="description" content="${escapeHtml(description)}">
  <meta name="robots" content="index,follow">
  <meta property="og:title" content="${escapeHtml(title)}">
  <meta property="og:description" content="${escapeHtml(description)}">
  <meta property="og:type" content="${type}">
  <meta property="og:url" content="${canonical}">
  <meta property="og:image" content="${baseUrl}/${image}">
  <link rel="canonical" href="${canonical}">
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link rel="icon" href="/favicon.svg" type="image/svg+xml">
  <link href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@500;600;700&family=Manrope:wght@400;500;600;700&display=swap" rel="stylesheet">
  <link rel="stylesheet" href="/assets/css/styles.css?v=24">
  ${structuredData ? `<script type="application/ld+json">\n  ${JSON.stringify(structuredData, null, 2)}\n  </script>` : ""}
</head>
<body>
  <a class="skip-link" href="#contenuto">Vai al contenuto</a>
  <div class="floating-layer" aria-hidden="true">
    <span class="float-piece float-piece-a"></span>
    <span class="float-piece float-piece-b"></span>
    <span class="float-piece float-piece-c"></span>
  </div>
${nav("blog")}
${body}
${footer}
${cookieBanner}
  <script src="/assets/js/main.js?v=24"></script>
</body>
</html>
`;
}

function linkFor(ref) {
  if (ref.startsWith("http")) return ref;
  if (ref.endsWith(".html")) return `/${ref.replace(/\.html$/, "")}`;
  if (ref.startsWith("#")) return `/${ref}`;
  return ref;
}

for (const post of published) {
  const dir = path.join(blogRoot, post.slug);
  fs.mkdirSync(dir, { recursive: true });
  const canonical = `${baseUrl}/blog/${post.slug}`;
  const body = `
  <main id="contenuto">
    <article class="blog-article">
      <header class="blog-hero">
        <div class="blog-hero-copy">
          <a class="blog-back" href="/blog">Blog PMU Roma</a>
          <p class="eyebrow">${escapeHtml(post.category)} - ${formatDate(post.publishedAt)}</p>
          <h1>${escapeHtml(post.title)}</h1>
          <p class="lead">${escapeHtml(post.description)}</p>
        </div>
        <figure class="blog-hero-media">
          <img src="/${post.image}" alt="${escapeHtml(post.alt)}" width="1200" height="1600">
        </figure>
      </header>
      <div class="blog-content">
        <aside class="blog-summary">
          <span>In breve</span>
          <p>${escapeHtml(post.description)}</p>
          <a class="button primary" href="/#contatti">Prenota una consulenza</a>
        </aside>
        <div class="blog-body">
          ${post.sections
            .map(([heading, ...paragraphs]) => `
          <section>
            <h2>${escapeHtml(heading)}</h2>
            ${paragraphs.map((paragraph) => `<p>${escapeHtml(paragraph)}</p>`).join("\n            ")}
          </section>`)
            .join("\n")}
          <nav class="blog-related" aria-label="Approfondimenti collegati">
            <h2>Continua il percorso</h2>
            <div class="blog-related-links">
              ${post.links.map((href) => `<a href="${linkFor(href)}">${href.startsWith("http") ? "Guarda altri lavori su Instagram" : linkLabels.get(href) || "Approfondimento collegato"}</a>`).join("\n              ")}
            </div>
          </nav>
        </div>
      </div>
    </article>
  </main>`;
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.description,
    image: `${baseUrl}/${post.image}`,
    datePublished: post.publishedAt,
    dateModified: post.publishedAt,
    author: { "@type": "Person", name: "Paola Benchea" },
    publisher: {
      "@type": "Organization",
      name: "Trucco permanente by Paola Benchea",
      logo: { "@type": "ImageObject", url: `${baseUrl}/favicon.svg` }
    },
    mainEntityOfPage: canonical
  };
  fs.writeFileSync(
    path.join(dir, "index.html"),
    pageShell({
      title: `${post.title} | PMU Roma`,
      description: post.description,
      canonical,
      image: post.image,
      type: "article",
      body,
      structuredData
    })
  );
}

const upcoming = posts
  .filter((post) => new Date(post.publishedAt) > now)
  .sort((a, b) => new Date(a.publishedAt) - new Date(b.publishedAt));

const blogBody = `
  <main id="contenuto">
    <section class="blog-index-hero">
      <div>
        <p class="eyebrow">Guide PMU Roma</p>
        <h1>Blog trucco permanente Roma</h1>
        <p class="lead">Guide pratiche su sopracciglia, labbra, eyeliner, preparazione, ritocco e scelta del trattamento più adatto.</p>
      </div>
      <div class="blog-index-note">
        <span>Pubblicazione programmata</span>
        <p>Nuove guide ogni venerdì alle 18:00, con contenuti utili e collegamenti alle sezioni del sito.</p>
      </div>
    </section>
    <section class="section blog-index-section">
      <div class="section-heading compact">
        <p class="eyebrow">Articoli</p>
        <h2>Approfondimenti disponibili</h2>
      </div>
      ${
        published.length
          ? `<div class="blog-card-grid">
        ${published
          .map(
            (post) => `<article class="blog-card">
          <a href="/blog/${post.slug}">
            <img src="/${post.image}" alt="${escapeHtml(post.alt)}" width="900" height="1200" loading="lazy">
            <span>${escapeHtml(post.category)} - ${formatDate(post.publishedAt)}</span>
            <h3>${escapeHtml(post.title)}</h3>
            <p>${escapeHtml(post.description)}</p>
          </a>
        </article>`
          )
          .join("\n        ")}
      </div>`
          : `<p class="blog-empty">La prima guida sarà pubblicata venerdì alle 18:00.</p>`
      }
    </section>
    <section class="section blog-schedule-section">
      <div class="section-heading compact">
        <p class="eyebrow">Calendario editoriale</p>
        <h2>Prossime uscite</h2>
      </div>
      <div class="schedule-list">
        ${upcoming
          .slice(0, 8)
          .map(
            (post) => `<article>
          <span>${formatDate(post.publishedAt)}</span>
          <h3>${escapeHtml(post.title)}</h3>
          <p>${escapeHtml(post.category)}</p>
        </article>`
          )
          .join("\n        ")}
      </div>
    </section>
  </main>`;

fs.writeFileSync(
  path.join(blogRoot, "index.html"),
  pageShell({
    title: "Blog PMU Roma | Guide trucco permanente",
    description: "Guide pratiche su trucco permanente a Roma: sopracciglia, labbra, eyeliner, aftercare, prezzi e scelta del trattamento.",
    canonical: `${baseUrl}/blog`,
    image: "assets/images/paola-benchea-dermopigmentista-roma-studio.jpeg",
    body: blogBody,
    structuredData: {
      "@context": "https://schema.org",
      "@type": "Blog",
      name: "Blog PMU Roma",
      url: `${baseUrl}/blog`,
      publisher: { "@type": "Organization", name: "Trucco permanente by Paola Benchea" }
    }
  })
);

const staticUrls = [
  ["/", "2026-09-04", "weekly", "1.0"],
  ["/dettagli-trattamento", "2026-09-04", "monthly", "0.8"],
  ["/blog", new Date().toISOString().slice(0, 10), "weekly", "0.8"],
  ["/privacy", "2026-09-04", "yearly", "0.3"],
  ["/cookie", "2026-09-04", "yearly", "0.3"],
  ["/termini", "2026-09-04", "yearly", "0.3"]
];

const sitemapUrls = [
  ...staticUrls.map(([url, lastmod, changefreq, priority]) => ({ url, lastmod, changefreq, priority })),
  ...published.map((post) => ({
    url: `/blog/${post.slug}`,
    lastmod: post.publishedAt.slice(0, 10),
    changefreq: "monthly",
    priority: "0.7",
    image: post.image,
    imageTitle: post.title
  }))
];

const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">
${sitemapUrls
  .map((entry) => `  <url>
    <loc>${baseUrl}${entry.url}</loc>
    <lastmod>${entry.lastmod}</lastmod>
    <changefreq>${entry.changefreq}</changefreq>
    <priority>${entry.priority}</priority>${entry.image ? `
    <image:image>
      <image:loc>${baseUrl}/${entry.image}</image:loc>
      <image:title>${escapeHtml(entry.imageTitle)}</image:title>
    </image:image>` : ""}
  </url>`)
  .join("\n")}
</urlset>
`;

fs.writeFileSync(path.join(root, "sitemap.xml"), sitemap);

console.log(`Generated blog: ${published.length} published, ${upcoming.length} scheduled.`);
