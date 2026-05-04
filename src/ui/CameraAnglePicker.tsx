import { useState } from 'react'
import { Camera as CameraIcon, ChevronDown } from 'lucide-react'
import { useGameStore, type Vec3 } from '@/store/gameStore'
import { motion, AnimatePresence } from 'framer-motion'

/**
 * Sleek glass pill at top-left for switching gameplay camera angles during the
 * walkthrough demo. Click → dropdown of presets → pick one and the camera
 * smoothly transitions to it (Camera.tsx lerps to the new offset/lookOffset/zoom).
 *
 * Avatar stays anchored regardless of preset.
 */

interface Preset {
  name: string
  offset: Vec3
  lookOffset: Vec3
  zoom: number
  followX: boolean
  followZ: boolean
}

const PRESETS: Preset[] = [
  {
    name: 'Frontal',
    offset: [0, 5, 16],
    lookOffset: [0, 1.6, 0],
    zoom: 60,
    followX: true,
    followZ: false,
  },
  {
    name: 'Diagonal R',
    offset: [10, 9, 12],
    lookOffset: [0, 1.6, 0],
    zoom: 55,
    followX: true,
    followZ: true,
  },
  {
    name: 'Diagonal L',
    offset: [-10, 9, 12],
    lookOffset: [0, 1.6, 0],
    zoom: 55,
    followX: true,
    followZ: true,
  },
  {
    name: 'High Iso',
    offset: [11, 14, 11],
    lookOffset: [0, 1.6, 0],
    zoom: 50,
    followX: true,
    followZ: true,
  },
  {
    name: 'Low Angle',
    offset: [0, 1.7, 14],
    lookOffset: [0, 1.6, 0],
    zoom: 70,
    followX: true,
    followZ: false,
  },
  {
    name: 'Top-Down',
    offset: [0, 22, 0.5],
    lookOffset: [0, 0, 0],
    zoom: 40,
    followX: true,
    followZ: true,
  },
]

export function CameraAnglePicker() {
  const cfg = useGameStore((s) => s.cameraConfig)
  const setCameraConfig = useGameStore((s) => s.setCameraConfig)
  const [open, setOpen] = useState(false)

  const active = PRESETS.find(
    (p) =>
      p.offset.every((v, i) => Math.abs(v - cfg.offset[i]) < 0.05) &&
      p.lookOffset.every((v, i) => Math.abs(v - cfg.lookOffset[i]) < 0.05) &&
      Math.abs(p.zoom - cfg.zoom) < 0.5 &&
      p.followX === cfg.followX &&
      p.followZ === cfg.followZ
  )

  function applyPreset(p: Preset) {
    setCameraConfig({
      offset: p.offset,
      lookOffset: p.lookOffset,
      zoom: p.zoom,
      followX: p.followX,
      followZ: p.followZ,
    })
    setOpen(false)
  }

  return (
    <div className="pointer-events-auto fixed top-20 left-6 z-30">
      <button
        onClick={() => setOpen(!open)}
        className="h-10 pl-3 pr-3 rounded-full glass flex items-center gap-2 text-white/85 hover:text-white transition-colors"
      >
        <CameraIcon className="w-4 h-4" />
        <span className="text-[11px] font-display tracking-[0.04em]">{active?.name ?? 'Custom'}</span>
        <ChevronDown
          className={`w-3.5 h-3.5 transition-transform ${open ? 'rotate-180' : ''}`}
        />
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -4 }}
            transition={{ duration: 0.15 }}
            className="absolute top-12 left-0 w-44 glass rounded-xl p-1.5 shadow-2xl"
          >
            {PRESETS.map((p) => {
              const isActive = active?.name === p.name
              return (
                <button
                  key={p.name}
                  onClick={() => applyPreset(p)}
                  className={`w-full text-left px-3 py-2 rounded-lg text-[11px] font-display tracking-wide transition-colors ${
                    isActive
                      ? 'bg-primary/30 text-white'
                      : 'text-white/75 hover:bg-white/10 hover:text-white'
                  }`}
                >
                  {p.name}
                </button>
              )
            })}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
