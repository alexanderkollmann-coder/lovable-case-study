import type { ReactNode } from 'react'
import { cn } from '@/lib/utils'

/* ------------------------------------------------------------------ */
/*  Reusable slide layout primitives — composed inside each deck file  */
/* ------------------------------------------------------------------ */

export function SlideShell({
  children,
  className,
  bg,
}: {
  children: ReactNode
  className?: string
  bg?: string
}) {
  return (
    <div
      className={cn(
        'w-full h-full flex flex-col px-16 py-14 relative overflow-hidden',
        className,
      )}
      style={{ background: bg }}
    >
      {children}
    </div>
  )
}

export function Eyebrow({
  children,
  color = 'currentColor',
}: {
  children: ReactNode
  color?: string
}) {
  return (
    <div
      className="text-[11px] font-mono uppercase tracking-[0.32em] opacity-70"
      style={{ color }}
    >
      {children}
    </div>
  )
}

export function BigTitle({
  children,
  accent,
}: {
  children: ReactNode
  accent?: string
}) {
  return (
    <h1
      className="font-display text-[clamp(2.4rem,5.2vw,5rem)] font-semibold leading-[0.98] tracking-tight text-balance"
      style={accent ? { color: accent } : undefined}
    >
      {children}
    </h1>
  )
}

export function Lede({ children }: { children: ReactNode }) {
  return (
    <p className="text-[clamp(1rem,1.4vw,1.4rem)] text-white/65 max-w-3xl leading-relaxed text-balance">
      {children}
    </p>
  )
}

export function Stat({
  value,
  label,
  sub,
  accent,
}: {
  value: ReactNode
  label: string
  sub?: string
  accent?: string
}) {
  return (
    <div className="flex flex-col gap-1">
      <div
        className="font-display font-semibold leading-none tracking-tight"
        style={{
          fontSize: 'clamp(2.2rem,3.6vw,3.6rem)',
          color: accent ?? '#fff',
        }}
      >
        {value}
      </div>
      <div className="text-[10px] font-mono uppercase tracking-[0.28em] text-white/55 mt-2">
        {label}
      </div>
      {sub && <div className="text-xs text-white/45 mt-1">{sub}</div>}
    </div>
  )
}

export function Card({
  children,
  accent,
  className,
}: {
  children: ReactNode
  accent?: string
  className?: string
}) {
  return (
    <div
      className={cn(
        'rounded-xl p-5 border bg-white/[0.03] backdrop-blur-sm',
        className,
      )}
      style={{
        borderColor: accent ? `${accent}33` : 'rgba(255,255,255,0.08)',
      }}
    >
      {children}
    </div>
  )
}

export function GridBg({ accent }: { accent: string }) {
  return (
    <div
      className="absolute inset-0 pointer-events-none opacity-[0.07]"
      style={{
        backgroundImage: `linear-gradient(${accent} 1px, transparent 1px), linear-gradient(90deg, ${accent} 1px, transparent 1px)`,
        backgroundSize: '48px 48px',
        maskImage:
          'radial-gradient(ellipse at center, black 30%, transparent 80%)',
      }}
    />
  )
}

export function CornerNum(_: { n: number; total: number; accent: string }) {
  // Page count is rendered by BoothPanel chrome; suppress duplicate in-slide indicator.
  return null
}
