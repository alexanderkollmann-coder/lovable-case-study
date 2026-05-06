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

const TEAMS = [
  'Producer (me)',
  'Marketing',
  'AE',
  'Solutions Engineer',
  'Forward Deployed Engineer',
  'Data Scientist',
  'Product',
  'Founder (Anton)',
] as const

const STAGE_LABELS = ['T-30 Scoping', 'Day 0–2 Studios', 'Day 30 PoC', 'Day 90 Contract', 'Day 90+ Expansion']

// R / A / C / I encoded
type Rci = 'R' | 'A' | 'C' | 'I' | ''
const MATRIX: Record<typeof TEAMS[number], Rci[]> = {
  'Producer (me)':              ['A', 'A', 'C', 'C', 'I'],
  'Marketing':                  ['C', 'R', 'I', 'I', 'I'],
  'AE':                         ['R', 'C', 'A', 'A', 'A'],
  'Solutions Engineer':         ['C', 'R', 'A', 'C', 'C'],
  'Forward Deployed Engineer':  ['I', 'C', 'R', 'C', 'A'],
  'Data Scientist':             ['I', 'I', 'C', 'C', 'R'],
  'Product':                    ['C', 'C', 'I', 'I', 'C'],
  'Founder (Anton)':            ['I', 'C', 'I', 'I', 'I'],
}

const RCI_STYLE: Record<string, { bg: string; fg: string }> = {
  R: { bg: ACCENT,                        fg: '#0a0d1a' },
  A: { bg: `${ACCENT}80`,                 fg: '#fff' },
  C: { bg: `${ACCENT}33`,                 fg: '#fff' },
  I: { bg: 'rgba(255,255,255,0.06)',      fg: 'rgba(255,255,255,0.55)' },
  '': { bg: 'transparent',                fg: 'transparent' },
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
          <BigTitle>Who runs what, and when.</BigTitle>
        </div>

        <div className="rounded-xl border border-white/10 overflow-hidden bg-white/[0.02]">
          <div className="grid" style={{ gridTemplateColumns: '1.5fr repeat(5, 1fr)' }}>
            <div className="p-3 text-[10px] font-mono uppercase tracking-[0.22em] text-white/40 border-b border-white/10">Team</div>
            {STAGE_LABELS.map((s) => (
              <div key={s} className="p-3 text-center text-[10px] font-mono uppercase tracking-[0.18em] text-white/40 border-b border-white/10">
                {s}
              </div>
            ))}
            {TEAMS.map((team) => (
              <div key={team} className="contents">
                <div className="p-3 border-b border-white/5 text-sm text-white/85">{team}</div>
                {MATRIX[team].map((r, i) => (
                  <div key={i} className="p-2 border-b border-white/5 flex items-center justify-center">
                    <div
                      className="w-9 h-7 rounded flex items-center justify-center font-mono text-[11px] font-bold"
                      style={{ background: RCI_STYLE[r].bg, color: RCI_STYLE[r].fg }}
                    >
                      {r}
                    </div>
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>

        <div className="mt-5 flex items-center gap-4 text-[10px] font-mono uppercase tracking-[0.22em] text-white/55">
          {(['R', 'A', 'C', 'I'] as const).map((k) => (
            <div key={k} className="flex items-center gap-2">
              <div className="w-5 h-5 rounded flex items-center justify-center font-bold" style={{ background: RCI_STYLE[k].bg, color: RCI_STYLE[k].fg }}>{k}</div>
              <span>{ {R: 'Responsible', A: 'Accountable', C: 'Consulted', I: 'Informed'}[k] }</span>
            </div>
          ))}
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
