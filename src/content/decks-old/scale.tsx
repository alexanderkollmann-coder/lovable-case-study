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
import { TrendingUp } from 'lucide-react'

const ACCENT = '#6ee7b7'
const BG = 'radial-gradient(ellipse at 50% 0%, #0a4634 0%, #07120e 65%)'

export const deck: Deck = [
  {
    id: 'cover',
    render: () => (
      <SlideShell bg={BG}>
        <GridBg accent={ACCENT} />
        <CornerNum n={1} total={2} accent={ACCENT} />
        <div className="flex-1 flex flex-col justify-center max-w-5xl">
          <Eyebrow color={ACCENT}>Booth 07 · Scale</Eyebrow>
          <div className="mt-4 mb-8">
            <BigTitle>The <span style={{ color: ACCENT }}>blueprint</span>.</BigTitle>
          </div>
          <p className="text-white/65 text-lg max-w-3xl">
            Next 20 European enterprises. €40M ARR target. 18 months.
          </p>
        </div>
      </SlideShell>
    ),
  },
  {
    id: 'roadmap',
    render: () => (
      <SlideShell bg={BG}>
        <GridBg accent={ACCENT} />
        <CornerNum n={2} total={2} accent={ACCENT} />
        <Eyebrow color={ACCENT}>Six-quarter roadmap</Eyebrow>
        <div className="mt-3 mb-10">
          <BigTitle>From one logo to a sector.</BigTitle>
        </div>
        <div className="grid grid-cols-3 gap-4">
          {[
            { q: 'Q1–Q2', t: 'Insurance', l: ['Allianz Partners', 'AXA', 'Aviva'], n: 3, arr: '€4M' },
            { q: 'Q3–Q4', t: 'Banking', l: ['BNP Paribas', 'ING', 'Santander', 'Nordea'], n: 4, arr: '€8M' },
            { q: 'Q5–Q6', t: 'Logistics + Retail', l: ['Maersk', 'DHL', 'L\'Oréal', 'Carrefour', '+ 9 more'], n: 13, arr: '€28M' },
          ].map((s) => (
            <Card key={s.q} accent={ACCENT}>
              <div className="flex items-center justify-between">
                <div className="font-mono text-xs" style={{ color: ACCENT }}>{s.q}</div>
                <TrendingUp className="w-4 h-4" style={{ color: ACCENT }} />
              </div>
              <div className="text-xl font-semibold text-white mt-2">{s.t}</div>
              <ul className="mt-4 space-y-1.5 text-sm text-white/70">
                {s.l.map(x => <li key={x} className="flex gap-2"><span style={{ color: ACCENT }}>·</span>{x}</li>)}
              </ul>
              <div className="mt-5 pt-4 border-t border-white/10 flex justify-between items-baseline">
                <div>
                  <div className="font-display text-2xl font-bold text-white">{s.n}</div>
                  <div className="text-[10px] uppercase tracking-[0.22em] text-white/40">Anchors</div>
                </div>
                <div className="text-right">
                  <div className="font-display text-2xl font-bold" style={{ color: ACCENT }}>{s.arr}</div>
                  <div className="text-[10px] uppercase tracking-[0.22em] text-white/40">ARR target</div>
                </div>
              </div>
            </Card>
          ))}
        </div>
        <div className="mt-10 grid grid-cols-3 gap-6">
          <Stat value="20" label="Anchor accounts" accent={ACCENT} />
          <Stat value="€40M" label="ARR target" accent={ACCENT} />
          <Stat value="18 mo" label="Time horizon" accent={ACCENT} />
        </div>
      </SlideShell>
    ),
  },
]
