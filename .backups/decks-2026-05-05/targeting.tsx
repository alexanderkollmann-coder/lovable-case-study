import {
  SlideShell,
  Eyebrow,
  BigTitle,
  Lede,
  Stat,
  Card,
  GridBg,
  CornerNum,
} from './_layouts'
import type { Deck } from './types'
import { Target, Crosshair } from 'lucide-react'

const ACCENT = '#7aa1ff'
const BG = 'radial-gradient(ellipse at 80% 0%, #1c2c54 0%, #0a0d1a 65%)'

export const deck: Deck = [
  {
    id: 'cover',
    kicker: 'Targeting',
    render: () => (
      <SlideShell bg={BG}>
        <GridBg accent={ACCENT} />
        <CornerNum n={1} total={3} accent={ACCENT} />
        <div className="flex-1 flex flex-col justify-center max-w-5xl">
          <Eyebrow color={ACCENT}>Booth 02 · Targeting</Eyebrow>
          <div className="mt-4 mb-8">
            <BigTitle>
              How we got to <span style={{ color: ACCENT }}>Allianz Partners</span>.
            </BigTitle>
          </div>
          <Lede>
            A reproducible scoring rubric for picking the next 20 European
            enterprises — engineered for velocity and reference compounding.
          </Lede>
        </div>
      </SlideShell>
    ),
  },
  {
    id: 'rubric',
    render: () => (
      <SlideShell bg={BG}>
        <GridBg accent={ACCENT} />
        <CornerNum n={2} total={3} accent={ACCENT} />
        <Eyebrow color={ACCENT}>Account scoring rubric</Eyebrow>
        <div className="mt-3 mb-10">
          <BigTitle>Five signals. One target list.</BigTitle>
        </div>
        <div className="grid grid-cols-5 gap-4">
          {[
            { n: '01', label: 'AI mandate live', sub: 'Board-level, funded' },
            { n: '02', label: 'Regulated complexity', sub: 'Hard to enter = hard to displace' },
            { n: '03', label: 'Sector reference', sub: 'One logo unlocks 5' },
            { n: '04', label: 'Active vendor spend', sub: '"From whom?" not "if?"' },
            { n: '05', label: 'Internal champion', sub: 'A name, not a function' },
          ].map((s) => (
            <Card key={s.n} accent={ACCENT}>
              <div className="font-mono text-xs tracking-[0.2em]" style={{ color: ACCENT }}>{s.n}</div>
              <div className="text-base text-white font-medium mt-3">{s.label}</div>
              <div className="text-xs text-white/55 mt-1">{s.sub}</div>
            </Card>
          ))}
        </div>
        <div className="mt-10 grid grid-cols-3 gap-6">
          <Stat value="€10B+" label="Allianz Partners revenue" accent={ACCENT} />
          <Stat value="70+" label="Countries of operation" accent={ACCENT} />
          <Stat value="5/5" label="Rubric score" accent={ACCENT} />
        </div>
      </SlideShell>
    ),
  },
  {
    id: 'flywheel',
    render: () => (
      <SlideShell bg={BG}>
        <GridBg accent={ACCENT} />
        <CornerNum n={3} total={3} accent={ACCENT} />
        <Eyebrow color={ACCENT}>Reference flywheel</Eyebrow>
        <div className="mt-3 mb-10">
          <BigTitle>One logo becomes a sector beachhead.</BigTitle>
        </div>
        <div className="flex items-center gap-3 flex-wrap">
          <Card accent={ACCENT} className="px-6 py-4">
            <Target className="w-5 h-5 mb-2" style={{ color: ACCENT }} />
            <div className="text-lg font-semibold text-white">Allianz Partners</div>
            <div className="text-xs text-white/50">Anchor</div>
          </Card>
          <Crosshair className="w-6 h-6 text-white/40" />
          {['AXA', 'Aviva', 'RSA', 'Direct Line', 'Hiscox'].map((name) => (
            <Card key={name} className="px-5 py-4">
              <div className="text-base text-white/85">{name}</div>
              <div className="text-[10px] uppercase tracking-[0.2em] text-white/40 mt-1">Pattern-match unlock</div>
            </Card>
          ))}
        </div>
      </SlideShell>
    ),
  },
]
