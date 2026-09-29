/**
 * Надпись 13 COBRA в широком гротеске, «A» без перекладины — как на стальной панели в магазине.
 * Временная замена: как только будет SVG логотипа, подставить его сюда.
 */
export function Wordmark({ number = true, className = '' }: { number?: boolean; className?: string }) {
  return (
    <span role="img" aria-label={number ? '13 COBRA' : 'COBRA'} className={`wordmark inline-flex items-baseline whitespace-nowrap ${className}`}>
      {number && <span aria-hidden="true" className="mr-[0.5em]">13</span>}
      <span aria-hidden="true">COBR</span>
      <svg aria-hidden="true" viewBox="0 0 100 100" preserveAspectRatio="none" className="inline-block h-[0.72em] w-[0.86em] overflow-visible">
        <polyline points="5,100 50,7 95,100" fill="none" stroke="currentColor" strokeWidth="12" strokeLinejoin="miter" />
      </svg>
    </span>
  )
}
