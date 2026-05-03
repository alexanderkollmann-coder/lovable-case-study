/**
 * Records the given <canvas> to a video Blob using the MediaRecorder API.
 * Tries MP4 first (Safari + Chromium on recent macOS support it natively),
 * falls back to WebM otherwise. Returns the blob and the mime type used.
 */

const PREFERRED_MIME_TYPES = [
  'video/mp4;codecs=avc1.42E01E',
  'video/mp4',
  'video/webm;codecs=vp9',
  'video/webm;codecs=vp8',
  'video/webm',
] as const

export function pickSupportedMimeType(): string {
  if (typeof MediaRecorder === 'undefined') return 'video/webm'
  for (const mime of PREFERRED_MIME_TYPES) {
    if (MediaRecorder.isTypeSupported(mime)) return mime
  }
  return 'video/webm'
}

export function extensionFor(mimeType: string): 'mp4' | 'webm' {
  return mimeType.includes('mp4') ? 'mp4' : 'webm'
}

interface RecordOptions {
  canvas: HTMLCanvasElement
  durationMs: number
  fps?: number
  bitsPerSecond?: number
  mimeType?: string
  onTick?: (elapsedMs: number) => void
}

export async function recordCanvas({
  canvas,
  durationMs,
  fps = 60,
  bitsPerSecond = 12_000_000,
  mimeType = pickSupportedMimeType(),
  onTick,
}: RecordOptions): Promise<{ blob: Blob; mimeType: string }> {
  const stream = canvas.captureStream(fps)
  const recorder = new MediaRecorder(stream, { mimeType, videoBitsPerSecond: bitsPerSecond })
  const chunks: Blob[] = []

  recorder.ondataavailable = (e) => {
    if (e.data && e.data.size > 0) chunks.push(e.data)
  }

  return new Promise<{ blob: Blob; mimeType: string }>((resolve, reject) => {
    recorder.onerror = (e) => reject(e)
    recorder.onstop = () => {
      const blob = new Blob(chunks, { type: mimeType })
      resolve({ blob, mimeType })
    }

    recorder.start(50)
    const startedAt = performance.now()

    let stopped = false
    const stopRecorder = () => {
      if (stopped) return
      stopped = true
      try {
        recorder.stop()
      } catch (e) {
        reject(e)
      }
    }

    const tick = () => {
      const elapsed = performance.now() - startedAt
      onTick?.(elapsed)
      if (elapsed >= durationMs) {
        stopRecorder()
      } else {
        requestAnimationFrame(tick)
      }
    }
    requestAnimationFrame(tick)
  })
}

export function downloadBlob(blob: Blob, filename: string) {
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = filename
  document.body.appendChild(a)
  a.click()
  document.body.removeChild(a)
  // Allow the download to start before revoking
  setTimeout(() => URL.revokeObjectURL(url), 5_000)
}
