import { useMemo, useState } from 'react'
import {
  SlideShell,
  Eyebrow,
  BigTitle,
  Card,
  GridBg,
  CornerNum,
} from './_layouts'
import type { Deck } from './types'
import { Slider } from '@/components/ui/slider'

const ACCENT = '#0f9b6c'
const ACCENT_BRIGHT = '#34d399'
const BG = 'radial-gradient(ellipse at 100% 100%, #0c3a2a 0%, #07120e 65%)'

export const deck: Deck = [
  {
    id: 'kpis',
    render: () => (
      <SlideShell bg={BG}>
        <GridBg accent={ACCENT} />
        <CornerNum n={1} total={2} accent={ACCENT} />
        <Eyebrow color={ACCENT}>Booth 06 · Measurement · The five north-star metrics</Eyebrow>
        <div className="mt-3 mb-10">
          <BigTitle>Leading and lagging. Reported monthly.</BigTitle>
        </div>
        <div className="grid grid-cols-2 gap-6 flex-1">
          <Card accent={ACCENT}>
            <div className="text-[10px] font-mono uppercase tracking-[0.28em]" style={{ color: ACCENT_BRIGHT }}>Leading · Week 1</div>
            <div className="text-base text-white/55 mt-1">Indicators we can act on inside the event window.</div>
            <div className="mt-6 space-y-4">
              <KpiRow label="MOU rate" value="80%" />
              <KpiRow label="MOU-to-PoC" value="70%" />
              <KpiRow label="Hackathon NPS" value="65+" />
              <KpiRow label="Named champions per account" value="≥ 2" />
            </div>
          </Card>
          <Card accent={ACCENT}>
            <div className="text-[10px] font-mono uppercase tracking-[0.28em]" style={{ color: ACCENT_BRIGHT }}>Lagging · 90+ days</div>
            <div className="text-base text-white/55 mt-1">Outcomes that show up on the P&amp;L.</div>
            <div className="mt-6 space-y-4">
              <KpiRow label="Hackathon-sourced ARR" value="15–25% of pipeline" />
              <KpiRow label="PoC-to-contract" value="≥ 60%" />
              <KpiRow label="Time-to-contract (median)" value="90 days" />
              <KpiRow label="NDR uplift" value="130%+" />
            </div>
          </Card>
        </div>
        <div className="mt-6 pt-4 border-t border-white/10 text-xs text-white/50">
          Reported to <span className="text-white/85">Ryan + Kali + Monica</span> monthly.
        </div>
      </SlideShell>
    ),
  },
  {
    id: 'roi-calc',
    kicker: 'Live ROI calculator',
    render: () => <RoiCalculator />,
  },
]

function KpiRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex justify-between items-baseline border-b border-white/5 pb-2">
      <span className="text-sm text-white/70">{label}</span>
      <span className="font-display text-xl font-semibold" style={{ color: ACCENT_BRIGHT }}>{value}</span>
    </div>
  )
}

/* --------------------------- ROI Calculator --------------------------- */

interface Inputs {
  builders: number          // 250 → 5000
  daysSaved: number         // 5 → 40
  dayCost: number           // 1200 → 1800
  attribution: number       // 0.30 → 0.80
  newToolsPerBuilder: number // 0.5 → 6
  valuePerTool: number      // 5_000 → 100_000
  contractSize: number      // 250_000 → 2_500_000
}

const PRESETS: Record<string, Inputs> = {
  conservative: { builders: 500, daysSaved: 8, dayCost: 1200, attribution: 0.30, newToolsPerBuilder: 0.5, valuePerTool: 5000, contractSize: 250000 },
  mid:          { builders: 2000, daysSaved: 18, dayCost: 1500, attribution: 0.50, newToolsPerBuilder: 2, valuePerTool: 25000, contractSize: 750000 },
  aggressive:   { builders: 5000, daysSaved: 35, dayCost: 1800, attribution: 0.75, newToolsPerBuilder: 5, valuePerTool: 80000, contractSize: 2000000 },
}

