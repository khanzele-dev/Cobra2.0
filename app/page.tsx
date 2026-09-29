import { Entrance } from '@/components/scenes/entrance'
import { Manifesto } from '@/components/scenes/manifesto'
import { Materials } from '@/components/scenes/materials'
import { Nutrition } from '@/components/scenes/nutrition'
import { BrandsMarquee } from '@/components/scenes/brands-marquee'
import { Equipment } from '@/components/scenes/equipment'
import { Apparel } from '@/components/scenes/apparel'
import { Accessories } from '@/components/scenes/accessories'
import { Collection } from '@/components/scenes/collection'
import { Academy } from '@/components/scenes/academy'
import { HowToOrder } from '@/components/scenes/how-to-order'
import { Visit } from '@/components/scenes/visit'

// Маршрут: вход → философия → место → полки → бренды → экипировка → одежда →
// аксессуары → вся коллекция → откуда всё выросло → как купить → адрес.
export default function HomePage() {
  return (
    <>
      <Entrance />
      <Manifesto />
      <Materials />
      <Nutrition />
      <BrandsMarquee />
      <Equipment />
      <Apparel />
      <Accessories />
      <Collection />
      <Academy />
      <HowToOrder />
      <Visit />
    </>
  )
}
