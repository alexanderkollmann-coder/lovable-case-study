import {
  SlideShell,
  Eyebrow,
  BigTitle,
  Card,
  GridBg,
  CornerNum,
} from './_layouts'
import type { Deck } from './types'

const ACCENT = '#7aa1ff'
const BG = 'radial-gradient(ellipse at 80% 0%, #1c2c54 0%, #0a0d1a 65%)'

export const deck: Deck = [
  /* ---------------- Slide 3.1 — Three buckets ---------------- */
  {
    id: 'three-buckets',
    render: () => (
      <SlideShell bg={BG}>
        <GridBg accent={ACCENT} />
        <CornerNum n={1} total={3} accent={ACCENT} />
        <Eyebrow color={ACCENT}>The rubric</Eyebrow>
        <div className="mt-3 mb-8">
          <BigTitle>Three buckets. Three questions. One target list.</BigTitle>
        </div>
        <div className="grid grid-cols-3 gap-5 flex-1">
          {[
            {
              t: 'AI Readiness',
              q: 'Will the hackathon work?',
              items: [
                'Named AI executive',
                'Public AI build-tool adoption',
                'Expressed interest in vibe coding',
              ],
              k: 'Qualifies',
            },
            {
              t: 'Commercial Fit',
              q: 'Will the contract close?',
              items: [
                'Engineering / product org of 1,000+',
                'Procurement velocity (sub-90-day capable)',
                '€500K+ contract potential',
              ],
              k: 'Ranks',
            },
            {
              t: 'Strategic Value',
              q: 'What does this unlock?',
              items: [
                'Sector beachhead potential',
                'Partnership / coalition leverage',
                'Existing Lovable footprint',
              ],
              k: 'Prioritizes',
            },
          ].map((b, i) => (
            <Card key={b.t} accent={ACCENT}>
              <div className="font-mono text-xs" style={{ color: ACCENT }}>0{i + 1}</div>
              <div className="text-xl font-semibold text-white mt-2">{b.t}</div>
              <div className="text-xs text-white/55 italic mt-1">{b.q}</div>
              <ul className="mt-5 space-y-3 text-sm text-white/80">
                {b.items.map((x) => (
                  <li key={x} className="flex gap-2 leading-relaxed">
                    <span style={{ color: ACCENT }}>▸</span>
                    <span>{x}</span>
                  </li>
                ))}
              </ul>
              <div className="mt-5 pt-3 border-t border-white/10 text-xs font-mono uppercase tracking-[0.22em]" style={{ color: ACCENT }}>{b.k}</div>
            </Card>
          ))}
        </div>
        <div className="mt-6 pt-4 border-t border-white/10 text-xs text-white/55">
          Same rubric scored across 20 European enterprises. Top 5:{' '}
          <span className="text-white">Deutsche Telekom, Spotify, Klarna, ING, Allianz.</span>
        </div>
      </SlideShell>
    ),
  },

  /* ---------------- Slide 3.2 — How we get into the room (2x2) ---------------- */
  {
    id: 'matrix',
    render: () => (
      <SlideShell bg={BG}>
        <GridBg accent={ACCENT} />
        <CornerNum n={2} total={3} accent={ACCENT} />
        <Eyebrow color={ACCENT}>How we get into the room</Eyebrow>
        <div className="mt-3 mb-6">
          <BigTitle>Don't only chase origination.</BigTitle>
        </div>
        <Matrix />
        <div className="mt-5 pt-3 border-t border-white/10 text-xs text-white/55">
          Deutsche Telekom sits in three of four quadrants. The only European account where every door is open.
        </div>
      </SlideShell>
    ),
  },

  /* ---------------- Slide 3.3 — DT anchor ---------------- */
  {
    id: 'dt-anchor',
    render: () => (
      <SlideShell bg={BG}>
        <GridBg accent={ACCENT} />
        <CornerNum n={3} total={3} accent={ACCENT} />
        <Eyebrow color={ACCENT}>Anchor account</Eyebrow>
        <div className="mt-3 mb-6 flex items-center gap-5">
          <div
            className="rounded-xl px-5 py-3 font-display font-bold text-2xl"
            style={{
              background: '#e20074',
              color: '#fff',
              letterSpacing: '0.05em',
            }}
          >
            T···
          </div>
          <BigTitle>Deutsche Telekom.</BigTitle>
        </div>
        <div className="grid grid-cols-3 gap-5 flex-1">
          {[
            {
              t: 'AI Readiness',
              score: 'Pass',
              items: [
                'Jonathan Abrahamson, Chief Product & Digital Officer (named, public, on the record)',
                'Already a Lovable customer in production',
                "Explicit endorsement: vision pairs with how DT will develop and ship products",
              ],
            },
            {
              t: 'Commercial Fit',
              score: '5/5',
              items: [
                '2,000+ product / engineering organization',
                'Procurement clearly capable (T.Capital pre-cleared the relationship)',
                'Contract size potential: €1M+ ARR realistic in Year 1',
              ],
            },
            {
              t: 'Strategic Value',
              score: '5/5',
              items: [
                'T.Capital is a Series B investor — DAX 40 distribution coalition',
                'Sector beachhead into European telco peers',
                'Customer + partner + investor — the only European account where all three are true',
              ],
            },
          ].map((c) => (
            <Card key={c.t} accent={ACCENT}>
              <div className="flex items-baseline justify-between">
                <div className="text-[10px] font-mono uppercase tracking-[0.28em]" style={{ color: ACCENT }}>{c.t}</div>
                <div className="font-mono text-sm font-semibold" style={{ color: ACCENT }}>{c.score}</div>
              </div>
              <ul className="mt-4 space-y-3 text-sm text-white/80">
                {c.items.map((x, i) => (
                  <li key={i} className="flex gap-2 leading-relaxed">
                    <span style={{ color: ACCENT }}>✓</span>
                    <span>{x}</span>
                  </li>
                ))}
              </ul>
            </Card>
          ))}
        </div>
        <div className="mt-6 pt-4 border-t border-white/10 text-xs text-white/55 italic">
          I met Jonathan Abrahamson at the ElevenLabs conference earlier this year. The warm intro is in place.
        </div>
      </SlideShell>
    ),
  },
]

