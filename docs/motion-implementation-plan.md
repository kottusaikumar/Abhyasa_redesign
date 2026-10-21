# Motion implementation plan and page map

This plan records the controlled stages used for the local implementation. All items keep the current content, structure, and imagery. Base state is static and visible; every motion item falls back to that state with reduced motion, unsupported APIs, or no JavaScript. Expected cost is low except where noted.

## Stage A — Foundation

Add `motion.css` tokens, reduced-motion policy and progressive native page transitions. Add `motion.js` with one observer for the current page, one-shot Web Animations, and pagehide cleanup. No dependencies. Verify that unsupported browsers retain normal links and visible content.

## Stage B — Homepage

| Page / section | Current structure | Entrance / scroll / type / image / card behavior | Background / navigation | Cost |
|---|---|---|---|---|
| `/` or `/index.html` hero | Two-column training message and student image | Preserve existing short staggered headline; image stays in its approved crop | Existing orb remains static; general page handoff | Low |
| Learning resources | Navigation band and link groups | Introduce section once as it enters | No background motion | Low |
| Courses | Two image cards | Stagger cards; images enter with slight offset; hover elevation remains subtle | Course detail uses its own visual accent | Low |
| Journey | Three learning steps with images | Stagger steps, then each image; text remains readable | Existing step connector remains static | Low |
| Blog cards | Four-across desktop editorial grid | Stagger cards and images | Native card links | Low |
| Reviews / enroll / contact | Quotations and forms | Stagger review cards, introduce large form panels; do not animate fields | Normal submission and hash links | Low |

## Stage C — Inner pages

| Route(s) | Current structure | Motion map: entrance; scroll; type; image; card; background; navigation | Cost |
|---|---|---|---|
| `/about.html` | Banner, story, mission/vision, expertise, CTA | H1, story and section groups enter once; student picture subtle reveal and pointer-only scale; no background movement | Low |
| `/courses.html` | Course listing / legacy route | H1 and any available cards enter once; ordinary navigation | Low |
| `/courses/course1.html`, `/courses/course2.html` | Hero art, topic columns, review and modules | H1/lead, art, review panel and module heading enter once; tabs/carousel remain controlled by original JS | Low |
| `/projects/physical-design.html`, `/projects/design-verification.html` | Hero, four-step flow, project directory/details | Hero then flow steps; directory enters as unit; long project detail text remains static; native anchors and expansion | Low |
| `/placements.html` | Process, support, company strips, outcomes | Process/services/outcome cards enter once; existing continuous company strips retained; no additional marquee | Low |
| `/contact.html` | Hero, details, map, message form | H1 and principal panels enter; inputs and validation untouched | Low |
| `/vlsi-training-services.html` | Services listing | H1 and major section/card entrances only | Low |
| `/blog.html` | Blog listing | H1 and article cards enter; no per-paragraph motion | Low |
| `/blog/Nanometer-design-challenge.html` | Article cover, challenges, takeaway | Article heading/sections/figures enter; diagrams stay still once visible | Low |
| `/blog/finfet-tech-in-vlsi.html` | FinFET figure, advantages, comparison | Heading and major sections/figures enter; technical model is not transformed on hover | Low |
| `/blog/fc-to-innovus-command-mapping.html` | Tool mapping and comparison table | Heading and major sections enter; mapping table static for scanning | Low |
| `/blog/5-high-demand-careers-in-the-semiconductor-industry-and-how-to-get-there.html` | Career progression cards | Heading and career cards enter once; illustrations stay legible | Low |
| `/blog/how-the-semiconductor-industry-is-evolving-for-students.html` | Trends and road graphic | Heading and main cards/figure enter; road remains static to preserve exact visual | Low |
| `/blog/the-future-of-vlsi.html` and long alias | Six trends | Heading and main sections/figures enter; no diagram-level motion | Low |
| `/blog/physical-design-optimization.html` | Alternating technical visuals | Heading, major sections and figures enter; no per-line text animation | Low |
| `/blog/pnr/floorplanning-the-design.html` | Eight educational sections and figures | Section/figure entrances only; in-page contents navigation stays native | Low |
| `/blog/pnr/latchup-effect.html` | Ten technical sections | Section/figure entrances only; schematic labels remain static | Low |
| `/blog/pnr/trim-design.html` | Eight technical sections | Section/figure entrances only; code and command examples remain static | Low |
| `/blog/pnr/module-placement-constraints.html` | Five constraints and comparison | Section/figure entrances only; diagrams and table remain static for comprehension | Low |
| `/404.html` | Recovery message and navigation | H1 enters briefly; recovery links remain immediately available | Low |

## Stage D — Navigation

Same-origin document transitions use CSS `@view-transition` with ordinary route loads as fallback. Contextual course/project visual treatment is limited to those detail pages. Test direct load, back/forward, hash links, and narrow viewport; remove any transition that produces a bad capture.

## Stage E — Selective graphics

No new assets retained. Existing photos, SVG diagrams, and iconography already convey the learning material. Proposed particles/circuit overlays and 3D scenes would add noise and cost without a clear benefit. Major art changes would require a separate review.

## Stage F — Review

Check every route and representative viewport, reduced motion, keyboard focus, scrolling, console and assets. Capture baseline/post screenshots where tools allow. Remove redundant animation and report any tests that could not be run. No commit, push or deployment.
