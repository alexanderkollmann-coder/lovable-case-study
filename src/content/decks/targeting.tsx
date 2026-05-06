import {
  SlideShell,
  Eyebrow,
  BigTitle,
  Card,
  GridBg,
  CornerNum,
} from './_layouts'
import type { Deck } from './types'

const ACCENT = '#7aa1ff'
const BG = 'radial-gradient(ellipse at 80% 0%, #1c2c54 0%, #0a0d1a 65%)'

export const deck: Deck = [
  {
    id: 'signals',
    render: () => (
      <SlideShell bg={BG}>
        <GridBg accent={ACCENT} />
        <CornerNum n={1} total={4} accent={ACCENT} />
        <Eyebrow color={ACCENT}>Booth 02 · Targeting · The 3-signal rubric</Eyebrow>
        <div className="mt-3 mb-10">
          <BigTitle>Three signals predict whether a hackathon converts.</BigTitle>
        </div>
        <div className="grid grid-cols-3 gap-5 flex-1">
          {[
            {
              t: 'Named AI executive',
              d: 'A specific person with a public AI mandate who can authorize €500K–€2M innovation spend without CFO escalation.',
              k: 'No champion, no Studios.',
            },
            {
              t: 'Public AI build-tool adoption',
              d: 'Cursor, Copilot or Lovable already inside the org. Procurement has pre-cleared the category.',
              k: 'Security review compresses 60d → 14d.',
            },
            {
              t: 'Engineering / product org of 1,000+',
              d: 'Enough internal demand for the ROI math to work.',
              k: 'Contract has to scale to €500K+.',
            },
          ].map((s, i) => (
            <Card key={s.t} accent={ACCENT}>
              <div className="font-mono text-xs" style={{ color: ACCENT }}>0{i + 1}</div>
              <div className="text-lg font-semibold text-white mt-2">{s.t}</div>
              <p className="text-sm text-white/65 mt-3 leading-relaxed">{s.d}</p>
              <div className="mt-4 pt-3 border-t border-white/10 text-xs italic" style={{ color: ACCENT }}>{s.k}</div>
            </Card>
          ))}
        </div>
        <div className="mt-6 pt-4 border-t border-white/10 text-xs text-white/55">
          Same rubric scored across 20 European enterprises. Top 5:{' '}
          <span className="text-white">Deutsche Telekom, Spotify, Klarna, ING, Allianz.</span>
        </div>
      </SlideShell>
    ),
  },
  {
    id: 'matrix',
    render: () => (
      <SlideShell bg={BG}>
        <GridBg accent={ACCENT} />
        <CornerNum n={2} total={4} accent={ACCENT} />
        <Eyebrow color={ACCENT}>How we get into the room</Eyebrow>
        <div className="mt-3 mb-6">
          <BigTitle>Direct × Partner-led. Origination × Upsell.</BigTitle>
        </div>
        <Matrix />
        <div className="mt-5 pt-3 border-t border-white/10 text-xs text-white/55">
          Deutsche Telekom sits in three of four quadrants — the only European account that does. That's why DT first.
        </div>
      </SlideShell>
    ),
  },
  {
    id: 'dt-anchor',
    render: () => (
      <SlideShell bg={BG}>
        <GridBg accent={ACCENT} />
        <CornerNum n={3} total={4} accent={ACCENT} />
        <Eyebrow color={ACCENT}>Anchor account</Eyebrow>
        <div className="mt-3 mb-2 flex items-end gap-4">
          <BigTitle>Deutsche Telekom.</BigTitle>
          <div className="font-mono text-sm pb-2" style={{ color: ACCENT }}>25/25</div>
        </div>
        <div className="grid grid-cols-3 gap-5 flex-1 mt-6">
          <Card accent={ACCENT}>
            <div className="text-[10px] font-mono uppercase tracking-[0.28em]" style={{ color: ACCENT }}>Why it qualifies</div>
            <ul className="mt-4 space-y-3 text-sm text-white/80">
              <Check>Named AI exec: <span className="text-white">Jonathan Abrahamson, CPDO</span></Check>
              <Check>Already a Lovable customer · public proof point</Check>
              <Check>2,000+ product/engineering org</Check>
            </ul>
          </Card>
          <Card accent={ACCENT}>
            <div className="text-[10px] font-mono uppercase tracking-[0.28em]" style={{ color: ACCENT }}>Why it's strategic</div>
            <ul className="mt-4 space-y-3 text-sm text-white/80">
              <Bullet>T.Capital is a Series B investor — executive distribution into DAX 40</Bullet>
              <Bullet>Abrahamson on the record about Lovable's vision</Bullet>
              <Bullet>DT serves as customer + partner introducing us to its enterprise base</Bullet>
            </ul>
          </Card>
          <Card accent={ACCENT}>
            <div className="text-[10px] font-mono uppercase tracking-[0.28em]" style={{ color: ACCENT }}>Why it's actionable</div>
            <ul className="mt-4 space-y-3 text-sm text-white/80">
              <Bullet>Met Abrahamson at ElevenLabs conf · warm intro in place</Bullet>
              <Bullet>First Studios: pre-scoped use cases from his team</Bullet>
              <Bullet>Two days · new London office · FDE pair · MOU at demo dinner</Bullet>
            </ul>
          </Card>
        </div>
        <div className="mt-6 pt-4 border-t border-white/10 text-xs text-white/55 italic">
          The only European enterprise where every box is already ticked.
        </div>
      </SlideShell>
    ),
  },
  {
    id: 'flywheel',
    render: () => (
      <SlideShell bg={BG}>
        <GridBg accent={ACCENT} />
        <CornerNum n={4} total={4} accent={ACCENT} />
        <Eyebrow color={ACCENT}>The reference flywheel</Eyebrow>
        <div className="mt-3 mb-4">
          <BigTitle>One anchor unlocks the European ecosystem.</BigTitle>
        </div>
        <Flywheel />
        <div className="mt-4 text-sm text-white/65 max-w-4xl">
          T.Capital opens doors at every DAX 40. One landed anchor unlocks an executive distribution coalition no competitor has.
        </div>
      </SlideShell>
    ),
  },
]