function Matrix() {
  const cells = [
    {
      title: 'Spotify',
      sub: 'Direct origination · named-champion outbound',
      x: 'Direct', y: 'Origination',
    },
    {
      title: 'Deutsche Telekom × T.Capital',
      sub: 'Partner-led origination · investor coalition',
      x: 'Partner-led', y: 'Origination', highlight: true,
    },
    {
      title: 'Klarna',
      sub: 'Direct upsell · PLG → multi-BU contract',
      x: 'Direct', y: 'Upsell',
    },
    {
      title: 'Cognizant network',
      sub: 'Partner-led upsell · cross-sell into installed base',
      x: 'Partner-led', y: 'Upsell',
    },
  ]
  return (
    <div className="flex-1 grid grid-cols-[100px_1fr_1fr] grid-rows-[auto_1fr_1fr] gap-2 min-h-0">
      <div />
      <div className="text-center text-[10px] font-mono uppercase tracking-[0.28em] text-white/55 pb-2">Direct</div>
      <div className="text-center text-[10px] font-mono uppercase tracking-[0.28em] text-white/55 pb-2">Partner-led</div>

      <div className="flex items-center justify-end pr-2 text-[10px] font-mono uppercase tracking-[0.28em] text-white/55">Origination</div>
      {cells.slice(0, 2).map((c) => <Cell key={c.title} {...c} />)}

      <div className="flex items-center justify-end pr-2 text-[10px] font-mono uppercase tracking-[0.28em] text-white/55">Upsell</div>
      {cells.slice(2).map((c) => <Cell key={c.title} {...c} />)}
    </div>
  )
}

function Cell({ title, sub, highlight }: { title: string; sub: string; highlight?: boolean; x?: string; y?: string }) {
  return (
    <div
      className="rounded-xl p-6 border flex flex-col justify-center"
      style={{
        background: highlight ? `${ACCENT}10` : 'rgba(255,255,255,0.02)',
        borderColor: highlight ? `${ACCENT}66` : 'rgba(255,255,255,0.08)',
      }}
    >
      <div className="font-display text-2xl font-semibold text-white">{title}</div>
      <div className="text-sm text-white/60 mt-2 leading-relaxed">{sub}</div>
    </div>
  )
}
