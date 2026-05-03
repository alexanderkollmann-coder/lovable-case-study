import {
  SlideShell,
  Eyebrow,
  BigTitle,
  Card,
  GridBg,
  CornerNum,
} from './_layouts'
import type { Deck } from './types'

const ACCENT = '#ff7596'
const BG = 'radial-gradient(ellipse at 0% 100%, #4a1830 0%, #0a0d1a 65%)'

export const deck: Deck = [
  {
    id: 'cover',
    render: () => (
      <SlideShell bg={BG}>
        <GridBg accent={ACCENT} />
        <CornerNum n={1} total={2} accent={ACCENT} />
        <div className="flex-1 flex flex-col justify-center max-w-5xl">
          <Eyebrow color={ACCENT}>Booth 03 · Formats</Eyebrow>
          <div className="mt-4 mb-8">
            <BigTitle>
              We picked the <span style={{ color: ACCENT }}>one-day</span> format.
            </BigTitle>
          </div>
          <p className="text-white/65 text-lg max-w-3xl">
            Energy management beats output volume. Here is the trade space.
          </p>
        </div>
      </SlideShell>
    ),
  },
  {
    id: 'matrix',
    render: () => (
      <SlideShell bg={BG}>
        <GridBg accent={ACCENT} />
        <CornerNum n={2} total={2} accent={ACCENT} />
        <Eyebrow color={ACCENT}>Format trade-space</Eyebrow>
        <div className="mt-3 mb-8">
          <BigTitle>Half-day to multi-week.</BigTitle>
        </div>
        <div className="grid grid-cols-4 gap-4">
          {[
            { name: 'Half-day', dur: '4h', conv: 'Low', cost: '€', verdict: 'Awareness' },
            { name: 'One-day', dur: '8h', conv: 'High', cost: '€€', verdict: 'Chosen', star: true },
            { name: 'Two-day', dur: '16h', conv: 'High', cost: '€€€', verdict: 'Diminishing return' },
            { name: 'Multi-week', dur: '3w+', conv: 'Mid', cost: '€€€€', verdict: 'Loses urgency' },
          ].map((f) => (
            <Card key={f.name} accent={f.star ? ACCENT : undefined} className={f.star ? 'ring-1' : ''}>
              <div className="flex items-center justify-between">
                <div className="text-lg font-semibold text-white">{f.name}</div>
                {f.star && <span className="text-[10px] font-mono px-2 py-0.5 rounded" style={{ background: ACCENT, color: '#0a0d1a' }}>PICKED</span>}
              </div>
              <div className="mt-4 space-y-2 text-sm">
                <Row k="Duration" v={f.dur} />
                <Row k="Conversion" v={f.conv} />
                <Row k="Cost" v={f.cost} />
                <Row k="Verdict" v={f.verdict} accent={f.star ? ACCENT : undefined} />
              </div>
            </Card>
          ))}
        </div>
      </SlideShell>
    ),
  },
]

function Row({ k, v, accent }: { k: string; v: string; accent?: string }) {
  return (
    <div className="flex justify-between items-center border-b border-white/5 pb-1.5">
      <span className="text-[10px] uppercase tracking-[0.22em] text-white/40">{k}</span>
      <span className="text-white" style={accent ? { color: accent, fontWeight: 600 } : undefined}>{v}</span>
    </div>
  )
}
