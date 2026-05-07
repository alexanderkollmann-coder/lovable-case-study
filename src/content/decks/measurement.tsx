import {
  SlideShell,
  Eyebrow,
  BigTitle,
  Card,
  GridBg,
  CornerNum,
} from './_layouts'
import type { Deck } from './types'

const ACCENT = '#0f9b6c'
const ACCENT_BRIGHT = '#34d399'
const BG = 'radial-gradient(ellipse at 100% 100%, #0c3a2a 0%, #07120e 65%)'

const COHORT = [
  { q: 'Q1', pct: 12 },
  { q: 'Q2', pct: 28 },
  { q: 'Q3', pct: 46 },
  { q: 'Q4', pct: 62 },
]

export const deck: Deck = [
  {
    id: 'kpis',
    render: () => (
      <SlideShell bg={BG}>
        <GridBg accent={ACCENT} />
        <CornerNum n={1} total={2} accent={ACCENT} />
        <Eyebrow color={ACCENT}>Five north-star metrics</Eyebrow>
        <div className="mt-3 mb-10">
          <BigTitle>What we measure, and when.</BigTitle>
        </div>
        <div className="grid grid-cols-2 gap-6 flex-1">
          <Card accent={ACCENT}>
            <div className="text-[10px] font-mono uppercase tracking-[0.28em]" style={{ color: ACCENT_BRIGHT }}>Leading · Week 1</div>
            <div className="text-sm text-white/55 mt-1">Indicators we can act on inside the event window.</div>
            <div className="mt-6 space-y-4">
              <KpiRow label="MOU signed at demo dinner" value="80%" />
              <KpiRow label="MOU-to-PoC conversion" value="70%" />
              <KpiRow label="Hackathon NPS" value="65+" />
              <KpiRow label="Voice-of-customer (Day 7)" value="captured" />
              <KpiRow label="Named champions per account" value="≥ 2 (IC + VP)" />
            </div>
          </Card>
          <Card accent={ACCENT}>
            <div className="text-[10px] font-mono uppercase tracking-[0.28em]" style={{ color: ACCENT_BRIGHT }}>Lagging · 90+ days</div>
            <div className="text-sm text-white/55 mt-1">Outcomes that show up on the P&amp;L.</div>
            <div className="mt-6 space-y-4">
              <KpiRow label="Hackathon-sourced ARR" value="15–25% of pipeline" />
              <KpiRow label="PoC-to-contract" value="≥ 60%" />
              <KpiRow label="Time-to-contract (median)" value="90 days · stretch 60" />
              <KpiRow label="NDR uplift on touched accounts" value="130%+" />
            </div>
          </Card>
        </div>
        <div className="mt-6 pt-4 border-t border-white/10 text-xs text-white/55">
          Reported to <span className="text-white/85">Ryan, Kali, and Monica</span> monthly. Quarterly cohort review.
        </div>
      </SlideShell>
    ),
  },
  {
    id: 'cohort',
    render: () => (
      <SlideShell bg={BG}>
        <GridBg accent={ACCENT} />
        <CornerNum n={2} total={2} accent={ACCENT} />
        <Eyebrow color={ACCENT}>Cohort tracking</Eyebrow>
        <div className="mt-3 mb-8">
          <BigTitle>Each Studios is a tracked cohort.</BigTitle>
        </div>
        <div className="flex-1 flex flex-col">
          <div className="flex-1 flex items-end gap-8 px-12 pb-2 border-b border-white/15 relative">
            {/* y-axis ticks */}
            <div className="absolute -left-2 top-0 bottom-2 flex flex-col justify-between text-[10px] font-mono text-white/40">
              {[80, 60, 40, 20, 0].map((t) => (
                <div key={t} className="flex items-center gap-2">
                  <span>{t}%</span>
                  <div className="w-2 h-px bg-white/15" />
                </div>
              ))}
            </div>
            {COHORT.map((b) => (
              <div key={b.q} className="flex-1 flex flex-col items-center justify-end h-full">
                <div className="font-mono text-sm tabular-nums mb-2" style={{ color: ACCENT_BRIGHT }}>{b.pct}%</div>
                <div
                  className="w-full rounded-t-lg"
                  style={{
                    height: `${(b.pct / 80) * 100}%`,
                    background: `linear-gradient(180deg, ${ACCENT_BRIGHT}, ${ACCENT})`,
                    boxShadow: `0 0 24px ${ACCENT_BRIGHT}55`,
                  }}
                />
              </div>
            ))}
          </div>
          <div className="flex gap-8 px-12 pt-3">
            {COHORT.map((b) => (
              <div key={b.q} className="flex-1 text-center text-[11px] font-mono uppercase tracking-[0.22em] text-white/55">{b.q}</div>
            ))}
          </div>
          <div className="text-center text-[10px] font-mono uppercase tracking-[0.28em] text-white/40 mt-4">
            Cumulative cohort conversion to signed contract
          </div>
        </div>
        <div className="mt-6 pt-4 border-t border-white/10 text-xs text-white/55 italic">
          We measure not just whether the program works overall, but which cohorts are converting fastest and why.
        </div>
      </SlideShell>
    ),
  },
]

function KpiRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex justify-between items-baseline border-b border-white/5 pb-2">
      <span className="text-sm text-white/70">{label}</span>
      <span className="font-display text-lg font-semibold tabular-nums" style={{ color: ACCENT_BRIGHT }}>{value}</span>
    </div>
  )
}
