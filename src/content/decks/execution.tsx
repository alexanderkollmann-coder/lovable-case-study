import {
  SlideShell,
  Eyebrow,
  BigTitle,
  GridBg,
  CornerNum,
} from './_layouts'
import type { Deck } from './types'

// NB: file id is "execution" (kept for routing) but content = Format booth.
const ACCENT = '#ff4d7a'
const BG = 'radial-gradient(ellipse at 100% 0%, #4a1530 0%, #0a0d18 60%)'

interface MatrixCell {
  title?: string
  sub?: string
  highlight?: boolean
}

const X_LABELS = ['Anchor', 'Peer', 'Community']
const Y_LABELS = ['Origination', 'Upsell', 'Awareness']

const MATRIX: MatrixCell[][] = [
  // Origination
  [
    { title: 'Lovable × Allianz', highlight: true },
    { title: 'Financial Institution bootcamp', highlight: true },
    {},
  ],
  // Upsell
  [
    { title: 'Lovable × DT', highlight: true },
    {},
    {},
  ],
  // Awareness
  [
    {},
    {},
    { title: 'Free-for-all enterprise hackathon', highlight: true },
  ],
]


const CATEGORIES: { name: string; tagline: string; blurb: string }[] = [
  {
    name: 'Anchor',
    tagline: 'Land & expand a single account.',
    blurb: 'One named customer in the room. Origination or upsell, always 1:1.',
  },
  {
    name: 'Peer',
    tagline: 'A sector cohort, side by side.',
    blurb: 'A handful of non-competing prospects. Productive FOMO drives conversion.',
  },
  {
    name: 'Community',
    tagline: 'Brand & ecosystem at scale.',
    blurb: 'Open to the market. Awareness, developer love, top-of-funnel.',
  },
]

