# Abhyasa motion research

## Project baseline

Confirmed local repository: `C:\Users\kottu\Downloads\public_html`, branch `main`, remote `https://github.com/kottusaikumar/Abhyasa_redesign.git`. `.github/workflows/pages.yml` publishes pushes to `main`; this task makes local edits only. Baseline working tree was clean at `560bab8` before edits. The site is static HTML/CSS/vanilla JavaScript with 24 public HTML routes or aliases plus a source template and a verification file, and no application framework. The homepage already had a small entrance animation and card observer; placements has continuous company rows with reduced-motion handling.

## Direct reference observations

### Zero University — https://www.zero.university/

Inspected live in a narrow in-app browser and scrolled through several screens. Observed an image-led opening with oversized type and a persistent bottom CTA, a large color/type handoff with a layered paper object, then an airy white section where text and media enter differently, followed by overlapping scenario cards. These are visual observations at that viewport, not proof of a particular animation library or of desktop behavior. Public script URLs indicate Framer-hosted resources; exact motion internals were not established. Abhyasa adopts staged hierarchy and continuity, not Zero's imagery, typography, fixed CTA, or exact composition.

### Comparable methods

| Reference | Observed or documented behavior | Abhyasa decision | Cost / accessibility |
|---|---|---|---|
| [Codrops portfolio case study](https://tympanus.net/codrops/2025/07/29/built-to-move-a-closer-look-at-the-animations-behind-eduard-bodaks-portfolio/) | Deep card movement and scroll staging in an editorial portfolio | Use only a restrained card lift; the educational copy must stay stable | Full 3D choreography adds complexity and mobile cost |
| [Codrops sticky grid study](https://tympanus.net/codrops/2026/03/02/sticky-grid-scroll-building-a-scroll-driven-animated-grid/) | A staged grid controlled by scroll | Defer pinning: long technical articles need continuous reading | Pinned scenes can trap or slow reading |
| [MDN View Transition API](https://developer.mozilla.org/en-US/docs/Web/API/View_Transition_API) and [CSS opt-in](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/At-rules/%40view-transition) | Same-origin document navigation can transition progressively | Use a short crossfade/vertical handoff; normal navigation is fallback | Limited support; no JS routing or history interception |
| [MDN scroll-driven animations](https://developer.mozilla.org/en-US/docs/Web/CSS/Guides/Scroll-driven_animations) | CSS timelines can link progress to scroll | Defer broad use due compatibility and need for careful choreography | Unsupported browsers need static fallback |
| [GSAP ScrollTrigger](https://gsap.com/docs/v3/Plugins/ScrollTrigger/) | Sophisticated timeline, pin, and scrub controls | No package needed for the chosen effects | Would add weight and maintenance |
| [Motion scroll](https://motion.dev/docs/scroll) | Library scroll progress and timeline utilities | No package needed for the chosen effects | Another runtime is unjustified here |
| [web.dev animation guide](https://web.dev/articles/animations-guide/) and [compositor guidance](https://web.dev/articles/stick-to-compositor-only-properties-and-manage-layer-count) | Transform/opacity are efficient candidates; layers must be managed | One-shot transform/opacity entrances, no permanent `will-change` | Watch long pages and low-power devices |
| [MDN reduced motion](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/At-rules/%40media/prefers-reduced-motion) | Users may request less nonessential motion | Disable entrance and page motion; keep content visible | No dependency on animation for comprehension |

## Alternatives considered

- CSS-only scroll timelines: concise but limited support and less predictable across this mixed static site.
- JS scroll listener: rejected; unnecessary continuous work.
- IntersectionObserver + Web Animations: selected for one-shot entrances with normal visible document styling and no dependency.
- Native cross-document View Transitions: selected as progressive enhancement because URLs, direct loads, browser history, and fallback remain native.
- Canvas, WebGL, particles, 3D chip scene, or new art: deferred. Existing technical images are approved and the visual case for replacing them is weak. No brand-defining composition changes were made.

## Research limits

Zero University's desktop behavior and exact implementation mechanism were not established. Research informed design direction; it is not a claim of visual equivalence. No external code or imagery was copied.
