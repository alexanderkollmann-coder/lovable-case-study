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
import { Sparkles, ArrowRight, Eye } from 'lucide-react'

const ACCENT = '#5e88ff'
const BG = 'radial-gradient(ellipse at 20% 0%, #1a2546 0%, #0a0d1a 65%)'

export const deck: Deck = [
  {
    id: 'cover',
    kicker: 'Value Proposition',
    render: () => (
      <SlideShell bg={BG}>
        <GridBg accent={ACCENT} />
        <CornerNum n={1} total={4} accent={ACCENT} />
        <div className="flex-1 flex flex-col justify-center max-w-5xl">
          <Eyebrow color={ACCENT}>Booth 01 · Why Hackathons</Eyebrow>
          <div className="mt-4 mb-8">
            <BigTitle>
              Seeing is <span style={{ color: ACCENT }}>believing</span>.
            </BigTitle>
          </div>
          <Lede>
            AI demo theatre is everywhere. Hackathons are the antidote — the only
            pre-sales motion that survives a market drowning in synthetic content.
          </Lede>
        </div>
        <div className="flex items-center gap-3 text-white/50 text-xs font-mono uppercase tracking-[0.28em]">
          <Sparkles className="w-4 h-4" style={{ color: ACCENT }} />
          The thesis · 4 slides
        </div>
      </SlideShell>
    ),
  },
  {
    id: 'thesis',
    render: () => (
      <SlideShell bg={BG}>
        <GridBg accent={ACCENT} />
        <CornerNum n={2} total={4} accent={ACCENT} />
        <Eyebrow color={ACCENT}>The thesis</Eyebrow>
        <div className="mt-3 mb-10">
          <BigTitle>The signal-to-noise ratio is collapsing.</BigTitle>
        </div>
        <div className="grid grid-cols-3 gap-6 mt-auto mb-6">
          <Stat value="6 mo+" label="Avg enterprise AI cycle" accent={ACCENT} />
          <Stat value="1 day" label="Hackathon to MOU" accent={ACCENT} />
          <Stat value="20–40" label="Net-new advocates per event" accent={ACCENT} />
        </div>
        <Lede>
          You can fake a demo video. You cannot fake a room of 40 of the customer's
          own people shipping working software in eight hours.
        </Lede>
      </SlideShell>
    ),
  },
  {
    id: 'compare',
    render: () => (
      <SlideShell bg={BG}>
        <GridBg accent={ACCENT} />
        <CornerNum n={3} total={4} accent={ACCENT} />
        <Eyebrow color={ACCENT}>Old motion vs. new motion</Eyebrow>
        <div className="mt-3 mb-10">
          <BigTitle>Conviction lives in working code.</BigTitle>
        </div>
        <div className="grid grid-cols-2 gap-6">
          {[
            ['Vendor demo, 60 min', 'Customer build, 8 hrs'],
            ['One champion converts', '40 cross-functional advocates'],
            ['Slide-deep belief', 'Ship-deep belief'],
            ['6+ month cycle', 'Same-day MOU, 30-day POC'],
          ].map(([before, after]) => (
            <div key={before} className="contents">
              <Card>
                <div className="text-[10px] font-mono uppercase tracking-[0.3em] text-white/40 mb-2">Before</div>
                <div className="text-base text-white/70 line-through decoration-white/20">{before}</div>
              </Card>
              <Card accent={ACCENT}>
                <div className="text-[10px] font-mono uppercase tracking-[0.3em] mb-2" style={{ color: ACCENT }}>After</div>
                <div className="text-base text-white font-medium flex items-center gap-2">
                  <ArrowRight className="w-4 h-4" style={{ color: ACCENT }} /> {after}
                </div>
              </Card>
            </div>
          ))}
        </div>
      </SlideShell>
    ),
  },
  {
    id: 'cta',
    render: () => (
      <SlideShell bg={BG}>
        <GridBg accent={ACCENT} />
        <CornerNum n={4} total={4} accent={ACCENT} />
        <div className="flex-1 flex flex-col justify-center items-start max-w-4xl">
          <Eye className="w-10 h-10 mb-6" style={{ color: ACCENT }} />
          <BigTitle>
            Are you ready <br /> to <span style={{ color: ACCENT }}>believe?</span>
          </BigTitle>
          <Lede>
            Everything that follows is the operating system for the only GTM artifact
            that converts AI-saturated skepticism into pipeline at scale.
          </Lede>
        </div>
      </SlideShell>
    ),
  },
]
