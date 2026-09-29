export type Group = 'protein' | 'creatine' | 'preworkout' | 'equipment' | 'apparel' | 'accessories'

export type Product = {
  slug: string
  name: string
  group: Group
  category: string
  /** null — цена уточняется в магазине, не выдумываем */
  price: number | null
  short: string
  description: string
  image: string
  /** crop — половина кадра, когда на одном фото и перед, и спина */
  gallery: { src: string; label: string; crop?: 'left' | 'right' }[]
  specs: { label: string; value: string }[]
  options?: { label: string; values: string[] }
}

export const GROUPS: { key: Group; label: string }[] = [
  { key: 'protein', label: 'Протеин' },
  { key: 'creatine', label: 'Креатин' },
  { key: 'preworkout', label: 'Предтренировочные комплексы' },
  { key: 'equipment', label: 'Экипировка' },
  { key: 'apparel', label: 'Одежда' },
  { key: 'accessories', label: 'Аксессуары' },
]

export const products: Product[] = [
  {
    slug: 'whey-protein-black',
    name: 'Сывороточный протеин Black',
    group: 'protein',
    category: 'Протеин',
    price: 2990,
    short: 'Сывороточный протеин премиум-класса, 900 г',
    description:
      'Высококачественный сывороточный протеин с содержанием 24 г белка на порцию. Быстрое усвоение, поддержка роста и восстановления мышц. Идеально после тренировки.',
    image: '/products/protein.png',
    gallery: [{ src: '/products/protein.png', label: 'Упаковка' }],
    specs: [
      { label: 'Вес', value: '900 г' },
      { label: 'Белок на порцию', value: '24 г' },
      { label: 'Порций', value: '30' },
      { label: 'Вкус', value: 'Шоколад' },
    ],
  },
  {
    slug: 'bcaa-recovery',
    name: 'BCAA 2:1:1',
    group: 'protein',
    category: 'Аминокислоты',
    price: 1890,
    short: 'Аминокислоты для восстановления, 400 г',
    description:
      'Комплекс незаменимых аминокислот в соотношении 2:1:1 для защиты мышц от разрушения и ускоренного восстановления. Принимать во время и после тренировки.',
    image: '/products/bcaa.png',
    gallery: [{ src: '/products/bcaa.png', label: 'Упаковка' }],
    specs: [
      { label: 'Вес', value: '400 г' },
      { label: 'Соотношение', value: '2:1:1' },
      { label: 'Порций', value: '40' },
      { label: 'Вкус', value: 'Лесные ягоды' },
    ],
  },
  {
    slug: 'creatine-monohydrate',
    name: 'Креатин моногидрат',
    group: 'creatine',
    category: 'Креатин',
    price: 1490,
    short: 'Чистый креатин моногидрат, 300 г',
    description:
      'Микронизированный креатин моногидрат для увеличения силы, выносливости и объёма мышц. Без примесей и добавок.',
    image: '/products/creatine.png',
    gallery: [{ src: '/products/creatine.png', label: 'Упаковка' }],
    specs: [
      { label: 'Вес', value: '300 г' },
      { label: 'Порция', value: '5 г' },
      { label: 'Порций', value: '60' },
      { label: 'Форма', value: 'Порошок' },
    ],
  },
  {
    slug: 'pre-workout-venom',
    name: 'Venom',
    group: 'preworkout',
    category: 'Предтренировочный комплекс',
    price: 2490,
    short: 'Предтренировочный комплекс, 360 г',
    description:
      'Энергия, фокус и накачка на всю тренировку. Содержит кофеин, бета-аланин и цитруллин. Для тех, кто выкладывается на максимум.',
    image: '/products/preworkout.png',
    gallery: [{ src: '/products/preworkout.png', label: 'Упаковка' }],
    specs: [
      { label: 'Вес', value: '360 г' },
      { label: 'Кофеин', value: '300 мг' },
      { label: 'Порций', value: '30' },
      { label: 'Вкус', value: 'Кола' },
    ],
  },
  {
    slug: 'compression-rashguard',
    name: 'Рашгард Cobra',
    group: 'equipment',
    category: 'Экипировка · BJJ',
    price: 3490,
    short: 'Компрессионный рашгард с длинным рукавом',
    description:
      'Компрессионный рашгард из влагоотводящей ткани. Поддерживает мышцы и защищает кожу. Для единоборств и функционального тренинга.',
    image: '/products/rashguard.png',
    gallery: [{ src: '/products/rashguard.png', label: 'Спереди' }],
    specs: [
      { label: 'Материал', value: 'Полиэстер / эластан' },
      { label: 'Крой', value: 'Компрессионный' },
      { label: 'Цвет', value: 'Чёрный' },
    ],
    options: { label: 'Размер', values: ['S', 'M', 'L', 'XL', 'XXL'] },
  },
  {
    slug: 'training-kit-blue',
    name: 'Тренировочный комплект 13 COBRA',
    group: 'apparel',
    category: 'Одежда',
    price: null,
    short: 'Футболка, шорты и компрессионные тайтсы',
    description:
      'Фирменный комплект 13 COBRA: футболка реглан с градиентом от синего к чёрному, шорты со знаком бренда и компрессионные тайтсы.',
    image: '/media/apparel-kit.png',
    gallery: [
      { src: '/media/apparel-kit.png', label: 'Спереди', crop: 'left' },
      { src: '/media/apparel-kit.png', label: 'Сзади', crop: 'right' },
      { src: '/media/apparel-kit.png', label: 'Комплект' },
    ],
    specs: [
      { label: 'Состав', value: 'Футболка · шорты · тайтсы' },
      { label: 'Цвет', value: 'Синий / чёрный' },
      { label: 'Крой футболки', value: 'Реглан' },
    ],
    options: { label: 'Размер', values: ['S', 'M', 'L', 'XL', 'XXL'] },
  },
  {
    slug: 'cobra-hoodie',
    name: 'Худи Cobra',
    group: 'apparel',
    category: 'Одежда',
    price: 4990,
    short: 'Худи из плотного хлопка',
    description:
      'Плотное худи оверсайз-кроя из хлопка с начёсом. Минималистичный дизайн, мягкий капюшон и карман-кенгуру. На каждый день и после зала.',
    image: '/products/hoodie.png',
    gallery: [{ src: '/products/hoodie.png', label: 'Спереди' }],
    specs: [
      { label: 'Материал', value: '80% хлопок' },
      { label: 'Плотность', value: '380 г/м²' },
      { label: 'Крой', value: 'Оверсайз' },
    ],
    options: { label: 'Размер', values: ['S', 'M', 'L', 'XL', 'XXL'] },
  },
  {
    slug: 'cobra-shaker',
    name: 'Шейкер Cobra',
    group: 'accessories',
    category: 'Аксессуары',
    price: 690,
    short: 'Шейкер 600 мл с металлическим венчиком',
    description:
      'Прочный шейкер объёмом 600 мл с металлическим венчиком. Герметичная крышка, шкала измерения, не впитывает запахи.',
    image: '/products/shaker.png',
    gallery: [{ src: '/products/shaker.png', label: 'Общий вид' }],
    specs: [
      { label: 'Объём', value: '600 мл' },
      { label: 'Материал', value: 'Без BPA' },
      { label: 'Венчик', value: 'Металл' },
    ],
  },
  {
    slug: 'daily-vitamins',
    name: 'Витаминный комплекс',
    group: 'accessories',
    category: 'Витамины',
    price: 1290,
    short: 'Витаминно-минеральный комплекс, 90 капсул',
    description:
      'Комплекс витаминов и минералов для активных людей. Поддержка иммунитета, энергии и общего тонуса каждый день.',
    image: '/products/vitamins.png',
    gallery: [{ src: '/products/vitamins.png', label: 'Упаковка' }],
    specs: [
      { label: 'Капсул', value: '90' },
      { label: 'Приём', value: '1 в день' },
      { label: 'Курс', value: '3 месяца' },
    ],
  },
]

export const getProduct = (slug: string) => products.find((p) => p.slug === slug)

export const formatPrice = (price: number | null) =>
  price === null ? 'Цена в магазине' : `${price.toLocaleString('ru-RU').replace(/ |,/g, ' ')} ₽`
