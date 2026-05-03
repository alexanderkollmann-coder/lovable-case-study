import {
  SlideShell,
  Eyebrow,
  BigTitle,
  Card,
  GridBg,
  CornerNum,
  Stat,
} from './_layouts'
import type { Deck } from './types'
import { Trophy, Crown, Medal, Star, Zap, Flame, Sparkles } from 'lucide-react'

const ACCENT = '#ff4d7a'
const GOLD = '#f5c44b'
const BG = 'radial-gradient(ellipse at 100% 0%, #4a1530 0%, #0a0d18 60%)'

/* ---------- Hall of Fame data ---------- */

interface Winner {
  rank: 1 | 2 | 3
  company: string
  sector: string
  year: string
  project: string
  blurb: string
  scores: {
    impact: number    // business impact 0-100
    velocity: number  // shipped in hours
    polish: number    // demo quality
    adoption: number  // post-event adoption
  }
  metric: { value: string; label: string }
}

const WINNERS: Winner[] = [
  {
    rank: 1,
    company: 'Allianz Partners',
    sector: 'Insurance · DE',
    year: '2025',
    project: 'Claims Triage Copilot',
    blurb: 'Auto-routes low-complexity motor claims with auditable decision trails. Live in 30-day POC.',
    scores: { impact: 96, velocity: 92, polish: 88, adoption: 94 },
    metric: { value: '40min → 4min', label: 'Triage time' },
  },
  {
    rank: 2,
    company: 'Maersk',
    sector: 'Logistics · DK',
    year: '2024',
    project: 'Port Disruption Radar',
    blurb: 'Real-time disruption signal across 121 terminals. Deployed to ops control rooms in 6 weeks.',
    scores: { impact: 91, velocity: 95, polish: 85, adoption: 82 },
    metric: { value: '€2.3M', label: 'Annualised savings' },
  },
  {
    rank: 3,
    company: 'BNP Paribas',
    sector: 'Banking · FR',
    year: '2024',
    project: 'KYC Narrative Engine',
    blurb: 'Generates compliant onboarding narratives from raw client data. 8 prototypes in one day.',
    scores: { impact: 88, velocity: 90, polish: 93, adoption: 79 },
    metric: { value: '8 / 8', label: 'Apps shipped to staging' },
  },
]

const HONOURABLE = [
  { c: 'Vodafone', p: 'Tariff Migration Wizard', m: '12k accounts migrated' },
  { c: 'L\'Oréal', p: 'Pack-shot Variant Studio', m: '3,200 SKUs in 1 day' },
  { c: 'Lufthansa', p: 'Crew Swap Optimiser', m: '€840k crew cost saved' },
  { c: 'Carrefour', p: 'Shelf Vision QA', m: '94% defect catch rate' },
]

/* ---------- Slides ---------- */