function Check({ children }: { children: React.ReactNode }) {
  return (
    <li className="flex gap-2 leading-relaxed">
      <span style={{ color: ACCENT }}>✓</span>
      <span>{children}</span>
    </li>
  )
}

function Bullet({ children }: { children: React.ReactNode }) {
  return (
    <li className="flex gap-2 leading-relaxed">
      <span style={{ color: ACCENT }}>·</span>
      <span>{children}</span>
    </li>
  )
}

function Matrix() {
  const cells = [
    {
      title: 'Cold-warm anchor',
      sub: 'Spotify, ING — named-champion outbound',
      x: 'Direct', y: 'Origination',
    },
    {
      title: 'Co-sell',
      sub: 'Deutsche Telekom × T.Capital portfolio · KPMG / Cognizant alliance',
      x: 'Partner-led', y: 'Origination', highlight: true,
    },
    {
      title: 'Land-and-expand',
      sub: 'PLG accounts (Klarna, Uber, Zendesk) → multi-BU contract',
      x: 'Direct', y: 'Upsell',
    },
    {
      title: 'Channel-expand',
      sub: 'DT introducing peer industrials · Cognizant cross-selling',
      x: 'Partner-led', y: 'Upsell', highlight: true,
    },
  ]
  return (
    <div className="flex-1 grid grid-cols-[80px_1fr_1fr] grid-rows-[auto_1fr_1fr] gap-2 min-h-0">
      <div />
      <div className="text-center text-[10px] font-mono uppercase tracking-[0.28em] text-white/55 pb-2">Direct</div>
      <div className="text-center text-[10px] font-mono uppercase tracking-[0.28em] text-white/55 pb-2">Partner-led</div>

      <div className="flex items-center justify-end pr-2 text-[10px] font-mono uppercase tracking-[0.28em] text-white/55">Origination</div>
      {cells.slice(0, 2).map((c) => <Cell key={c.title} {...c} />)}

      <div className="flex items-center justify-end pr-2 text-[10px] font-mono uppercase tracking-[0.28em] text-white/55">Upsell</div>
      {cells.slice(2).map((c) => <Cell key={c.title} {...c} />)}
    </div>
  )
}

function Cell({ title, sub, highlight }: { title: string; sub: string; highlight?: boolean; x?: string; y?: string }) {
  return (
    <div
      className="rounded-xl p-5 border"
      style={{
        background: highlight ? `${ACCENT}10` : 'rgba(255,255,255,0.02)',
        borderColor: highlight ? `${ACCENT}55` : 'rgba(255,255,255,0.08)',
      }}
    >
      <div className="font-display text-lg font-semibold text-white">{title}</div>
      <div className="text-xs text-white/60 mt-2 leading-relaxed">{sub}</div>
    </div>
  )
}

function Flywheel() {
  const ringR = 220
  const branches = [
    { angle: -90, label: 'Internal upsells', sub: 'T-Systems · T-Mobile US · BUs' },
    { angle: 0, label: 'DT customer base', sub: 'Enterprises DT serves' },
    { angle: 90, label: 'T.Capital portfolio', sub: 'Series B & strategic co-investments' },
    { angle: 180, label: 'Sector peers', sub: 'Vodafone · Orange · Telefónica · BT' },
  ]
  return (
    <div className="relative w-full flex-1 flex items-center justify-center">
      <svg viewBox="-300 -240 600 480" className="w-full max-w-3xl h-full max-h-[420px]">
        {branches.map((t, i) => {
          const rad = (t.angle * Math.PI) / 180
          const x = Math.cos(rad) * ringR
          const y = Math.sin(rad) * ringR
          return (
            <g key={i}>
              <line x1={0} y1={0} x2={x} y2={y} stroke={ACCENT} strokeOpacity="0.3" strokeWidth="1" />
              <circle cx={x} cy={y} r="5" fill={ACCENT} />
              <foreignObject x={x - 90} y={y + 10} width="180" height="50">
                <div className="text-center">
                  <div className="text-sm text-white font-semibold">{t.label}</div>
                  <div className="text-[10px] font-mono uppercase tracking-[0.2em] text-white/45 mt-0.5">{t.sub}</div>
                </div>
              </foreignObject>
            </g>
          )
        })}
        <circle cx="0" cy="0" r="68" fill="rgba(255,255,255,0.04)" stroke={ACCENT} strokeWidth="1.5" />
        <foreignObject x="-80" y="-30" width="160" height="60">
          <div className="text-center">
            <div className="font-display text-base font-semibold text-white leading-tight">Deutsche Telekom</div>
            <div className="text-[10px] font-mono uppercase tracking-[0.22em] mt-0.5" style={{ color: ACCENT }}>Anchor</div>
          </div>
        </foreignObject>
      </svg>
    </div>
  )
}
