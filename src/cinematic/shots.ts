import type { Timeline } from '@/store/gameStore'

export interface CameraKey {
  /** time-fraction within the shot (0..1) */
  t: number
  pos: [number, number, number]
  lookAt: [number, number, number]
  /** orthographic zoom — bigger number = tighter framing */
  zoom?: number
}

export interface Shot {
  id: string
  name: string
  description: string
  /** seconds */
  duration: number
  /** which timeline state the world should be in for this shot */
  timeline: Timeline
  /** suggested filename (no extension) */
  filename: string
  keys: CameraKey[]
}

export const SHOTS: Shot[] = [
  {
    id: 'hack-dolly',
    name: 'Hackathon · back-to-front dolly',
    description:
      'Wide opener — camera starts above the billboard at the back of the room, dolly forward through the desks, drop down past the audience risers, and finish low at the trophy podium.',
    duration: 9,
    timeline: 'hack',
    filename: '01-hackathon-dolly',
    keys: [
      { t: 0.0, pos: [0, 9.5, -14], lookAt: [0, 2, 0], zoom: 38 },
      { t: 0.45, pos: [0, 6, -2], lookAt: [0, 1.5, 4], zoom: 52 },
      { t: 1.0, pos: [0, 2.6, 11], lookAt: [0, 0.8, -8], zoom: 64 },
    ],
  },
  {
    id: 'world-overview',
    name: 'World · diagonal three-zone reveal',
    description:
      'High diagonal pan that frames all three zones at once. Drifts from London on the left, across the hackathon arena, to the command center on the right. Use as the establishing shot.',
    duration: 11,
    timeline: 'hack',
    filename: '02-world-overview',
    keys: [
      { t: 0.0, pos: [-26, 23, 22], lookAt: [-17, 0, -2], zoom: 24 },
      { t: 0.5, pos: [0, 22, 24], lookAt: [0, 0, -2], zoom: 22 },
      { t: 1.0, pos: [26, 23, 22], lookAt: [17, 0, -2], zoom: 24 },
    ],
  },
  {
    id: 'london-pullback',
    name: 'London · Big Ben + the Eye pullback',
    description:
      'Starts tight on the London skyline (Big Ben tower in frame, the Eye rotating beside it), then pulls back and tilts down to reveal the office floor below.',
    duration: 9,
    timeline: 'pre',
    filename: '03-london-pullback',
    keys: [
      { t: 0.0, pos: [-21, 5, -3], lookAt: [-17, 5, -13], zoom: 80 },
      { t: 0.6, pos: [-19, 6, 4], lookAt: [-17, 4, -10], zoom: 56 },
      { t: 1.0, pos: [-13, 9, 14], lookAt: [-17, 2, -6], zoom: 38 },
    ],
  },
  {
    id: 'pitch-pushin',
    name: 'Pitch · Alex presenting to Ryan, Kali & Monica',
    description:
      'Push-in shot of the London office meeting room. Opens wide over the audience\'s shoulders, ends close on Alex pitching at the metrics whiteboard.',
    duration: 8,
    timeline: 'pre',
    filename: '04-pitch-pushin',
    keys: [
      { t: 0.0, pos: [-13.5, 4.6, 3], lookAt: [-19, 1.5, -8], zoom: 60 },
      { t: 0.5, pos: [-15, 3.6, -1], lookAt: [-19, 1.6, -8], zoom: 70 },
      { t: 1.0, pos: [-17.6, 2.6, -3.4], lookAt: [-19, 1.6, -8.5], zoom: 88 },
    ],
  },
  {
    id: 'hack-team-orbit',
    name: 'Hackathon · team orbit',
    description:
      'Side-to-side track around the Hackathon Team — three builders hunched over laptops at centre stage. Shows the cross-functional energy without lingering on a single face.',
    duration: 9,
    timeline: 'hack',
    filename: '05-hack-team-orbit',
    keys: [
      { t: 0.0, pos: [5, 2.4, 5.6], lookAt: [0, 1.0, 1], zoom: 70 },
      { t: 0.5, pos: [0, 2.6, 5.8], lookAt: [0, 1.0, 1], zoom: 78 },
      { t: 1.0, pos: [-5, 2.4, 5.6], lookAt: [0, 1.0, 1], zoom: 70 },
    ],
  },
  {
    id: 'winner-reveal',
    name: 'Winner · low-angle reveal',
    description:
      'Hero shot of the winner — low-angle push from the trophy podium up to the celebrant with arms raised, "WINNER!" screen pulsing behind them.',
    duration: 7,
    timeline: 'hack',
    filename: '06-winner-reveal',
    keys: [
      { t: 0.0, pos: [-2.5, 0.6, 14], lookAt: [0, 1.5, 9], zoom: 52 },
      { t: 0.55, pos: [0, 1.6, 12.2], lookAt: [0, 1.8, 9], zoom: 70 },
      { t: 1.0, pos: [0, 2.8, 11], lookAt: [0, 1.7, 9], zoom: 90 },
    ],
  },
]

const easeInOut = (t: number) => (t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2)

export function sampleShot(
  shot: Shot,
  t: number
): { pos: [number, number, number]; lookAt: [number, number, number]; zoom: number } {
  const tt = Math.max(0, Math.min(1, t))
  let i = 0
  while (i < shot.keys.length - 1 && shot.keys[i + 1].t < tt) i++
  const a = shot.keys[i]
  const b = shot.keys[Math.min(i + 1, shot.keys.length - 1)]
  if (a === b) return { pos: a.pos, lookAt: a.lookAt, zoom: a.zoom ?? 60 }
  const span = b.t - a.t
  const local = span > 0 ? (tt - a.t) / span : 0
  const e = easeInOut(local)
  const za = a.zoom ?? 60
  const zb = b.zoom ?? za
  return {
    pos: [a.pos[0] + (b.pos[0] - a.pos[0]) * e, a.pos[1] + (b.pos[1] - a.pos[1]) * e, a.pos[2] + (b.pos[2] - a.pos[2]) * e],
    lookAt: [
      a.lookAt[0] + (b.lookAt[0] - a.lookAt[0]) * e,
      a.lookAt[1] + (b.lookAt[1] - a.lookAt[1]) * e,
      a.lookAt[2] + (b.lookAt[2] - a.lookAt[2]) * e,
    ],
    zoom: za + (zb - za) * e,
  }
}
