import {
  SlideShell,
  Eyebrow,
  GridBg,
  CornerNum,
} from './_layouts'
import type { Deck } from './types'

const ACCENT = '#ff4d7a'
const BG = 'radial-gradient(ellipse at 50% 0%, #2a1230 0%, #0a0d1a 65%)'

const STAGES = [
  { t: 'T-14', l: 'Pre-scoping' },
  { t: 'Day 1–2', l: 'Studios', highlight: true },
  { t: 'Day 7', l: 'Paid PoC' },
  { t: 'Day 75', l: 'Contract' },
]

export const deck: Deck = [
  {
    id: 'vision',
    kicker: 'Vision',
    render: () => (
      <SlideShell bg={BG}>
        <GridBg accent={ACCENT} />
        <CornerNum n={1} total={1} accent={ACCENT} />
        <div className="flex-1 flex flex-col justify-center max-w-6xl mx-auto w-full">
          <Eyebrow color={ACCENT}>Booth 01 · Vision</Eyebrow>
          <h1
            className="font-display font-semibold leading-[0.95] tracking-tight mt-6 text-center"
            style={{ fontSize: 'clamp(3rem, 8vw, 8rem)' }}
          >
            Seeing is <span style={{ color: ACCENT }}>believing</span>
          </h1>
          <p className="mt-8 text-white/65 text-2xl text-center leading-relaxed">
            Hackathons are the antidote to information ubiquity.
          </p>

          {/* Timeline */}
          <div className="mt-16 relative">
            <div className="relative h-px bg-white/15" />
            <div className="flex justify-between -mt-3">
              {STAGES.map((s) => (
                <div key={s.t} className="flex flex-col items-center w-44">
                  <div
                    className="rounded-full"
                    style={{
                      width: s.highlight ? 22 : 12,
                      height: s.highlight ? 22 : 12,
                      background: s.highlight ? ACCENT : 'rgba(255,255,255,0.45)',
                      boxShadow: s.highlight ? `0 0 22px ${ACCENT}` : undefined,
                      marginTop: s.highlight ? -6 : -1,
                    }}
                  />
                  <div
                    className={`mt-5 px-4 py-3 rounded-lg border text-center min-w-[140px] ${s.highlight ? 'bg-white/[0.06]' : 'bg-white/[0.02]'}`}
                    style={{
                      borderColor: s.highlight ? `${ACCENT}88` : 'rgba(255,255,255,0.10)',
                    }}
                  >
                    <div
                      className={`font-semibold ${s.highlight ? 'text-white' : 'text-white/85'}`}
                      style={{ fontSize: '1.05rem', color: s.highlight ? ACCENT : undefined }}
                    >
                      {s.l}
                    </div>
                    <div className="font-mono text-[10px] uppercase tracking-[0.24em] text-white/55 mt-1">
                      {s.t}
                    </div>
                  </div>
                </div>
              ))}
            </div>
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
