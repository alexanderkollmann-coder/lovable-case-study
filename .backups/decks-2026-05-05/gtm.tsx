import {
  SlideShell,
  Eyebrow,
  BigTitle,
  Stat,
  Card,
  GridBg,
  CornerNum,
} from './_layouts'
import type { Deck } from './types'
import { CheckCircle2 } from 'lucide-react'

const ACCENT = '#34d399'
const BG = 'radial-gradient(ellipse at 0% 0%, #0e3a2c 0%, #07120e 65%)'

export const deck: Deck = [
  {
    id: 'cover',
    render: () => (
      <SlideShell bg={BG}>
        <GridBg accent={ACCENT} />
        <CornerNum n={1} total={3} accent={ACCENT} />
        <div className="flex-1 flex flex-col justify-center max-w-5xl">
          <Eyebrow color={ACCENT}>Booth 05 · GTM Motion</Eyebrow>
          <div className="mt-4 mb-8">
            <BigTitle>Hackathon → <span style={{ color: ACCENT }}>Contract</span>.</BigTitle>
          </div>
          <p className="text-white/65 text-lg max-w-3xl">
            A four-stage pipeline that compresses enterprise sales from six months
            to ninety days.
          </p>
        </div>
      </SlideShell>
    ),
  },
  {
    id: 'pipeline',
    render: () => (
      <SlideShell bg={BG}>
        <GridBg accent={ACCENT} />
        <CornerNum n={2} total={3} accent={ACCENT} />
        <Eyebrow color={ACCENT}>The four-stage pipeline</Eyebrow>
        <div className="mt-3 mb-10">
          <BigTitle>Each stage has a price and a date.</BigTitle>
        </div>
        <div className="grid grid-cols-4 gap-4">
          {[
            { d: 'Day 0', n: 'Hackathon', p: '€25k', o: 'MOU signed in-room' },
            { d: 'Day 30', n: 'Paid POC', p: '€80k', o: 'Production-grade prototype' },
            { d: 'Day 90', n: 'SoW', p: '€250k', o: 'Scoped deployment' },
            { d: 'Day 180', n: 'Contract', p: '€1M+', o: 'Multi-year ARR' },
          ].map((s, i) => (
            <Card key={s.n} accent={ACCENT}>
              <div className="text-[10px] font-mono uppercase tracking-[0.25em]" style={{ color: ACCENT }}>{s.d}</div>
              <div className="text-xl font-semibold text-white mt-3">{s.n}</div>
              <div className="font-display text-2xl mt-3" style={{ color: ACCENT }}>{s.p}</div>
              <div className="text-xs text-white/55 mt-3 leading-relaxed">{s.o}</div>
              <div className="mt-4 h-0.5 rounded-full bg-white/5">
                <div className="h-full rounded-full" style={{ width: `${(i + 1) * 25}%`, background: ACCENT }} />
              </div>
            </Card>
          ))}
        </div>
      </SlideShell>
    ),
  },
  {
    id: 'why',
    render: () => (
      <SlideShell bg={BG}>
        <GridBg accent={ACCENT} />
        <CornerNum n={3} total={3} accent={ACCENT} />
        <Eyebrow color={ACCENT}>Why it converts</Eyebrow>
        <div className="mt-3 mb-10">
          <BigTitle>Procurement skipped, not fought.</BigTitle>
        </div>
        <div className="grid grid-cols-2 gap-6 max-w-4xl">
          {[
            'MOU template pre-cleared in MSA addendum at T-30',
            'POC paid from existing innovation budget — no new PO',
            'Customer owns the deploy URL from Day 0',
            '90% of advocates still active at Day 60',
          ].map((t) => (
            <div key={t} className="flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 mt-0.5 flex-shrink-0" style={{ color: ACCENT }} />
              <div className="text-base text-white/85">{t}</div>
            </div>
          ))}
        </div>
        <div className="mt-12 grid grid-cols-3 gap-6">
          <Stat value="63%" label="Hack → POC conversion" accent={ACCENT} />
          <Stat value="71%" label="POC → SoW conversion" accent={ACCENT} />
          <Stat value="3.4×" label="Seat expansion at 12 months" accent={ACCENT} />
        </div>
      </SlideShell>
    ),
  },
]
