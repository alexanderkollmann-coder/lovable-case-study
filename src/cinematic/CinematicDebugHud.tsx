import { useGameStore } from '@/store/gameStore'
import { SHOTS, sampleShot } from './shots'
import { Button } from '@/components/ui/button'
import { Pause, Play, SkipBack, SkipForward, Square, RotateCcw } from 'lucide-react'

/**
 * Debug HUD — only mounted when an `?cinematic=1` shot is active.
 *
 * Lets you pause the camera mid-shot, scrub time, jump to keyframes, and read off the exact
 * camera pos / lookAt / zoom at any t. The point is to capture precise metadata for shots where
 * something pops into view at a distance — when an object appears, scrub a hair backward, then
 * read the camera position from this panel and tell Alex what it was.
 */
export function CinematicDebugHud() {
  const shotId = useGameStore((s) => s.cinematicShotId)
  const t = useGameStore((s) => s.cinematicShotT)
  const auto = useGameStore((s) => s.cinematicAutoAdvance)
  const setT = useGameStore((s) => s.setCinematicShotT)
  const setAuto = useGameStore((s) => s.setCinematicAutoAdvance)
  const setShotId = useGameStore((s) => s.setCinematicShotId)

  if (!shotId) return null
  const shot = SHOTS.find((s) => s.id === shotId)
  if (!shot) return null

  const sample = sampleShot(shot, t)
  const elapsed = t * shot.duration

  // Find which keyframe segment we're in
  let segIdx = 0
  while (segIdx < shot.keys.length - 1 && shot.keys[segIdx + 1].t < t) segIdx++
  const segA = shot.keys[segIdx]
  const segB = shot.keys[Math.min(segIdx + 1, shot.keys.length - 1)]

  // Distance camera→lookAt (useful: tells you how "tight" the shot is)
  const dx = sample.pos[0] - sample.lookAt[0]
  const dy = sample.pos[1] - sample.lookAt[1]
  const dz = sample.pos[2] - sample.lookAt[2]
  const distLook = Math.sqrt(dx * dx + dy * dy + dz * dz)

  // Distance camera→zone centers (helps spot which zone is "ahead" of you)
  const zones: Array<[string, [number, number, number]]> = [
    ['Pre/London', [-17, 0, -2]],
    ['Hack', [0, 0, -2]],
    ['Post', [17, 0, -2]],
  ]

  const fmt = (n: number) => n.toFixed(2)

  return (
    <div className="pointer-events-auto fixed top-6 left-6 z-[70] w-[360px] max-h-[92vh] overflow-y-auto">
      <div className="glass rounded-2xl shadow-2xl p-4 font-mono text-[11px] text-white/85">
        <div className="flex items-center justify-between mb-3">
          <div>
            <div className="text-[10px] uppercase tracking-[0.22em] text-white/50">Debug HUD</div>
            <div className="text-[12px] font-semibold text-foreground font-display">{shot.name}</div>
          </div>
          <button
            onClick={() => setShotId(null)}
            aria-label="Stop debug"
            className="text-white/60 hover:text-white"
          >
            <Square className="w-4 h-4" />
          </button>
        </div>

        {/* Transport */}
        <div className="flex items-center gap-1 mb-3">
          <Button
            variant="ghost"
            size="sm"
            className="h-7 px-2"
            onClick={() => setT(0)}
            title="Reset to t=0"
          >
            <RotateCcw className="w-3 h-3" />
          </Button>
          <Button
            variant="ghost"
            size="sm"
            className="h-7 px-2"
            onClick={() => setT(Math.max(0, t - 0.02))}
            title="-0.02"
          >
            <SkipBack className="w-3 h-3" />
          </Button>
          <Button
            variant={auto ? 'default' : 'ghost'}
            size="sm"
            className="h-7 px-2 flex-1"
            onClick={() => setAuto(!auto)}
          >
            {auto ? <Pause className="w-3 h-3" /> : <Play className="w-3 h-3" />}
            {auto ? 'Pause' : 'Play'}
          </Button>
          <Button
            variant="ghost"
            size="sm"
            className="h-7 px-2"
            onClick={() => setT(Math.min(1, t + 0.02))}
            title="+0.02"
          >
            <SkipForward className="w-3 h-3" />
          </Button>
        </div>

        {/* Scrubber */}
        <div className="mb-3">
          <div className="flex items-center justify-between mb-1">
            <span className="text-white/55">t</span>
            <span className="text-white/95">{t.toFixed(3)} · {elapsed.toFixed(2)}s / {shot.duration}s</span>
          </div>
          <input
            type="range"
            min={0}
            max={1}
            step={0.001}
            value={t}
            onChange={(e) => {
              setAuto(false)
              setT(parseFloat(e.target.value))
            }}
            className="w-full"
          />
        </div>

        {/* Quick-jump to keyframes */}
        <div className="mb-3">
          <div className="text-white/55 mb-1">Keyframes</div>
          <div className="flex gap-1 flex-wrap">
            {shot.keys.map((k, i) => {
              const active = i === segIdx || (i === segIdx + 1 && t >= 1 && i === shot.keys.length - 1)
              return (
                <button
                  key={i}
                  onClick={() => {
                    setAuto(false)
                    setT(k.t)
                  }}
                  className={`px-2 py-1 rounded text-[10px] border ${
                    active
                      ? 'bg-primary/30 border-primary/60 text-white'
                      : 'bg-white/5 border-white/10 text-white/70 hover:bg-white/10'
                  }`}
                >
                  k{i} · t={k.t.toFixed(2)}
                </button>
              )
            })}
          </div>
        </div>

        {/* Live camera readout */}
        <div className="rounded-lg bg-black/40 border border-white/10 p-2 space-y-1">
          <Row label="pos" value={`[${fmt(sample.pos[0])}, ${fmt(sample.pos[1])}, ${fmt(sample.pos[2])}]`} />
          <Row label="lookAt" value={`[${fmt(sample.lookAt[0])}, ${fmt(sample.lookAt[1])}, ${fmt(sample.lookAt[2])}]`} />
          <Row label="zoom" value={fmt(sample.zoom)} />
          <Row label="dist→lookAt" value={fmt(distLook)} />
          <div className="pt-1 mt-1 border-t border-white/10">
            <div className="text-white/55 text-[10px] mb-1">camera distance to zone center</div>
            {zones.map(([name, c]) => {
              const ddx = sample.pos[0] - c[0]
              const ddy = sample.pos[1] - c[1]
              const ddz = sample.pos[2] - c[2]
              const d = Math.sqrt(ddx * ddx + ddy * ddy + ddz * ddz)
              return <Row key={name} label={name} value={fmt(d)} />
            })}
          </div>
        </div>

        {/* Segment context */}
        <div className="mt-3 rounded-lg bg-black/30 border border-white/8 p-2">
          <div className="text-white/55 text-[10px] mb-1">
            current segment: k{segIdx} → k{Math.min(segIdx + 1, shot.keys.length - 1)}
          </div>
          <div className="text-[10px] text-white/65 space-y-0.5">
            <div>k{segIdx}: pos=[{segA.pos.map(fmt).join(', ')}] zoom={segA.zoom ?? '—'}</div>
            <div>k{Math.min(segIdx + 1, shot.keys.length - 1)}: pos=[{segB.pos.map(fmt).join(', ')}] zoom={segB.zoom ?? '—'}</div>
          </div>
        </div>

        <div className="mt-3 text-[10px] text-white/45 leading-snug">
          Scrub to where an object pops in, then send Alex the t value + pos. He can compare against
          the keyframe deltas to figure out what's distance-gated.
        </div>
      </div>
    </div>
  )
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between gap-3">
      <span className="text-white/55">{label}</span>
      <span className="text-white/95 truncate">{value}</span>
    </div>
  )
}
