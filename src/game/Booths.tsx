import boothMeta from '@/content/booths.config'
import { Booth } from './Booth'

export function Booths() {
  return (
    <group>
      {boothMeta.map((b) => (
        <Booth key={b.id} meta={b} />
      ))}
    </group>
  )
}
