import {
  SlideShell,
  Eyebrow,
  BigTitle,
  Card,
  GridBg,
  CornerNum,
} from './_layouts'
import type { Deck } from './types'
import { Quote } from 'lucide-react'

const ACCENT = '#5e88ff'
const BG = 'radial-gradient(ellipse at 20% 0%, #1a2546 0%, #0a0d1a 65%)'

export const deck: Deck = [
  {
    id: 'cover',
    kicker: 'Value Proposition',
    render: () => (
      <SlideShell bg={BG}>
        <GridBg accent={ACCENT} />
        <CornerNum n={1} total={2} accent={ACCENT} />
        <div className="flex-1 flex flex-col justify-center items-center text-center max-w-6xl mx-auto">
          <Eyebrow color={ACCENT}>Booth 01 · Value Proposition</Eyebrow>
          <h1
            className="font-display font-semibold leading-[0.95] tracking-tight mt-8"
            style={{ fontSize: 'clamp(3rem, 8vw, 8rem)' }}
          >
            Seeing is <span style={{ color: ACCENT }}>believing</span>.
          </h1>
          <p className="mt-10 text-white/65 text-2xl max-w-3xl leading-relaxed">
            Hackathons are the antidote to AI demo theatre.
          </p>
        </div>
      </SlideShell>
    ),
  },
  {
    id: 'killer-line',
    render: () => (
      <SlideShell bg={BG}>
        <GridBg accent={ACCENT} />
        <CornerNum n={2} total={2} accent={ACCENT} />
        <Eyebrow color={ACCENT}>The thesis, in one sentence</Eyebrow>
        <div className="mt-6 mb-10 max-w-6xl">
          <h1
            className="font-display font-semibold leading-[1.05] tracking-tight text-balance"
            style={{ fontSize: 'clamp(1.6rem, 2.6vw, 2.6rem)' }}
          >
            In one day, your PMs ship the internal tool that's been sitting in
            your engineering backlog for{' '}
            <span style={{ color: ACCENT }}>six months</span>{' '}
            — and after that, you'll never approve that backlog the same way
            again.
          </h1>
        </div>
        <div className="grid grid-cols-3 gap-4 mt-auto">
          <Card accent={ACCENT}>
            <div className="text-[10px] font-mono uppercase tracking-[0.25em] text-white/45">Cognizant · Synapse 2024</div>
            <div className="font-display text-3xl font-semibold text-white mt-3 leading-tight">
              53,199 builders
            </div>
            <div className="text-sm mt-1" style={{ color: ACCENT }}>30,601 prototypes shipped</div>
            <div className="text-xs text-white/55 mt-3 leading-relaxed">
              Guinness World Record for largest AI hackathon. Proof the motion scales beyond a single team.
            </div>
          </Card>
          <Card accent={ACCENT}>
            <div className="text-[10px] font-mono uppercase tracking-[0.25em] text-white/45">Anton Osika · McKinsey</div>
            <div className="mt-3 text-white/85 italic leading-relaxed text-sm">
              <Quote className="w-4 h-4 inline mr-1.5 -mt-1" style={{ color: ACCENT }} />
              "McKinsey engineers shipped in hours what their internal queue priced at four to six months."
            </div>
            <div className="text-xs text-white/45 mt-3">Field interview, 2025</div>
          </Card>
          <Card accent={ACCENT}>
            <div className="text-[10px] font-mono uppercase tracking-[0.25em] text-white/45">Lovable ERP customer</div>
            <div className="font-display text-2xl font-semibold text-white mt-3 leading-tight">
              4 weeks · 20 ppl
              <div className="text-white/40 text-base font-normal my-1">→</div>
              <span style={{ color: ACCENT }}>4 days · 4 ppl</span>
            </div>
            <div className="text-xs text-white/55 mt-3 leading-relaxed">
              95% effort reduction on a production ERP module. Same scope, same acceptance criteria.
            </div>
          </Card>
        </div>
        <div className="mt-8 pt-5 border-t border-white/10 flex items-center justify-between text-[10px] font-mono uppercase tracking-[0.25em] text-white/45">
          <span>Internal name · <span className="text-white/70">Embedded Build Motion</span></span>
          <span>External brand · <span style={{ color: ACCENT }}>Lovable Studios</span></span>
        </div>
      </SlideShell>
    ),
  },
]
