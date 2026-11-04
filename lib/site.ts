// Данные бренда, которые не относятся к контактам и товарам.
// null = данных пока нет: в dev на месте видна метка «нужно: …», в проде строка скрыта.

export type Stat = { label: string; value: string }
/** color — цвет полосы пояса на манекене-заглушке */
export type Belt = { name: string; image: string; color: string }

export const SITE = {
  hours: '13:00 — 23:00' as string | null,
  shopHandle: '@13_sportpit',

  // Видны на фото полок
  brands: ['Scitec Nutrition', 'Optimum Nutrition', 'Kevin Levrone', 'Rule 1', 'Ultimate Nutrition', 'Dorian Yates'],

  // Сцена 13.04: фирменные пояса Cobra Academy (порядок — по рангу BJJ) и форма академии.
  equipment: {
    belts: [
      { name: 'Белый', image: '/media/belts/white.png', color: '#e9e7e2' },
      { name: 'Синий', image: '/media/belts/blue.png', color: '#2b3fb4' },
      { name: 'Пурпурный', image: '/media/belts/purple.png', color: '#5c2aa0' },
      { name: 'Коричневый', image: '/media/belts/brown.png', color: '#5e3b25' },
      { name: 'Чёрный', image: '/media/belts/black.png', color: '#0d0d0d' },
    ] as Belt[],
    uniform: {
      name: 'Форма академии',
      // null — фото манекена пока нет, в витрине заглушка. Появится файл — указать путь, например '/media/uniform.png'
      image: null as string | null,
    },
  },

  academy: {
    handle: '@academy_cobra',
    instagram: 'https://instagram.com/academy_cobra',
    stats: [
      { label: 'Лет тренерской деятельности', value: '11+' },
      { label: 'Учеников', value: '1000+' },
    ] as Stat[],
  },
}
