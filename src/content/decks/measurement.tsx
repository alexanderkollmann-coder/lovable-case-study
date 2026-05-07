import { useState } from 'react'
import { SlideShell, BigTitle, GridBg } from './_layouts'
import type { Deck } from './types'

const ACCENT = '#0f9b6c'
const ACCENT_BRIGHT = '#34d399'
const BG = 'radial-gradient(ellipse at 100% 100%, #0c3a2a 0%, #07120e 65%)'

type Metric = { title: string; body: string }
type Section = {
  kicker: string
  question: string
  backTitle: string
  metrics: Metric[]
}

const SECTIONS: Section[] = [
  {
    kicker: 'Leading',
    question: 'Indicators measured during the event window.',
    backTitle: 'Indicators measured during the event window.',
    metrics: [
      { title: 'Hackathon-to-PoC', body: 'Conversion from event to pilot.' },
      { title: 'Named champions per account', body: 'IC + VP combination.' },
      { title: 'Prototype-to-PoC', body: 'How many demos result in pilots.' },
    ],
  },
  {
    kicker: 'Lagging',
    question: 'Indicators that influence the P&L.',
    backTitle: 'Indicators that influence the P&L.',
    metrics: [
      { title: 'PoC-to-Contract conversion', body: 'Pilots that turn into signed deals.' },
      { title: 'Hackathon-sourced ARR', body: 'Net new ARR attributed to the program.' },
      { title: 'NDR uplift on touched accounts', body: 'Expansion lift vs. matched control cohort.' },
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
          style={{ backfaceVisibility: 'hidden', borderColor: `${ACCENT}33` }}
        >
          <div
            className="text-sm font-mono uppercase tracking-[0.28em]"
            style={{ color: ACCENT_BRIGHT }}
          >
            {section.kicker}
          </div>
          <div className="font-display text-2xl font-semibold text-white leading-snug">
            {section.question}
          </div>
          <div className="text-[10px] font-mono uppercase tracking-[0.22em] text-white/40">
            Tap to reveal →
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
            className="text-sm font-mono uppercase tracking-[0.28em]"
            style={{ color: ACCENT_BRIGHT }}
          >
            {section.kicker}
          </div>
          <div className="font-display text-lg font-semibold text-white mt-1 leading-snug">
            {section.backTitle}
          </div>
          <ul className="mt-5 space-y-4 flex-1">
            {section.metrics.map((m) => (
              <li key={m.title}>
                <div className="text-sm font-semibold text-white">{m.title}</div>
                <div className="text-xs text-white/65 leading-relaxed mt-0.5">
                  {m.body}
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
    id: 'metrics',
    render: () => (
      <SlideShell bg={BG}>
        <GridBg accent={ACCENT} />
        <div className="max-w-5xl">
          <BigTitle>
            How do we <span style={{ color: ACCENT_BRIGHT }}>measure success</span>?
          </BigTitle>
        </div>
        <div className="mt-10" />

        <div className="flex-1 grid grid-cols-2 gap-6 min-h-0">
          {SECTIONS.map((s) => (
            <FlipCard key={s.kicker} section={s} />
          ))}
        </div>

        <div className="mt-8 pt-4 border-t border-white/10 text-xs text-white/55 italic">
          NPS and VoC tracked operationally to refine format quality.
        </div>
      </SlideShell>
    ),
  },
]
