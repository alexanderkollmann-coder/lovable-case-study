# Reference Flywheel logos

Official company logos sourced from Wikimedia Commons for use in the
Targeting / Scale / Reference-Flywheel slides. SVG preferred; a couple
fall back to PNG where Wikimedia doesn't host an SVG.

## Files

| Slot | Company | File |
|------|---------|------|
| Anchor | Deutsche Telekom (group) | `deutsche-telekom.svg` |
| DT subsidiary | T-Mobile US | `t-mobile-us.svg` |
| DT subsidiary | T-Systems | `t-systems.svg` |
| DT subsidiary | Telekom Deutschland | `telekom-deutschland.svg` *(same magenta T)* |
| DT subsidiary | T-Labs | `t-labs.png` |
| DT subsidiary | Magenta Austria + CEE | `magenta-austria.svg` |
| DAX 40 (T.Capital) | Siemens | `siemens.svg` |
| DAX 40 (T.Capital) | Allianz | `allianz.svg` |
| DAX 40 (T.Capital) | BMW | `bmw.svg` |
| DAX 40 (T.Capital) | BASF | `basf.svg` |
| DAX 40 (T.Capital) | Lufthansa | `lufthansa.svg` |
| DAX 40 (T.Capital) | Deutsche Bank | `deutsche-bank.svg` |
| T-Systems client | Shell | `shell.svg` |
| T-Systems client | Airbus | `airbus.svg` |
| T-Systems client | Deutsche Bahn | `deutsche-bahn.svg` |
| T-Systems client | E.ON | `eon.svg` |
| T-Systems client | Linde | `linde.png` |

All paths are relative to `/logos/` when used from the app.

## Usage

```tsx
import logos from '@/content/logos'

<img src={logos.siemens} alt="Siemens" className="h-8" />
```

See `src/content/logos.ts` for the typed manifest.
