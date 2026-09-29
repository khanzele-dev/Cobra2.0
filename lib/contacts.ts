export const PHONE = '8 988 214-13-13'
export const PHONE_HREF = 'tel:+79882141313'
export const WHATSAPP_URL = 'https://wa.me/79882141313'
export const TELEGRAM_HANDLE = '@SportPitCOBRA13'
export const TELEGRAM_URL = 'https://t.me/SportPitCOBRA13'
export const INSTAGRAM_URL = 'https://instagram.com/13_sportpit'

export const ADDRESS = 'ул. Кавказская, 16а'
export const CITY = 'Каспийск'
export const ADDRESS_FULL = `${CITY}, ${ADDRESS}`
export const MAP_URL = `https://yandex.ru/maps/?text=${encodeURIComponent(ADDRESS_FULL)}`

export const LOCATION = `${CITY} · ${ADDRESS}`

export function orderUrl(productName: string, option?: string, qty = 1) {
  const parts = [`Здравствуйте! Хочу заказать: ${productName}`]
  if (option) parts.push(`вариант: ${option}`)
  parts.push(`количество: ${qty}`)
  return `${WHATSAPP_URL}?text=${encodeURIComponent(parts.join(', '))}`
}
