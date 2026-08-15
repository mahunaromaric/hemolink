import { Icon } from './Icon'

interface ImpactCard {
  icon: string
  value: string
  title: string
  text: string
  tone: string
}

const cards: ImpactCard[] = [
  {
    icon: 'clock',
    value: '42 j.',
    title: 'Durée de conservation',
    text: 'Les globules rouges se conservent environ 42 jours : les réserves doivent être renouvelées en continu, pas seulement en période de crise.',
    tone: 'text-primary',
  },
  {
    icon: 'baby',
    value: '1 sur 2',
    title: 'Vous en aurez peut-être besoin',
    text: 'Une personne sur deux aura besoin d\u2019une transfusion au moins une fois dans sa vie — pour elle-même ou un proche.',
    tone: 'text-secondary',
  },
  {
    icon: 'users',
    value: '1 %',
    title: 'Seulement des donneurs réguliers',
    text: 'Une infime partie de la population en âge de donner le fait régulièrement. L\u2019écart se comble avec de nouveaux donneurs, pas seulement des habitués.',
    tone: 'text-accent',
  },
]

export default function ImpactSection() {
  return (
    <section id="pourquoi" className="py-16 sm:py-22 bg-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-7">
        <div className="max-w-[640px] mb-12">
          <div className="eyebrow mb-4">
            <Icon name="heart" size={14} />
            Pourquoi donner
          </div>
          <h2 className="text-3xl sm:text-4xl mb-4">
            Un don de sang ne se remplace par aucun médicament.
          </h2>
          <p className="text-[1.02rem] text-ink-soft">
            À ce jour, le sang humain ne peut pas être fabriqué en laboratoire.
            Chaque poche transfusée provient d'un don volontaire, et les
            besoins sont permanents : accidents, chirurgies, accouchements
            difficiles, maladies chroniques comme la drépanocytose.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {cards.map((card) => (
            <article
              key={card.title}
              className="relative overflow-hidden bg-white border border-line rounded-2xl p-7 shadow-card transition-transform duration-300 hover:-translate-y-1 hover:shadow-xl"
            >
              <Icon
                name={card.icon}
                size={130}
                className={`absolute -right-6 -top-6 ${card.tone} opacity-[0.07] pointer-events-none`}
                aria-hidden="true"
              />
              <p className={`font-mono text-4xl font-semibold mb-1.5 ${card.tone}`}>
                {card.value}
              </p>
              <h3 className="text-base mb-1.5">{card.title}</h3>
              <p className="text-sm text-ink-soft leading-relaxed">{card.text}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
