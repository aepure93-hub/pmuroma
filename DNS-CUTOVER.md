# DNS Cutover - PMU Roma

Current public state checked 2026-09-04:

- Nameservers: `ns12.wixdns.net`, `ns13.wixdns.net`
- `pmuroma.it` A: `213.158.79.35` (Register.it/nginx, currently returns 503)
- `www.pmuroma.it` CNAME: `pmuroma.it`
- Email: Google Workspace MX records, must be preserved

Vercel project:

- Scope/team: `alins-projects-4f20fcc1`
- Project: `pmuroma`
- Deployment: `dpl_CeHrGcSWBwedP2Gu7152J11cV3ut`
- Production URL: `https://pmuroma-3qq06kbjd-alins-projects-4f20fcc1.vercel.app`
- Custom domains attached: `pmuroma.it`, `www.pmuroma.it`

Required DNS web records at the current DNS provider:

```text
A      @      216.198.79.1
A      @      64.29.17.1
CNAME  www    8c1f53d414fdea1a.vercel-dns-017.com.
```

Do not remove:

```text
MX  aspmx.l.google.com
MX  alt1.aspmx.l.google.com
MX  alt2.aspmx.l.google.com
MX  alt3.aspmx.l.google.com
MX  alt4.aspmx.l.google.com
TXT v=spf1 include:_spf.google.com ~all
TXT google-site-verification=...
```

After DNS change:

```powershell
npx vercel domains verify pmuroma.it --scope alins-projects-4f20fcc1
npx vercel domains verify www.pmuroma.it --scope alins-projects-4f20fcc1
Resolve-DnsName pmuroma.it
Resolve-DnsName www.pmuroma.it
curl.exe -I https://pmuroma.it/
curl.exe -I https://www.pmuroma.it/
```
