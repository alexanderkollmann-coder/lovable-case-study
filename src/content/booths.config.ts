import type { Timeline, Vec3 } from '@/store/gameStore'

export type BoothId =
  | 'targeting'
  | 'stakeholders'
  | 'value'
  | 'formats'
  | 'execution'
  | 'scale'
  | 'measurement'

export interface BoothMeta {
  id: BoothId
  timeline: Timeline
  position: Vec3
  rotation?: number
  label: string
  subtitle: string
  accent: string // hex
  iconName:
    | 'target'
    | 'users'
    | 'sparkles'
    | 'layout'
    | 'zap'
    | 'trending-up'
    | 'gauge'
  /** path-relative module loader for content markdown */
  load: () => Promise<{ default: string }>
}

const booths: BoothMeta[] = [
  {
    id: 'targeting',
    timeline: 'pre',
    position: [-20, 0, -6],
    rotation: 0.6,
    label: 'Targeting',
    subtitle: 'Who we go after, in what order, and why',
    accent: '#7aa1ff',
    iconName: 'target',
    load: () => import('./booths/01-targeting.md?raw'),
  },
  {
    id: 'stakeholders',
    timeline: 'pre',
    position: [-13, 0, 7],
    rotation: -0.4,
    label: 'Stakeholders',
    subtitle: 'Who owns what, internally and externally',
    accent: '#5e88ff',
    iconName: 'users',
    load: () => import('./booths/02-stakeholders.md?raw'),
  },
  {
    id: 'value',
    timeline: 'hack',
    position: [-5, 0, -8],
    rotation: 0.3,
    label: 'Value Proposition',
    subtitle: 'Why an enterprise picks Lovable for this',
    accent: '#ff7596',
    iconName: 'sparkles',
    load: () => import('./booths/03-value-proposition.md?raw'),
  },
  {
    id: 'formats',
    timeline: 'hack',
    position: [0, 0, 6],
    rotation: -0.2,
    label: 'Hackathon Formats',
    subtitle: 'Half-day exec to 2-day flagship — when each fits',
    accent: '#ff4d7a',
    iconName: 'layout',
    load: () => import('./booths/04-hackathon-formats.md?raw'),
  },
  {
    id: 'execution',
    timeline: 'hack',
    position: [5, 0, -8],
    rotation: 0.5,
    label: 'Execution Strategy',
    subtitle: 'First call to 24h MOU lock-in',
    accent: '#e63366',
    iconName: 'zap',
    load: () => import('./booths/05-execution-strategy.md?raw'),
  },
  {
    id: 'scale',
    timeline: 'post',
    position: [13, 0, 7],
    rotation: -0.5,
    label: 'Scale',
    subtitle: '1:1 → 1:Few → 1:Many, without losing depth',
    accent: '#34d399',
    iconName: 'trending-up',
    load: () => import('./booths/06-scale.md?raw'),
  },
  {
    id: 'measurement',
    timeline: 'post',
    position: [20, 0, -6],
    rotation: 0.6,
    label: 'Measurement',
    subtitle: 'How we know it is working',
    accent: '#0f9b6c',
    iconName: 'gauge',
    load: () => import('./booths/07-measurement.md?raw'),
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
