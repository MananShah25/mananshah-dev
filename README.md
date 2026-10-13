# mananshah-dev

Personal portfolio of **Manan Shah**: ML / Applied AI engineer, software, test & automation engineer, and forward deployed engineer.

Built with Next.js 16 (App Router), React 19, TypeScript and Tailwind CSS 4. Every page is prerendered as static HTML.

## Run locally

```bash
npm install
npm run dev        # http://localhost:3000
```

Other scripts: `npm run build` (production build), `npm run start` (serve the build), `npm run lint`.

## Editing content

All copy lives in two files, so updating the site never requires touching layouts:

| File | What it holds |
| --- | --- |
| `content/site.ts` | Hero text, roles, about, social links, education, experience, skills |
| `content/projects.ts` | Projects (featured ones get a case-study page at `/projects/<slug>`) and open-source contributions |

- **Featured vs. listed project:** a project with a `caseStudy` field is featured and gets its own page; without one it appears under "Also built".
- **Undergrad GPA:** uncomment the `gpa` line in the NMIMS entry of `content/site.ts`.
- **Accent color:** change `--accent` in `src/app/globals.css` (one value per theme).
- **Images:** put files in `public/img/` and reference them as `/img/<file>`.

Content files are bundled into the browser, so never put private data (emails, API keys) in them.

## Contact form

The form sends email through [Resend](https://resend.com) from a server action, so the recipient address and API key never reach the browser. Copy `.env.example` to `.env.local` and fill in:

| Variable | Purpose |
| --- | --- |
| `RESEND_API_KEY` | API key from resend.com/api-keys |
| `CONTACT_TO_EMAIL` | Where messages are delivered. Without a verified domain in Resend, this must be the email you signed up to Resend with. |
| `CONTACT_FROM_EMAIL` | Optional. Sender address once you verify your own domain. |

Messages arrive with the subject prefix `[Portfolio]`, which makes a Gmail filter easy. Without these variables the form shows a polite "reach out on LinkedIn" message instead of failing. Spam protection: a hidden honeypot field and a minimum fill time.

## Deploying (Vercel)

1. Push this repo to GitHub.
2. In Vercel, import the repo (framework preset: **Next.js**, no other build settings needed).
3. Add the environment variables above under **Settings → Environment Variables**.
4. Every push to `main` redeploys automatically.

`NEXT_PUBLIC_SITE_URL` (optional) overrides the canonical URL used in metadata and the sitemap; it defaults to `https://manan-shah-portfolio.vercel.app`.

## Project structure

```
content/            site copy (site.ts, projects.ts)
public/             photo, campus images, resume PDF
src/app/            pages, metadata, icons, sitemap, robots, contact server action
src/components/     UI sections, command palette (⌘K / Ctrl+K), theme toggle
src/lib/            content helpers, types, nav links, site URL
```
