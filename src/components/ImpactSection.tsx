import { Icon } from './Icon'

interface ImpactCard {
  icon: string
  iconClass: string
  title: string
  text: string
}

const cards: ImpactCard[] = [
  {
    icon: 'heart',
    iconClass: 'bg-red-100 text-primary',
    title: '3 Vies sauvées',
    text: 'Un seul don permet de séparer les globules rouges, le plasma et les plaquettes pour soigner trois patients différents.',
  },
  {
    icon: 'users',
    iconClass: 'bg-blue-100 text-secondary',
    title: 'Solidarité nationale',
    text: 'Les besoins sont quotidiens pour les accouchements difficiles, les accidents de la route et les enfants anémiés.',
  },
  {
    icon: 'trendingUp',
    iconClass: 'bg-green-100 text-green-600',
    title: 'Urgence permanente',
    text: 'La durée de vie des produits sanguins est limitée. Votre don d\u2019aujourd\u2019hui assure les stocks de demain.',
  },
]

export default function ImpactSection() {
  return (
    <section id="impact" className="py-12 sm:py-16 md:py-24 bg-softblue">
      <div className="max-w-7xl mx-auto px-3 sm:px-4 md:px-8">
        <div className="text-center mb-12 sm:mb-16">
          <span className="text-primary font-bold uppercase tracking-widest text-xs sm:text-sm mb-4 block">
            L'impact vital
          </span>
          <h2 className="text-2xl sm:text-3xl md:text-5xl font-bold mb-6 text-slatedark">
            Pourquoi donner son sang ?
          </h2>
          <p className="text-base sm:text-lg text-slatedark/60 max-w-3xl mx-auto">
            Au Bénin, seul <span className="text-primary font-bold">1% de la
            population</span> donne son sang régulièrement. Pourtant, chaque
            goutte peut changer le destin d'une famille.
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {cards.map((card) => (
            <article
              key={card.title}
              className="bg-white p-6 sm:p-8 rounded-[32px] custom-shadow card-hover"
            >
              <div
                className={`w-12 h-12 sm:w-14 sm:h-14 ${card.iconClass} rounded-2xl flex items-center justify-center mb-6`}
              >
                <Icon name={card.icon} size={26} />
              </div>
              <h3 className="text-lg sm:text-2xl font-bold mb-4">{card.title}</h3>
              <p className="text-sm sm:text-base text-gray-500">{card.text}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}