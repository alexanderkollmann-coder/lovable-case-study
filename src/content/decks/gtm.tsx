import {
  SlideShell,
  Eyebrow,
  BigTitle,
  Card,
  GridBg,
  CornerNum,
} from './_layouts'
import type { Deck } from './types'
import { ChevronRight } from 'lucide-react'

// NB: file id is "gtm" (kept for routing) but content = Execution booth.
const ACCENT = '#34d399'
const BG = 'radial-gradient(ellipse at 0% 0%, #0e3a2c 0%, #07120e 65%)'

interface Block {
  start: number
  dur: number
  label: string
  kind: 'open' | 'build' | 'meal' | 'demo' | 'milestone'
}

const DAY1: Block[] = [
  { start: 0, dur: 0.75, label: 'CDO opening · framing', kind: 'open' },
  { start: 0.75, dur: 0.5, label: 'FDE tooling intro', kind: 'open' },
  { start: 1.25, dur: 0.5, label: 'Team formation', kind: 'open' },
  { start: 1.75, dur: 3, label: 'Build block 1', kind: 'build' },
  { start: 4.75, dur: 1, label: 'Lunch + cross-team feedback', kind: 'meal' },
  { start: 5.75, dur: 3, label: 'Build block 2', kind: 'build' },
  { start: 8.75, dur: 0.75, label: 'Stand-up demos', kind: 'demo' },
  { start: 9.5, dur: 1.5, label: 'Working dinner with execs', kind: 'meal' },
]

const DAY2: Block[] = [
  { start: 0, dur: 0.5, label: 'Sprint plan + FDE sync', kind: 'open' },
  { start: 0.5, dur: 4, label: 'Build block 3', kind: 'build' },
  { start: 4.5, dur: 1, label: 'Demo prep', kind: 'open' },
  { start: 5.5, dur: 1.5, label: 'Final demos · judging panel', kind: 'demo' },
  { start: 7, dur: 1, label: 'Award + executive readout', kind: 'milestone' },
  { start: 8, dur: 3, label: 'Demo dinner · MOU + 30/60/90 MAP', kind: 'milestone' },
]

const TOTAL_HOURS = 11

const KIND_COLOR: Record<Block['kind'], string> = {
  open: '#a78bfa',
  build: ACCENT,
  meal: '#fbbf24',
  demo: '#22d3ee',
  milestone: '#f472b6',
}

const STAGES = [
  { d: 'Day 0', n: 'Studios', p: '€25–30K', o: 'MOU at demo dinner', conv: '80% MOU' },
  { d: 'Day 30', n: 'Paid PoC', p: '€50–100K', o: 'Production-grade prototype', conv: '70%' },
  { d: 'Day 90', n: 'SoW', p: '€250K', o: 'Scoped deployment', conv: '60–90%' },
  { d: 'Day 180', n: 'Contract', p: '€500K – €2M ARR', o: 'Multi-year · NDR plan', conv: '—' },
]

const GATES = [
  { gate: 'DPA', answer: 'Pre-staged at MOU' },
  { gate: 'Model training opt-out', answer: 'Public statement · slide 2 of procurement pack' },
  { gate: 'Security review', answer: 'SOC 2 Type II · ISO 27001:2022 · Aikido pen-test' },
  { gate: 'EU AI Act', answer: 'Classified Low Risk · documented' },
  { gate: 'Champion turnover', answer: '2-deep coverage from Day 1' },
]

