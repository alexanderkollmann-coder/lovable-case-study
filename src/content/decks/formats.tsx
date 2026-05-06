import {
  SlideShell,
  Eyebrow,
  BigTitle,
  GridBg,
  CornerNum,
} from './_layouts'
import type { Deck } from './types'

// NB: file id is "formats" (kept for routing) but content = Stakeholders booth.
const ACCENT = '#ff7596'
const BG = 'radial-gradient(ellipse at 0% 100%, #4a1830 0%, #0a0d1a 65%)'

const STAGES = ['T-30 Scoping', 'Day 0–2 Hackathon', 'Day 15 PoC', 'Day 30 Contract', 'Day 30+ Expansion'] as const

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
  { team: 'Producer',          range: [0, 3], note: 'Owns the program end-to-end' },
  { team: 'Marketing',         range: [0, 1], note: 'Owns the experience' },
  { team: 'AE',                range: [0, 3], note: 'Owns the commercial' },
  { team: 'Solutions Engineer',range: [0, 3], note: 'Owns the technical' },
  { team: 'FDE',               range: [3, 4], note: 'Owns production' },
  { team: 'Product',           range: [0, 1], note: 'Feeds learnings back' },
  { team: 'CEO',               stages: [1, 3, 4], note: 'Anchors the moments that matter' },
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
          <BigTitle>Who shows up, and when.</BigTitle>
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
                <div className="p-3 border-b border-white/5 text-sm text-white/85 flex flex-col justify-center">
                  <span>{row.team}</span>
                  <span className="text-[10px] text-white/40 mt-0.5">{row.note}</span>
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
  {
    id: 'memory-environment',
    render: () => (
      <SlideShell bg={BG}>
        <GridBg accent={ACCENT} />
        <CornerNum n={2} total={2} accent={ACCENT} />
        <Eyebrow color={ACCENT}>Why the experience matters · Marketing's role</Eyebrow>
        <div className="mt-3 mb-10">
          <BigTitle>Memory is a function of <span style={{ color: ACCENT }}>environment</span>.</BigTitle>
        </div>

        <div className="flex-1 flex flex-col justify-center max-w-5xl">
          <blockquote
            className="font-display leading-[1.15] text-balance text-white/95"
            style={{ fontSize: 'clamp(1.4rem, 2.4vw, 2.4rem)' }}
          >
            <span style={{ color: ACCENT }}>"</span>
            A core memory is built not just from what you do, but where you do it. A
            basketball game is memorable because of the music, the crowd, the venue —
            the environment amplifies the event.
            <span style={{ color: ACCENT }}>"</span>
          </blockquote>

          <div className="grid grid-cols-3 gap-6 mt-12">
            {[
              { t: 'Venue', d: 'London office as the flagship; bespoke spaces for Tier 1 anchors.' },
              { t: 'Atmosphere', d: 'Curated music, lighting, energy — a moment, not a meeting.' },
              { t: 'Ritual', d: 'Demo dinner with execs, judging ceremony, MOU signed as the culminating gesture.' },
            ].map((c) => (
              <div key={c.t}>
                <div className="text-xs font-mono uppercase tracking-[0.28em]" style={{ color: ACCENT }}>{c.t}</div>
                <div className="text-sm text-white/75 mt-3 leading-relaxed">{c.d}</div>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-6 pt-4 border-t border-white/10 text-xs text-white/55 italic">
          Customers don't sign contracts because of features. They sign them because of conviction. Conviction is built in environments people remember.
        </div>
      </SlideShell>
    ),
  },
]
