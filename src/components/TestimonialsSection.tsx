import { Icon } from './Icon'
import Reveal from './Reveal'

interface ImpactStat {
  icon: string
  value: string
  label: string
  note?: string
  tone: string
}

const stats: ImpactStat[] = [
  {
    icon: 'droplets',
    value: '118 010',
    label: 'poches de sang collectées en 2025',
    note: 'Objectif annuel de 117 000 dépassé.',
    tone: 'text-primary',
  },
  {
    icon: 'clock',
    value: '3 min',
    label: 'une poche est demandée toutes les 3 minutes au Bénin',
    tone: 'text-secondary',
  },
  {
    icon: 'baby',
    value: '51 %',
    label: 'des demandes concernent les enfants',
    note: 'Paludisme et urgences gynéco-obstétricales en tête des causes.',
    tone: 'text-amber',
  },
  {
    icon: 'heart-pulse',
    value: '97 %',
    label: 'des demandes en produits sanguins satisfaites',
    note: 'Taux de rejet des poches limité à 4,8 %.',
    tone: 'text-accent',
  },
]

export default function TestimonialsSection() {
  return (
    <section
      id="impact-stories"
      className="relative overflow-hidden py-16 sm:py-22 bg-white"
    >
      <Reveal className="relative max-w-6xl mx-auto px-4 sm:px-7">
        <div className="max-w-[640px] mb-10">
          <div className="eyebrow mb-4">
            <Icon name="trendingUp" size={14} />
            En chiffres
          </div>
          <h2 className="text-3xl sm:text-4xl mb-4">
            L'impact de votre geste
          </h2>
          <p className="text-[1.02rem] text-ink-soft">
            Derrière chaque poche de sang, des vies concrètes — chiffres ANTS,
            bilan 2025.
          </p>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {stats.map((s) => (
            <article
              key={s.label}
              className="relative overflow-hidden bg-white border border-line rounded-2xl shadow-card p-6 transition-transform duration-300 hover:-translate-y-1 hover:shadow-xl"
            >
              <Icon
                name={s.icon}
                size={110}
                className="absolute -right-5 -top-5 text-secondary opacity-[0.06] pointer-events-none"
                aria-hidden="true"
              />
              <p className={`font-mono text-3xl sm:text-4xl font-semibold ${s.tone}`}>
                {s.value}
              </p>
              <p className="text-sm text-ink-soft mt-2">{s.label}</p>
              {s.note && <p className="text-xs text-ink-faint mt-2">{s.note}</p>}
            </article>
          ))}
        </div>

        <div className="mt-10 flex flex-wrap items-center justify-between gap-4">
          <p className="font-mono text-xs text-ink-faint">
            Chiffres ANTS — bilan 2025. Voir{' '}
            <a
              href="https://ants.bj"
              target="_blank"
              rel="noopener noreferrer"
              className="underline hover:text-primary transition-colors"
            >
              ants.bj
            </a>
            .
          </p>
          <a
            href="#centres"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-primary text-white font-semibold text-sm hover:bg-red-deep transition-colors"
          >
            Trouver un centre de don
            <Icon name="chevronRight" size={15} />
          </a>
        </div>
      </Reveal>
    </section>
  )
}