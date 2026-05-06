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

const X_LABELS = ['1:1', '1:Few', '1:Many']
const Y_LABELS = ['Origination', 'Upsell', 'Awareness']

const MATRIX: MatrixCell[][] = [
  // Origination
  [
    { title: 'Anchor', sub: 'Lovable × Allianz' },
    { title: 'Peer', sub: 'Financial Institution bootcamp' },
    {},
  ],
  // Upsell
  [
    { title: 'Anchor', sub: 'Lovable × DT' },
    {},
    {},
  ],
  // Awareness
  [
    {},
    {},
    { title: 'Community', sub: 'Free-for-all enterprise hackathon' },
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
        <CornerNum n={1} total={3} accent={ACCENT} />
        <Eyebrow color={ACCENT}>Booth 04 · Format · Three hackathon types</Eyebrow>
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
        <CornerNum n={2} total={3} accent={ACCENT} />
        <Eyebrow color={ACCENT}>Booth 04 · Format · Goal × Audience</Eyebrow>
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
                  className="rounded-lg p-3 border"
                  style={{
                    background: cell.highlight ? `${ACCENT}1f` : cell.title ? 'rgba(255,255,255,0.02)' : 'rgba(255,255,255,0.01)',
                    borderColor: cell.highlight ? `${ACCENT}66` : cell.title ? 'rgba(255,255,255,0.08)' : 'rgba(255,255,255,0.04)',
                  }}
                >
                  {cell.title ? (
                    <>
                      <div className={`font-display text-base font-semibold ${cell.highlight ? '' : 'text-white'}`} style={cell.highlight ? { color: ACCENT } : undefined}>
                        {cell.title}
                      </div>
                      <div className="text-[11px] text-white/55 mt-1 leading-relaxed">{cell.sub}</div>
                    </>
                  ) : (
                    <div className="text-white/15 text-center text-xs h-full flex items-center justify-center">—</div>
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
          <CornerNum n={3} total={3} accent={ACCENT} />
          <Eyebrow color={ACCENT}>Booth 04 · Format · Side-by-side</Eyebrow>
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
