import {
  SlideShell,
  Eyebrow,
  GridBg,
  CornerNum,
  BigTitle,
} from './_layouts'
import type { Deck } from './types'

const ACCENT = '#5e88ff'
const BG = 'radial-gradient(ellipse at 50% 0%, #1a2546 0%, #0a0d1a 65%)'

const PHASES: {
  phase: 'Pre-hackathon' | 'Hackathon' | 'Post-hackathon'
  stages: { label: string; highlight?: boolean }[]
}[] = [
  { phase: 'Pre-hackathon', stages: [{ label: 'T-30 · Scoping' }] },
  { phase: 'Hackathon', stages: [{ label: 'Day 0–2 · Hackathon', highlight: true }] },
  { phase: 'Post-hackathon', stages: [{ label: 'Day 15 · Paid PoC' }, { label: 'Day 30 · Contract' }] },
]

export const deck: Deck = [
  /* ---------------- Slide 1.1 — Vision ---------------- */
  {
    id: 'vision',
    kicker: 'Vision',
    render: () => (
      <SlideShell bg={BG}>
        <GridBg accent={ACCENT} />
        <CornerNum n={1} total={2} accent={ACCENT} />
        <div className="flex-1 flex flex-col justify-center items-center text-center max-w-6xl mx-auto">
          <Eyebrow color={ACCENT}>Booth 01 · Vision</Eyebrow>
          <h1
            className="font-display font-semibold leading-[0.95] tracking-tight mt-8"
            style={{ fontSize: 'clamp(3rem, 8vw, 8rem)' }}
          >
            Seeing is <span style={{ color: ACCENT }}>believing</span>
          </h1>
          <p className="mt-10 text-white/65 text-2xl max-w-3xl leading-relaxed">
            Hackathons are the antidote to information ubiquity.
          </p>
        </div>
        <div className="pt-6 border-t border-white/10 flex items-center justify-between text-[10px] font-mono uppercase tracking-[0.25em] text-white/45">
          <span>Internal · <span className="text-white/70">Embedded Build Motion</span></span>
          <span>External · <span style={{ color: ACCENT }}>Lovable Studios</span></span>
        </div>
      </SlideShell>
    ),
  },

  /* ---------------- Slide 1.2 — Forward-deployed pre-sales motion ---------------- */
  {
    id: 'motion',
    render: () => (
      <SlideShell bg={BG}>
        <GridBg accent={ACCENT} />
        <CornerNum n={2} total={2} accent={ACCENT} />
        <Eyebrow color={ACCENT}>The motion</Eyebrow>
        <div className="mt-3 mb-2">
          <BigTitle>A forward-deployed pre-sales motion.</BigTitle>
        </div>
        <p className="text-white/60 text-base max-w-3xl">
          The hackathon is one stage of the motion — not the beginning, not the end.
        </p>

        <div className="mt-16 flex-1 flex flex-col justify-center">
          <div className="grid grid-cols-3 gap-6">
            {PHASES.map((p) => (
              <div
                key={p.phase}
                className="rounded-xl border border-white/10 bg-white/[0.02] px-5 pt-4 pb-6"
              >
                <div
                  className="text-[10px] font-mono uppercase tracking-[0.28em]"
                  style={{ color: ACCENT }}
                >
                  {p.phase}
                </div>
                <div className="mt-5 flex items-center gap-3">
                  {p.stages.map((s, i) => (
                    <div key={s.label} className="flex items-center gap-3 flex-1">
                      <div
                        className={`flex-1 px-3 py-3 rounded-lg border text-center ${s.highlight ? 'bg-white/[0.06]' : 'bg-white/[0.02]'}`}
                        style={{
                          borderColor: s.highlight ? `${ACCENT}99` : 'rgba(255,255,255,0.10)',
                          boxShadow: s.highlight ? `0 0 24px ${ACCENT}44` : undefined,
                        }}
                      >
                        <div
                          className="font-semibold text-sm"
                          style={{ color: s.highlight ? ACCENT : '#fff' }}
                        >
                          {s.label}
                        </div>
                      </div>
                      {i < p.stages.length - 1 && (
                        <span style={{ color: `${ACCENT}88` }}>→</span>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* Continuous arrow connector between phases */}
          <div className="mt-4 flex items-center justify-between px-12 text-[10px] font-mono uppercase tracking-[0.3em] text-white/40">
            <span>Start</span>
            <span style={{ color: ACCENT }}>→ Anchor →</span>
            <span>Contract</span>
          </div>
        </div>

        <div className="pt-6 border-t border-white/10 flex items-center justify-between text-[10px] font-mono uppercase tracking-[0.25em] text-white/45">
          <span>Internal · <span className="text-white/70">Embedded Build Motion</span></span>
          <span>External · <span style={{ color: ACCENT }}>Lovable Studios</span></span>
        </div>
      </SlideShell>
    ),
  },
]
