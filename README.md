# PMU Roma

Sito statico per `pmuroma.it`, gestito come landing HTML/CSS/JavaScript vanilla.

## Struttura

- `index.html`: homepage
- `privacy.html`: privacy policy
- `cookie.html`: cookie policy
- `termini.html`: termini e note trattamento
- `assets/`: CSS, JavaScript e immagini SEO
- `CNAME`: dominio custom per GitHub Pages
- `vercel.json`: configurazione statica per deploy Vercel

## Comandi locali

```powershell
npx serve . -l 4173
node tools/check-blog-schedule.mjs
node tools/generate-blog.mjs --now="2026-10-21T12:00:00+02:00"
node tools/qa-site.js
```

## Note

- Non inserire credenziali o dati privati nel repository.
- Preservare i record email Google Workspace quando si modifica il DNS.
- Prima del deploy verificare homepage, pagine legali, asset, mobile e desktop.
