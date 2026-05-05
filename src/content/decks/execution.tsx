import {
  SlideShell,
  Eyebrow,
  BigTitle,
  Card,
  GridBg,
  CornerNum,
} from './_layouts'
import type { Deck } from './types'

const ACCENT = '#ff4d7a'
const BG = 'radial-gradient(ellipse at 100% 0%, #4a1530 0%, #0a0d18 60%)'

interface Block {
  start: number // hours from day start (0 = 9am)
  dur: number
  label: string
  kind: 'open' | 'build' | 'meal' | 'demo' | 'milestone'
}

const DAY1: Block[] = [
  { start: 0, dur: 0.75, label: 'CDO opening', kind: 'open' },
  { start: 0.75, dur: 0.5, label: 'FDE-led tooling intro', kind: 'open' },
  { start: 1.25, dur: 0.5, label: 'Team formation', kind: 'open' },
  { start: 1.75, dur: 3, label: 'Build block 1', kind: 'build' },
  { start: 4.75, dur: 0.75, label: 'Lunch + cross-team feedback', kind: 'meal' },
  { start: 5.5, dur: 3, label: 'Build block 2', kind: 'build' },
  { start: 8.5, dur: 0.5, label: 'Stand-up demos', kind: 'demo' },
  { start: 9, dur: 1.5, label: 'Working dinner with execs', kind: 'meal' },
]

const DAY2: Block[] = [
  { start: 0, dur: 0.5, label: 'Sprint plan', kind: 'open' },
  { start: 0.5, dur: 4, label: 'Build block 3', kind: 'build' },
  { start: 4.5, dur: 0.75, label: 'Demo prep', kind: 'open' },
  { start: 5.25, dur: 1.5, label: 'Final demos · judging panel', kind: 'demo' },
  { start: 6.75, dur: 0.75, label: 'Award + executive readout', kind: 'milestone' },
  { start: 7.5, dur: 2.5, label: 'Demo dinner · MOU signing', kind: 'milestone' },
]

const TOTAL_HOURS = 10.5

const KIND_COLOR: Record<Block['kind'], string> = {
  open: '#a78bfa',
  build: ACCENT,
  meal: '#fbbf24',
  demo: '#22d3ee',
  milestone: '#34d399',
}

