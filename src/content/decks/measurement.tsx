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

const ACCENT = '#0f9b6c'
const BG = 'radial-gradient(ellipse at 100% 100%, #0c3a2a 0%, #07120e 65%)'

export const deck: Deck = [
  {
    id: 'cover',
    render: () => (
      <SlideShell bg={BG}>
        <GridBg accent={ACCENT} />
        <CornerNum n={1} total={2} accent={ACCENT} />
        <div className="flex-1 flex flex-col justify-center max-w-5xl">
          <Eyebrow color={ACCENT}>Booth 06 · Measurement</Eyebrow>
          <div className="mt-4 mb-8">
            <BigTitle>How we know it's <span style={{ color: ACCENT }}>working</span>.</BigTitle>
          </div>
          <p className="text-white/65 text-lg max-w-3xl">
            Five north-star metrics, instrumented from Day Zero of every event.
          </p>
        </div>
      </SlideShell>
    ),
  },
  {
    id: 'kpis',
    render: () => (
      <SlideShell bg={BG}>
        <GridBg accent={ACCENT} />
        <CornerNum n={2} total={2} accent={ACCENT} />
        <Eyebrow color={ACCENT}>The five north-star metrics</Eyebrow>
        <div className="mt-3 mb-10">
          <BigTitle>Measured in-event, daily, monthly.</BigTitle>
        </div>
        <div className="grid grid-cols-5 gap-4">
          {[
            { v: '8/8', l: 'Apps shipped', s: 'Per event' },
            { v: '94%', l: 'Builders active', s: 'Day 7 retention' },
            { v: '3.4×', l: 'Seat expansion', s: '12-month NDR' },
            { v: '63%', l: 'Hack → POC', s: 'Conversion' },
            { v: '€1.5M', l: 'Avg ARR', s: 'Per anchor account' },
          ].map((s) => (
            <Card key={s.l} accent={ACCENT}>
              <Stat value={s.v} label={s.l} sub={s.s} accent={ACCENT} />
            </Card>
          ))}
        </div>
        <div className="mt-10">
          <Card>
            <Eyebrow color={ACCENT}>Cohort dashboard · Q1–Q4 2025</Eyebrow>
            <div className="mt-4 h-32 flex items-end gap-2">
              {[42, 58, 71, 63, 79, 88, 95, 91, 87, 96, 92, 100].map((h, i) => (
                <div key={i} className="flex-1 rounded-t" style={{
                  height: `${h}%`,
                  background: `linear-gradient(180deg, ${ACCENT}, ${ACCENT}66)`,
                }} />
              ))}
            </div>
            <div className="mt-3 flex justify-between text-[10px] font-mono text-white/40 tracking-wide">
              {['JAN','FEB','MAR','APR','MAY','JUN','JUL','AUG','SEP','OCT','NOV','DEC'].map(m => <span key={m}>{m}</span>)}
            </div>
          </Card>
        </div>
      </SlideShell>
    ),
  },
]