export const deck: Deck = [
  {
    id: 'cover',
    render: () => (
      <SlideShell bg={BG}>
        <GridBg accent={ACCENT} />
        <CornerNum n={1} total={5} accent={ACCENT} />
        <div className="flex-1 flex flex-col justify-center max-w-5xl">
          <Eyebrow color={ACCENT}>Booth 04 · Execution</Eyebrow>
          <div className="mt-4 mb-6 flex items-center gap-4">
            <Trophy className="w-12 h-12" style={{ color: GOLD }} />
            <div>
              <BigTitle>
                Hackathon <span style={{ color: GOLD }}>Hall of Fame</span>
              </BigTitle>
            </div>
          </div>
          <p className="text-white/65 text-lg max-w-3xl">
            Twelve enterprises. One day each. Working software shipped — and the
            scoreboard that proves it.
          </p>
        </div>
        <div className="grid grid-cols-4 gap-6 mt-auto">
          <Stat value="12" label="Enterprises run" accent={ACCENT} />
          <Stat value="86" label="Apps shipped" accent={ACCENT} />
          <Stat value="9" label="MOUs signed same-day" accent={ACCENT} />
          <Stat value="€18M" label="Pipeline generated" accent={ACCENT} />
        </div>
      </SlideShell>
    ),
  },
  {
    id: 'podium',
    render: () => (
      <SlideShell bg={BG}>
        <GridBg accent={ACCENT} />
        <CornerNum n={2} total={5} accent={ACCENT} />
        <Eyebrow color={GOLD}>The podium · 2024–2025</Eyebrow>
        <div className="mt-3 mb-10">
          <BigTitle>Top three of the year.</BigTitle>
        </div>
        <div className="grid grid-cols-3 gap-6 items-end flex-1">
          {[WINNERS[1], WINNERS[0], WINNERS[2]].map((w) => (
            <PodiumCard key={w.company} w={w} />
          ))}
        </div>
      </SlideShell>
    ),
  },
  {
    id: 'champion',
    render: () => {
      const w = WINNERS[0]
      return (
        <SlideShell bg={BG}>
          <GridBg accent={ACCENT} />
          <CornerNum n={3} total={5} accent={ACCENT} />
          <div className="flex items-center gap-3 mb-4">
            <Crown className="w-6 h-6" style={{ color: GOLD }} />
            <Eyebrow color={GOLD}>Champion spotlight · {w.year}</Eyebrow>
          </div>
          <div className="grid grid-cols-2 gap-12 flex-1">
            <div className="flex flex-col justify-center">
              <div className="text-sm font-mono uppercase tracking-[0.3em] text-white/50 mb-3">{w.sector}</div>
              <div className="font-display text-5xl font-semibold text-white leading-tight">{w.company}</div>
              <div className="text-2xl mt-3" style={{ color: ACCENT }}>{w.project}</div>
              <p className="text-white/65 mt-6 text-base leading-relaxed max-w-md">{w.blurb}</p>
              <div className="mt-8 flex items-baseline gap-3">
                <div className="font-display text-5xl font-bold" style={{ color: GOLD }}>{w.metric.value}</div>
                <div className="text-xs font-mono uppercase tracking-[0.25em] text-white/50">{w.metric.label}</div>
              </div>
            </div>
            <div className="flex flex-col justify-center">
              <div className="text-[10px] font-mono uppercase tracking-[0.3em] text-white/40 mb-4">Score breakdown</div>
              <div className="space-y-5">
                <ScoreBar label="Business impact" value={w.scores.impact} accent={GOLD} />
                <ScoreBar label="Build velocity" value={w.scores.velocity} accent={GOLD} />
                <ScoreBar label="Demo polish" value={w.scores.polish} accent={GOLD} />
                <ScoreBar label="Post-event adoption" value={w.scores.adoption} accent={GOLD} />
              </div>
              <div className="mt-8 pt-6 border-t border-white/10 flex items-center justify-between">
                <div className="text-[10px] font-mono uppercase tracking-[0.3em] text-white/50">Composite</div>
                <div className="font-display text-4xl font-bold" style={{ color: GOLD }}>
                  {Math.round((w.scores.impact + w.scores.velocity + w.scores.polish + w.scores.adoption) / 4)}
                  <span className="text-xl text-white/40">/100</span>
                </div>
              </div>
            </div>
          </div>
        </SlideShell>
      )
    },
  },
  {
    id: 'leaderboard',
    render: () => (
      <SlideShell bg={BG}>
        <GridBg accent={ACCENT} />
        <CornerNum n={4} total={5} accent={ACCENT} />
        <Eyebrow color={ACCENT}>Honourable mentions</Eyebrow>
        <div className="mt-3 mb-10">
          <BigTitle>The deep bench.</BigTitle>
        </div>
        <div className="grid grid-cols-2 gap-4">
          {HONOURABLE.map((h, i) => (
            <Card key={h.c} className="flex items-center gap-5">
              <div className="font-mono text-2xl font-bold w-10" style={{ color: ACCENT }}>
                {String(i + 4).padStart(2, '0')}
              </div>
              <div className="flex-1">
                <div className="text-base font-semibold text-white">{h.c}</div>
                <div className="text-sm text-white/60">{h.p}</div>
              </div>
              <div className="text-right">
                <div className="text-sm font-semibold" style={{ color: ACCENT }}>{h.m}</div>
                <div className="text-[10px] uppercase tracking-[0.2em] text-white/40 mt-0.5">Outcome</div>
              </div>
            </Card>
          ))}
        </div>
      </SlideShell>
    ),
  },
  {
    id: 'rubric',
    render: () => (
      <SlideShell bg={BG}>
        <GridBg accent={ACCENT} />
        <CornerNum n={5} total={5} accent={ACCENT} />
        <Eyebrow color={ACCENT}>How they're scored</Eyebrow>
        <div className="mt-3 mb-10">
          <BigTitle>The judging rubric.</BigTitle>
        </div>
        <div className="grid grid-cols-4 gap-5">
          {[
            { icon: Flame, label: 'Business Impact', desc: 'Real €/operation moved, not theoretical', weight: 35 },
            { icon: Zap, label: 'Build Velocity', desc: 'Working software within the day', weight: 25 },
            { icon: Sparkles, label: 'Demo Polish', desc: 'Believable narrative, no stage tricks', weight: 20 },
            { icon: Star, label: 'Post-event Adoption', desc: 'Users still using it at 30 days', weight: 20 },
          ].map(({ icon: Icon, label, desc, weight }) => (
            <Card key={label} accent={ACCENT}>
              <div className="flex items-center justify-between mb-4">
                <Icon className="w-5 h-5" style={{ color: ACCENT }} />
                <div className="font-mono text-xs" style={{ color: ACCENT }}>{weight}%</div>
              </div>
              <div className="text-base font-semibold text-white">{label}</div>
              <div className="text-xs text-white/55 mt-2 leading-relaxed">{desc}</div>
            </Card>
          ))}
        </div>
        <div className="mt-10 flex items-center gap-3 text-white/50 text-xs font-mono uppercase tracking-[0.28em]">
          <Medal className="w-4 h-4" style={{ color: GOLD }} />
          Judging panel · Customer exec · Foundation-model partner · Lovable founder
        </div>
      </SlideShell>
    ),
  },
]

