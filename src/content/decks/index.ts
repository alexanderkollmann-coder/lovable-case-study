import type { BoothId } from '@/content/booths.config'
import type { Deck } from './types'
import { deck as vision } from './vision'
import { deck as value } from './value'
import { deck as targeting } from './targeting'
import { deck as formats } from './formats'
import { deck as gtm } from './gtm'
import { deck as measurement } from './measurement'
import { deck as scale } from './scale'

export const DECKS: Record<BoothId, Deck> = {
  vision,
  value,
  targeting,
  formats,
  gtm,
  measurement,
  scale,
}

export type { Deck, Slide } from './types'
