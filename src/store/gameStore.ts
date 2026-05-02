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

  setTimeline: (t: Timeline) => void
  beginTransitionTo: (t: Timeline) => void
  finishTransition: () => void

  openBooth: (id: BoothId) => void
  closeBooth: () => void

  toggleSound: () => void
  dismissHint: () => void

  setAvatarTarget: (target: Vec3 | null) => void
}

export const useGameStore = create<GameState>((set, get) => ({
  timeline: 'hack',
  pendingTimeline: null,
  isTransitioning: false,
  activeBoothId: null,
  soundOn: true,
  hasSeenHint: false,
  avatarTarget: null,

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
}))
