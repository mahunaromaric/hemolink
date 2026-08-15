import type { Centre } from '../types'

/** Calcule le statut d'ouverture d'un centre à un instant donné. */
export function isOpenNow(centre: Centre, now: Date = new Date()): boolean {
  const day = now.getDay()
  const hour = now.getHours() + now.getMinutes() / 60
  if (!centre.days.includes(day)) return false
  return hour >= centre.open && hour < centre.close
}
