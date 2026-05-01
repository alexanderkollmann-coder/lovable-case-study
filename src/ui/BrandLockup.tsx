export function BrandLockup() {
  return (
    <div className="pointer-events-none fixed top-6 left-6 flex items-center gap-2.5">
      <div
        className="w-7 h-7 rounded-md flex items-center justify-center"
        style={{
          background: 'linear-gradient(135deg, #ff4d7a 0%, #ff7596 100%)',
          boxShadow: '0 0 16px rgba(255, 77, 122, 0.55)',
        }}
      >
        <svg viewBox="0 0 24 24" className="w-4 h-4 text-white" fill="currentColor">
          <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
        </svg>
      </div>
      <div className="flex flex-col leading-tight">
        <span className="text-[10px] uppercase tracking-[0.22em] text-white/40 font-mono">Lovable · Case Study</span>
        <span className="text-sm text-white/85 font-display font-semibold tracking-tight">
          Hackathon Explorer
        </span>
      </div>
    </div>
  )
}
