import { useState } from 'react'
import { useGameStore, type Vec3 } from '@/store/gameStore'
import { Button } from '@/components/ui/button'
import { Camera as CameraIcon, Copy, RotateCcw, Check } from 'lucide-react'

/**
 * Camera Explorer — only mounted in `?cinematic=1` mode when no shot is playing.
 *
 * Lets you tune the gameplay camera (offset from avatar, look-at offset, zoom,
 * follow-X / follow-Z toggles) live while WASD-walking. Pick a preset to jump
 * to a known framing, then drag the sliders to refine. Hit "Copy" to dump the
 * config as JSON for pasting into the store default.
 */

interface Preset {
  name: string
  description: string
  offset: Vec3
  lookOffset: Vec3
  zoom: number
  followX: boolean
  followZ: boolean
}

const PRESETS: Preset[] = [
  {
    name: 'Frontal',
    description: 'Side-scroller. Camera locked in z, follows avatar X.',
    offset: [0, 5, 16],
    lookOffset: [0, 1.6, 0],
    zoom: 60,
    followX: true,
    followZ: false,
  },
  {
    name: 'Diagonal R',
    description: 'Classic isometric — camera in front-right, looks down-left.',
    offset: [10, 9, 12],
    lookOffset: [0, 1.6, 0],
    zoom: 55,
    followX: true,
    followZ: true,
  },
  {
    name: 'Diagonal L',
    description: 'Mirror of Diagonal R — camera in front-left.',
    offset: [-10, 9, 12],
    lookOffset: [0, 1.6, 0],
    zoom: 55,
    followX: true,
    followZ: true,
  },
  {
    name: 'High Iso',
    description: 'Steeper isometric. More floor visible, less skyline.',
    offset: [11, 14, 11],
    lookOffset: [0, 1.6, 0],
    zoom: 50,
    followX: true,
    followZ: true,
  },
  {
    name: 'Low Angle',
    description: 'Eye-level. Cinematic, dramatic.',
    offset: [0, 1.7, 14],
    lookOffset: [0, 1.6, 0],
    zoom: 70,
    followX: true,
    followZ: false,
  },
  {
    name: 'Top-Down',
    description: 'Birds-eye. Walks the world like a map.',
    offset: [0, 22, 0.5],
    lookOffset: [0, 0, 0],
    zoom: 40,
    followX: true,
    followZ: true,
  },
  {
    name: 'Over Shoulder',
    description: 'Trailing camera, intimate.',
    offset: [0, 4.5, 5],
    lookOffset: [0, 1.6, -3],
    zoom: 80,
    followX: true,
    followZ: true,
  },
]

