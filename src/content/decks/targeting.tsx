import {
  SlideShell,
  Eyebrow,
  BigTitle,
  GridBg,
  CornerNum,
} from './_layouts'
import type { Deck } from './types'

const ACCENT = '#7aa1ff'
const BG = 'radial-gradient(ellipse at 80% 0%, #1c2c54 0%, #0a0d1a 65%)'

const SIGNALS = [
  { n: '01', label: 'Named AI executive', sub: 'Public title, accountable budget' },
  { n: '02', label: 'Public AI build-tool adoption', sub: 'Already buying Copilot, Cursor, etc.' },
  { n: '03', label: 'Procurement velocity', sub: 'Track record of <90d enterprise deals' },
  { n: '04', label: 'Eng/Product org > 1,000', sub: 'Critical mass of internal builders' },
  { n: '05', label: 'Hackathon signal', sub: 'Has run or sponsored builder events' },
]

const TOP5 = [
  { name: 'Deutsche Telekom', score: [5, 5, 5, 5, 5], anchor: true },
  { name: 'Spotify', score: [5, 5, 4, 5, 5] },
  { name: 'Klarna', score: [5, 5, 5, 4, 4] },
  { name: 'ING', score: [4, 4, 5, 5, 4] },
  { name: 'Allianz', score: [5, 4, 4, 5, 4] },
]

export const deck: Deck = [
  {
    id: 'rubric',
    render: () => (
      <SlideShell bg={BG}>
        <GridBg accent={ACCENT} />
        <CornerNum n={1} total={2} accent={ACCENT} />
        <Eyebrow color={ACCENT}>Booth 02 · Targeting · The 5-signal rubric</Eyebrow>
        <div className="mt-3 mb-8">
          <BigTitle>Five signals. Scored 1–5. Ranked.</BigTitle>
        </div>
        <div className="rounded-xl border border-white/10 overflow-hidden bg-white/[0.02]">
          <div className="grid" style={{ gridTemplateColumns: '2fr repeat(5, 1fr) 0.8fr' }}>
            <div className="p-4 text-[10px] font-mono uppercase tracking-[0.22em] text-white/40 border-b border-white/10">Signal</div>
            {TOP5.map((c) => (
              <div
                key={c.name}
                className={`p-4 text-center text-[10px] font-mono uppercase tracking-[0.18em] border-b border-white/10 ${c.anchor ? 'bg-white/[0.05]' : ''}`}
                style={c.anchor ? { color: ACCENT } : { color: 'rgba(255,255,255,0.55)' }}
              >
                {c.name}
              </div>
            ))}
            <div className="p-4 text-[10px] font-mono uppercase tracking-[0.22em] text-white/40 border-b border-white/10 text-right">Max</div>

            {SIGNALS.map((s, rowIdx) => (
              <div key={s.n} className="contents">
                <div className="p-4 border-b border-white/5">
                  <div className="font-mono text-[10px]" style={{ color: ACCENT }}>{s.n}</div>
                  <div className="text-sm text-white font-medium mt-1">{s.label}</div>
                  <div className="text-xs text-white/50 mt-0.5">{s.sub}</div>
                </div>
                {TOP5.map((c) => (
                  <ScoreCell
                    key={c.name + rowIdx}
                    score={c.score[rowIdx]}
                    anchor={c.anchor}
                  />
                ))}
                <div className="p-4 border-b border-white/5 text-right text-white/40 text-sm font-mono">5</div>
              </div>
            ))}

            <div className="p-4 text-[10px] font-mono uppercase tracking-[0.22em] text-white/55">Total</div>
            {TOP5.map((c) => {
              const sum = c.score.reduce((a, b) => a + b, 0)
              return (
                <div
                  key={'tot-' + c.name}
                  className={`p-4 text-center font-display text-2xl font-semibold ${c.anchor ? 'bg-white/[0.05]' : ''}`}
                  style={{ color: c.anchor ? ACCENT : 'rgba(255,255,255,0.7)' }}
                >
                  {sum}<span className="text-xs text-white/30">/25</span>
                </div>
              )
            })}
            <div className="p-4 text-right font-mono text-sm text-white/40">25</div>
          </div>
        </div>
        <div className="mt-6 text-xs text-white/55">
          Same rubric scored across 20 European enterprises. Top 5:{' '}
          <span className="text-white">Deutsche Telekom, Spotify, Klarna, ING, Allianz.</span>
        </div>
      </SlideShell>
    ),
  },
  {
    id: 'flywheel',
    render: () => (
      <SlideShell bg={BG}>
        <GridBg accent={ACCENT} />
        <CornerNum n={2} total={2} accent={ACCENT} />
        <Eyebrow color={ACCENT}>The reference flywheel</Eyebrow>
        <div className="mt-3 mb-6">
          <BigTitle>One landed anchor unlocks a sector.</BigTitle>
        </div>
        <Flywheel />
        <div className="mt-6 text-sm text-white/65 max-w-4xl">
          T.Capital opens doors at every DAX 40. One landed anchor unlocks a sector beachhead.
        </div>
      </SlideShell>
    ),
  },
]