/* ---------- Sub-components ---------- */

function PodiumCard({ w }: { w: Winner }) {
  const heights = { 1: 'h-full', 2: 'h-[85%]', 3: 'h-[72%]' } as const
  const colors = { 1: GOLD, 2: '#c8d0dc', 3: '#cd8b4a' } as const
  const icons = { 1: Crown, 2: Medal, 3: Medal } as const
  const Icon = icons[w.rank]
  const color = colors[w.rank]
  return (
    <div className={`${heights[w.rank]} flex flex-col`}>
      <div className="flex-1 rounded-xl p-5 flex flex-col" style={{
        background: `linear-gradient(180deg, ${color}1f 0%, transparent 90%)`,
        border: `1px solid ${color}40`,
      }}>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Icon className="w-5 h-5" style={{ color }} />
            <span className="font-mono text-xs uppercase tracking-[0.25em]" style={{ color }}>#{w.rank}</span>
          </div>
          <span className="text-[10px] font-mono text-white/40">{w.year}</span>
        </div>
        <div className="font-display text-2xl font-semibold text-white mt-4">{w.company}</div>
        <div className="text-xs text-white/50 mt-0.5">{w.sector}</div>
        <div className="text-sm mt-4" style={{ color }}>{w.project}</div>
        <div className="mt-auto pt-4">
          <div className="font-display text-3xl font-bold" style={{ color }}>{w.metric.value}</div>
          <div className="text-[10px] uppercase tracking-[0.22em] text-white/45 mt-1">{w.metric.label}</div>
          <div className="mt-3 h-1 rounded-full bg-white/5 overflow-hidden">
            <div className="h-full" style={{
              width: `${(w.scores.impact + w.scores.velocity + w.scores.polish + w.scores.adoption) / 4}%`,
              background: color,
            }} />
          </div>
        </div>
      </div>
    </div>
  )
}

function ScoreBar({ label, value, accent }: { label: string; value: number; accent: string }) {
  return (
    <div>
      <div className="flex justify-between items-baseline mb-1.5">
        <span className="text-xs uppercase tracking-[0.2em] text-white/55">{label}</span>
        <span className="font-mono font-bold text-sm" style={{ color: accent }}>{value}</span>
      </div>
      <div className="h-2 rounded-full bg-white/5 overflow-hidden">
        <div
          className="h-full rounded-full transition-all duration-700"
          style={{ width: `${value}%`, background: `linear-gradient(90deg, ${accent}, ${accent}cc)` }}
        />
      </div>
    </div>
  )
}
