export type Gender = 'M' | 'F'

export interface EligibilityInput {
  age: number | null
  weightKg: number | null
  gender: Gender
  /** date ISO du dernier don, null si aucun don antérieur */
  lastDonationDate: string | null
}

export type EligibilityResult =
  | { status: 'eligible' }
  | { status: 'ineligible'; blocking: 'age' | 'weight'; message: string }
  | { status: 'deferred'; nextEligibleDate: Date; message: string }

export const MIN_AGE = 18
export const MAX_AGE = 65
export const MIN_WEIGHT = 50
export const DELAY_MONTHS: Record<Gender, number> = { M: 3, F: 4 }

export function addMonths(date: Date, months: number): Date {
  const d = new Date(date)
  d.setMonth(d.getMonth() + months)
  return d
}

export function isDonationDelayElapsed(lastDonation: Date, gender: Gender, today: Date): boolean {
  const next = addMonths(lastDonation, DELAY_MONTHS[gender])
  return today >= next
}

function isCalendarValid(s: string): boolean {
  const d = new Date(s)
  if (Number.isNaN(d.getTime())) return false
  // Date calendaire pure (YYYY-MM-DD) : rejeter les débordements (ex. 2023-02-30)
  if (/^\d{4}-\d{2}-\d{2}$/.test(s)) {
    const [y, m, day] = s.split('-').map(Number)
    return d.getUTCFullYear() === y && d.getUTCMonth() + 1 === m && d.getUTCDate() === day
  }
  return true
}

export function checkEligibility(input: EligibilityInput, today: Date = new Date()): EligibilityResult {
  const { age, weightKg, gender, lastDonationDate } = input

  if (age === null || weightKg === null) {
    return {
      status: 'ineligible',
      blocking: 'age',
      message: 'Veuillez renseigner votre âge et votre poids pour lancer le test.',
    }
  }

  if (!Number.isFinite(age) || !Number.isFinite(weightKg) || age <= 0 || weightKg <= 0) {
    return {
      status: 'ineligible',
      blocking: 'age',
      message: 'Les valeurs renseignées sont invalides.',
    }
  }

  if (gender !== 'M' && gender !== 'F') {
    return {
      status: 'ineligible',
      blocking: 'age',
      message: 'Les informations renseignées sont invalides.',
    }
  }

  if (age < MIN_AGE || age > MAX_AGE) {
    const ageMsg =
      age < MIN_AGE
        ? `Vous devez avoir au moins ${MIN_AGE} ans pour donner votre sang (vous en avez ${age}).`
        : `Le don de sang est possible jusqu'à ${MAX_AGE} ans révolus (vous en avez ${age}).`
    return { status: 'ineligible', blocking: 'age', message: ageMsg }
  }

  if (weightKg < MIN_WEIGHT) {
    return {
      status: 'ineligible',
      blocking: 'weight',
      message: `Un poids minimum de ${MIN_WEIGHT} kg est nécessaire pour garantir votre sécurité (poids renseigné : ${weightKg} kg).`,
    }
  }

  // Aucun don antérieur → condition de délai considérée comme remplie
  if (lastDonationDate === null) {
    return { status: 'eligible' }
  }

  const lastDonation =
    typeof lastDonationDate === 'string' ? new Date(lastDonationDate) : new Date(NaN)
  if (
    Number.isNaN(lastDonation.getTime()) ||
    !isCalendarValid(lastDonationDate) ||
    lastDonation > today
  ) {
    return {
      status: 'ineligible',
      blocking: 'age',
      message: 'La date de dernier don est invalide ou dans le futur.',
    }
  }

  if (isDonationDelayElapsed(lastDonation, gender, today)) {
    return { status: 'eligible' }
  }

  const nextEligibleDate = addMonths(lastDonation, DELAY_MONTHS[gender])
  return {
    status: 'deferred',
    nextEligibleDate,
    message: `Le délai minimum entre deux dons est de ${DELAY_MONTHS[gender]} mois. Vous pourrez de nouveau donner à partir du :`,
  }
}

export function formatDateFr(date: Date): string {
  return new Intl.DateTimeFormat('fr-FR', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  }).format(date)
}
