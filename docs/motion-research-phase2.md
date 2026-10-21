# Abhyasa VLSI: motion and visual direction research, revision 2

18 October 2026 · Research and art direction only · Local project

## Decision

The present motion layer is technically competent but visually insufficient. It animates *the arrival of existing boxes*; it does not design the relationship between scenes, the transformation of a technical idea, or the learner's progression. The result is a polished static website with occasional fades, which explains the user's observation that it does not feel like Zero University.

The recommended direction is **From signal to skill**: a restrained blue/green engineering language in which a signal, trace, wafer layer, or layout path changes form as the learner moves from training to practice to career. One carefully composed signature sequence on the homepage should establish the identity. Course, project, article, placement, and contact pages should reuse that visual grammar at lower intensity. Motion must never make technical text harder to read.

This is a translation of design principles, not a copy of Zero University's brand, assets, typography, or compositions. Preserve Abhyasa's approved content, navigation, images, and page hierarchy unless an individual prototype demonstrates a clear improvement.

## Evidence and observation method

I inspected the live [Zero University](https://www.zero.university/) site in the browser at multiple scroll positions and compared it with the locally running Abhyasa homepage at `http://127.0.0.1:4188/`. Screenshots were observations of rendered states, not proof of the code used to create them. I also inspected the current local `motion.css`, `motion.js`, and motion research/design documents. External design and engineering references below are the authors' own documentation or case studies.

### Zero University: observed storyboard

| Beat | What was visible in the live site | Design mechanism, inferred from appearance | Abhyasa translation |
|---|---|---|---|
| Opening | A full-bleed tabletop scene, cutting mat, paper, stationery, oversized contrasting serif/script words, bottom CTA | A composed visual world with material texture, scale contrast, and editorial type hierarchy | Compose a VLSI-specific hero scene around an *actual chip-layout image* and one strong headline; keep Abhyasa's blue/green identity |
| Friction | A degree certificate fills the view as the story discusses education and employment | Concrete prop embodies the problem, so the visual is evidence for the copy | Show the gap between theory and industry through a compact, accurate layout/waveform contrast; do not invent false statistics |
| Turn | A crumpled paper object, giant yellow type, then a quieter “Learn. Build. Get hired” framing | Escalation followed by release; varied scale and rhythm, not repeated entrance animation | One deliberate transformation from input signal to routed chip path, then a calm course choice |
| Career list | Plain, spacious rows after the cinematic opening | Contrast in density gives the user reading time | Let programs, specifications, syllabus, forms, and article tables remain steady and scannable |
| Projects | Large environmental imagery; project cards enter against the scene | Foreground/background depth; the card is placed in a context | Bring a real project result/diagram forward from a stable technical backdrop; avoid generic parallax on every card |
| Persistent action | Bottom “Join Beta” control remains available through multiple scenes | Conversion access is constant while scenes change | Keep primary enrollment action discoverable; do not cover course text or mobile content |

These observations support the conclusion that Zero's impact comes from **art direction, contrast, pacing, and scene continuity**. A large CSS animation count alone would not reproduce it. Its specific rendering stack was not verified and is irrelevant to the design decision.

### Current Abhyasa: direct gap analysis

| Current behavior | Why it feels limited | What the next prototype should demonstrate |
|---|---|---|
| `motion.js` uses one IntersectionObserver to run variations of opacity + 10–22 px translation | Same visual event recurs across disparate content; no development of an idea | Three clearly different story beats with distinct composition and purpose |
| `motion.css` gives cards 4 px hover lift and image scale 1.025 | Pleasant feedback, but there is no visual identity or relationship among sections | A trace/path motif that evolves through the hero, curriculum, and projects |
| Whole-page crossfade is the primary navigation treatment | Fading entire pages does not show how a course card relates to a course page; browser support varies | A contextual handoff for the selected course or project, with ordinary navigation fallback |
| Homepage scroll goes from hero to link band to cards with no narrative visual handoff | Sections feel like a sequence of independent templates | Signal or chip-layout shape connects the hero and program choice, then resolves into content |
| Heading, card, image, and figure effects share similar timing | Uniform pacing makes every section equal in importance | One expressive peak, then productive/calm reading moments |
| Technical article figures are static | This is appropriate for reading, but the *relationship* between diagram stages is not explained visually | Optional user-controlled layer or state changes in selected diagrams only |

The current layer should be treated as a baseline/fallback, not multiplied across more selectors. Adding larger translations or longer durations to it would increase movement without creating meaning.

## Cross-disciplinary principles

### Motion direction and animation

1. **Staging and hierarchy:** one focal event at a time. In the homepage hero, the learner promise lands first, the technical visual answers it, and the action becomes available. Do not animate every line or icon independently.
2. **Anticipation → action → settle:** a trace can illuminate briefly before a layout layer resolves. The micro-anticipation should signal cause, not delay navigation.
3. **Continuity/match cut:** a line or object can persist across adjacent sections so the viewer understands they are seeing a progression. Figma describes continuity and transition as important motion functions; match cuts and paced holds are part of its motion team's storytelling practice. [Figma motion fundamentals](https://help.figma.com/hc/en-us/articles/41237382040983-Motion-design-fundamentals-Why-motion-matters), [Figma principles in motion](https://www.figma.com/blog/principles-in-motion/).
4. **Rhythm:** use an expressive hero moment, a calmer program section, a project demonstration, then quiet reading. IBM Carbon distinguishes expressive from productive motion and recommends the expressive mode for occasional important moments. [Carbon motion](https://v10.carbondesignsystem.com/guidelines/motion/overview/).
5. **Physicality:** changes should accelerate/decelerate naturally and respond to input. A spring is appropriate for a small interactive response; technical diagrams should settle precisely, without bouncy ambiguity. [Material 3 motion physics](https://m3.material.io/styles/motion/overview/how-it-works), [Figma principles in motion](https://www.figma.com/blog/principles-in-motion/).

### Graphic design and visual storytelling

1. **Composition before animation:** a strong static keyframe must already be attractive and intelligible. Motion cannot rescue a weak hero photo crop, uniform card grid, or flat spacing. Balance, hierarchy, contrast, alignment, and white space are fundamental graphic-design controls. [Adobe graphic design guide](https://www.adobe.com/uk/creativecloud/design/discover/what-is-graphic-design.html).
2. **Meaningful visual contrast:** use differences in size, value, texture, and shape as well as color. A large authentic technical visual beside a concise promise creates more focus than many similarly sized animated cards. [Adobe color contrast guide](https://www.adobe.com/uk/creativecloud/design/discover/color-contrast.html).
3. **One visual metaphor, multiple expressions:** Figma's own brand work defines a small set of moves—selection, activation, transformation—and builds reusable parts rather than custom effects for every surface. For Abhyasa, the reusable moves should be *trace*, *layer*, and *resolve*. [Figma brand refresh](https://www.figma.com/blog/figma-on-figma-evolving-our-visual-language/), [Config 2024 identity](https://www.figma.com/blog/config-2024-branding/).
4. **Educational truth:** every waveform, floorplan, routing path, and placement illustration must match the associated content. Decorative circuit graphics may support atmosphere but must never masquerade as instruction.

### UI/UX and accessibility

- Motion must fulfill at least one role: orientation, feedback, transition, or narrative. These are Figma's four useful functions of UX motion. [Figma motion fundamentals](https://help.figma.com/hc/en-us/articles/41237382040983-Motion-design-fundamentals-Why-motion-matters).
- Reading and task completion take precedence. Buttons, menu states, accordion details, validation, and selected tabs need fast, direct feedback. Atlassian's design system distinguishes short interactions from longer spatial transitions. [Atlassian motion](https://atlassian.design/foundations/motion).
- Avoid automatic perpetual animation behind text. Offer a pause/stop control if a decorative sequence runs for more than five seconds alongside content. Respect reduced-motion preferences for scroll-related movement. [W3C pause/stop/hide](https://www.w3.org/WAI/WCAG22/Understanding/pause-stop-hide), [W3C animation from interactions](https://www.w3.org/WAI/WCAG21/Understanding/animation-from-interactions).
- Preserve native scrolling, deep links, back/forward, keyboard focus, form input, and visible content when JavaScript or a feature is unavailable. Apple's guidance also calls for purposeful and optional motion. [Apple HIG motion](https://developer.apple.com/design/human-interface-guidelines/motion).

## Additional original references: what to borrow and what to avoid

| Author/source | Demonstrated idea | Useful for Abhyasa | Avoid |
|---|---|---|---|
| [The Digital Panda: The Spark](https://tympanus.net/codrops/2026/01/09/the-spark-engineering-an-immersive-story-first-web-experience/) | Story-first scenes; visual language evolves with the narrative | Plan keyframes and copy together | A full cinematic game-like experience for course reading |
| [Dondre Green case study](https://tympanus.net/codrops/2025/01/07/case-study-dondre-green/) | Image/title continuity, pinned sections, focused hover reveal | One contextual hero-to-course handoff | Repeated horizontal navigation or blur obscuring syllabus |
| [Podium case study](https://tympanus.net/codrops/2026/06/23/podium-building-a-website-where-running-becomes-storytelling/) | Scroll as storytelling; image itself carries transitions | Let authentic semiconductor visuals carry one sequence | Stacking extra effects over a strong image |
| [Figma Config identity](https://www.figma.com/blog/config-2024-branding/) | A small grammar of reusable motion moves | Define trace/layer/resolve as Abhyasa's grammar | A different visual trick for every page |
| [IBM Carbon motion](https://v10.carbondesignsystem.com/guidelines/motion/overview/) | Expressive vs productive hierarchy | Hero signature vs quiet technical reading | Expressive motion on every control |

## Recommended creative system: “From signal to skill”

### Visual grammar

| Move | Graphic form | Meaning | Where |
|---|---|---|---|
| Trace | A single precise blue path moves across a real chip layout or a sparse abstract grid | Direction, progression, connection | Homepage hero; project flow introductions; navigation accent |
| Layer | Two or three translucent, content-accurate planes reveal in order | Theory → tool → implementation, or RTL → layout | Homepage signature sequence; one course diagram; selected article illustrations |
| Resolve | The moving parts align into a clear final result, then become still | Understanding or completion | Hero conclusion, course selection, interactive project detail |

The palette remains Abhyasa blue/green and navy/white. Green is a meaningful progress/highlight color, not a glowing effect. Use texture from actual semiconductor imagery and crisp diagrams, not generic particles. Avoid fake 3D chips and decorative data readouts that imply factual technical information.

### Motion roles and indicative timing for prototype exploration

| Role | Range | Behavior |
|---|---:|---|
| Control feedback | 80–160 ms | Immediate press/focus/selection response |
| Contextual change | 180–360 ms | Menus, accordion, selected tab, detail expansion |
| Scene handoff | 450–800 ms | One meaningful hero/section change with a clear hold afterward |
| Scroll-linked chapter | Progress based | Only in one or two composed desktop scenes; mobile uses simpler reveal |

These are prototyping hypotheses, not a mandate to slow down the whole site. The current 390–620 ms fade is too similar across contexts. Long paragraphs and dense tables should have no entrance choreography.

## Figma-first storyboard and prototype specification

The first design deliverable should be a Figma storyboard (or equivalent frames) **before** coding more global motion:

1. **Static keyframes, desktop 1440 × 900:** hero at rest; signal activated; trace crosses an authentic layout; layer resolves; course choice visible. Each frame must look finished independently.
2. **Static keyframes, mobile 390 × 844:** headline, real technical visual, and CTA fit naturally; no pinned scroll trap; imagery cropped intentionally.
3. **Timeline:** annotate delay, duration, easing, hold, and scroll progress for each moving element. Figma Motion supports keyframes/timeline; Smart Animate can show matching objects moving between frames. [Figma Motion timeline](https://help.figma.com/hc/en-us/articles/41405906446999-Use-the-Figma-Motion-timeline), [Smart Animate](https://help.figma.com/hc/en-us/articles/360039818874-Smart-animate-layers-between-frames).
4. **Interaction states:** hover/focus/touch for primary CTA, course cards, project detail and dropdown; static accessible state for reduced motion.
5. **Content check:** one reviewer familiar with VLSI validates any technical diagram, signal path, layer label, and sequence before implementation.

Prototype only three representative moments first: (a) homepage hero-to-courses sequence, (b) one course card-to-detail handoff, (c) one accurate project-flow interaction. If these are compelling and understandable without explanation, translate the grammar to other page families.

## Page-family motion map

| Page family | Signature opportunity | Keep still | Mobile/reduced-motion fallback |
|---|---|---|---|
| Homepage | Signal-to-skill hero story; one visual handoff to courses; one authentic project reveal | Learning-resource links, blog copy, form labels | Short non-pinned state changes; final imagery and content immediately visible |
| About | Layered history/mission visual or one image mask tied to heading | Mission and vision paragraphs, proof points | Static image and direct heading |
| Course listing and details | Card-to-course visual continuity; precise module progress or diagram step | Syllabus text, review quotes, pricing/enrollment link | Native link and static module structure |
| Project pages | Flow trace reveals one step at a time; details open with clear relationship to selected row | 17/10 project data, long detail text | User-controlled click/tap state, no hover dependency |
| Blog index and narrative articles | Image crop/heading continuity; restrained article opening | Long-form body, tables, code, captions | Direct article load and static figures |
| Technical PNR guides | User-controlled diagrams showing layers or constraints | All text, formulas, labels, source diagrams | Static diagram with all required information visible |
| Placements | A single path from guidance to opportunity; partner/company marquee remains legible and pausable | Company names, stories, guarantee note | Static company grid or paused rows |
| Contact/enrollment | Fast focus, validation, success/error feedback | Address, phone, map, form labels | Same functional feedback without spatial movement |

## Engineering feasibility, after art direction is approved

The project is static HTML/CSS/vanilla JS; no framework is required for the first prototype. Keep effects scoped to page families and progressively enhanced.

- **CSS/WAAPI:** suitable for simple hero keyframes, card states, masks, and small SVG paths. Use them when the story is time based or triggered once.
- **CSS scroll timelines:** promising for straightforward progress effects where supported, with static fallback. Support must be checked in the actual target browser set. [MDN scroll-driven animations](https://developer.mozilla.org/en-US/docs/Web/CSS/Guides/Scroll-driven_animations).
- **GSAP ScrollTrigger:** candidate for one genuinely composed pinned/scrubbed desktop chapter because it provides timelines, pinning, responsive setup and cleanup. It is not justified by ordinary fade-ins. [GSAP ScrollTrigger](https://gsap.com/docs/v3/Plugins/ScrollTrigger/).
- **View Transitions:** can help same-origin navigation continuity where supported, but root crossfade alone is not a signature experience. Build native-link fallback first. [Chrome developer update](https://developer.chrome.com/blog/view-transitions-in-2025).
- **SVG:** preferred for a sparse trace/path motif; flexible and small. A technical diagram must be content-reviewed.
- **Rive/Lottie/Three.js/WebGL/Lenis:** defer until a storyboard proves they add something unavailable with simpler code. No blanket smooth scrolling. No always-running GPU scene behind text.
- **Performance:** prioritize transform/opacity for broad motion and manage compositor layers. Avoid animating expensive shadows, filters, large clip-paths, or layout properties across long pages without measured need. [web.dev compositor guide](https://web.dev/articles/stick-to-compositor-only-properties-and-manage-layer-count).

## Acceptance criteria for the prototype

1. At a normal 3–5 second first impression, the homepage communicates *VLSI training + progression to a career* without requiring the animation to finish.
2. A user can name the three visual beats (signal, learning/building, outcome) from the sequence; the effect is more than fade/slide.
3. One paused frame from each beat is compelling at desktop and mobile widths.
4. Course and article copy stays legible while scrolling; forms and menus respond immediately.
5. The experience works with reduced motion, keyboard navigation, direct URLs, back/forward, touch, slow devices, and missing animation support.
6. Technical drawings are accurate. No invented company outcomes, data, or diagrams.
7. The prototype visibly improves the current homepage when compared side by side at the same viewport. If it does not, revise composition before adding effects.

## Immediate next design task

Create the five-frame homepage storyboard and one motion prototype. Review the static frames and sequence before extending it to the site. This honors the master prompt's research → prototype → evaluate → implement order and avoids a second global rollout of generic effects.
