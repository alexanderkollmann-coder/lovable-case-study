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
    position: [-19.5, 0, -9.5],
    rotation: 0,
    label: 'Vision',
    subtitle: 'Seeing is believing.',
    accent: '#5e88ff',
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
  {
    id: 'formats',
    timeline: 'pre',
    position: [-11, 0, -3],
    rotation: -1.1,
    label: 'Stakeholders',
    subtitle: 'Who is involved, when. Memory is environment.',
    accent: '#5e88ff',
    iconName: 'layout',
    load: () => import('./booths/03-formats.md?raw'),
  },

  // ========== HACKATHON ==========
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
    id: 'measurement',
    timeline: 'post',
    position: [13, 0, 7],
    rotation: -0.5,
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
