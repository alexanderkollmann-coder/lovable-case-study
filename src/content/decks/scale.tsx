import {
  SlideShell,
  Eyebrow,
  BigTitle,
  GridBg,
  CornerNum,
} from './_layouts'
import type { Deck } from './types'

const ACCENT = '#6ee7b7'
const BG = 'radial-gradient(ellipse at 50% 0%, #0a4634 0%, #07120e 65%)'

const COLUMNS: { kicker: string; question: string; bullets: React.ReactNode[] }[] = [
  {
    kicker: 'Validation',
    question: 'How do we know the format works?',
    bullets: [
      <>Run up to <span className="text-white">5 hackathons in 2 months</span> before defining the playbook.</>,
      <>Validate against <span className="text-white">PoC conversion, time-to-contract, NDR uplift</span>.</>,
      <>Refine the variables that matter: duration, pre-scoping depth, in-person resources, executive involvement.</>,
    ],
  },
  {
    kicker: 'Compounding',
    question: 'What gets cheaper as we run more?',
    bullets: [
      <><span className="text-white">Applications Library</span> — every hackathon produces templates future events start from (8-hour build → 2-hour build).</>,
      <><span className="text-white">Champion network</span> — graduates become references and judges for future events.</>,
      <><span className="text-white">Procurement assets</span> — DPA, SOC 2 Type II, ISO 27001, EU AI Act assessment, pen-test reports clear faster each time. First telco: 75 days. Fifth: 30.</>,
    ],
  },
  {
    kicker: 'Down-market',
    question: 'What format do we use as we expand?',
    bullets: [
      <><span className="text-white">Anchor</span> optimizes for €1M+ contracts — not the right format for mid-market or SMB.</>,
      <><span className="text-white">Mid-market: Peer cohorts</span> — sector-themed, lower per-account CAC.</>,
      <><span className="text-white">SMB & ecosystem: Community</span> — brand and downstream pipeline, not direct sales.</>,
    ],
  },
]

export const deck: Deck = [
  {
    id: 'questions',
    render: () => (
      <SlideShell bg={BG}>
        <GridBg accent={ACCENT} />
        <CornerNum n={1} total={1} accent={ACCENT} />
        <Eyebrow color={ACCENT}>Booth 07 · Scale</Eyebrow>
        <div className="mt-3">
          <BigTitle>Scale.</BigTitle>
        </div>
        <div className="mt-3 mb-8 text-lg text-white/65">
          Three questions before we run the next twenty.
        </div>

        <div className="flex-1 grid grid-cols-3 gap-0 min-h-0 relative">
          {/* dividers */}
          <div className="absolute top-0 bottom-0 left-1/3 w-px bg-white/10" />
          <div className="absolute top-0 bottom-0 left-2/3 w-px bg-white/10" />

          {COLUMNS.map((col, i) => (
            <div
              key={col.kicker}
              className={`flex flex-col ${i === 0 ? 'pr-6' : i === 1 ? 'px-6' : 'pl-6'}`}
            >
              <div
                className="text-[10px] font-mono uppercase tracking-[0.28em]"
                style={{ color: ACCENT }}
              >
                {col.kicker}
              </div>
              <div className="font-display text-xl font-semibold text-white mt-2 leading-snug">
                {col.question}
              </div>
              <ul className="mt-5 space-y-3 text-sm text-white/65 leading-relaxed">
                {col.bullets.map((b, bi) => (
                  <li key={bi} className="flex gap-2">
                    <span style={{ color: ACCENT }} className="shrink-0">▸</span>
                    <span>{b}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </SlideShell>
    ),
  },
]
