import type { Group } from 'three'

/**
 * Module-scoped refs shared across the 3D scene.
 * Avoids putting per-frame transforms into Zustand (which would cause excessive re-renders).
 */
export const avatarGroupRef: { current: Group | null } = { current: null }
export const cameraTargetRef = { x: 0, y: 0, z: 0 }
