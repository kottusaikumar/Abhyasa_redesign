# Abhyasa motion design system

## Personality

Precision, progression, and clarity. Motion marks entry into a topic, makes related cards feel connected, and gives page changes a short visual bridge. Static reading remains the default for dense technical content. There is no intro screen or scroll hijack.

## Tokens and behavior

| Role | Value | Use |
|---|---:|---|
| Fast | 180 ms | Hover feedback and small state changes |
| Medium | 390–520 ms | One-shot text/card entrances |
| Slow | 620–680 ms | Main visual entrance or image treatment |
| Ease | `cubic-bezier(.22,1,.36,1)` | Smooth settle without bounce |
| Travel | 10 px mobile, 16–22 px desktop | Enough to show direction, little layout disturbance |
| Stagger | Up to 165 ms | Repeated siblings only |
| Page handoff | 150 ms out, 300 ms in | Progressive same-origin navigation |

## Rules

- Body paragraphs, data tables, diagrams inside technical articles, and form fields do not animate individually.
- Only transform and opacity are animated by the shared observer. No long-running scroll listener or permanent compositor hint.
- Images are never replaced by motion and no source content is rewritten.
- A navigation link remains a native link. Hash navigation and browser history retain browser behavior.
- Hover lift is confined to pointer devices and restrained to 4 px. Touch uses the original static cards.
- `prefers-reduced-motion: reduce` disables page and one-shot motion. If JavaScript fails, content remains visible because the base CSS never hides it.
- Focus indicators, form errors, accordions, tabs, mobile navigation, and reading order take priority over effects.

## Transition family

1. General page: quick fade and 8 px vertical entrance.
2. Header: short visual continuity on supporting browsers; disabled on narrow screens.
3. Course/project context: short visual treatment for the course art or project flow when the page itself changes. No forced shared-element capture from a different source card.
4. In-page hash, external destinations, browser fallback: ordinary navigation.

## Deferred

No splash screen, pinned sections, animated circuit particles, full 3D scene, or replacement artwork in this phase. Reconsider only with a measured design benefit and review of a concrete prototype.
