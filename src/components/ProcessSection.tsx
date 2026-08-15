import { Icon } from './Icon'
import Reveal from './Reveal'

const steps = [
  {
    title: 'Accueil',
    text: 'Remplissage d\u2019un questionnaire médical.',
  },
  {
    title: 'Entretien médical',
    text: 'Confidentiel avec un professionnel de santé.',
  },
  {
    title: 'Le don',
    text: 'Proprement dit (environ 450 ml).',
  },
  {
    title: 'Repos & collation',
    text: 'Une collation gourmande bien méritée.',
  },
]

const preparation = [
  {
    title: 'Avant le don',
    text: 'Hydratez-vous bien (500 ml d\u2019eau), mangez léger et évitez l\u2019alcool les 24 h précédentes. N\u2019oubliez pas votre pièce d\u2019identité.',
    icon: 'glass-water',
  },
  {
    title: 'Pendant le don',
    text: 'Détendez-vous ! Le prélèvement dure 10 min. Vous êtes sous la surveillance de nos infirmiers bienveillants.',
    icon: 'heart-pulse',
  },
  {
    title: 'Après le don',
    text: 'Une collation vous est offerte. Reposez-vous 20 minutes avant de repartir. Bravo, vous avez sauvé des vies !',
    icon: 'utensils',
  },
]

export default function ProcessSection() {
  return (
    <section id="deroulement" className="py-16 sm:py-22 bg-white">
      <Reveal className="max-w-6xl mx-auto px-4 sm:px-7">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-12">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {preparation.map((p, i) => (
              <article
                key={p.title}
                className={`bg-white border border-line shadow-[0_12px_28px_-18px_rgba(34,20,22,0.4)] rounded-2xl p-5 ${i === 2 ? 'sm:col-span-2' : ''}`}
              >
                <div className="w-9 h-9 rounded-lg bg-teal-soft text-secondary flex items-center justify-center mb-3">
                  <Icon name={p.icon} size={18} />
                </div>
                <h3 className="text-base font-semibold text-slatedark mb-1">
                  {p.title}
                </h3>
                <p className="text-sm text-ink-soft leading-relaxed">{p.text}</p>
              </article>
            ))}
          </div>

          <div>
            <div className="mb-8">
              <div className="eyebrow mb-4">
                <Icon name="list" size={14} />
                Le jour du don
              </div>
              <h2 className="text-3xl sm:text-4xl">
                Comment se passe un don ?
              </h2>
            </div>
            <ol>
              {steps.map((step, i) => (
              <li
                key={step.title}
                className="flex items-center gap-4 py-4"
              >
                <span className="w-8 h-8 shrink-0 rounded-full border-2 border-accent text-accent flex items-center justify-center font-mono text-sm font-semibold">
                  {i + 1}
                </span>
                <div className="flex-1 min-w-0">
                  <h3 className="text-base mb-0.5">{step.title}</h3>
                  <p className="text-sm text-ink-soft leading-relaxed">{step.text}</p>
                </div>
              </li>
            ))}
          </ol>
          </div>
        </div>
      </Reveal>
    </section>
  )
}
