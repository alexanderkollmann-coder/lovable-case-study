import type { ReactNode } from 'react'

export interface Slide {
  id: string
  /** Optional kicker shown in top-left of slide chrome */
  kicker?: string
  render: () => ReactNode
}

export type Deck = Slide[]
