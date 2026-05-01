# Lovable · Hackathon Explorer

An interactive 3D case-study experience built for the Lovable Enterprise Hackathon Producer take-home.

The user walks an avatar around an isometric world of three timelines (Pre-Hackathon · Hackathon · Post-Hackathon), entering seven booths that answer the seven prompts in the assignment brief: **Targeting · Value Proposition · Hackathon Formats · Execution Strategy · Scale · Stakeholders · Measurement**.

Built on the exact stack Lovable's app generator outputs (Vite + React + TypeScript + Tailwind + shadcn/ui + react-three-fiber + Zustand + Framer Motion). Designed to port back into Lovable cleanly via GitHub import.

## Running locally

```bash
npm install
npm run dev      # opens http://localhost:5173
```

Production build:

```bash
npm run build
npm run preview
```

## Controls

| Key | Action |
|---|---|
| **W A S D** / arrow keys | Walk the avatar |
| **Click** anywhere on the floor | Walk-to that point |
| **E** (or Space / Enter) | Open the nearest booth |
| **Esc** | Close booth panel |
| **1 · 2 · 3** | Jump between timelines (Pre / Hack / Post) |

## Editing booth content

Each booth's content lives as a markdown file in `src/content/booths/`. Edit any of them and the dev server hot-reloads.

```
src/content/booths/01-targeting.md
src/content/booths/02-stakeholders.md
src/content/booths/03-value-proposition.md
src/content/booths/04-hackathon-formats.md
src/content/booths/05-execution-strategy.md
src/content/booths/06-scale.md
src/content/booths/07-measurement.md
```

Markdown supports GFM (tables, strikethrough, task lists). Styled by `.booth-prose` rules in `src/index.css`.

## Adding a booth

1. Create a new markdown file under `src/content/booths/`
2. Add an entry in `src/content/booths.config.ts` with `id`, `timeline`, `position`, `label`, `accent`, `iconName`, and `load`
3. Tighten the `BoothId` union to include the new id
4. The booth appears automatically in the world

## Project shape

```
src/
├── App.tsx                   # top-level shell + UI overlay layout
├── main.tsx                  # React entry
├── index.css                 # Tailwind + shadcn theme + booth-prose
├── components/ui/            # shadcn primitives (button, sheet, slider, switch, tooltip)
├── content/
│   ├── booths.config.ts      # booth registry
│   └── booths/*.md           # per-booth content
├── game/
│   ├── Scene.tsx             # the R3F Canvas wrapper
│   ├── World.tsx             # ground tiles, props, perimeter — three sub-zones
│   ├── Avatar.tsx            # player character + movement + proximity
│   ├── Booth.tsx             # single booth visual
│   ├── Booths.tsx            # registry → instances
│   ├── Camera.tsx            # orthographic isometric, follows avatar
│   ├── Lighting.tsx          # ambient + key + fill lights, palette per timeline
│   ├── CloudSweep.tsx        # GLSL cloud-sweep transition shader
│   ├── Fireflies.tsx         # ambient particle field
│   ├── refs.ts               # module-scope refs (avatar group)
│   └── controls/
│       └── useKeyboard.ts    # WASD + E + 1/2/3 keys
├── store/
│   └── gameStore.ts          # Zustand: timeline, booth, sound, hint, target
└── ui/
    ├── BoothPanel.tsx        # shadcn Sheet — markdown-rendered booth content
    ├── TimelineSlider.tsx    # bottom slider with 3 stops
    ├── Hud.tsx               # timeline label
    ├── BrandLockup.tsx       # top-left Lovable mark
    ├── ProgressTracker.tsx   # bottom-left "n / 7 booths"
    ├── SoundToggle.tsx       # top-right mute toggle
    ├── LoadingSplash.tsx     # entry splash
    ├── Hint.tsx              # first-time controls overlay
    └── Footer.tsx            # bottom-right credit
```

## Porting to Lovable

The codebase is intentionally constrained to libraries Lovable's AI knows. To port:

### Option A — GitHub import (recommended)

1. Push this repo to GitHub (`git remote add origin … && git push`)
2. In Lovable: **Import from GitHub** → select repo
3. Lovable provisions a project on the imported codebase, runs install, and renders the live preview
4. Use Lovable's chat to make 2–3 small edits (e.g. tweak a booth label or accent colour) to confirm the AI can edit the codebase
5. Deploy → your demo URL becomes `*.lovable.app`

### Option B — Paste-and-replace (fallback)

If GitHub import has friction, in Lovable's chat: *"Replace the contents of `src/...` with the following …"* and paste each component sequentially. Start with `App.tsx`, then `Scene.tsx`, then the rest.

### Stack constraints (do not break)

- **Vite, not Next.js**
- **Tailwind v3** (not v4)
- **shadcn/ui** primitives only
- **react-three-fiber** for 3D
- **Zustand** for state, **Framer Motion** for UI animation, **react-markdown** for content
- No custom Node server, no exotic build plugins, no GLTF imports

## Performance notes

- Bundle: ~1.6 MB (mostly Three.js + drei). Expected for 3D scenes.
- Booth content is code-split per markdown — each booth is a tiny lazy chunk.
- Per-frame loops: avatar movement, booth lerp, lighting lerp, fireflies. All read from Zustand via `getState()` (no re-renders).

## What's deliberately deferred

- Cinematic intro video (clean placeholder seam available — drop a `<video>` over the splash)
- Audio (toggle UI present; track files not bundled)
- Mobile / touch controls (presentation runs on desktop)
- Custom GLTF avatars (primitive-built character is intentional aesthetic)

---

Built by Alexander Kollmann · April 2026 · for the Lovable Enterprise Hackathon Producer interview process
