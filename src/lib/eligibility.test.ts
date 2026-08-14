import { describe, expect, it } from 'vitest'
import {
  addMonths,
  checkEligibility,
  formatDateFr,
} from './eligibility'

const today = new Date('2026-08-14T10:00:00')

describe('checkEligibility', () => {
  it('éligible si tous les critères sont validés', () => {
    expect(
      checkEligibility({ age: 25, weightKg: 70, gender: 'M', lastDonationDate: null }, today),
    ).toEqual({ status: 'eligible' })
  })

  it('éligible à la limite basse (18 ans, 50 kg)', () => {
    expect(
      checkEligibility({ age: 18, weightKg: 50, gender: 'F', lastDonationDate: null }, today),
    ).toEqual({ status: 'eligible' })
  })

  it('éligible à la limite haute (65 ans)', () => {
    expect(
      checkEligibility({ age: 65, weightKg: 55, gender: 'M', lastDonationDate: null }, today),
    ).toEqual({ status: 'eligible' })
  })

  it('non éligible sous 18 ans avec motif âge', () => {
    const res = checkEligibility({ age: 17, weightKg: 70, gender: 'M', lastDonationDate: null }, today)
    expect(res.status).toBe('ineligible')
    if (res.status === 'ineligible') expect(res.blocking).toBe('age')
  })

  it('non éligible au-delà de 65 ans avec motif âge', () => {
    const res = checkEligibility({ age: 66, weightKg: 70, gender: 'F', lastDonationDate: null }, today)
    expect(res.status).toBe('ineligible')
    if (res.status === 'ineligible') expect(res.blocking).toBe('age')
  })

  it('non éligible sous 50 kg avec motif poids', () => {
    const res = checkEligibility({ age: 30, weightKg: 49, gender: 'M', lastDonationDate: null }, today)
    expect(res.status).toBe('ineligible')
    if (res.status === 'ineligible') expect(res.blocking).toBe('weight')
  })

  it('éligible si aucun don antérieur malgré la condition de délai', () => {
    expect(
      checkEligibility({ age: 30, weightKg: 70, gender: 'F', lastDonationDate: null }, today),
    ).toEqual({ status: 'eligible' })
  })

  it('délai respecté pour un homme (3 mois écoulés)', () => {
    const last = addMonths(today, -3)
    expect(checkEligibility({ age: 30, weightKg: 70, gender: 'M', lastDonationDate: last.toISOString() }, today).status).toBe('eligible')
  })

  it('délai non écoulé pour un homme → différé avec prochaine date', () => {
    const last = addMonths(today, -2)
    const res = checkEligibility({ age: 30, weightKg: 70, gender: 'M', lastDonationDate: last.toISOString() }, today)
    expect(res.status).toBe('deferred')
    if (res.status === 'deferred') {
      expect(res.nextEligibleDate.getTime()).toBe(addMonths(last, 3).getTime())
    }
  })

  it('délai non écoulé pour une femme → 4 mois', () => {
    const last = addMonths(today, -3)
    const res = checkEligibility({ age: 30, weightKg: 70, gender: 'F', lastDonationDate: last.toISOString() }, today)
    expect(res.status).toBe('deferred')
    if (res.status === 'deferred') {
      expect(res.nextEligibleDate.getTime()).toBe(addMonths(last, 4).getTime())
    }
  })

  it('champs manquants → non éligible avec message explicite', () => {
    const res = checkEligibility({ age: null, weightKg: 70, gender: 'M', lastDonationDate: null }, today)
    expect(res.status).toBe('ineligible')
  })
})

describe('formatDateFr', () => {
  it('formate une date en français', () => {
    expect(formatDateFr(new Date('2026-11-14'))).toBe('14 novembre 2026')
  })
})
