/**
 * Логотип 13 COBRA из файла бренда. Картинка служит маской, цвет — currentColor,
 * поэтому знак ведёт себя как текст: красится через text-*, размер задаётся шириной.
 */
export function Logo({ className = '', width }: { className?: string; width?: string }) {
  const mask = 'url(/logo-13cobra.png) center / contain no-repeat'
  return (
    <span
      role="img"
      aria-label="13 COBRA"
      className={`inline-block aspect-[1709/333] bg-current align-middle ${className}`}
      style={{ mask, WebkitMask: mask, width }}
    />
  )
}