export const deck: Deck = [
  {
    id: 'categories',
    render: () => (
      <SlideShell bg={BG}>
        <GridBg accent={ACCENT} />
        <CornerNum n={1} total={4} accent={ACCENT} />
        <Eyebrow color={ACCENT}>Three hackathon types</Eyebrow>
        <div className="mt-3 mb-10">
          <BigTitle>Anchor. Peer. Community.</BigTitle>
        </div>
        <div className="grid grid-cols-3 gap-5 flex-1">
          {CATEGORIES.map((cat) => (
            <div
              key={cat.name}
              className="rounded-xl p-6 border bg-white/[0.03] flex flex-col"
              style={{ borderColor: `${ACCENT}44` }}
            >
              <div
                className="font-display text-3xl font-semibold"
                style={{ color: ACCENT }}
              >
                {cat.name}
              </div>
              <div className="text-base text-white/85 mt-3 leading-snug">
                {cat.tagline}
              </div>
              <div className="text-sm text-white/55 mt-3 leading-relaxed">
                {cat.blurb}
              </div>
            </div>
          ))}
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
        <Eyebrow color={ACCENT}>Goal × Audience</Eyebrow>
        <div className="mt-3 mb-6">
          <BigTitle>Goal × Audience.</BigTitle>
        </div>

        <div className="flex-1 grid gap-2 min-h-0" style={{ gridTemplateColumns: '110px repeat(3, 1fr)', gridTemplateRows: 'auto repeat(3, 1fr)' }}>
          <div />
          {X_LABELS.map((x) => (
            <div key={x} className="text-center text-[10px] font-mono uppercase tracking-[0.28em] text-white/55 pb-1">{x}</div>
          ))}
          {MATRIX.map((row, ri) => (
            <div key={ri} className="contents">
              <div className="flex items-center justify-end pr-2 text-[10px] font-mono uppercase tracking-[0.28em] text-white/55">{Y_LABELS[ri]}</div>
              {row.map((cell, ci) => (
                <div
                  key={ci}
                  className="rounded-lg p-3 border flex items-center justify-center text-center"
                  style={{
                    background: cell.highlight ? `${ACCENT}33` : 'rgba(255,255,255,0.01)',
                    borderColor: cell.highlight ? ACCENT : 'rgba(255,255,255,0.04)',
                    boxShadow: cell.highlight ? `0 0 18px ${ACCENT}44` : undefined,
                  }}
                >
                  {cell.title ? (
                    <div className="text-sm text-white/55 leading-snug">{cell.title}</div>
                  ) : (
                    <div className="text-white/15 text-xs">—</div>
                  )}
                </div>
              ))}
            </div>
          ))}
        </div>

        <div className="mt-5 pt-3 border-t border-white/10 text-xs text-white/55">
          Six formats. One choice tree. Audience and goal determine duration, participants, and execution.
        </div>
      </SlideShell>
    ),
  },
  {
    id: 'comparison',
    render: () => {
      const ROWS = [
        { label: 'Defining variable', a: 'Which problem', p: 'Which sector', c: 'Which pull mechanic' },
        { label: 'Duration',          a: '2 days',        p: '2 days',       c: '1 day or async' },
        { label: 'Builders',          a: '30, one customer', p: '30, across 5 prospects', c: '100–1,000+' },
        { label: 'FDE model',         a: '2 dedicated',   p: '1–2 floating', c: 'Judges only' },
        { label: 'Data',              a: 'Real customer data', p: 'Real cohort data', c: 'Mock or open data' },
        { label: 'Reward',            a: 'Internal recognition', p: 'Internal recognition', c: 'Prize money' },
      ]
      return (
        <SlideShell bg={BG}>
          <GridBg accent={ACCENT} />
          <CornerNum n={3} total={4} accent={ACCENT} />
          <Eyebrow color={ACCENT}>Side-by-side</Eyebrow>
          <div className="mt-3 mb-8">
            <BigTitle>Anchor vs Peer vs Community.</BigTitle>
          </div>
          <div className="rounded-xl border border-white/10 overflow-hidden bg-white/[0.02]">
            <div className="grid" style={{ gridTemplateColumns: '1.2fr 1fr 1fr 1fr' }}>
              {['', 'Anchor', 'Peer', 'Community'].map((h, i) => (
                <div
                  key={i}
                  className="p-3 text-[11px] font-mono uppercase tracking-[0.22em] border-b border-white/10"
                  style={{ color: i === 0 ? 'rgba(255,255,255,0.4)' : ACCENT }}
                >
                  {h}
                </div>
              ))}
              {ROWS.map((r) => (
                <div key={r.label} className="contents">
                  <Cell bold>{r.label}</Cell>
                  <Cell>{r.a}</Cell>
                  <Cell>{r.p}</Cell>
                  <Cell>{r.c}</Cell>
                </div>
              ))}
            </div>
          </div>
        </SlideShell>
      )
    },
  },
  {
    id: 'agenda',
    render: () => {
      const day1 = [
        { t: '09:30', a: 'Fireside chat: customer CDO + Lovable founder', d: '45 min' },
        { t: '10:15', a: 'Lovable tooling intro, SE-led', d: '45 min' },
        { t: '11:00', a: 'Build block 1', d: '1.5 hrs' },
        { t: '12:30', a: 'Lunch', d: '1 hr' },
        { t: '13:30', a: 'Build block 2', d: '3.5 hrs' },
        { t: '17:00', a: 'Stand-up demos', d: '1 hr' },
        { t: '19:00', a: 'Executive working dinner — prototype review and selection', d: '', hinge: true },
      ]
      const day2 = [
        { t: '09:30', a: 'Standup + sprint plan', d: '30 min' },
        { t: '10:00', a: 'Build block 3', d: '2 hrs' },
        { t: '12:00', a: 'Lunch', d: '1 hr' },
        { t: '13:00', a: 'Build block 4', d: '2.5 hrs' },
        { t: '15:30', a: 'Final demos to judging panel', d: '1 hr', panel: true },
        { t: '16:30', a: 'Awards + executive readout', d: '30 min' },
        { t: '17:00', a: 'Demo dinner — LOI signing, MAP initialized', d: '', highlight: true },
      ]
      return (
        <SlideShell bg={BG}>
          <GridBg accent={ACCENT} />
          <CornerNum n={4} total={4} accent={ACCENT} />
          <Eyebrow color={ACCENT}>Two-day agenda</Eyebrow>
          <div className="mt-3 mb-6">
            <BigTitle>Two days. One outcome.</BigTitle>
          </div>

          <div className="flex-1 grid grid-cols-2 gap-0 min-h-0 relative" style={{ tabularNums: 'tabular-nums' } as React.CSSProperties}>
            {/* divider */}
            <div className="absolute top-0 bottom-0 left-1/2 w-px bg-white/10" />

            {/* Day 1 */}
            <div className="pr-6 flex flex-col">
              <div className="mb-1">
                <div className="font-display text-2xl font-semibold text-white">Day 1 — Prototyping</div>
                <div className="text-sm italic text-white/55 mt-1">Build broad. Three to four prototypes per team.</div>
              </div>
              <div className="mt-4 flex flex-col gap-2">
                {day1.map((it) => <AgendaRow key={it.t} {...it} />)}
              </div>
            </div>

            {/* Day 2 */}
            <div className="pl-6 flex flex-col">
              <div className="mb-1">
                <div className="font-display text-2xl font-semibold text-white">Day 2 — Production</div>
                <div className="text-sm italic text-white/55 mt-1">Pick one. Ship it.</div>
              </div>
              <div className="mt-4 flex flex-col gap-2">
                {day2.map((it) => (
                  <div key={it.t}>
                    <AgendaRow {...it} />
                    {it.panel && (
                      <div className="text-[11px] italic text-white/45 pl-[88px] mt-1">
                        Customer exec · Foundation-model partner · Lovable founder
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* hinge annotation between columns */}
            <div
              className="absolute left-1/2 -translate-x-1/2 px-2 py-1 rounded text-[10px] font-mono uppercase tracking-[0.22em]"
              style={{
                top: '78%',
                background: '#0a0d18',
                color: ACCENT,
                border: `1px solid ${ACCENT}55`,
              }}
            >
              Prototype selection
            </div>
          </div>
        </SlideShell>
      )
    },
  },
]

function Cell({ children, h, bold, mono }: { children: React.ReactNode; h?: boolean; bold?: boolean; mono?: boolean }) {
  return (
    <div
      className={`p-3 border-b border-white/5 text-sm ${h ? 'bg-white/[0.06] text-white' : 'text-white/70'} ${mono ? 'font-mono' : ''} ${bold ? 'font-semibold' : ''}`}
      style={h ? { borderLeft: `2px solid ${ACCENT}` } : undefined}
    >
      {children}
    </div>
  )
}

function AgendaRow({ t, a, d, highlight, hinge }: { t: string; a: string; d?: string; highlight?: boolean; hinge?: boolean; panel?: boolean }) {
  return (
    <div
      className="flex items-baseline gap-4 py-2 px-3 rounded-md relative"
      style={{
        background: highlight ? `${ACCENT}1a` : hinge ? 'rgba(255,255,255,0.04)' : 'transparent',
        borderLeft: highlight ? `3px solid ${ACCENT}` : hinge ? '3px solid rgba(255,255,255,0.2)' : '3px solid transparent',
      }}
    >
      <div
        className="font-mono text-sm tabular-nums w-14 shrink-0"
        style={{ color: highlight ? ACCENT : 'rgba(255,255,255,0.55)' }}
      >
        {t}
      </div>
      <div
        className={`flex-1 text-sm leading-snug ${highlight ? 'font-semibold text-white' : 'text-white/85'}`}
      >
        {a}
      </div>
      {d && (
        <div className="text-[11px] font-mono text-white/40 shrink-0">{d}</div>
      )}
    </div>
  )
}
