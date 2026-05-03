import { create } from 'zustand'
import type { BoothId } from '@/content/booths.config'

export type Timeline = 'pre' | 'hack' | 'post'

export const TIMELINES: Timeline[] = ['pre', 'hack', 'post']

export const TIMELINE_INDEX: Record<Timeline, number> = {
  pre: 0,
  hack: 1,
  post: 2,
}

export const TIMELINE_LABEL: Record<Timeline, string> = {
  pre: 'PRE-HACKATHON',
  hack: 'HACKATHON',
  post: 'POST-HACKATHON',
}

export const TIMELINE_SUBTITLE: Record<Timeline, string> = {
  pre: 'Lovable London · Discovery & Targeting',
  hack: 'Game Day · The Build, Live',
  post: 'Hackathon → POC → SoW → Production',
}

export const TIMELINE_COLORS: Record<Timeline, { sky: string; ground: string; accent: string; fog: string }> = {
  pre: { sky: '#a8c5ff', ground: '#445b8c', accent: '#7aa1ff', fog: '#3d4d75' },
  hack: { sky: '#ff8da6', ground: '#8a3850', accent: '#ff5577', fog: '#5a2738' },
  post: { sky: '#9ae5c5', ground: '#2d6a52', accent: '#34d399', fog: '#234d3a' },
}

export type Vec3 = [number, number, number]

/* -------------------------------------------------------------------------- */
/*  Palette / theme system — cycles through global colour moods                */
/* -------------------------------------------------------------------------- */

export type Palette = 'cinematic' | 'boardroom' | 'sunset' | 'energetic'

export const PALETTE_ORDER: Palette[] = ['cinematic', 'boardroom', 'sunset', 'energetic']

export const PALETTES: Record<Palette, {
  name: string
  description: string
  background: string
  fog: string
  groundColor: string
  ambientIntensity: number
  ambientColor: string
  directionalIntensity: number
  directionalColor: string
  /** swatch shown on the cycle button */
  swatch: string
  /** approximate brightness — 'dark' | 'light' — for HUD adjustments */
  mood: 'dark' | 'light'
}> = {
  cinematic: {
    name: 'Cinematic',
    description: 'Dark, moody, film-like',
    background: '#0a0d18',
    fog: '#0e1422',
    groundColor: '#0a0d18',
    ambientIntensity: 0.32,
    ambientColor: '#ffffff',
    directionalIntensity: 0.75,
    directionalColor: '#ffffff',
    swatch: '#1a1f2e',
    mood: 'dark',
  },
  boardroom: {
    name: 'Boardroom',
    description: 'Light, professional, easy to read',
    background: '#e8e2d2',
    fog: '#d6cfbb',
    groundColor: '#bcb29a',
    ambientIntensity: 0.95,
    ambientColor: '#fff8ec',
    directionalIntensity: 1.1,
    directionalColor: '#fff4e0',
    swatch: '#e8e2d2',
    mood: 'light',
  },
  sunset: {
    name: 'Sunset',
    description: 'Warm gold, golden hour',
    background: '#1f0f18',
    fog: '#3a1f25',
    groundColor: '#2c1820',
    ambientIntensity: 0.55,
    ambientColor: '#ffb78a',
    directionalIntensity: 1.05,
    directionalColor: '#ffc488',
    swatch: '#ff8a4d',
    mood: 'dark',
  },
  energetic: {
    name: 'Energetic',
    description: 'Bright daylight, modern, energising',
    background: '#dceffd',
    fog: '#cce4ff',
    groundColor: '#e8e2d2',
    ambientIntensity: 1.1,
    ambientColor: '#fff8ec',
    directionalIntensity: 1.5,
    directionalColor: '#ffffff',
    swatch: '#ff7a5f',
    mood: 'light',
  },
}

/**
 * Boundaries (in world-space x) between the three timeline zones.
 * These match the zone-center spacing in World.tsx (centers at -17, 0, +17).
 */
export const ZONE_BOUNDARY_PRE_HACK = -8.5
export const ZONE_BOUNDARY_HACK_POST = 8.5

export function getTimelineForX(x: number): Timeline {
  if (x < ZONE_BOUNDARY_PRE_HACK) return 'pre'
  if (x > ZONE_BOUNDARY_HACK_POST) return 'post'
  return 'hack'
}

interface GameState {
  timeline: Timeline
  pendingTimeline: Timeline | null
  isTransitioning: boolean
  activeBoothId: BoothId | null
  soundOn: boolean
  hasSeenHint: boolean
  avatarTarget: Vec3 | null

  /** When true, the cinematic camera takes over and gameplay UI hides. */
  cinematicShotId: string | null

  /** Active visual palette. Cycle through PALETTE_ORDER. */
  palette: Palette

  /** When true, the R3F render loop is paused to save CPU/GPU while idle. */
  renderPaused: boolean
  toggleRenderPaused: () => void

  setTimeline: (t: Timeline) => void
  beginTransitionTo: (t: Timeline) => void
  finishTransition: () => void

  openBooth: (id: BoothId) => void
  closeBooth: () => void

  toggleSound: () => void
  dismissHint: () => void

  setAvatarTarget: (target: Vec3 | null) => void
  setCinematicShotId: (id: string | null) => void
  cyclePalette: () => void
}

export const useGameStore = create<GameState>((set, get) => ({
  timeline: 'hack',
  pendingTimeline: null,
  isTransitioning: false,
  activeBoothId: null,
  soundOn: true,
  hasSeenHint: false,
  avatarTarget: null,
  cinematicShotId: null,
  palette: 'energetic',

  setTimeline: (timeline) => set({ timeline, pendingTimeline: null, isTransitioning: false }),

  beginTransitionTo: (target) => {
    if (get().timeline === target || get().isTransitioning) return
    set({ pendingTimeline: target, isTransitioning: true })
  },

  finishTransition: () => {
    const { pendingTimeline } = get()
    if (pendingTimeline) {
      set({ timeline: pendingTimeline, pendingTimeline: null, isTransitioning: false })
    } else {
      set({ isTransitioning: false })
    }
  },

  openBooth: (id) => set({ activeBoothId: id }),
  closeBooth: () => set({ activeBoothId: null }),

  toggleSound: () => set((s) => ({ soundOn: !s.soundOn })),
  dismissHint: () => set({ hasSeenHint: true }),

  setAvatarTarget: (target) => set({ avatarTarget: target }),
  setCinematicShotId: (id) => set({ cinematicShotId: id }),
  cyclePalette: () =>
    set((state) => {
      const idx = PALETTE_ORDER.indexOf(state.palette)
      const next = PALETTE_ORDER[(idx + 1) % PALETTE_ORDER.length]
      return { palette: next }
    }),
}))
