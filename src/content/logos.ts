/**
 * Typed manifest of Reference-Flywheel logos shipped under `public/logos/`.
 *
 * Every value is an absolute URL path that resolves correctly from any route.
 * Use these in slide decks (e.g. the Targeting / Scale / Reference-Flywheel
 * slides for the Deutsche Telekom anchor narrative) so Lovable doesn't need
 * to remember the paths.
 *
 *   import { LOGOS } from '@/content/logos'
 *   <img src={LOGOS.siemens} alt="Siemens" className="h-8 w-auto" />
 */

export const LOGOS = {
  // ────── Anchor ──────
  deutscheTelekom: '/logos/deutsche-telekom.svg',

  // ────── DT internal subsidiaries / BUs ──────
  tMobileUS: '/logos/t-mobile-us.svg',
  tSystems: '/logos/t-systems.svg',
  telekomDeutschland: '/logos/telekom-deutschland.svg',
  tLabs: '/logos/t-labs.png',
  magentaAustria: '/logos/magenta-austria.svg',

  // ────── T.Capital · DAX 40 strategic positions ──────
  siemens: '/logos/siemens.svg',
  allianz: '/logos/allianz.svg',
  bmw: '/logos/bmw.svg',
  basf: '/logos/basf.svg',
  lufthansa: '/logos/lufthansa.svg',
  deutscheBank: '/logos/deutsche-bank.svg',

  // ────── T-Systems consulting clients ──────
  shell: '/logos/shell.svg',
  airbus: '/logos/airbus.svg',
  deutscheBahn: '/logos/deutsche-bahn.svg',
  eon: '/logos/eon.svg',
  linde: '/logos/linde.png',
} as const

export type LogoKey = keyof typeof LOGOS

/** Slots used by the Reference-Flywheel slide. */
export const FLYWHEEL_GROUPS = {
  anchor: [{ name: 'Deutsche Telekom', logo: LOGOS.deutscheTelekom }],
  subsidiaries: [
    { name: 'T-Mobile US', logo: LOGOS.tMobileUS },
    { name: 'T-Systems', logo: LOGOS.tSystems },
    { name: 'Telekom Deutschland', logo: LOGOS.telekomDeutschland },
    { name: 'T-Labs', logo: LOGOS.tLabs },
    { name: 'Magenta Austria + CEE', logo: LOGOS.magentaAustria },
  ],
  daxStrategic: [
    { name: 'Siemens', logo: LOGOS.siemens },
    { name: 'Allianz', logo: LOGOS.allianz },
    { name: 'BMW', logo: LOGOS.bmw },
    { name: 'BASF', logo: LOGOS.basf },
    { name: 'Lufthansa', logo: LOGOS.lufthansa },
    { name: 'Deutsche Bank', logo: LOGOS.deutscheBank },
  ],
  tSystemsClients: [
    { name: 'Shell', logo: LOGOS.shell },
    { name: 'Airbus', logo: LOGOS.airbus },
    { name: 'Deutsche Bahn', logo: LOGOS.deutscheBahn },
    { name: 'E.ON', logo: LOGOS.eon },
    { name: 'Linde', logo: LOGOS.linde },
  ],
} as const

export default LOGOS
