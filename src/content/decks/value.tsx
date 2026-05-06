import { useMemo, useState } from 'react'
import {
  SlideShell,
  Eyebrow,
  Card,
  GridBg,
  CornerNum,
  BigTitle,
  Stat,
} from './_layouts'
import type { Deck } from './types'
import { Slider } from '@/components/ui/slider'

const ACCENT = '#5e88ff'
const BG = 'radial-gradient(ellipse at 20% 0%, #1a2546 0%, #0a0d1a 65%)'

const STAGES = [
  { t: 'T-30', l: 'Pre-scoping' },
  { t: 'Day 0–2', l: 'Studios', highlight: true },
  { t: 'Day 30', l: 'Paid PoC' },
  { t: 'Day 90', l: 'Contract' },
]

export const deck: Deck = [
  {
    id: 'cover',
    kicker: 'Value Proposition',
    render: () => (
      <SlideShell bg={BG}>
        <GridBg accent={ACCENT} />
        <CornerNum n={1} total={4} accent={ACCENT} />
        <div className="flex-1 flex flex-col justify-center items-center text-center max-w-6xl mx-auto">
          <Eyebrow color={ACCENT}>Booth 01 · Value Proposition</Eyebrow>
          <h1
            className="font-display font-semibold leading-[0.95] tracking-tight mt-8"
            style={{ fontSize: 'clamp(3rem, 8vw, 8rem)' }}
          >
            Seeing is <span style={{ color: ACCENT }}>believing</span>
          </h1>
          <p className="mt-10 text-white/65 text-2xl max-w-3xl leading-relaxed">
            Hackathons are the antidote to information ubiquity.
          </p>
        </div>
        <div className="pt-6 border-t border-white/10 flex items-center justify-between text-[10px] font-mono uppercase tracking-[0.25em] text-white/45">
          <span>Internal · <span className="text-white/70">Embedded Build Motion</span></span>
          <span>External · <span style={{ color: ACCENT }}>Lovable Studios</span></span>
        </div>
      </SlideShell>
    ),
  },
  {
    id: 'motion',
    render: () => (
      <SlideShell bg={BG}>
        <GridBg accent={ACCENT} />
        <CornerNum n={2} total={4} accent={ACCENT} />
        <Eyebrow color={ACCENT}>The motion · 12-month goals</Eyebrow>
        <div className="grid grid-cols-2 gap-10 mt-6 flex-1">
          {/* Left */}
          <div className="flex flex-col">
            <BigTitle>A forward-deployed pre-sales pipeline.</BigTitle>
            <p className="mt-5 text-white/60 text-base leading-relaxed max-w-md">
              The hackathon is one stage of the motion — not the beginning, not the end.
            </p>
            <div className="mt-10">
              <div className="relative h-px bg-white/15 my-6" />
              <div className="flex justify-between -mt-12">
                {STAGES.map((s) => (
                  <div key={s.t} className="flex flex-col items-center w-32">
                    <div
                      className="rounded-full"
                      style={{
                        width: s.highlight ? 18 : 10,
                        height: s.highlight ? 18 : 10,
                        background: s.highlight ? ACCENT : 'rgba(255,255,255,0.4)',
                        boxShadow: s.highlight ? `0 0 18px ${ACCENT}` : undefined,
                        marginTop: s.highlight ? -4 : 0,
                      }}
                    />
                    <div
                      className="mt-3 font-mono text-[10px] uppercase tracking-[0.22em]"
                      style={{ color: s.highlight ? ACCENT : 'rgba(255,255,255,0.45)' }}
                    >
                      {s.t}
                    </div>
                    <div
                      className={`text-sm mt-1 text-center ${s.highlight ? 'text-white font-semibold' : 'text-white/65'}`}
                    >
                      {s.l}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
          {/* Right */}
          <div className="flex flex-col">
            <div className="text-[11px] font-mono uppercase tracking-[0.3em]" style={{ color: ACCENT }}>
              Where this lands in 12 months
            </div>
            <div className="mt-6 grid grid-cols-2 gap-6 flex-1">
              <Stat value="20" label="Anchor accounts in Europe" accent={ACCENT} />
              <Stat value="€40M" label="New ARR" accent={ACCENT} />
              <Stat value="60%" label="PoC-to-contract conversion" accent={ACCENT} />
              <Stat value="130%+" label="NDR on touched accounts" accent={ACCENT} />
            </div>
          </div>
        </div>
      </SlideShell>
    ),
  },
  {
    id: 'roi',
    kicker: 'Live ROI calculator',
    render: () => <RoiCalculator />,
  },
  {
    id: 'lovable-gets',
    render: () => (
      <SlideShell bg={BG}>
        <GridBg accent={ACCENT} />
        <CornerNum n={4} total={4} accent={ACCENT} />
        <Eyebrow color={ACCENT}>What Lovable gets back</Eyebrow>
        <div className="mt-3 mb-8">
          <BigTitle>Lowest-CAC, highest-conviction channel into European enterprise.</BigTitle>
        </div>
        <div className="grid grid-cols-2 gap-6 flex-1">
          <Card accent={ACCENT}>
            <div className="text-[10px] font-mono uppercase tracking-[0.28em]" style={{ color: ACCENT }}>Direct commercial outcomes</div>
            <ul className="mt-5 space-y-4 text-sm text-white/80">
              <Bullet><span className="text-white font-semibold">€500K–€2M</span> anchor contract per Studios</Bullet>
              <Bullet><span className="text-white font-semibold">60%</span> PoC-to-contract conversion <span className="text-white/45">(Lemkin enterprise SaaS)</span></Bullet>
              <Bullet><span className="text-white font-semibold">90-day</span> median time-to-contract <span className="text-white/45">(vs. 6+ months typical)</span></Bullet>
              <Bullet><span className="text-white font-semibold">130%+</span> Year 1 NDR on touched accounts</Bullet>
            </ul>
          </Card>
          <Card accent={ACCENT}>
            <div className="text-[10px] font-mono uppercase tracking-[0.28em]" style={{ color: ACCENT }}>Strategic outcomes</div>
            <ul className="mt-5 space-y-4 text-sm text-white/80">
              <Bullet>Reusable Applications Library — every Studios produces templates that compound</Bullet>
              <Bullet>Public executive proof points <span className="text-white/45">(Abrahamson / Luthe model)</span></Bullet>
              <Bullet>Sector beachheads — one anchor unlocks 5 in-sector prospects</Bullet>
              <Bullet>T.Capital + Series B coalition warm intros — no competitor has this distribution</Bullet>
            </ul>
          </Card>
        </div>
        <div className="mt-6 pt-4 border-t border-white/10 text-xs text-white/50 italic">
          Studios is the lowest-CAC, highest-conviction channel into European enterprise.
        </div>
      </SlideShell>
    ),
  },
]

function Bullet({ children }: { children: React.ReactNode }) {
  return (
    <li className="flex gap-3 leading-relaxed">
      <span style={{ color: ACCENT }}>▸</span>
      <span>{children}</span>
    </li>
  )
}

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
  aggressive:   { builders: 5000, daysSaved: 40, dayCost: 1600, attribution: 0.75, newToolsPerBuilder: 4, valuePerTool: 60000, contractSize: 2000000 },
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

function RoiCalculator() {
  const [inp, setInp] = useState<Inputs>(PRESETS.mid)
  const [stress, setStress] = useState(false)

  const effective = useMemo<Inputs>(() => {
    if (!stress) return inp
    return {
      ...inp,
      builders: inp.builders / 2,
      daysSaved: inp.daysSaved / 2,
      attribution: inp.attribution / 2,
      newToolsPerBuilder: inp.newToolsPerBuilder / 2,
      valuePerTool: inp.valuePerTool / 2,
    }
  }, [inp, stress])

  const out = compute(effective)
  const set = <K extends keyof Inputs>(k: K) => (v: number[]) => setInp((p) => ({ ...p, [k]: v[0] }))

  return (
    <SlideShell bg={BG}>
      <GridBg accent={ACCENT} />
      <CornerNum n={3} total={4} accent={ACCENT} />
      <div className="flex items-baseline justify-between">
        <Eyebrow color={ACCENT}>What an enterprise gets back · live</Eyebrow>
        <div className="flex items-center gap-2">
          {([
            ['conservative', 'Conservative'],
            ['mid', 'Mid · DT-class'],
            ['aggressive', 'Aggressive · Cognizant-class'],
          ] as const).map(([k, l]) => (
            <button
              key={k}
              onClick={() => { setInp(PRESETS[k]); setStress(false) }}
              className="px-3 py-1.5 rounded-md text-[10px] font-mono uppercase tracking-[0.22em] border border-white/10 text-white/70 hover:bg-white/10 transition-colors"
            >
              {l}
            </button>
          ))}
          <button
            onClick={() => setStress((s) => !s)}
            className="px-3 py-1.5 rounded-md text-[10px] font-mono uppercase tracking-[0.22em] border transition-colors"
            style={{
              borderColor: stress ? ACCENT : 'rgba(255,255,255,0.15)',
              background: stress ? `${ACCENT}22` : 'transparent',
              color: stress ? ACCENT : 'rgba(255,255,255,0.7)',
            }}
          >
            {stress ? 'Stress · ON' : 'Stress test · ÷2'}
          </button>
        </div>
      </div>

      <h2 className="font-display text-3xl font-semibold mt-3 text-white">
        What an enterprise gets back
      </h2>

      <div className="grid mt-4 flex-1 min-h-0 gap-5" style={{ gridTemplateColumns: '2fr 1fr' }}>
        <Card accent={ACCENT}>
          <div className="text-[10px] font-mono uppercase tracking-[0.28em]" style={{ color: ACCENT }}>Inputs</div>
          <div className="mt-3 grid grid-cols-2 gap-x-6 gap-y-3">
            <SliderRow label="Active builders" value={inp.builders} min={250} max={5000} step={50} fmt={(v) => v.toLocaleString()} on={set('builders')} />
            <SliderRow label="Days saved / builder / yr" value={inp.daysSaved} min={5} max={40} step={1} fmt={(v) => `${v}d`} on={set('daysSaved')} />
            <SliderRow label="Day cost (€)" value={inp.dayCost} min={1200} max={1800} step={50} fmt={fmtEur} on={set('dayCost')} />
            <SliderRow label="Lovable attribution" value={inp.attribution} min={0.30} max={0.80} step={0.05} fmt={(v) => `${Math.round(v * 100)}%`} on={set('attribution')} />
            <SliderRow label="Net-new tools / builder / yr" value={inp.newToolsPerBuilder} min={0.5} max={6} step={0.5} fmt={(v) => v.toFixed(1)} on={set('newToolsPerBuilder')} />
            <SliderRow label="Value / tool" value={inp.valuePerTool} min={5000} max={100000} step={1000} fmt={fmtEur} on={set('valuePerTool')} />
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
        McKinsey 2025 · Spotify Honk (60–90%) · Lovable ERP customer (95% effort reduction, 4× throughput)
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
