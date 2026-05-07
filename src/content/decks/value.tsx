import { useState } from 'react'
import {
  SlideShell,
  Eyebrow,
  Card,
  GridBg,
  CornerNum,
  BigTitle,
} from './_layouts'
import type { Deck } from './types'
import { Slider } from '@/components/ui/slider'

const ACCENT = '#5e88ff'
const ACCENT_BRIGHT = '#8aa9ff'
const BG = 'radial-gradient(ellipse at 20% 0%, #1a2546 0%, #0a0d1a 65%)'

type ValueSection = {
  kicker: string
  frontTitle: React.ReactNode
  tagline: string
  bullets: React.ReactNode[]
}

const VALUE_SECTIONS: ValueSection[] = [
  {
    kicker: 'Cost Savings',
    frontTitle: (
      <>Cost <span style={{ color: ACCENT_BRIGHT }}>Savings</span></>
    ),
    tagline: 'Builds the same thing, faster.',
    bullets: [
      <>Engineering hours recovered on work that would have been built anyway</>,
      <><span className="text-white font-semibold">60–90%</span> time savings on AI-assisted builds <span className="text-white/45">(Spotify Honk, Nov 2025)</span></>,
      <><span className="text-white font-semibold">16–30%</span> productivity / <span className="text-white font-semibold">31–45%</span> quality gains in top-quintile orgs <span className="text-white/45">(McKinsey 2025)</span></>,
    ],
  },
  {
    kicker: 'Value Creation',
    frontTitle: (
      <>Value <span style={{ color: ACCENT_BRIGHT }}>Creation</span></>
    ),
    tagline: "Builds things that wouldn't exist otherwise.",
    bullets: [
      <>Net-new internal tools shipped that would never have made the engineering backlog</>,
      <><span className="text-white font-semibold">4×</span> project throughput <span className="text-white/45">(Lovable ERP customer, Series B blog)</span></>,
      <>McKinsey engineers built in hours what they'd been waiting 4–6 months for <span className="text-white/45">(Anton Osika, Fortune Dec 2025)</span></>,
    ],
  },
]

