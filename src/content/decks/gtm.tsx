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

const ACCENT = '#34d399'
const BG = 'radial-gradient(ellipse at 0% 0%, #0e3a2c 0%, #07120e 65%)'

const STAGES = [
  { d: 'Day 0', n: 'Hackathon', p: '€25K', o: 'MOU at demo dinner', conv: '80%' },
  { d: 'Day 30', n: 'Paid PoC', p: '€50–100K', o: 'Production-grade prototype', conv: '70%' },
  { d: 'Day 90', n: 'SoW', p: '€250K', o: 'Scoped deployment', conv: '60–90%' },
  { d: 'Day 180', n: 'Contract', p: '€500K – €2M ARR', o: 'Multi-year · NDR plan', conv: '—' },
]

const GATES = [
  { gate: 'DPA', save: '30–45d', answer: 'Pre-staged at MOU' },
  { gate: 'Model training opt-out', save: '15–30d', answer: 'Public statement, slide 2 of procurement pack' },
  { gate: 'Security review', save: '45–60d', answer: 'SOC 2 Type II + ISO 27001:2022 + Aikido pen-test reports' },
  { gate: 'EU AI Act classification', save: '30–60d', answer: 'Already classified Low Risk' },
  { gate: 'Champion turnover', save: 'Risk', answer: '2-deep coverage from Day 1' },
]

export const deck: Deck = [
  {
    id: 'pipeline',
    render: () => (
      <SlideShell bg={BG}>
        <GridBg accent={ACCENT} />
        <CornerNum n={1} total={2} accent={ACCENT} />
        <Eyebrow color={ACCENT}>Booth 05 · GTM · The four-stage pipeline</Eyebrow>
        <div className="mt-3 mb-10">
          <BigTitle>Hackathon → <span style={{ color: ACCENT }}>Contract</span>.</BigTitle>
        </div>
        <div className="relative">
          <div className="absolute left-0 right-0 top-[44px] h-px bg-gradient-to-r from-transparent via-white/15 to-transparent" />
          <div className="grid grid-cols-4 gap-4 relative">
            {STAGES.map((s, i) => (
              <div key={s.n} className="flex flex-col items-stretch">
                <div className="flex items-center justify-center mb-3 relative" style={{ height: 32 }}>
                  <div
                    className="w-3 h-3 rounded-full"
                    style={{ background: ACCENT, boxShadow: `0 0 16px ${ACCENT}` }}
                  />
                  {i < STAGES.length - 1 && (
                    <ChevronRight
                      className="absolute -right-3 w-5 h-5"
                      style={{ color: ACCENT, opacity: 0.6 }}
                    />
                  )}
                </div>
                <Card accent={ACCENT}>
                  <div className="font-mono text-xs uppercase tracking-[0.25em]" style={{ color: ACCENT }}>{s.d}</div>
                  <div className="text-xl font-semibold text-white mt-3">{s.n}</div>
                  <div className="font-display text-2xl mt-3" style={{ color: ACCENT }}>{s.p}</div>
                  <div className="text-xs text-white/60 mt-3 leading-relaxed">{s.o}</div>
                  <div className="mt-4 pt-3 border-t border-white/10 flex justify-between items-baseline">
                    <span className="text-[10px] font-mono uppercase tracking-[0.22em] text-white/40">Conversion</span>
                    <span className="font-mono text-sm font-semibold text-white">{s.conv}</span>
                  </div>
                </Card>
              </div>
            ))}
          </div>
        </div>
        <div className="mt-auto pt-6 text-xs text-white/45 leading-relaxed">
          Sources · MOU-to-PoC: Lemkin / SaaStr enterprise SaaS benchmark · PoC-to-contract: best-in-class enterprise AI.
        </div>
      </SlideShell>
    ),
  },
  {
    id: 'procurement',
    render: () => (
      <SlideShell bg={BG}>
        <GridBg accent={ACCENT} />
        <CornerNum n={2} total={2} accent={ACCENT} />
        <Eyebrow color={ACCENT}>Why this converts</Eyebrow>
        <div className="mt-3 mb-8">
          <BigTitle>Procurement <span style={{ color: ACCENT }}>skipped</span>, not fought.</BigTitle>
        </div>
        <div className="rounded-xl border border-white/10 overflow-hidden bg-white/[0.02]">
          <div className="grid" style={{ gridTemplateColumns: '1.4fr 0.8fr 2fr' }}>
            {['Procurement gate', 'Time saved', "Lovable's pre-cleared answer"].map((h) => (
              <div key={h} className="p-4 text-[10px] font-mono uppercase tracking-[0.22em] text-white/40 border-b border-white/10">{h}</div>
            ))}
            {GATES.map((g) => (
              <div key={g.gate} className="contents">
                <div className="p-4 border-b border-white/5 text-sm text-white font-medium">{g.gate}</div>
                <div className="p-4 border-b border-white/5 font-mono text-sm" style={{ color: ACCENT }}>{g.save}</div>
                <div className="p-4 border-b border-white/5 text-sm text-white/75">{g.answer}</div>
              </div>
            ))}
          </div>
        </div>
        <div className="mt-8 text-sm text-white/70 max-w-4xl leading-relaxed">
          Four months of typical AI vendor security review collapses to{' '}
          <span className="text-white font-semibold">~14 days</span>{' '}
          because Lovable arrives with the answers, not the questions.
        </div>
      </SlideShell>
    ),
  },
]
