import {
  SlideShell,
  Eyebrow,
  BigTitle,
  GridBg,
  CornerNum,
} from './_layouts'
import type { Deck } from './types'

// NB: file id is "formats" (kept for routing) but content = Stakeholders booth.
const ACCENT = '#5e88ff'
const BG = 'radial-gradient(ellipse at 50% 0%, #1a2546 0%, #0a0d1a 65%)'

const STAGES = ['T-30 Scoping', 'Day 0–2 Hackathon', 'Day 15 PoC', 'Day 30 Contract', 'Day 90+ Expansion'] as const

type StageIdx = 0 | 1 | 2 | 3 | 4

interface Participation {
  team: string
  // contiguous range [start, end] inclusive
  range?: [StageIdx, StageIdx]
  // or a discrete set of stages
  stages?: StageIdx[]
  note: string
}

const ROWS: Participation[] = [
  { team: 'Producer',   range: [0, 3], note: '' },
  { team: 'Marketing',  range: [0, 1], note: '' },
  { team: 'AE / SE',    range: [0, 3], note: '' },
  { team: 'DS / FDE',   range: [3, 4], note: '' },
  { team: 'Product',    range: [0, 1], note: '' },
  { team: 'CEO',        stages: [1, 3, 4], note: '' },
]

function isActive(p: Participation, i: number): boolean {
  if (p.range) return i >= p.range[0] && i <= p.range[1]
  if (p.stages) return p.stages.includes(i as StageIdx)
  return false
}

export const deck: Deck = [
  {
    id: 'cross-functional',
    render: () => (
      <SlideShell bg={BG}>
        <GridBg accent={ACCENT} />
        <CornerNum n={1} total={2} accent={ACCENT} />
        <Eyebrow color={ACCENT}>Booth 03 · Stakeholders · Cross-functional engagement</Eyebrow>
        <div className="mt-3 mb-6">
          <BigTitle>Who is involved, when.</BigTitle>
        </div>

        <div className="rounded-xl border border-white/10 overflow-hidden bg-white/[0.02]">
          <div className="grid" style={{ gridTemplateColumns: '1.4fr repeat(5, 1fr)' }}>
            <div className="p-3 text-[10px] font-mono uppercase tracking-[0.22em] text-white/40 border-b border-white/10">Team</div>
            {STAGES.map((s) => (
              <div key={s} className="p-3 text-center text-[10px] font-mono uppercase tracking-[0.18em] text-white/40 border-b border-white/10">
                {s}
              </div>
            ))}
            {ROWS.map((row) => (
              <div key={row.team} className="contents">
                <div className="p-3 border-b border-white/5 text-sm text-white/85 flex items-center">
                  {row.team}
                </div>
                {STAGES.map((_, i) => {
                  const active = isActive(row, i)
                  const prev = i > 0 && isActive(row, i - 1)
                  const next = i < STAGES.length - 1 && isActive(row, i + 1)
                  const isContiguous = !!row.range
                  return (
                    <div key={i} className="px-1 py-3 border-b border-white/5 flex items-center justify-center">
                      <div
                        className="h-3 w-full"
                        style={{
                          background: active ? ACCENT : 'rgba(255,255,255,0.04)',
                          borderTopLeftRadius: active && (!prev || !isContiguous) ? 999 : 0,
                          borderBottomLeftRadius: active && (!prev || !isContiguous) ? 999 : 0,
                          borderTopRightRadius: active && (!next || !isContiguous) ? 999 : 0,
                          borderBottomRightRadius: active && (!next || !isContiguous) ? 999 : 0,
                          boxShadow: active ? `0 0 12px ${ACCENT}66` : undefined,
                        }}
                      />
                    </div>
                  )
                })}
              </div>
            ))}
          </div>
        </div>

        <div className="mt-5 pt-4 border-t border-white/10 text-xs text-white/55 leading-relaxed">
          Marketing owns the experience · AE owns the commercial · SE owns the technical · FDE owns production. <span className="text-white/85">Producer owns the program.</span>
        </div>
      </SlideShell>
    ),
  },
]
