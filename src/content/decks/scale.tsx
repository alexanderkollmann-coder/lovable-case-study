import { useState } from 'react'
import {
  SlideShell,
  BigTitle,
  GridBg,
} from './_layouts'
import type { Deck } from './types'

const ACCENT = '#6ee7b7'
const BG = 'radial-gradient(ellipse at 50% 0%, #0a4634 0%, #07120e 65%)'

type Point = { title: string; body: string }
type Section = {
  kicker: string
  question: string
  backTitle: string
  points: Point[]
}

const SECTIONS: Section[] = [
  {
    kicker: 'Format',
    question: 'How do we know the format works?',
    backTitle: 'Validate before we scale.',
    points: [
      { title: 'Run 5 in 2 months', body: 'Pilot the format before locking the playbook.' },
      { title: 'Track what matters', body: 'PoC conversion, time-to-contract, NDR uplift.' },
      { title: 'Tune the variables', body: 'Duration, pre-scoping, FDE load, exec involvement.' },
    ],
  },
  {
    kicker: 'Compounding',
    question: 'What gets cheaper as we run more?',
    backTitle: 'Each event lowers the next one\u2019s cost.',
    points: [
      { title: 'Applications Library', body: 'Reusable templates: 8-hour build \u2192 2-hour build.' },
      { title: 'Champion network', body: 'Graduates return as references and judges.' },
      { title: 'Procurement assets', body: 'First telco contract: 75 days. Fifth: 30.' },
    ],
  },
  {
    kicker: 'Down-market',
    question: 'What format do we use as we expand?',
    backTitle: 'Right format for each tier.',
    points: [
      { title: 'Anchor \u2014 Enterprise', body: 'Optimized for \u20AC1M+ contracts.' },
      { title: 'Peer \u2014 Mid-market', body: 'Sector cohorts, lower per-account CAC.' },
      { title: 'Community \u2014 SMB', body: 'Brand reach and downstream pipeline.' },
    ],
  },
]

function FlipCard({ section }: { section: Section }) {
  const [flipped, setFlipped] = useState(false)
  return (
    <button
      onClick={() => setFlipped((f) => !f)}
      className="group relative h-full w-full text-left"
      style={{ perspective: '1200px' }}
    >
      <div
        className="relative h-full w-full transition-transform duration-700"
        style={{
          transformStyle: 'preserve-3d',
          transform: flipped ? 'rotateY(180deg)' : 'rotateY(0deg)',
        }}
      >
        {/* Front */}
        <div
          className="absolute inset-0 rounded-2xl border bg-white/[0.03] backdrop-blur-sm p-7 flex flex-col justify-between hover:bg-white/[0.05] transition-colors"
          style={{
            backfaceVisibility: 'hidden',
            borderColor: `${ACCENT}33`,
          }}
        >
          <div
            className="text-[10px] font-mono uppercase tracking-[0.28em]"
            style={{ color: ACCENT }}
          >
            {section.kicker}
          </div>
          <div className="font-display text-2xl font-semibold text-white leading-snug">
            {section.question}
          </div>
          <div className="text-[10px] font-mono uppercase tracking-[0.22em] text-white/40">
            Tap to reveal \u2192
          </div>
        </div>

        {/* Back */}
        <div
          className="absolute inset-0 rounded-2xl border p-7 flex flex-col"
          style={{
            backfaceVisibility: 'hidden',
            transform: 'rotateY(180deg)',
            borderColor: `${ACCENT}55`,
            background: `linear-gradient(160deg, ${ACCENT}14, rgba(255,255,255,0.02))`,
          }}
        >
          <div
            className="text-[10px] font-mono uppercase tracking-[0.28em]"
            style={{ color: ACCENT }}
          >
            {section.kicker}
          </div>
          <div className="font-display text-lg font-semibold text-white mt-1 leading-snug">
            {section.backTitle}
          </div>
          <ul className="mt-5 space-y-4 flex-1">
            {section.points.map((p) => (
              <li key={p.title}>
                <div className="text-sm font-semibold text-white">{p.title}</div>
                <div className="text-xs text-white/65 leading-relaxed mt-0.5">
                  {p.body}
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </button>
  )
}

export const deck: Deck = [
  {
    id: 'questions',
    render: () => (
      <SlideShell bg={BG}>
        <GridBg accent={ACCENT} />
        <div className="max-w-5xl">
          <BigTitle>Scaling the <span style={{ color: ACCENT }}>hackathon motion</span>.</BigTitle>
        </div>
        <div className="mt-4 mb-10 text-lg text-white/65">
          Three questions before we run the next twenty.
        </div>

        <div className="flex-1 grid grid-cols-3 gap-6 min-h-0">
          {SECTIONS.map((s) => (
            <FlipCard key={s.kicker} section={s} />
          ))}
        </div>
      </SlideShell>
    ),
  },
]
