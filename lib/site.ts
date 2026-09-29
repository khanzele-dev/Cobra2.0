// Данные бренда, которые не относятся к контактам и товарам.
// null = данных пока нет: в dev на месте видна метка «нужно: …», в проде строка скрыта.

export type Stat = { label: string; value: string }

export const SITE = {
  hours: '13:00 — 23:00' as string | null,
  shopHandle: '@13_sportpit',

  // Видны на фото полок
  brands: ['Scitec Nutrition', 'Optimum Nutrition', 'Kevin Levrone', 'Rule 1', 'Ultimate Nutrition', 'Dorian Yates'],

  academy: {
    handle: '@academy_cobra',
    instagram: 'https://instagram.com/academy_cobra',
    stats: [
      { label: 'Лет залу', value: '6+' },
      { label: 'Учеников', value: '100+' },
    ] as Stat[],
  },
}
