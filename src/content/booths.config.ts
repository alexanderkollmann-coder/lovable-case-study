import type { Timeline, Vec3 } from '@/store/gameStore'

export type BoothId =
  | 'vision'
  | 'value'
  | 'targeting'
  | 'formats'
  | 'execution'
  | 'gtm'
  | 'measurement'
  | 'scale'

export interface BoothMeta {
  id: BoothId
  timeline: Timeline
  position: Vec3
  rotation?: number
  label: string
  subtitle: string
  accent: string
  iconName:
    | 'target'
    | 'users'
    | 'sparkles'
    | 'layout'
    | 'zap'
    | 'trending-up'
    | 'gauge'
  load: () => Promise<{ default: string }>
}

const booths: BoothMeta[] = [
  // ========== PRE-HACKATHON ==========
  {
    id: 'vision',
    timeline: 'pre',
    position: [-22, 0, -2],
    rotation: Math.PI / 2,
    label: 'Vision',
    subtitle: 'Seeing is believing.',
    accent: '#ff4d7a',
    iconName: 'sparkles',
    load: () => import('./booths/01-value-proposition.md?raw'),
  },
  {
    id: 'value',
    timeline: 'pre',
    position: [-17, 0, -9.5],
    rotation: 0,
    label: 'Value Prop',
    subtitle: 'What an enterprise gets. What Lovable gets.',
    accent: '#5e88ff',
    iconName: 'sparkles',
    load: () => import('./booths/01-value-proposition.md?raw'),
  },
  {
    id: 'targeting',
    timeline: 'pre',
    position: [-13, 0, 7],
    rotation: -0.4,
    label: 'Targeting',
    subtitle: 'How we choose. And the anchor.',
    accent: '#7aa1ff',
    iconName: 'target',
    load: () => import('./booths/02-targeting.md?raw'),
  },

  // ========== HACKATHON ==========
  {
    id: 'formats',
    timeline: 'hack',
    // Tucked into the back-left corner where the red banner used to hang
    position: [-7, 0, -8.5],
    rotation: 0.3,
    label: 'Stakeholders',
    subtitle: 'Who runs what, and when. Memory is environment.',
    accent: '#ff7596',
    iconName: 'layout',
    load: () => import('./booths/03-formats.md?raw'),
  },
  {
    id: 'execution',
    timeline: 'hack',
    position: [-5, 0, 8],
    rotation: -0.2,
    label: 'Format',
    subtitle: 'Goal × Audience. We picked Peer Studios.',
    accent: '#ff4d7a',
    iconName: 'zap',
    load: () => import('./booths/04-execution.md?raw'),
  },

  // ========== POST-HACKATHON ==========
  {
    id: 'gtm',
    timeline: 'post',
    position: [13, 0, 7],
    rotation: -0.5,
    label: 'Execution',
    subtitle: 'The day — beat by beat. Hackathon → contract.',
    accent: '#34d399',
    iconName: 'users',
    load: () => import('./booths/05-gtm-motion.md?raw'),
  },
  {
    id: 'measurement',
    timeline: 'post',
    // Far back-right corner of post zone — mirroring the winner's position in hack
    position: [24, 0, -7],
    // Faces back toward the centre of the zone (world 17, 0, 0)
    rotation: -Math.PI / 4,
    label: 'Measurement',
    subtitle: 'How we know it is working.',
    accent: '#0f9b6c',
    iconName: 'gauge',
    load: () => import('./booths/06-measurement.md?raw'),
  },
  {
    id: 'scale',
    timeline: 'post',
    position: [22, 0, 5],
    rotation: -0.3,
    label: 'Scale',
    subtitle: 'The blueprint — next 20 European enterprises.',
    accent: '#6ee7b7',
    iconName: 'trending-up',
    load: () => import('./booths/07-scale.md?raw'),
  },
]

export default booths

export function getBooth(id: BoothId | null | undefined) {
  if (!id) return null
  return booths.find((b) => b.id === id) ?? null
}

export function getBoothsByTimeline(t: Timeline) {
  return booths.filter((b) => b.timeline === t)
}
