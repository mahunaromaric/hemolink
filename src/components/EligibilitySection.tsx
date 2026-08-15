import { useState } from 'react'
import type { FormEvent } from 'react'
import { Icon } from './Icon'
import {
  checkEligibility,
  formatDateFr,
  type EligibilityResult,
} from '../lib/eligibility'
import type { Gender } from '../lib/eligibility'
import Reveal from './Reveal'

type FieldErrors = Partial<Record<'age' | 'weight' | 'date', string>>

const resultStyles: Record<
  EligibilityResult['status'],
  { box: string; icon: string; title: string }
> = {
  eligible: {
    box: 'bg-sage-tint text-[#2E4A38]',
    icon: 'check-circle',
    title: 'Vous semblez éligible',
  },
  ineligible: {
    box: 'bg-red-tint text-[#6E1120]',
    icon: 'x-circle',
    title: 'Non éligible pour le moment',
  },
  deferred: {
    box: 'bg-amber-tint text-[#6E4A22]',
    icon: 'hourglass',
    title: 'Presque prêt — patience',
  },
}

export default function EligibilitySection() {
  const [age, setAge] = useState('')
  const [weight, setWeight] = useState('')
  const [gender, setGender] = useState<Gender>('M')
  const [lastDonation, setLastDonation] = useState('')
  const [neverDonated, setNeverDonated] = useState(true)

  const [result, setResult] = useState<EligibilityResult | null>(null)
  const [errors, setErrors] = useState<FieldErrors>({})
  const [checked, setChecked] = useState(false)

  const validate = (): boolean => {
    const errs: FieldErrors = {}
    const a = Number(age)
    const w = Number(weight)

    if (!age || Number.isNaN(a) || a <= 0 || a > 120) errs.age = 'Âge invalide (0 à 120).'
    if (!weight || Number.isNaN(w) || w <= 0 || w > 300) errs.weight = 'Poids invalide.'

    if (!neverDonated && lastDonation) {
      if (Number.isNaN(new Date(lastDonation).getTime()))
        errs.date = 'Date invalide.'
      else if (new Date(lastDonation) > new Date())
        errs.date = 'La date ne peut pas être dans le futur.'
    }
    setErrors(errs)
    return Object.keys(errs).length === 0
  }

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
    setChecked(true)
    if (!validate()) {
      setResult(null)
      return
    }
    const res = checkEligibility(
      {
        age: Number(age),
        weightKg: Number(weight),
        gender,
        lastDonationDate: neverDonated ? null : lastDonation || null,
      },
      new Date(),
    )
    setResult(res)
    setChecked(true)
  }

  const style = result ? resultStyles[result.status] : null
  const showError = checked && Object.keys(errors).length > 0

  return (
    <section id="eligibilite" className="py-16 sm:py-22">
      <Reveal className="max-w-6xl mx-auto px-4 sm:px-7">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-14 items-start">
          <div>
            <div className="eyebrow mb-4">
              <Icon name="clipboardCheck" size={14} />
              Qui peut donner
            </div>
            <h2 className="text-3xl sm:text-4xl mb-4">
              Vérifiez votre situation en moins d'une minute.
            </h2>
            <p className="text-[1.02rem] text-ink-soft">
              Ce simulateur donne une première indication basée sur les
              critères généraux. Il ne remplace pas l'entretien médical
              réalisé sur place, seul habilité à confirmer votre aptitude au
              don.
            </p>
            <div className="mt-8 rounded-2xl bg-teal-soft border border-line p-5">
              <ul className="space-y-3">
                <li className="flex items-center gap-3 text-sm">
                  <Icon name="droplets" size={18} className="text-secondary shrink-0" />
                  Don gratuit et anonyme
                </li>
                <li className="flex items-center gap-3 text-sm">
                  <Icon name="clock" size={18} className="text-secondary shrink-0" />
                  Environ 10 minutes sur place
                </li>
                <li className="flex items-center gap-3 text-sm">
                  <Icon name="heart-pulse" size={18} className="text-secondary shrink-0" />
                  Entretien médical confidentiel
                </li>
              </ul>
            </div>
          </div>

          <div className="relative overflow-hidden bg-white border border-line rounded-3xl shadow-card p-6 sm:p-10">
            <Icon
              name="heart-pulse"
              size={150}
              className="absolute -right-8 -top-8 text-secondary opacity-[0.06] pointer-events-none"
              aria-hidden="true"
            />
            <form id="eligibilityForm" onSubmit={handleSubmit} noValidate className="space-y-5">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label htmlFor="age" className="block text-[0.82rem] font-semibold mb-1.5">
                  Âge (années)
                </label>
                <input
                  type="number"
                  id="age"
                  name="age"
                  inputMode="numeric"
                  min="0"
                  max="120"
                  placeholder="Ex. 27"
                  value={age}
                  onChange={(e) => setAge(e.target.value)}
                  aria-invalid={!!errors.age}
                  aria-describedby={errors.age ? 'age-error' : undefined}
                  className={`w-full px-3.5 py-2.5 border-[1.5px] rounded-lg text-sm focus:outline-none focus:border-secondary ${
                    errors.age ? 'border-primary bg-red-tint' : 'border-line bg-white'
                  }`}
                />
                {errors.age && (
                  <p id="age-error" className="mt-1 text-xs text-red-deep" role="alert">
                    {errors.age}
                  </p>
                )}
              </div>

              <div>
                <label htmlFor="weight" className="block text-[0.82rem] font-semibold mb-1.5">
                  Poids (kg)
                </label>
                <input
                  type="number"
                  id="weight"
                  name="weight"
                  inputMode="decimal"
                  min="0"
                  max="300"
                  step="0.5"
                  placeholder="Ex. 62"
                  value={weight}
                  onChange={(e) => setWeight(e.target.value)}
                  aria-invalid={!!errors.weight}
                  aria-describedby={errors.weight ? 'weight-error' : undefined}
                  className={`w-full px-3.5 py-2.5 border-[1.5px] rounded-lg text-sm focus:outline-none focus:border-secondary ${
                    errors.weight ? 'border-primary bg-red-tint' : 'border-line bg-white'
                  }`}
                />
                {errors.weight && (
                  <p id="weight-error" className="mt-1 text-xs text-red-deep" role="alert">
                    {errors.weight}
                  </p>
                )}
              </div>
            </div>

            <div>
              <p className="text-[0.82rem] font-semibold mb-1.5">Sexe</p>
              <div className="flex gap-2.5">
                {(['M', 'F'] as Gender[]).map((g) => (
                  <label
                    key={g}
                    className={`flex items-center gap-2 border-[1.5px] rounded-full px-4 py-2 text-sm cursor-pointer transition-colors ${
                      gender === g
                        ? 'border-secondary bg-teal-soft'
                        : 'border-line'
                    }`}
                  >
                    <input
                      type="radio"
                      name="gender"
                      value={g}
                      checked={gender === g}
                      onChange={() => setGender(g)}
                      className="accent-secondary"
                    />
                    {g === 'M' ? 'Homme' : 'Femme'}
                  </label>
                ))}
              </div>
            </div>

            <label className="flex items-center gap-2.5 text-sm text-ink-soft cursor-pointer">
              <input
                type="checkbox"
                id="neverDonated"
                checked={neverDonated}
                onChange={(e) => {
                  setNeverDonated(e.target.checked)
                  if (e.target.checked) setLastDonation('')
                }}
                className="accent-primary"
              />
              Je n'ai jamais donné mon sang
            </label>

            <div>
              <label htmlFor="lastDonation" className="block text-[0.82rem] font-semibold mb-1.5">
                Date de mon dernier don
              </label>
              <input
                type="date"
                id="lastDonation"
                name="lastDonation"
                max={new Date().toISOString().slice(0, 10)}
                value={lastDonation}
                onChange={(e) => setLastDonation(e.target.value)}
                disabled={neverDonated}
                aria-invalid={!!errors.date}
                aria-describedby={errors.date ? 'date-error' : undefined}
                className={`w-full px-3.5 py-2.5 border-[1.5px] rounded-lg text-sm focus:outline-none focus:border-secondary disabled:opacity-50 ${
                  errors.date ? 'border-primary bg-red-tint' : 'border-line bg-white'
                }`}
              />
              {errors.date && (
                <p id="date-error" className="mt-1 text-xs text-red-deep" role="alert">
                  {errors.date}
                </p>
              )}
            </div>

            <button
              type="submit"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-primary text-white font-semibold text-sm hover:bg-red-deep transition-colors"
            >
              <Icon name="search" size={15} />
              Vérifier mon éligibilité
            </button>
          </form>

          <div
            className={`mt-6 p-5 rounded-xl gap-3 items-start ${
              style || showError ? 'flex' : 'hidden'
            } ${showError ? 'bg-red-tint text-[#6E1120]' : style?.box ?? ''}`}
            role={showError ? 'alert' : 'status'}
            aria-live="polite"
            aria-atomic="true"
          >
            <Icon
              name={showError ? 'alert-circle' : style?.icon ?? 'info'}
              size={22}
              className="mt-0.5 shrink-0"
            />
            <div>
              <h3 className="text-[0.98rem] font-bold mb-1">
                {showError ? 'Formulaire incomplet' : style?.title}
              </h3>
              {showError ? (
                <p className="text-sm">Merci de corriger les champs signalés ci-dessus.</p>
              ) : result?.status === 'eligible' ? (
                <p className="text-sm">
                  Sur la base de ces critères, rien ne vous empêche de donner.
                  Rendez-vous dans un centre pour confirmer votre aptitude lors
                  de l'entretien médical.
                </p>
              ) : result?.status === 'ineligible' ? (
                <p className="text-sm">{result.message}</p>
              ) : result ? (
                <>
                  <p className="text-sm">{result.message}</p>
                  <p className="font-mono text-sm font-semibold mt-1">
                    {formatDateFr(result.nextEligibleDate)}
                  </p>
                </>
              ) : null}
            </div>
          </div>

          <p className="mt-5 text-xs text-ink-faint flex gap-2 items-start">
            <Icon name="info" size={14} className="mt-0.5 shrink-0" />
            Résultat indicatif. Seul un entretien médical réalisé le jour du don
            peut confirmer votre aptitude à donner.
          </p>
          </div>
        </div>
      </Reveal>
    </section>
  )
}
