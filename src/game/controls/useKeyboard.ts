import { useEffect, useRef } from 'react'

export interface KeyState {
  forward: boolean
  back: boolean
  left: boolean
  right: boolean
  interact: boolean
  /** consumed once per press; reset by caller */
  interactPressedThisFrame: boolean
}

const codeMap: Record<string, keyof KeyState | undefined> = {
  KeyW: 'forward',
  ArrowUp: 'forward',
  KeyS: 'back',
  ArrowDown: 'back',
  KeyA: 'left',
  ArrowLeft: 'left',
  KeyD: 'right',
  ArrowRight: 'right',
}

/**
 * Returns a stable ref containing the current keyboard state.
 * Read inside useFrame; never causes re-renders.
 */
export function useKeyboard() {
  const stateRef = useRef<KeyState>({
    forward: false,
    back: false,
    left: false,
    right: false,
    interact: false,
    interactPressedThisFrame: false,
  })

  useEffect(() => {
    const handleDown = (e: KeyboardEvent) => {
      const key = codeMap[e.code]
      if (key && !stateRef.current[key]) {
        stateRef.current[key] = true
      }
      if (e.code === 'KeyE') {
        if (!stateRef.current.interact) {
          stateRef.current.interactPressedThisFrame = true
        }
        stateRef.current.interact = true
      }
    }
    const handleUp = (e: KeyboardEvent) => {
      const key = codeMap[e.code]
      if (key) stateRef.current[key] = false
      if (e.code === 'KeyE') {
        stateRef.current.interact = false
      }
    }
    window.addEventListener('keydown', handleDown)
    window.addEventListener('keyup', handleUp)
    return () => {
      window.removeEventListener('keydown', handleDown)
      window.removeEventListener('keyup', handleUp)
    }
  }, [])

  return stateRef
}