export function CameraExplorer() {
  const cfg = useGameStore((s) => s.cameraConfig)
  const setCameraConfig = useGameStore((s) => s.setCameraConfig)
  const resetCameraConfig = useGameStore((s) => s.resetCameraConfig)
  const [copied, setCopied] = useState(false)

  function applyPreset(p: Preset) {
    setCameraConfig({
      offset: p.offset,
      lookOffset: p.lookOffset,
      zoom: p.zoom,
      followX: p.followX,
      followZ: p.followZ,
    })
  }

  function copyConfig() {
    const text = JSON.stringify(
      {
        offset: cfg.offset,
        lookOffset: cfg.lookOffset,
        zoom: cfg.zoom,
        followX: cfg.followX,
        followZ: cfg.followZ,
      },
      null,
      2
    )
    navigator.clipboard.writeText(text).then(() => {
      setCopied(true)
      setTimeout(() => setCopied(false), 1400)
    })
  }

  // Identify the active preset (if any current values exactly match)
  const activePreset = PRESETS.find(
    (p) =>
      p.offset.every((v, i) => Math.abs(v - cfg.offset[i]) < 0.01) &&
      p.lookOffset.every((v, i) => Math.abs(v - cfg.lookOffset[i]) < 0.01) &&
      Math.abs(p.zoom - cfg.zoom) < 0.5 &&
      p.followX === cfg.followX &&
      p.followZ === cfg.followZ
  )

  return (
    <div className="pointer-events-auto fixed bottom-6 left-6 z-[60] w-[380px] max-h-[88vh] overflow-y-auto">
      <div className="glass rounded-2xl shadow-2xl p-4 text-[11px] text-white/85">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg bg-primary/20 border border-primary/40 flex items-center justify-center">
              <CameraIcon className="w-3.5 h-3.5 text-primary" />
            </div>
            <div>
              <div className="text-[10px] uppercase tracking-[0.22em] text-white/50">Camera Explorer</div>
              <div className="text-[12px] font-display font-semibold text-foreground">
                {activePreset?.name ?? 'Custom'}
              </div>
            </div>
          </div>
          <div className="flex gap-1">
            <Button
              variant="ghost"
              size="sm"
              className="h-7 px-2"
              onClick={resetCameraConfig}
              title="Reset to default frontal"
            >
              <RotateCcw className="w-3 h-3" />
            </Button>
            <Button
              variant="ghost"
              size="sm"
              className="h-7 px-2"
              onClick={copyConfig}
              title="Copy current config to clipboard"
            >
              {copied ? <Check className="w-3 h-3 text-green-400" /> : <Copy className="w-3 h-3" />}
            </Button>
          </div>
        </div>

        <p className="text-[10px] text-white/50 mb-3 leading-relaxed">
          Walk the avatar with WASD while you tune. Anchor is always the avatar. Pick a preset, then
          drag the sliders to refine.
        </p>

        {/* Presets */}
        <div className="grid grid-cols-2 gap-1 mb-3">
          {PRESETS.map((p) => {
            const active = activePreset?.name === p.name
            return (
              <button
                key={p.name}
                onClick={() => applyPreset(p)}
                title={p.description}
                className={`text-left px-2 py-1.5 rounded text-[10px] border transition-colors ${
                  active
                    ? 'bg-primary/30 border-primary/60 text-white'
                    : 'bg-white/5 border-white/10 text-white/75 hover:bg-white/10'
                }`}
              >
                {p.name}
              </button>
            )
          })}
        </div>

        {/* Sliders */}
        <div className="space-y-2 font-mono">
          <Slider
            label="offset.x"
            value={cfg.offset[0]}
            min={-30}
            max={30}
            step={0.5}
            onChange={(v) => setCameraConfig({ offset: [v, cfg.offset[1], cfg.offset[2]] })}
          />
          <Slider
            label="offset.y"
            value={cfg.offset[1]}
            min={0.5}
            max={30}
            step={0.5}
            onChange={(v) => setCameraConfig({ offset: [cfg.offset[0], v, cfg.offset[2]] })}
          />
          <Slider
            label="offset.z"
            value={cfg.offset[2]}
            min={-30}
            max={30}
            step={0.5}
            onChange={(v) => setCameraConfig({ offset: [cfg.offset[0], cfg.offset[1], v] })}
          />
          <Slider
            label="lookOffset.x"
            value={cfg.lookOffset[0]}
            min={-10}
            max={10}
            step={0.25}
            onChange={(v) => setCameraConfig({ lookOffset: [v, cfg.lookOffset[1], cfg.lookOffset[2]] })}
          />
          <Slider
            label="lookOffset.y"
            value={cfg.lookOffset[1]}
            min={0}
            max={6}
            step={0.1}
            onChange={(v) => setCameraConfig({ lookOffset: [cfg.lookOffset[0], v, cfg.lookOffset[2]] })}
          />
          <Slider
            label="lookOffset.z"
            value={cfg.lookOffset[2]}
            min={-10}
            max={10}
            step={0.25}
            onChange={(v) => setCameraConfig({ lookOffset: [cfg.lookOffset[0], cfg.lookOffset[1], v] })}
          />
          <Slider
            label="zoom"
            value={cfg.zoom}
            min={20}
            max={140}
            step={1}
            onChange={(v) => setCameraConfig({ zoom: v })}
          />
        </div>

        {/* Follow toggles */}
        <div className="mt-3 flex gap-2">
          <Toggle
            label="follow X"
            value={cfg.followX}
            onChange={(v) => setCameraConfig({ followX: v })}
          />
          <Toggle
            label="follow Z"
            value={cfg.followZ}
            onChange={(v) => setCameraConfig({ followZ: v })}
          />
        </div>

        {/* Description of the active preset */}
        {activePreset && (
          <div className="mt-3 text-[10px] text-white/55 leading-relaxed">{activePreset.description}</div>
        )}

        <div className="mt-3 pt-3 border-t border-white/10 text-[10px] text-white/45 leading-snug">
          Hit <Copy className="w-2.5 h-2.5 inline" /> to copy the JSON. Paste into{' '}
          <code className="text-white/65">gameStore.ts</code> default to ship it.
        </div>
      </div>
    </div>
  )
}

function Slider({
  label,
  value,
  min,
  max,
  step,
  onChange,
}: {
  label: string
  value: number
  min: number
  max: number
  step: number
  onChange: (v: number) => void
}) {
  return (
    <div>
      <div className="flex items-center justify-between mb-0.5">
        <span className="text-white/55 text-[10px]">{label}</span>
        <span className="text-white/95 text-[10px]">{value.toFixed(2)}</span>
      </div>
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange(parseFloat(e.target.value))}
        className="w-full"
      />
    </div>
  )
}

function Toggle({
  label,
  value,
  onChange,
}: {
  label: string
  value: boolean
  onChange: (v: boolean) => void
}) {
  return (
    <button
      onClick={() => onChange(!value)}
      className={`flex-1 px-2 py-1.5 rounded text-[10px] border transition-colors font-mono ${
        value
          ? 'bg-primary/30 border-primary/60 text-white'
          : 'bg-white/5 border-white/10 text-white/55 hover:bg-white/10'
      }`}
    >
      {label}: {value ? 'on' : 'off'}
    </button>
  )
}