export const deck: Deck = [
  {
    id: 'timeline',
    render: () => (
      <SlideShell bg={BG}>
        <GridBg accent={ACCENT} />
        <CornerNum n={1} total={3} accent={ACCENT} />
        <Eyebrow color={ACCENT}>Booth 05 · Execution · The 2-day timeline</Eyebrow>
        <div className="mt-3 mb-6">
          <BigTitle>The day, beat by beat.</BigTitle>
        </div>
        <div className="space-y-4 flex-1">
          <DayRow label="Day 1 · Foundation" hours="09:00 → 19:30" blocks={DAY1} />
          <DayRow label="Day 2 · Ship" hours="09:00 → 19:00" blocks={DAY2} />
          <Legend />
        </div>
        <div className="mt-6 pt-4 border-t border-white/10 text-xs text-white/55 leading-relaxed">
          Outputs · <span className="text-white">4–5 working prototypes</span> · <span className="text-white">signed MOU</span> · <span className="text-white">named champions</span> · <span className="text-white">30/60/90 Mutual Action Plan</span>
        </div>
      </SlideShell>
    ),
  },
  {
    id: 'judging',
    render: () => (
      <SlideShell bg={BG}>
        <GridBg accent={ACCENT} />
        <CornerNum n={2} total={3} accent={ACCENT} />
        <Eyebrow color={ACCENT}>Judging rubric & panel</Eyebrow>
        <div className="mt-3 mb-8">
          <BigTitle>Transparent scoring. Named panelists.</BigTitle>
        </div>
        <div className="grid grid-cols-2 gap-6 flex-1">
          <Card accent={ACCENT}>
            <div className="text-[10px] font-mono uppercase tracking-[0.28em]" style={{ color: ACCENT }}>Composite scoring · /100</div>
            <div className="mt-5 space-y-4">
              {[
                { l: 'Business Impact', w: 35, m: 'Solves a real, costed business problem' },
                { l: 'Build Velocity', w: 25, m: 'What ships in 8 hours' },
                { l: 'Demo Polish', w: 20, m: 'Stakeholder-ready presentation' },
                { l: 'Adoption Plan', w: 20, m: 'Path to production by Day 30' },
              ].map((r) => (
                <div key={r.l}>
                  <div className="flex justify-between items-baseline mb-1.5">
                    <div>
                      <span className="text-sm text-white font-medium">{r.l}</span>
                      <span className="text-xs text-white/45 ml-2">{r.m}</span>
                    </div>
                    <span className="font-mono text-sm font-bold" style={{ color: ACCENT }}>{r.w}%</span>
                  </div>
                  <div className="h-1.5 rounded-full bg-white/5 overflow-hidden">
                    <div className="h-full rounded-full" style={{ width: `${r.w * 2.5}%`, background: ACCENT }} />
                  </div>
                </div>
              ))}
            </div>
          </Card>
          <Card accent={ACCENT}>
            <div className="text-[10px] font-mono uppercase tracking-[0.28em]" style={{ color: ACCENT }}>The panel</div>
            <div className="mt-5 space-y-4">
              {[
                { t: 'Customer executive', s: 'CDO or CTO · the buyer in the room' },
                { t: 'Foundation-model partner', s: 'Anthropic / OpenAI / Google · co-marketer & credibility' },
                { t: 'Lovable founder', s: 'Anton at flagship events · confirmed' },
              ].map((p) => (
                <div key={p.t} className="rounded-lg p-3 border border-white/10 bg-white/[0.03]">
                  <div className="text-sm font-semibold text-white">{p.t}</div>
                  <div className="text-xs text-white/55 mt-0.5">{p.s}</div>
                </div>
              ))}
            </div>
          </Card>
        </div>
        <div className="mt-5 pt-3 border-t border-white/10 text-xs text-white/55 italic">
          Salesforce's 2013 hackathon controversy is the cautionary tale we're explicitly engineering against.
        </div>
      </SlideShell>
    ),
  },
  {
    id: 'pipeline',
    render: () => (
      <SlideShell bg={BG}>
        <GridBg accent={ACCENT} />
        <CornerNum n={3} total={3} accent={ACCENT} />
        <Eyebrow color={ACCENT}>From hackathon output to signed contract</Eyebrow>
        <div className="mt-3 mb-8">
          <BigTitle>Hackathon → <span style={{ color: ACCENT }}>contract</span>.</BigTitle>
        </div>
        <div className="relative">
          <div className="absolute left-0 right-0 top-[44px] h-px bg-gradient-to-r from-transparent via-white/15 to-transparent" />
          <div className="grid grid-cols-4 gap-4 relative">
            {STAGES.map((s, i) => (
              <div key={s.n} className="flex flex-col items-stretch">
                <div className="flex items-center justify-center mb-3 relative" style={{ height: 32 }}>
                  <div className="w-3 h-3 rounded-full" style={{ background: ACCENT, boxShadow: `0 0 16px ${ACCENT}` }} />
                  {i < STAGES.length - 1 && (
                    <ChevronRight className="absolute -right-3 w-5 h-5" style={{ color: ACCENT, opacity: 0.6 }} />
                  )}
                </div>
                <Card accent={ACCENT}>
                  <div className="font-mono text-xs uppercase tracking-[0.25em]" style={{ color: ACCENT }}>{s.d}</div>
                  <div className="text-lg font-semibold text-white mt-2">{s.n}</div>
                  <div className="font-display text-xl mt-2" style={{ color: ACCENT }}>{s.p}</div>
                  <div className="text-xs text-white/60 mt-2 leading-relaxed">{s.o}</div>
                  <div className="mt-3 pt-2 border-t border-white/10 flex justify-between items-baseline">
                    <span className="text-[9px] font-mono uppercase tracking-[0.22em] text-white/40">Conv.</span>
                    <span className="font-mono text-xs font-semibold text-white">{s.conv}</span>
                  </div>
                </Card>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-8 rounded-xl border border-white/10 bg-white/[0.02] p-5">
          <div className="text-[10px] font-mono uppercase tracking-[0.28em]" style={{ color: ACCENT }}>Why this converts · five gates pre-cleared</div>
          <div className="grid grid-cols-5 gap-3 mt-4">
            {GATES.map((g) => (
              <div key={g.gate}>
                <div className="text-sm font-semibold text-white">{g.gate}</div>
                <div className="text-xs text-white/55 mt-1 leading-snug">{g.answer}</div>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-auto pt-4 text-xs text-white/55 italic">
          Four months of typical AI-vendor security review collapses to{' '}
          <span className="text-white not-italic font-semibold">~14 days</span>{' '}
          because we arrive with the answers, not the questions.
        </div>
      </SlideShell>
    ),
  },
]

function DayRow({ label, hours, blocks }: { label: string; hours: string; blocks: Block[] }) {
  return (
    <div>
      <div className="flex items-baseline gap-3 mb-2">
        <div className="font-display text-lg font-semibold text-white">{label}</div>
        <div className="text-[10px] font-mono uppercase tracking-[0.25em] text-white/40">{hours}</div>
      </div>
      <div className="relative h-12 rounded-lg bg-white/[0.03] border border-white/10 overflow-hidden">
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
