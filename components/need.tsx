/** Метка недостающих данных. Видна только в dev — в проде ничего не рендерит. */
export function Need({ what }: { what: string }) {
  if (process.env.NODE_ENV === 'production') return null
  return (
    <span className="label inline-block border border-dashed border-amber-200/40 px-2 py-1 normal-case tracking-normal text-amber-100/70">
      нужно: {what}
    </span>
  )
}
