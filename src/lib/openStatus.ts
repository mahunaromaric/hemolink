import type { Centre } from '../types'

export interface OpenStatus {
  open: boolean
  todayHours: { open: string; close: string } | null
}

function parseTime(hhmm: string): number {
  const [h, m] = hhmm.split(':').map(Number)
  return h * 60 + m
}

/** Calcule le statut d'ouverture d'un centre à un instant donné. */
export function getOpenStatus(centre: Centre, now: Date = new Date()): OpenStatus {
  const todayHours = centre.hours[now.getDay()] ?? null
  if (!todayHours) return { open: false, todayHours: null }

  const current = now.getHours() * 60 + now.getMinutes()
  return {
    open: current >= parseTime(todayHours.open) && current < parseTime(todayHours.close),
    todayHours,
  }
}

export function formatHoursLabel(todayHours: { open: string; close: string } | null): string {
  if (!todayHours) return 'Fermé aujourd\u2019hui'
  return `${todayHours.open} – ${todayHours.close}`
}
