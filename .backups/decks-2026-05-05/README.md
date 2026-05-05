# Deck snapshot · 2026-05-05

Frozen copies of `src/content/decks/*` as of 2026-05-05 — saved in case Lovable
edits the live decks in a way you want to revert.

## Restore one deck

```bash
cp .backups/decks-2026-05-05/value.tsx src/content/decks/value.tsx
```

## Restore everything

```bash
cp .backups/decks-2026-05-05/*.tsx src/content/decks/
cp .backups/decks-2026-05-05/*.ts  src/content/decks/
```

## What's in here

`_layouts.tsx` (slide chrome — `SlideShell`, `Eyebrow`, `BigTitle`, `Stat`, `Card`, `GridBg`, `CornerNum`)
`types.ts` (the `Slide` / `Deck` interfaces)
`index.ts` (`DECKS` map keyed by `BoothId`)

Per-booth decks (slide counts):
- `value.tsx` — 4 slides
- `targeting.tsx` — 3
- `formats.tsx` — 2
- `execution.tsx` — 5 (Hall of Fame: cover, podium, champion spotlight, leaderboard, rubric)
- `gtm.tsx` — 3
- `measurement.tsx` — 2
- `scale.tsx` — 2

A human-readable summary of the slide content lives at
`~/ARFK Brain/Career/Lovable/Case Study/Booth Inventory.md`.
