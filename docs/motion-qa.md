# Local motion QA — 2026-10-18

## Preview

Run from `C:\Users\kottu\Downloads\public_html`:

```powershell
node scripts/preview-local.cjs 4188
```

Open `http://127.0.0.1:4188/`. The server binds only to localhost, needs no package install, and resolves extensionless `.html` links. It was started and verified in the in-app browser; `/courses/course1` resolved to the course page and an unknown route displayed `404.html`.

## Completed checks

- `node --check motion.js`, `node --check homepage.js`, and `node --check scripts/preview-local.cjs`: passed.
- `git diff --check`: no whitespace errors. Git emitted only Windows line-ending conversion notices.
- All 24 public HTML pages/aliases have the shared CSS and JS references. Source template and verification file were not modified.
- Inspected local browser routes for homepage, about, course listing and details, projects, placements, contact, services, blog listing and articles, and four PnR guides. All inspected pages loaded a heading and motion resources; no broken completed images or horizontal overflow at default viewport.
- At 390 px checked homepage, a course, a project, placements, a technical guide and contact: no horizontal overflow. At 768 px and 1440 px checked homepage, course detail, project detail and a technical guide: no horizontal overflow.
- Clicked course Modules tab and Next review; selected state and review counter changed. Clicked Projects menu; expanded state changed. Mobile menu opened and navigated to About. Native browser back/forward returned between Home and About.
- Observed homepage cards and a FinFET article after their one-shot entrance; content returned to full opacity. No browser console errors in the inspected home/About navigation sequence.

## Limits and review points

- The in-app browser reported no `document.startViewTransition` function, so the progressive cross-document animation was **not visually verified** there. Native navigation fallback, history and direct route loading were verified. Inspect transitions in a browser with cross-document View Transitions support before publication.
- Reduced-motion OS emulation was not available in this browser session. CSS and JavaScript contain explicit reduced-motion fallbacks; manually inspect with the OS setting enabled.
- No Lighthouse or Core Web Vitals benchmark was run, so no LCP/CLS/INP improvement claim is made. New shared CSS and JS total about 7.3 KB uncompressed; no third-party animation dependency or image was added.
- Contact/enrollment forms were not submitted because submission may open the user's email application. Existing form code was not changed.
- This is local QA, not deployment verification. No commit, push or deployment occurred.