function ScoreCell({ score, anchor }: { score: number; anchor?: boolean }) {
  return (
    <div className={`p-4 border-b border-white/5 flex items-center justify-center gap-1 ${anchor ? 'bg-white/[0.05]' : ''}`}>
      {[1, 2, 3, 4, 5].map((i) => (
        <div
          key={i}
          className="w-2 h-2 rounded-full"
          style={{
            background: i <= score ? ACCENT : 'rgba(255,255,255,0.08)',
            boxShadow: i <= score && anchor ? `0 0 8px ${ACCENT}` : undefined,
          }}
        />
      ))}
    </div>
  )
}

function Flywheel() {
  const ringR = 230
  const tiers: { angle: number; label: string; group: string }[] = [
    { angle: -90, label: 'Vodafone', group: 'Telco peers' },
    { angle: -55, label: 'Orange', group: 'Telco peers' },
    { angle: -20, label: 'Telefónica', group: 'Telco peers' },
    { angle: 20, label: 'Siemens', group: 'DAX 40 industrials' },
    { angle: 55, label: 'BMW', group: 'DAX 40 industrials' },
    { angle: 110, label: 'Allianz', group: 'DACH executive net.' },
    { angle: 160, label: 'SAP', group: 'DACH executive net.' },
    { angle: 210, label: 'Lufthansa', group: 'DACH executive net.' },
  ]
  return (
    <div className="relative w-full flex-1 flex items-center justify-center">
      <svg viewBox="-300 -260 600 520" className="w-full max-w-3xl h-full max-h-[460px]">
        {tiers.map((t, i) => {
          const rad = (t.angle * Math.PI) / 180
          const x = Math.cos(rad) * ringR
          const y = Math.sin(rad) * ringR
          return (
            <g key={i}>
              <line
                x1={0}
                y1={0}
                x2={x}
                y2={y}
                stroke={ACCENT}
                strokeOpacity="0.25"
                strokeWidth="1"
              />
              <circle cx={x} cy={y} r="4" fill={ACCENT} />
              <foreignObject x={x - 70} y={y + 8} width="140" height="40">
                <div className="text-center">
                  <div className="text-sm text-white font-medium">{t.label}</div>
                  <div className="text-[9px] font-mono uppercase tracking-[0.2em] text-white/40">{t.group}</div>
                </div>
              </foreignObject>
            </g>
          )
        })}
        <circle cx="0" cy="0" r="62" fill="rgba(255,255,255,0.04)" stroke={ACCENT} strokeWidth="1.5" />
        <foreignObject x="-80" y="-30" width="160" height="60">
          <div className="text-center">
            <div className="font-display text-lg font-semibold text-white leading-tight">Deutsche Telekom</div>
            <div className="text-[10px] font-mono uppercase tracking-[0.22em] mt-0.5" style={{ color: ACCENT }}>Anchor</div>
          </div>
        </foreignObject>
      </svg>
    </div>
  )
}
