import {
  SlideShell,
  Eyebrow,
  BigTitle,
  Card,
  GridBg,
  CornerNum,
  Stat,
} from './_layouts'
import type { Deck } from './types'
import { TrendingUp, Repeat } from 'lucide-react'

const ACCENT = '#6ee7b7'
const BG = 'radial-gradient(ellipse at 50% 0%, #0a4634 0%, #07120e 65%)'

const QUARTERS = [
  {
    q: 'Q1–Q2',
    sub: 'London office launch',
    sector: 'Telco + AI-native tech',
    logos: ['Deutsche Telekom (anchor)', 'Spotify', 'Klarna'],
    arr: '€4M',
  },
  {
    q: 'Q3–Q4',
    sub: 'Banking + insurance',
    sector: 'Regulated FS',
    logos: ['ING', 'Allianz', 'BNP Paribas', 'Lloyds'],
    arr: '€12M',
  },
  {
    q: 'Q5–Q6',
    sub: 'Industrial + retail',
    sector: 'DAX 40 + EU retail',
    logos: ['Siemens', 'BMW', 'Maersk', 'Booking.com', '+ 9 more'],
    arr: '€40M',
  },
]

const SCALES = [
  {
    t: 'Enterprise',
    a: '1:1 / 1:Few',
    items: ['Anchor Studios + Peer Studios', '€500K–€2M contracts', 'FDE pair per event', 'White-glove pre-scoping'],
  },
  {
    t: 'Mid-market',
    a: '1:Few / 1:Many',
    items: ['Peer Studios + Customer Forum', '€100K–€500K contracts', '1 FDE per event', 'Templated pre-scoping'],
  },
  {
    t: 'SMB',
    a: '1:Many',
    items: ['Open Studios + Community Hackathon', '€25K–€100K contracts', 'Self-serve format', 'Applications Library entry point'],
  },
]

