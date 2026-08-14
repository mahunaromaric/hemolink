import { useState } from 'react'
import type { FormEvent } from 'react'
import { Icon } from './Icon'
import {
  checkEligibility,
  formatDateFr,
  type EligibilityResult,
} from '../lib/eligibility'
import type { Gender } from '../lib/eligibility'

type FieldErrors = Partial<Record<'age' | 'weight' | 'date', string>>

const resultStyles: Record<
  EligibilityResult['status'],
  { box: string; iconBg: string; icon: string; title: string }
> = {
  eligible: {
    box: 'border-2 border-green-200 bg-green-50',
    iconBg: 'bg-green-500 text-white',
    icon: 'check-circle',
    title: 'Félicitations !',
  },
  ineligible: {
    box: 'border-2 border-red-200 bg-red-50',
    iconBg: 'bg-red-500 text-white',
    icon: 'x-circle',
    title: 'Pas pour cette fois...',
  },
  deferred: {
    box: 'border-2 border-amber-200 bg-amber-50',
    iconBg: 'bg-amber-500 text-white',
    icon: 'clock',
    title: 'Pas encore...',
  },
}

export default function EligibilitySection() {
  const [age, setAge] = useState('')
  const [weight, setWeight] = useState('')
  const [gender, setGender] = useState<Gender>('M')
  const [lastDonation, setLastDonation] = useState('')
  const [neverDonated, setNeverDonated] = useState(false)

  const [result, setResult] = useState<EligibilityResult | null>(null)
  const [errors, setErrors] = useState<FieldErrors>({})
  const [checked, setChecked] = useState(false)

  const validate = (): boolean => {
    const errs: FieldErrors = {}
    const a = Number(age)
    const w = Number(weight)

    if (!age || Number.isNaN(a) || a <= 0) errs.age = 'Renseignez votre âge.'
    else if (a > 120) errs.age = 'L\u2019âge saisi semble invalide.'
    if (!weight || Number.isNaN(w) || w <= 0) errs.weight = 'Renseignez votre poids.'
    else if (w > 300) errs.weight = 'Le poids saisi semble invalide.'

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

  return (
    <section id="test" className="py-12 sm:py-16 md:py-24 bg-softblue">
      <div className="max-w-4xl mx-auto px-3 sm:px-4 md:px-8">
        <div className="bg-white rounded-[40px] p-6 sm:p-8 md:p-12 shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 right-0 p-8 opacity-10">
            <Icon name="clipboardCheck" size={120} className="text-secondary" />
          </div>
          <div className="relative z-10">
            <div className="mb-10">
              <h2 className="text-2xl sm:text-3xl font-bold mb-4">
                Puis-je donner mon sang ?
              </h2>
              <p className="text-sm sm:text-base text-gray-600">
                Faites le test en 30 secondes pour vérifier votre éligibilité
                immédiate.
              </p>
            </div>

            <form id="eligibilityForm" onSubmit={handleSubmit} noValidate className="space-y-6 sm:space-y-8">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 md:gap-8">
                <div>
                  <label htmlFor="age" className="block text-xs sm:text-sm font-bold text-slatedark mb-2">
                    Âge actuel
                  </label>
                  <input
                    type="number"
                    id="age"
                    name="age"
                    inputMode="numeric"
                    min="0"
                    max="120"
                    placeholder="Ex: 25"
                    value={age}
                    onChange={(e) => setAge(e.target.value)}
                    aria-invalid={!!errors.age}
                    aria-describedby={errors.age ? 'age-error' : undefined}
                    className={`w-full bg-gray-50 border border-gray-200 rounded-xl px-3 sm:px-4 py-2.5 sm:py-3 focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all ${
                      errors.age ? 'border-red-300 bg-red-50' : ''
                    }`}
                  />
                  {errors.age && (
                    <p id="age-error" className="mt-1 text-xs text-red-600" role="alert">
                      {errors.age}
                    </p>
                  )}
                </div>

                <div>
                  <label htmlFor="weight" className="block text-xs sm:text-sm font-bold text-slatedark mb-2">
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
                    placeholder="Ex: 65"
                    value={weight}
                    onChange={(e) => setWeight(e.target.value)}
                    aria-invalid={!!errors.weight}
                    aria-describedby={errors.weight ? 'weight-error' : undefined}
                    className={`w-full bg-gray-50 border border-gray-200 rounded-xl px-3 sm:px-4 py-2.5 sm:py-3 focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all ${
                      errors.weight ? 'border-red-300 bg-red-50' : ''
                    }`}
                  />
                  {errors.weight && (
                    <p id="weight-error" className="mt-1 text-xs text-red-600" role="alert">
                      {errors.weight}
                    </p>
                  )}
                </div>

                <div>
                  <label htmlFor="gender" className="block text-xs sm:text-sm font-bold text-slatedark mb-2">
                    Sexe biologique
                  </label>
                  <select
                    id="gender"
                    name="gender"
                    value={gender}
                    onChange={(e) => setGender(e.target.value as Gender)}
                    className="w-full bg-gray-50 border border-gray-200 rounded-xl px-3 sm:px-4 py-2.5 sm:py-3 focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all"
                  >
                    <option value="M">Homme</option>
                    <option value="F">Femme</option>
                  </select>
                </div>

                <div>
                  <label htmlFor="lastDonation" className="block text-xs sm:text-sm font-bold text-slatedark mb-2">
                    Date du dernier don
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
                    className={`w-full bg-gray-50 border border-gray-200 rounded-xl px-3 sm:px-4 py-2.5 sm:py-3 focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all disabled:opacity-50 ${
                      errors.date ? 'border-red-300 bg-red-50' : ''
                    }`}
                  />
                  {errors.date && (
                    <p id="date-error" className="mt-1 text-xs text-red-600" role="alert">
                      {errors.date}
                    </p>
                  )}
                </div>
              </div>

              <label className="flex items-center gap-3 cursor-pointer text-sm text-gray-600">
                <input
                  type="checkbox"
                  id="neverDonated"
                  checked={neverDonated}
                  onChange={(e) => setNeverDonated(e.target.checked)}
                  className="w-4 h-4 rounded accent-primary"
                />
                Je n'ai jamais donné mon sang
              </label>

              <button
                type="submit"
                className="w-full bg-secondary text-white font-bold py-4 rounded-xl hover:opacity-90 transition-all shadow-lg"
              >
                Calculer mon éligibilité
              </button>
            </form>

            <div
              className={`mt-8 p-6 rounded-2xl border-2 flex items-start gap-4 ${
                style ? style.box : checked && Object.keys(errors).length > 0
                  ? 'border-orange-200 bg-orange-50'
                  : 'hidden'
              }`}
              role={style ? 'status' : 'alert'}
              aria-live="polite"
              aria-atomic="true"
            >
              {style && result ? (
                <>
                  <div className={`p-3 rounded-full ${style.iconBg} shrink-0`}>
                    <Icon name={style.icon} size={24} />
                  </div>
                  <div>
                    <h3 className="font-bold text-lg mb-1">{style.title}</h3>
                    {result.status === 'eligible' && (
                      <>
                        <p className="text-gray-600 text-sm mb-2">
                          Vous semblez éligible au don de sang d'après ces critères
                          de base.
                        </p>
                        <p className="text-xs font-bold uppercase tracking-wider text-gray-500">
                          Trouvez le centre le plus proche ci-dessous.
                        </p>
                      </>
                    )}
                    {result.status === 'ineligible' && (
                      <p className="text-gray-600 text-sm mb-2">{result.message}</p>
                    )}
                    {result.status === 'deferred' && (
                      <>
                        <p className="text-gray-600 text-sm mb-2">{result.message}</p>
                        <p className="text-sm font-bold text-slatedark">
                          {formatDateFr(result.nextEligibleDate)}
                        </p>
                      </>
                    )}
                  </div>
                </>
              ) : checked && Object.keys(errors).length > 0 ? (
                <>
                  <div className="p-3 rounded-full bg-orange-500 text-white shrink-0">
                    <Icon name="alert-circle" size={24} />
                  </div>
                  <div>
                    <h3 className="font-bold text-lg mb-1">Oups !</h3>
                    <p className="text-gray-600 text-sm">
                      Veuillez corriger les champs signalés ci-dessus.
                    </p>
                  </div>
                </>
              ) : null}
            </div>

            <p className="mt-6 text-[10px] text-gray-400 italic uppercase tracking-wider">
              * Seul un entretien médical professionnel peut confirmer
              définitivement votre aptitude au don.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
