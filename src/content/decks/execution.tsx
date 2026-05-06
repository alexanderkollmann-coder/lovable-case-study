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

const TABLE = [
  { f: 'Anchor Studios',     a: '1:1', d: '2 days', p: '30 (5×6)',     c: '€30K',   b: 'Tier 1 logos · named champion', an: 'Palantir bootcamp' },
  { f: 'Peer Studios',       a: '1:Few', d: '2 days', p: '30 (5 prosp.)', c: '€22K', b: 'Sector cohort (banks, telcos)', an: 'AWS APN Immersion', highlight: true },
  { f: 'Open Studios',       a: '1:Many', d: '1 day', p: '100+',         c: '€40K',  b: 'Geo / sector ecosystem', an: 'Salesforce TrailblazerDX' },
  { f: 'Expansion Studios',  a: '1:1', d: '1–2 days', p: '30 (multi-BU)', c: '€25K', b: 'Customer NDR uplift', an: 'AWS GameDay' },
  { f: 'Customer Forum',     a: '1:Many existing', d: 'Half-day', p: '50–100', c: '€15K', b: 'Reference creation, advocacy', an: 'HubSpot INBOUND' },
  { f: 'Community Hackathon',a: '1:Many', d: '1+ weeks', p: '1,000+', c: '€100K+', b: 'Brand & ecosystem', an: 'Cognizant Vibe Coding Week' },
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
        <CornerNum n={2} total={4} accent={ACCENT} />
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
    id: 'table',
    render: () => (
      <SlideShell bg={BG}>
        <GridBg accent={ACCENT} />
        <CornerNum n={3} total={4} accent={ACCENT} />
        <Eyebrow color={ACCENT}>Format trade-space</Eyebrow>
        <div className="mt-3 mb-8">
          <BigTitle>Six formats. One picked.</BigTitle>
        </div>
        <div className="rounded-xl border border-white/10 overflow-hidden bg-white/[0.02]">
          <div className="grid" style={{ gridTemplateColumns: '1.6fr 1fr 0.9fr 1.1fr 0.7fr 1.6fr 1.4fr' }}>
            {['Format', 'Audience', 'Duration', 'Participants', 'Cost', 'Best for', 'Analogue'].map((h) => (
              <div key={h} className="p-3 text-[10px] font-mono uppercase tracking-[0.22em] text-white/40 border-b border-white/10">{h}</div>
            ))}
            {TABLE.map((r) => (
              <div key={r.f} className="contents">
                <Cell h={r.highlight} bold>{r.f}{r.highlight && <span className="ml-2 text-[9px] font-mono px-2 py-0.5 rounded" style={{ background: ACCENT, color: '#0a0d18' }}>PICKED</span>}</Cell>
                <Cell h={r.highlight}>{r.a}</Cell>
                <Cell h={r.highlight}>{r.d}</Cell>
                <Cell h={r.highlight}>{r.p}</Cell>
                <Cell h={r.highlight} mono>{r.c}</Cell>
                <Cell h={r.highlight}>{r.b}</Cell>
                <Cell h={r.highlight}>{r.an}</Cell>
              </div>
            ))}
          </div>
        </div>
        <div className="mt-6 text-xs text-white/55 italic">
          Peer Studios as the European default — best ratio of pipeline conversion to per-account CAC.
        </div>
      </SlideShell>
    ),
  },
  {
    id: 'why-peer',
    render: () => (
      <SlideShell bg={BG}>
        <GridBg accent={ACCENT} />
        <CornerNum n={4} total={4} accent={ACCENT} />
        <Eyebrow color={ACCENT}>Why Peer Studios as the default</Eyebrow>
        <div className="mt-3 mb-10">
          <BigTitle>Three reasons.</BigTitle>
        </div>
        <div className="grid grid-cols-3 gap-5 flex-1">
          {[
            { t: 'Peer competition is the conversion accelerant', d: 'CDOs from non-competing accounts in the same room creates productive FOMO. AWS APN model — proven at scale.' },
            { t: 'Two days maps to the buyer journey', d: 'Day 1: problem + champion. Day 2: build + MOU at demo dinner. One day too thin; three breaks executive availability.' },
            { t: 'Per-event economics are extraordinary', d: '€22K all-in. 1-in-10 conversion = 2.3× ROI. 3-in-10 (DT-class) = 6.8× ROI.' },
          ].map((s, i) => (
            <div key={s.t} className="rounded-xl p-6 border bg-white/[0.03]" style={{ borderColor: `${ACCENT}33` }}>
              <div className="font-mono text-xs" style={{ color: ACCENT }}>0{i + 1}</div>
              <div className="text-base font-semibold text-white mt-3 leading-snug">{s.t}</div>
              <div className="text-sm text-white/65 mt-3 leading-relaxed">{s.d}</div>
            </div>
          ))}
        </div>
        <div className="mt-6 pt-4 border-t border-white/10 text-xs text-white/55">
          Anchor Studios for Tier 1 (DT, Spotify, Klarna, ING, Allianz). Peer Studios for sector cohorts after the anchor lands.
        </div>
      </SlideShell>
    ),
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
