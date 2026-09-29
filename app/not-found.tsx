import Link from 'next/link'

export default function NotFound() {
  return (
    <section className="flex min-h-[80svh] flex-col items-start justify-center px-5 md:px-10">
      <p className="label text-bone/45">Ошибка 404</p>
      <h1 className="display mt-6 text-[clamp(3.5rem,12vw,12rem)]">Здесь пусто</h1>
      <Link href="/catalog" className="label link-u mt-10">В каталог →</Link>
    </section>
  )
}
