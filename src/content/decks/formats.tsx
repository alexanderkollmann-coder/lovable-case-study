import {
  SlideShell,
  Eyebrow,
  BigTitle,
  Card,
  GridBg,
  CornerNum,
} from './_layouts'
import type { Deck } from './types'
import { Users, Calendar, TrendingUp } from 'lucide-react'

const ACCENT = '#ff7596'
const BG = 'radial-gradient(ellipse at 0% 100%, #4a1830 0%, #0a0d1a 65%)'

const ROWS = [
  { f: 'Half-day exec', aud: '1:Many · execs', cost: '€', analogue: 'Briefing centre', when: 'Awareness only' },
  { f: 'One-day sprint', aud: '1:One · single team', cost: '€€', analogue: 'GitHub Copilot day', when: 'POC for one team' },
  {
    f: 'Two-day flagship 1:Few',
    aud: '1:Few · 4 non-competing CDOs',
    cost: '€€€',
    analogue: 'AWS APN Immersion + Palantir bootcamp',
    when: 'Anchor + sector pull',
    picked: true,
  },
  { f: '3-day deep dive', aud: '1:One · deep build', cost: '€€€€', analogue: 'Foundry residency', when: 'Diminishing returns' },
  { f: 'Multi-week residency', aud: '1:One · embedded', cost: '€€€€€', analogue: 'McKinsey QuantumBlack', when: 'Loses urgency' },
]

export const deck: Deck = [
  {
    id: 'matrix',
    render: () => (
      <SlideShell bg={BG}>
        <GridBg accent={ACCENT} />
        <CornerNum n={1} total={2} accent={ACCENT} />
        <Eyebrow color={ACCENT}>Booth 03 · Formats · Trade-space</Eyebrow>
        <div className="mt-3 mb-8">
          <BigTitle>Five formats. <span style={{ color: ACCENT }}>One picked.</span></BigTitle>
        </div>
        <div className="rounded-xl border border-white/10 overflow-hidden bg-white/[0.02]">
          <div className="grid" style={{ gridTemplateColumns: '1.4fr 1.2fr 0.6fr 1.6fr 1.2fr' }}>
            {['Format', 'Audience', 'Cost', 'Best analogue', 'When to use'].map((h) => (
              <div key={h} className="p-3 text-[10px] font-mono uppercase tracking-[0.22em] text-white/40 border-b border-white/10">{h}</div>
            ))}
            {ROWS.map((r) => (
              <div key={r.f} className="contents">
                <div
                  className={`p-4 border-b border-white/5 ${r.picked ? 'bg-white/[0.06]' : ''}`}
                  style={r.picked ? { borderLeft: `3px solid ${ACCENT}` } : undefined}
                >
                  <div className="flex items-center gap-2">
                    <span
                      className={r.picked ? 'font-display text-lg font-semibold text-white' : 'text-sm text-white/85'}
                    >
                      {r.f}
                    </span>
                    {r.picked && (
                      <span
                        className="text-[9px] font-mono px-2 py-0.5 rounded"
                        style={{ background: ACCENT, color: '#0a0d1a' }}
                      >
                        PICKED
                      </span>
                    )}
                  </div>
                </div>
                <Cell picked={r.picked}>{r.aud}</Cell>
                <Cell picked={r.picked} bold>{r.cost}</Cell>
                <Cell picked={r.picked}>{r.analogue}</Cell>
                <Cell picked={r.picked}>{r.when}</Cell>
              </div>
            ))}
          </div>
        </div>
      </SlideShell>
    ),
  },
  {
    id: 'why',
    render: () => (
      <SlideShell bg={BG}>
        <GridBg accent={ACCENT} />
        <CornerNum n={2} total={2} accent={ACCENT} />
        <Eyebrow color={ACCENT}>Why 1:Few × 2-day wins</Eyebrow>
        <div className="mt-3 mb-10">
          <BigTitle>Three reasons. No fluff.</BigTitle>
        </div>
        <div className="grid grid-cols-3 gap-5">
          <Card accent={ACCENT}>
            <Users className="w-5 h-5" style={{ color: ACCENT }} />
            <div className="text-base font-semibold text-white mt-3">Peer competition is the conversion accelerant</div>
            <div className="text-sm text-white/65 mt-3 leading-relaxed">
              Non-competing CDOs in the same room creates productive FOMO. The AWS APN model — verified, repeatedly.
            </div>
          </Card>
          <Card accent={ACCENT}>
            <Calendar className="w-5 h-5" style={{ color: ACCENT }} />
            <div className="text-base font-semibold text-white mt-3">The arc maps to the buyer journey</div>
            <div className="text-sm text-white/65 mt-3 leading-relaxed">
              <span className="text-white/85">Day 1:</span> problem + champion.<br />
              <span className="text-white/85">Day 2:</span> build + MOU at the demo dinner.
            </div>
          </Card>
          <Card accent={ACCENT}>
            <TrendingUp className="w-5 h-5" style={{ color: ACCENT }} />
            <div className="text-base font-semibold text-white mt-3">The economics are extraordinary</div>
            <div className="text-sm text-white/65 mt-3 leading-relaxed space-y-1.5">
              <div><span className="text-white">€22K</span> all-in per event</div>
              <div><span style={{ color: ACCENT }}>1-in-10</span> conversion = 2.3× ROI</div>
              <div><span style={{ color: ACCENT }}>3-in-10</span> (DT-class) = 6.8× ROI</div>
            </div>
          </Card>
        </div>
      </SlideShell>
    ),
  },
]

function Cell({ children, picked, bold }: { children: React.ReactNode; picked?: boolean; bold?: boolean }) {
  return (
    <div
      className={`p-4 border-b border-white/5 text-sm ${picked ? 'bg-white/[0.06] text-white' : 'text-white/65'} ${bold ? 'font-mono' : ''}`}
    >
      {children}
    </div>
  )
}