export const deck: Deck = [
  {
    id: 'timeline',
    render: () => (
      <SlideShell bg={BG}>
        <GridBg accent={ACCENT} />
        <CornerNum n={1} total={2} accent={ACCENT} />
        <Eyebrow color={ACCENT}>Booth 04 · Execution · The 2-day timeline</Eyebrow>
        <div className="mt-3 mb-6">
          <BigTitle>Choreographed for an MOU at dinner.</BigTitle>
        </div>
        <div className="space-y-4 flex-1">
          <DayRow label="Day 1" blocks={DAY1} />
          <DayRow label="Day 2" blocks={DAY2} />
          <Legend />
        </div>
        <div className="mt-6 pt-4 border-t border-white/10 text-xs text-white/55 leading-relaxed">
          Two FDEs float across teams. Outputs:{' '}
          <span className="text-white">4 working prototypes</span> ·{' '}
          <span className="text-white">signed MOU</span> ·{' '}
          <span className="text-white">named champions</span> ·{' '}
          <span className="text-white">30/60/90 MAP</span>.
        </div>
      </SlideShell>
    ),
  },
  {
    id: 'fde',
    render: () => (
      <SlideShell bg={BG}>
        <GridBg accent={ACCENT} />
        <CornerNum n={2} total={2} accent={ACCENT} />
        <Eyebrow color={ACCENT}>FDE-pairing model · Judging rubric</Eyebrow>
        <div className="mt-3 mb-8">
          <BigTitle>Pair with the customer. Don't build for them.</BigTitle>
        </div>
        <div className="grid grid-cols-2 gap-6 flex-1">
          <Card accent={ACCENT}>
            <div className="text-[10px] font-mono uppercase tracking-[0.25em]" style={{ color: ACCENT }}>The FDE model</div>
            <div className="text-lg font-semibold text-white mt-3">2 FDEs per Studios event</div>
            <ul className="mt-4 space-y-3 text-sm text-white/75">
              <li className="flex gap-2"><span style={{ color: ACCENT }}>·</span> 1 fullstack + 1 AI/integration specialist</li>
              <li className="flex gap-2"><span style={{ color: ACCENT }}>·</span> Pair with the customer's people — they ship the code</li>
              <li className="flex gap-2"><span style={{ color: ACCENT }}>·</span> Lineage: Palantir bootcamps + Anthropic's Forward Deployed Engineer practice</li>
              <li className="flex gap-2"><span style={{ color: ACCENT }}>·</span> The inversion: <span className="text-white">customer's staff become the builders</span></li>
            </ul>
          </Card>
          <Card accent={ACCENT}>
            <div className="text-[10px] font-mono uppercase tracking-[0.25em]" style={{ color: ACCENT }}>Judging rubric</div>
            <div className="text-lg font-semibold text-white mt-3">Weighted, public, defended live</div>
            <div className="mt-4 space-y-3">
              {[
                { l: 'Business Impact', w: 35 },
                { l: 'Build Velocity', w: 25 },
                { l: 'Demo Polish', w: 20 },
                { l: 'Adoption Plan', w: 20 },
              ].map((r) => (
                <div key={r.l}>
                  <div className="flex justify-between items-baseline mb-1.5">
                    <span className="text-sm text-white/80">{r.l}</span>
                    <span className="font-mono text-sm font-bold" style={{ color: ACCENT }}>{r.w}%</span>
                  </div>
                  <div className="h-1.5 rounded-full bg-white/5 overflow-hidden">
                    <div className="h-full rounded-full" style={{ width: `${r.w * 2.5}%`, background: ACCENT }} />
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-5 pt-4 border-t border-white/10 text-xs text-white/55">
              Panel · <span className="text-white/85">Customer exec</span> · <span className="text-white/85">Foundation-model partner</span> · <span className="text-white/85">Lovable founder</span>
            </div>
          </Card>
        </div>
        <div className="mt-6 pt-4 border-t border-white/10 text-sm text-white/65">
          <span className="text-white font-semibold">80%</span> of teams sign MOU at the demo dinner. The other 20% within 7 days.
        </div>
      </SlideShell>
    ),
  },
]

function DayRow({ label, blocks }: { label: string; blocks: Block[] }) {
  return (
    <div>
      <div className="flex items-baseline gap-3 mb-2">
        <div className="font-display text-xl font-semibold text-white">{label}</div>
        <div className="text-[10px] font-mono uppercase tracking-[0.25em] text-white/40">9:00 → 19:30</div>
      </div>
      <div className="relative h-14 rounded-lg bg-white/[0.03] border border-white/10 overflow-hidden">
        {blocks.map((b, i) => {
          const left = (b.start / TOTAL_HOURS) * 100
          const width = (b.dur / TOTAL_HOURS) * 100
          const c = KIND_COLOR[b.kind]
          return (
            <div
              key={i}
              className="absolute top-1 bottom-1 rounded px-2 flex items-center text-[10px] font-medium overflow-hidden"
              style={{
                left: `${left}%`,
                width: `calc(${width}% - 2px)`,
                background: `linear-gradient(180deg, ${c}33, ${c}1a)`,
                borderLeft: `2px solid ${c}`,
                color: '#fff',
              }}
              title={b.label}
            >
              <span className="truncate">{b.label}</span>
            </div>
          )
        })}
      </div>
    </div>
  )
}

function Legend() {
  const items: { k: Block['kind']; l: string }[] = [
    { k: 'open', l: 'Open / setup' },
    { k: 'build', l: 'Build block' },
    { k: 'meal', l: 'Meal / social' },
    { k: 'demo', l: 'Demo' },
    { k: 'milestone', l: 'Milestone' },
  ]
  return (
    <div className="flex items-center gap-5 mt-2">
      {items.map((i) => (
        <div key={i.k} className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-sm" style={{ background: KIND_COLOR[i.k] }} />
          <span className="text-[10px] font-mono uppercase tracking-[0.22em] text-white/55">{i.l}</span>
        </div>
      ))}
    </div>
  )
}
