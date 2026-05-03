import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { useGameStore } from '@/store/gameStore'
import { SHOTS, type Shot } from './shots'
import { recordCanvas, downloadBlob, pickSupportedMimeType, extensionFor } from './recordCanvas'
import { Film, Download, Loader2, Camera, X } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'

interface RecState {
  shotId: string | null
  status: 'idle' | 'preparing' | 'recording' | 'finalizing' | 'error'
  errorMessage?: string
  progress: number
}

/**
 * Hidden behind `?cinematic=1`. Lets you record one or all of the SHOTS to video files.
 * While a shot is recording the regular HUD is hidden (handled by App.tsx) and the camera
 * follows the shot's keyframe path (handled by ShotPlayer.tsx, which lives inside the Canvas).
 */
export function Cinematic({ onExit }: { onExit: () => void }) {
  const [rec, setRec] = useState<RecState>({ shotId: null, status: 'idle', progress: 0 })
  const [previewing, setPreviewing] = useState<string | null>(null)
  const setCinematicShotId = useGameStore((s) => s.setCinematicShotId)

  const isBusy = rec.status === 'preparing' || rec.status === 'recording' || rec.status === 'finalizing'

  async function handleRecord(shot: Shot) {
    if (isBusy) return
    setRec({ shotId: shot.id, status: 'preparing', progress: 0 })

    // Find the canvas
    const canvas = document.querySelector('canvas') as HTMLCanvasElement | null
    if (!canvas) {
      setRec({ shotId: shot.id, status: 'error', progress: 0, errorMessage: 'Canvas not found' })
      return
    }

    try {
      // 1) snap world to the shot's timeline + clear gameplay state
      useGameStore.getState().setTimeline(shot.timeline)
      useGameStore.getState().closeBooth()

      // 2) Pre-roll: give the world ~600ms to settle into the timeline state visually
      await new Promise((r) => setTimeout(r, 600))

      // 3) Trigger camera path
      setCinematicShotId(shot.id)
      setRec({ shotId: shot.id, status: 'recording', progress: 0 })

      // 4) Record for shot.duration + small tail buffer
      const mimeType = pickSupportedMimeType()
      const { blob } = await recordCanvas({
        canvas,
        durationMs: shot.duration * 1000 + 200,
        mimeType,
        onTick: (elapsed) => {
          setRec((prev) =>
            prev.shotId === shot.id && prev.status === 'recording'
              ? { ...prev, progress: Math.min(1, elapsed / (shot.duration * 1000 + 200)) }
              : prev
          )
        },
      })

      setRec({ shotId: shot.id, status: 'finalizing', progress: 1 })
      setCinematicShotId(null)

      const filename = `${shot.filename}.${extensionFor(mimeType)}`
      downloadBlob(blob, filename)

      setRec({ shotId: null, status: 'idle', progress: 0 })
    } catch (e) {
      console.error(e)
      setCinematicShotId(null)
      setRec({
        shotId: shot.id,
        status: 'error',
        progress: 0,
        errorMessage: (e as Error)?.message ?? 'Recording failed',
      })
    }
  }

  async function handleRecordAll() {
    for (const shot of SHOTS) {
      await handleRecord(shot)
      // Small breather between shots
      await new Promise((r) => setTimeout(r, 800))
    }
  }

  function handlePreview(shot: Shot) {
    if (isBusy) return
    if (previewing === shot.id) {
      setCinematicShotId(null)
      setPreviewing(null)
      return
    }
    useGameStore.getState().setTimeline(shot.timeline)
    setCinematicShotId(shot.id)
    setPreviewing(shot.id)
    setTimeout(() => {
      setCinematicShotId(null)
      setPreviewing(null)
    }, shot.duration * 1000 + 200)
  }

  // While a shot is *recording*, hide the panel so the canvas is unobstructed
  const hidePanelDuringRecord = rec.status === 'recording' || rec.status === 'finalizing'

  return (
    <AnimatePresence>
      {!hidePanelDuringRecord && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="pointer-events-auto fixed top-6 right-6 z-[60] w-[400px] max-h-[90vh] overflow-y-auto"
        >
          <div className="glass rounded-2xl shadow-2xl p-5">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-primary/20 border border-primary/40 flex items-center justify-center">
                  <Film className="w-4 h-4 text-primary" />
                </div>
                <div>
                  <div className="text-[10px] uppercase tracking-[0.22em] text-white/50">Cinematic Mode</div>
                  <div className="text-sm font-display font-semibold text-foreground">Render shots</div>
                </div>
              </div>
              <button
                onClick={onExit}
                aria-label="Exit cinematic mode"
                className="text-white/60 hover:text-white transition-colors"
                disabled={isBusy}
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <p className="text-xs text-white/60 mb-4 leading-relaxed">
              Each shot plays a scripted camera path through the world and records the canvas. A video
              file downloads automatically when the shot finishes. Stitch the files together in any
              video editor.
            </p>

            <Button
              variant="default"
              size="sm"
              className="w-full mb-4"
              onClick={handleRecordAll}
              disabled={isBusy}
            >
              {isBusy ? <Loader2 className="w-4 h-4 animate-spin" /> : <Download className="w-4 h-4" />}
              Record all ({SHOTS.length} files)
            </Button>

            <div className="space-y-3">
              {SHOTS.map((shot) => {
                const isThis = rec.shotId === shot.id
                return (
                  <div
                    key={shot.id}
                    className="rounded-xl border border-white/8 bg-black/30 p-3"
                  >
                    <div className="text-sm font-medium text-foreground">{shot.name}</div>
                    <div className="text-xs text-white/55 mt-1 leading-relaxed">{shot.description}</div>
                    <div className="flex items-center justify-between mt-3">
                      <div className="text-[10px] uppercase tracking-[0.18em] text-white/40 font-mono">
                        {shot.duration}s · {shot.timeline}
                      </div>
                      <div className="flex gap-2">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handlePreview(shot)}
                          disabled={isBusy}
                        >
                          <Camera className="w-3 h-3" />
                          {previewing === shot.id ? 'Stop' : 'Preview'}
                        </Button>
                        <Button
                          variant="default"
                          size="sm"
                          onClick={() => handleRecord(shot)}
                          disabled={isBusy}
                        >
                          {isThis && rec.status === 'preparing' && <Loader2 className="w-3 h-3 animate-spin" />}
                          {isThis && rec.status === 'recording' && <Loader2 className="w-3 h-3 animate-spin" />}
                          {isThis && rec.status === 'finalizing' && <Loader2 className="w-3 h-3 animate-spin" />}
                          {(!isThis || rec.status === 'idle' || rec.status === 'error') && (
                            <Download className="w-3 h-3" />
                          )}
                          {isThis && rec.status === 'preparing' && 'Preparing'}
                          {isThis && rec.status === 'recording' && `Recording ${(rec.progress * 100).toFixed(0)}%`}
                          {isThis && rec.status === 'finalizing' && 'Saving'}
                          {isThis && rec.status === 'error' && 'Retry'}
                          {(!isThis || rec.status === 'idle') && 'Record'}
                        </Button>
                      </div>
                    </div>
                    {isThis && rec.status === 'error' && (
                      <div className="mt-2 text-[11px] text-red-400">{rec.errorMessage}</div>
                    )}
                  </div>
                )
              })}
            </div>

            <div className="mt-4 pt-4 border-t border-white/10 text-[11px] text-white/45 leading-relaxed">
              <strong className="text-white/65">File format:</strong> tries MP4 first; falls back to WebM if your
              browser doesn't support MP4 recording. To convert WebM → MP4 with ffmpeg:
              <pre className="mt-2 px-2 py-1.5 rounded bg-black/40 text-[10px] font-mono text-white/70 whitespace-pre-wrap">
                ffmpeg -i shot.webm -c:v libx264 -pix_fmt yuv420p shot.mp4
              </pre>
            </div>
          </div>
        </motion.div>
      )}

      {/* "Recording" indicator overlay (small, doesn't pollute the recording itself) */}
      {hidePanelDuringRecord && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="pointer-events-none fixed bottom-6 right-6 z-[60] flex items-center gap-2 px-3 py-2 rounded-full bg-red-500/20 border border-red-400/40 backdrop-blur"
        >
          <span className="w-2 h-2 rounded-full bg-red-400 animate-pulse" />
          <span className="text-[11px] uppercase tracking-[0.2em] text-red-200 font-mono">REC · {(rec.progress * 100).toFixed(0)}%</span>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