function compute(i: Inputs) {
  const timeSavings = i.builders * i.daysSaved * i.dayCost * i.attribution
  const toolValue = i.builders * i.newToolsPerBuilder * i.valuePerTool * i.attribution
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
      <CornerNum n={2} total={2} accent={ACCENT} />
      <div className="flex items-baseline justify-between">
        <Eyebrow color={ACCENT}>Live ROI calculator · drag the sliders</Eyebrow>
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
              borderColor: stress ? ACCENT_BRIGHT : 'rgba(255,255,255,0.15)',
              background: stress ? `${ACCENT_BRIGHT}22` : 'transparent',
              color: stress ? ACCENT_BRIGHT : 'rgba(255,255,255,0.7)',
            }}
          >
            {stress ? 'Stress · ON' : 'Stress test · ÷2'}
          </button>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-6 mt-5 flex-1 min-h-0">
        {/* Inputs */}
        <Card accent={ACCENT}>
          <div className="text-[10px] font-mono uppercase tracking-[0.28em]" style={{ color: ACCENT_BRIGHT }}>Inputs</div>
          <div className="mt-4 space-y-4">
            <SliderRow label="Active builders" value={inp.builders} min={250} max={5000} step={50} fmt={(v) => v.toLocaleString()} on={set('builders')} />
            <SliderRow label="Days saved / builder / year" value={inp.daysSaved} min={5} max={40} step={1} fmt={(v) => `${v}d`} on={set('daysSaved')} />
            <SliderRow label="Fully-loaded day cost" value={inp.dayCost} min={1200} max={1800} step={50} fmt={fmtEur} on={set('dayCost')} />
            <SliderRow label="Lovable attribution" value={inp.attribution} min={0.30} max={0.80} step={0.05} fmt={(v) => `${Math.round(v * 100)}%`} on={set('attribution')} />
            <SliderRow label="Net-new tools / builder / year" value={inp.newToolsPerBuilder} min={0.5} max={6} step={0.5} fmt={(v) => v.toFixed(1)} on={set('newToolsPerBuilder')} />
            <SliderRow label="Net-new value / tool" value={inp.valuePerTool} min={5000} max={100000} step={1000} fmt={fmtEur} on={set('valuePerTool')} />
            <SliderRow label="Annual contract size" value={inp.contractSize} min={250000} max={2500000} step={50000} fmt={fmtEur} on={set('contractSize')} />
          </div>
        </Card>

        {/* Outputs */}
        <Card accent={ACCENT}>
          <div className="text-[10px] font-mono uppercase tracking-[0.28em]" style={{ color: ACCENT_BRIGHT }}>Live outputs</div>
          <div className="mt-6 grid grid-cols-2 gap-x-6 gap-y-5">
            <Out label="Time savings" value={fmtEur(out.timeSavings)} />
            <Out label="Net-new tooling value" value={fmtEur(out.toolValue)} />
            <Out label="Total recovered value" value={fmtEur(out.total)} accent />
            <Out label="Payback period" value={`${out.paybackMonths.toFixed(1)} mo`} />
          </div>
          <div
            className="mt-7 rounded-xl p-6 text-center"
            style={{
              background: `linear-gradient(135deg, ${ACCENT_BRIGHT}25, ${ACCENT}10)`,
              border: `1px solid ${ACCENT_BRIGHT}55`,
            }}
          >
            <div className="text-[10px] font-mono uppercase tracking-[0.3em] text-white/60">ROI multiple</div>
            <div
              className="font-display font-bold leading-none mt-3 tabular-nums"
              style={{ color: ACCENT_BRIGHT, fontSize: 'clamp(3.5rem, 7vw, 6rem)' }}
            >
              {out.roi.toFixed(1)}×
            </div>
            <div className="text-xs text-white/55 mt-3">
              On a {fmtEur(inp.contractSize)} annual contract
            </div>
          </div>
        </Card>
      </div>

      <div className="mt-5 pt-3 border-t border-white/10 text-[10px] font-mono uppercase tracking-[0.22em] text-white/45 leading-relaxed">
        Anchored on McKinsey 2025 (16–30% productivity / 31–45% quality, top quintile) ·
        Spotify Honk (60–90% on AI migrations) ·
        Lovable ERP customer (95% effort reduction)
      </div>
    </SlideShell>
  )
}

function SliderRow({
  label, value, min, max, step, fmt, on,
}: { label: string; value: number; min: number; max: number; step: number; fmt: (v: number) => string; on: (v: number[]) => void }) {
  return (
    <div>
      <div className="flex justify-between items-baseline mb-1.5">
        <span className="text-xs text-white/65">{label}</span>
        <span className="font-mono text-sm font-semibold tabular-nums" style={{ color: ACCENT_BRIGHT }}>{fmt(value)}</span>
      </div>
      <Slider value={[value]} min={min} max={max} step={step} onValueChange={on} />
    </div>
  )
}

function Out({ label, value, accent }: { label: string; value: string; accent?: boolean }) {
  return (
    <div>
      <div className="text-[10px] font-mono uppercase tracking-[0.25em] text-white/45">{label}</div>
      <div
        className="font-display font-semibold tabular-nums mt-1"
        style={{
          fontSize: 'clamp(1.4rem, 2vw, 2rem)',
          color: accent ? ACCENT_BRIGHT : '#fff',
        }}
      >
        {value}
      </div>
    </div>
  )
}