function ValueFlipCard({ section }: { section: ValueSection }) {
  const [flipped, setFlipped] = useState(false)
  return (
    <button
      onClick={() => setFlipped((f) => !f)}
      className="group relative h-full w-full text-left"
      style={{ perspective: '1200px' }}
    >
      <div
        className="relative h-full w-full transition-transform duration-700"
        style={{
          transformStyle: 'preserve-3d',
          transform: flipped ? 'rotateY(180deg)' : 'rotateY(0deg)',
        }}
      >
        {/* Front */}
        <div
          className="absolute inset-0 rounded-2xl border bg-white/[0.03] backdrop-blur-sm p-8 flex flex-col justify-between hover:bg-white/[0.05] transition-colors"
          style={{ backfaceVisibility: 'hidden', borderColor: `${ACCENT}33` }}
        >
          <div className="font-display font-bold text-white leading-[0.95]" style={{ fontSize: 'clamp(2rem, 3.4vw, 3rem)' }}>
            {section.frontTitle}
          </div>
          <div className="flex items-end justify-between">
            <div className="text-base text-white/75">{section.tagline}</div>
            <div className="text-[10px] font-mono uppercase tracking-[0.22em] text-white/40">
              Tap to reveal →
            </div>
          </div>
        </div>

        {/* Back */}
        <div
          className="absolute inset-0 rounded-2xl border p-8 flex flex-col"
          style={{
            backfaceVisibility: 'hidden',
            transform: 'rotateY(180deg)',
            borderColor: `${ACCENT}55`,
            background: `linear-gradient(160deg, ${ACCENT}14, rgba(255,255,255,0.02))`,
          }}
        >
          <div className="text-sm font-mono uppercase tracking-[0.28em]" style={{ color: ACCENT_BRIGHT }}>
            {section.kicker}
          </div>
          <div className="font-display text-xl font-semibold text-white mt-2">{section.tagline}</div>
          <ul className="mt-6 space-y-4 text-sm text-white/80 flex-1">
            {section.bullets.map((b, i) => (
              <li key={i} className="flex gap-3 leading-relaxed">
                <span style={{ color: ACCENT_BRIGHT }}>▸</span>
                <span>{b}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </button>
  )
}

export const deck: Deck = [
  /* ---------------- Slide 2.1 — Two dimensions of value ---------------- */
  {
    id: 'two-dimensions',
    render: () => (
      <SlideShell bg={BG}>
        <GridBg accent={ACCENT} />
        <CornerNum n={1} total={3} accent={ACCENT} />
        <Eyebrow color={ACCENT}>What an enterprise gets</Eyebrow>
        <div className="mt-3 mb-8">
          <BigTitle>What an enterprise gets back.</BigTitle>
        </div>
        <div className="flex-1 grid grid-cols-2 gap-6 min-h-0">
          {VALUE_SECTIONS.map((s) => (
            <ValueFlipCard key={s.kicker} section={s} />
          ))}
        </div>
      </SlideShell>
    ),
  },

  /* ---------------- Slide 2.2 — Live ROI calculator ---------------- */
  {
    id: 'roi',
    kicker: 'Live ROI calculator',
    render: () => <RoiCalculator />,
  },

  /* ---------------- Slide 2.3 — What Lovable gets ---------------- */
  {
    id: 'lovable-gets',
    render: () => (
      <SlideShell bg={BG}>
        <GridBg accent={ACCENT} />
        <CornerNum n={3} total={3} accent={ACCENT} />
        <Eyebrow color={ACCENT}>What Lovable gets</Eyebrow>
        <div className="mt-3 mb-8">
          <BigTitle>Studios turn Lovable from a tool into a strategic GTM motion.</BigTitle>
        </div>
        <div className="grid grid-cols-3 gap-5 flex-1">
          {[
            {
              t: 'Pipeline',
              d: 'Opens enterprise doors and converts seat-based accounts into €500K+ contracts.',
            },
            {
              t: 'Product Adoption',
              d: 'Gets teams building real internal apps in Lovable.',
            },
            {
              t: 'Market Proof',
              d: 'Creates case studies, champions, and repeatable enterprise narratives.',
            },
          ].map((c, i) => (
            <Card key={c.t} accent={ACCENT}>
              <div className="font-mono text-xs" style={{ color: ACCENT }}>0{i + 1}</div>
              <div className="text-2xl font-display font-semibold text-white mt-3">{c.t}</div>
              <p className="text-sm text-white/70 mt-4 leading-relaxed">{c.d}</p>
            </Card>
          ))}
        </div>
      </SlideShell>
    ),
  },
]


/* ----------------------- ROI Calculator ----------------------- */

interface Inputs {
  builders: number
  daysSaved: number
  dayCost: number
  attribution: number
  newToolsPerBuilder: number
  valuePerTool: number
  contractSize: number
}

const PRESETS: Record<string, Inputs> = {
  conservative: { builders: 500, daysSaved: 5, dayCost: 1200, attribution: 0.40, newToolsPerBuilder: 0.5, valuePerTool: 5000, contractSize: 250000 },
  mid:          { builders: 1500, daysSaved: 15, dayCost: 1400, attribution: 0.60, newToolsPerBuilder: 2, valuePerTool: 25000, contractSize: 750000 },
  aggressive:   { builders: 5000, daysSaved: 40, dayCost: 1600, attribution: 0.75, newToolsPerBuilder: 6, valuePerTool: 100000, contractSize: 2500000 },
}

function compute(i: Inputs) {
  const timeSavings = i.builders * i.daysSaved * i.dayCost * i.attribution
  const toolValue = i.builders * i.newToolsPerBuilder * i.valuePerTool
  const total = timeSavings + toolValue
  const roi = total / i.contractSize
  const paybackMonths = (i.contractSize / total) * 12
  return { timeSavings, toolValue, total, roi, paybackMonths }
}

function fmtEur(n: number) {
  if (n >= 1_000_000_000) return `€${(n / 1_000_000_000).toFixed(1)}B`
  if (n >= 1_000_000) return `€${(n / 1_000_000).toFixed(1)}M`
  if (n >= 1_000) return `€${Math.round(n / 1_000)}K`
  return `€${Math.round(n)}`
}

type PresetKey = 'conservative' | 'mid' | 'aggressive'

function RoiCalculator() {
  const [inp, setInp] = useState<Inputs>(PRESETS.mid)
  const [preset, setPreset] = useState<PresetKey | null>('mid')

  const out = compute(inp)
  const set = <K extends keyof Inputs>(k: K) => (v: number[]) => {
    setInp((p) => ({ ...p, [k]: v[0] }))
    setPreset(null)
  }

  return (
    <SlideShell bg={BG}>
      <GridBg accent={ACCENT} />
      <CornerNum n={2} total={3} accent={ACCENT} />
      <div className="flex items-baseline justify-between">
        <Eyebrow color={ACCENT}>What an enterprise gets</Eyebrow>
        <div className="flex items-center gap-2">
          {([
            ['conservative', 'Conservative'],
            ['mid', 'Mid'],
            ['aggressive', 'Aggressive'],
          ] as const).map(([k, l]) => {
            const active = preset === k
            return (
              <button
                key={k}
                onClick={() => { setInp(PRESETS[k]); setPreset(k) }}
                className="px-3 py-1.5 rounded-md text-[10px] font-mono uppercase tracking-[0.22em] border transition-colors"
                style={{
                  borderColor: active ? ACCENT : 'rgba(255,255,255,0.1)',
                  background: active ? `${ACCENT}22` : 'transparent',
                  color: active ? ACCENT : 'rgba(255,255,255,0.7)',
                }}
              >
                {l}
              </button>
            )
          })}
        </div>
      </div>

      <h2 className="font-display text-3xl font-semibold mt-3 text-white">
        What an enterprise gets back, in numbers
      </h2>

      <div className="grid mt-4 flex-1 min-h-0 gap-5" style={{ gridTemplateColumns: '2fr 1fr' }}>
        <Card accent={ACCENT}>
          <div className="text-[10px] font-mono uppercase tracking-[0.28em]" style={{ color: ACCENT }}>Inputs</div>
          <div className="mt-3 grid grid-cols-2 gap-x-6 gap-y-3">
            <SliderRow label="Active builders post-rollout" value={inp.builders} min={250} max={5000} step={50} fmt={(v) => v.toLocaleString()} on={set('builders')} />
            <SliderRow label="Days saved / builder / yr" value={inp.daysSaved} min={5} max={40} step={1} fmt={(v) => `${v}d`} on={set('daysSaved')} />
            <SliderRow label="Engineer day cost (€)" value={inp.dayCost} min={1200} max={1800} step={50} fmt={fmtEur} on={set('dayCost')} />
            <SliderRow label="Lovable attribution vs. baseline" value={inp.attribution} min={0.30} max={0.80} step={0.05} fmt={(v) => `${Math.round(v * 100)}%`} on={set('attribution')} />
            <SliderRow label="Net-new tools / builder / yr" value={inp.newToolsPerBuilder} min={0.5} max={6} step={0.5} fmt={(v) => v.toFixed(1)} on={set('newToolsPerBuilder')} />
            <SliderRow label="Net-new value / tool" value={inp.valuePerTool} min={5000} max={100000} step={1000} fmt={fmtEur} on={set('valuePerTool')} />
            <div className="col-span-2">
              <SliderRow label="Annual contract size" value={inp.contractSize} min={250000} max={2500000} step={50000} fmt={fmtEur} on={set('contractSize')} />
            </div>
          </div>
        </Card>

        <Card accent={ACCENT}>
          <div className="text-[10px] font-mono uppercase tracking-[0.28em]" style={{ color: ACCENT }}>Live outputs</div>
          <div className="mt-4 space-y-3">
            <Out label="Time savings / yr" value={fmtEur(out.timeSavings)} />
            <Out label="Net-new tooling value" value={fmtEur(out.toolValue)} />
            <Out label="Total recovered value" value={fmtEur(out.total)} accent />
            <Out label="Payback period" value={`${out.paybackMonths.toFixed(1)} mo`} />
          </div>
          <div
            className="mt-4 rounded-xl p-4 text-center"
            style={{
              background: `linear-gradient(135deg, ${ACCENT}25, ${ACCENT}10)`,
              border: `1px solid ${ACCENT}55`,
            }}
          >
            <div className="text-[10px] font-mono uppercase tracking-[0.3em] text-white/60">ROI multiple</div>
            <div
              className="font-display font-bold leading-none mt-2 tabular-nums"
              style={{ color: ACCENT, fontSize: 'clamp(2.6rem, 5vw, 4.5rem)' }}
            >
              {out.roi.toFixed(1)}×
            </div>
            <div className="text-[10px] text-white/55 mt-1">
              on {fmtEur(inp.contractSize)} contract
            </div>
          </div>
        </Card>
      </div>

      <div className="mt-3 pt-3 border-t border-white/10 text-[10px] font-mono uppercase tracking-[0.22em] text-white/45">
        Anchored on McKinsey 2025 · Spotify Honk · Lovable's published ERP customer data
      </div>
    </SlideShell>
  )
}

function SliderRow({
  label, value, min, max, step, fmt, on,
}: { label: string; value: number; min: number; max: number; step: number; fmt: (v: number) => string; on: (v: number[]) => void }) {
  return (
    <div>
      <div className="flex justify-between items-baseline mb-1">
        <span className="text-[11px] text-white/65">{label}</span>
        <span className="font-mono text-xs font-semibold tabular-nums" style={{ color: ACCENT }}>{fmt(value)}</span>
      </div>
      <Slider value={[value]} min={min} max={max} step={step} onValueChange={on} />
    </div>
  )
}

function Out({ label, value, accent }: { label: string; value: string; accent?: boolean }) {
  return (
    <div className="flex justify-between items-baseline border-b border-white/5 pb-2">
      <span className="text-[11px] font-mono uppercase tracking-[0.22em] text-white/50">{label}</span>
      <span
        className="font-display font-semibold tabular-nums"
        style={{ fontSize: '1.25rem', color: accent ? ACCENT : '#fff' }}
      >
        {value}
      </span>
    </div>
  )
}