export const deck: Deck = [
  {
    id: 'roadmap',
    render: () => (
      <SlideShell bg={BG}>
        <GridBg accent={ACCENT} />
        <CornerNum n={1} total={3} accent={ACCENT} />
        <Eyebrow color={ACCENT}>Booth 07 · Scale · The 18-month roadmap</Eyebrow>
        <div className="mt-3 mb-10">
          <BigTitle>From one logo to <span style={{ color: ACCENT }}>twenty</span>.</BigTitle>
        </div>
        <div className="grid grid-cols-3 gap-4">
          {QUARTERS.map((s) => (
            <Card key={s.q} accent={ACCENT}>
              <div className="flex items-center justify-between">
                <div className="font-mono text-xs" style={{ color: ACCENT }}>{s.q}</div>
                <TrendingUp className="w-4 h-4" style={{ color: ACCENT }} />
              </div>
              <div className="text-base font-semibold text-white mt-2">{s.sub}</div>
              <div className="text-xs text-white/45 mt-0.5">{s.sector}</div>
              <ul className="mt-4 space-y-1.5 text-sm text-white/75">
                {s.logos.map((x) => <li key={x} className="flex gap-2"><span style={{ color: ACCENT }}>·</span>{x}</li>)}
              </ul>
              <div className="mt-5 pt-4 border-t border-white/10 flex justify-between items-baseline">
                <span className="text-[10px] uppercase tracking-[0.22em] text-white/40">Cumulative ARR</span>
                <span className="font-display text-2xl font-bold" style={{ color: ACCENT }}>{s.arr}</span>
              </div>
            </Card>
          ))}
        </div>
        <div className="mt-10 grid grid-cols-3 gap-6">
          <Stat value="20" label="Anchor accounts" accent={ACCENT} />
          <Stat value="€40M" label="ARR target" accent={ACCENT} />
          <Stat value="18 mo" label="Time horizon" accent={ACCENT} />
        </div>
        <div className="mt-6 pt-4 border-t border-white/10 text-xs text-white/55 leading-relaxed">
          Same playbook, sequenced by procurement velocity and sector readiness.
        </div>
      </SlideShell>
    ),
  },
  {
    id: 'one-many',
    render: () => (
      <SlideShell bg={BG}>
        <GridBg accent={ACCENT} />
        <CornerNum n={2} total={3} accent={ACCENT} />
        <Eyebrow color={ACCENT}>Scaling the playbook · 1:Many motion</Eyebrow>
        <div className="mt-3 mb-10">
          <BigTitle>From Anchor Studios to Open Studios.</BigTitle>
        </div>
        <div className="grid grid-cols-3 gap-5 flex-1">
          {SCALES.map((s, i) => (
            <Card key={s.t} accent={ACCENT}>
              <div className="font-mono text-xs" style={{ color: ACCENT }}>0{i + 1}</div>
              <div className="text-xl font-semibold text-white mt-2">{s.t}</div>
              <div className="text-[10px] font-mono uppercase tracking-[0.25em] text-white/45 mt-1">{s.a}</div>
              <ul className="mt-5 space-y-2.5 text-sm text-white/75">
                {s.items.map((it) => <li key={it} className="flex gap-2"><span style={{ color: ACCENT }}>▸</span>{it}</li>)}
              </ul>
            </Card>
          ))}
        </div>
        <div className="mt-6 pt-4 border-t border-white/10 text-xs text-white/55 italic">
          Same motion, different gauge. The Applications Library compounds across all three.
        </div>
      </SlideShell>
    ),
  },
  {
    id: 'library',
    render: () => (
      <SlideShell bg={BG}>
        <GridBg accent={ACCENT} />
        <CornerNum n={3} total={3} accent={ACCENT} />
        <Eyebrow color={ACCENT}>The Applications Library flywheel · close</Eyebrow>
        <div className="mt-3 mb-8">
          <BigTitle>The blueprint compounds.</BigTitle>
        </div>
        <div className="grid grid-cols-5 gap-3 items-stretch">
          {[
            { n: '01', t: 'Studios produces', d: 'Working prototypes anchored on real customer problems.' },
            { n: '02', t: 'Templatize', d: 'Best prototypes harvested into the Lovable Applications Library.' },
            { n: '03', t: 'Reuse', d: 'Future attendees start from templates · 8h → 2h to first prototype.' },
            { n: '04', t: 'Co-market', d: "Templates carry the original customer's logo." },
            { n: '05', t: 'Compound', d: 'The 21st account inherits 20 references built in.' },
          ].map((s, i) => (
            <div key={s.n} className="relative">
              <Card accent={ACCENT} className="h-full">
                <div className="flex items-center gap-2">
                  <Repeat className="w-3.5 h-3.5" style={{ color: ACCENT }} />
                  <span className="font-mono text-[10px]" style={{ color: ACCENT }}>{s.n}</span>
                </div>
                <div className="text-base font-semibold text-white mt-3">{s.t}</div>
                <div className="text-xs text-white/60 mt-2 leading-relaxed">{s.d}</div>
              </Card>
              {i < 4 && (
                <div className="absolute top-1/2 -right-2 -translate-y-1/2 text-white/30 text-lg pointer-events-none">→</div>
              )}
            </div>
          ))}
        </div>

        <div
          className="mt-10 rounded-2xl p-8"
          style={{
            background: `linear-gradient(135deg, ${ACCENT}1f, transparent 70%)`,
            border: `1px solid ${ACCENT}40`,
          }}
        >
          <div className="text-[10px] font-mono uppercase tracking-[0.3em]" style={{ color: ACCENT }}>The close</div>
          <p className="mt-4 font-display text-balance leading-[1.15] text-white" style={{ fontSize: 'clamp(1.3rem, 2vw, 2rem)' }}>
            In one day, your PMs ship the internal tool that's been sitting in
            your engineering backlog for six months.{' '}
            <span style={{ color: ACCENT }}>
              After that, you'll never approve that backlog the same way again.
            </span>{' '}
            And after that — neither will the next 20 European enterprises in line.
          </p>
        </div>
      </SlideShell>
    ),
  },
]
