/**
 * Tiny pill at top-right that shows whether the current tab is rendering the
 * LIVE decks or the snapshotted FALLBACK decks. Click to toggle — reloads the
 * page with `?slides=old` (or removes it) so the deck choice is pinned for the
 * session and both tabs can be open side-by-side for comparison.
 */
export function SlideVersionBadge() {
  const isFallback =
    typeof window !== 'undefined' &&
    new URLSearchParams(window.location.search).get('slides') === 'old'

  function toggle() {
    const url = new URL(window.location.href)
    if (isFallback) url.searchParams.delete('slides')
    else url.searchParams.set('slides', 'old')
    window.location.href = url.toString()
  }

  return (
    <button
      onClick={toggle}
      title={isFallback ? 'Showing snapshot decks · click to switch to LIVE' : 'Showing live decks · click to switch to FALLBACK'}
      className={`pointer-events-auto fixed top-6 right-32 z-30 h-10 px-3 rounded-full glass flex items-center gap-2 transition-colors ${
        isFallback ? 'text-amber-300 hover:text-amber-200' : 'text-white/70 hover:text-white'
      }`}
    >
      <span
        className={`w-2 h-2 rounded-full ${isFallback ? 'bg-amber-400' : 'bg-emerald-400'}`}
      />
      <span className="text-[10px] uppercase tracking-[0.22em] font-mono">
        {isFallback ? 'Fallback' : 'Live'} slides
      </span>
    </button>
  )
}
