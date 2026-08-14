import { Icon } from './Icon'

const criteria = [
  {
    icon: 'calendar',
    iconClass: 'text-primary',
    gradClass: 'from-primary to-accent',
    title: '18 – 65 ans',
    text: 'Il faut être majeur pour donner. Jusqu\u2019à 65 ans révolus, vous êtes un donneur potentiel.',
  },
  {
    icon: 'scale',
    iconClass: 'text-secondary',
    gradClass: 'from-secondary to-blue-400',
    title: 'Minimum 50 kg',
    text: 'Ce seuil garantit votre sécurité et le volume suffisant pour aider les patients receveurs.',
  },
  {
    icon: 'clock',
    iconClass: 'text-green-500',
    gradClass: 'from-green-500 to-emerald-400',
    title: 'Délai respecté',
    text: 'Attendre 3 mois (hommes) ou 4 mois (femmes) entre deux dons de sang total.',
  },
]

export default function CriteriaSection() {
  return (
    <section id="criteria" className="py-12 sm:py-16 md:py-24 bg-white">
      <div className="max-w-7xl mx-auto px-3 sm:px-4 md:px-8">
        <div className="text-center mb-12 sm:mb-16">
          <span className="text-secondary font-bold uppercase tracking-widest text-xs sm:text-sm mb-4 block">
            Critères de base
          </span>
          <h2 className="text-2xl sm:text-3xl md:text-5xl font-bold mb-6 text-slatedark">
            Qui peut donner ?
          </h2>
          <p className="text-base sm:text-lg text-slatedark/60">
            La majorité des adultes peuvent sauver des vies. Vérifiez ces 3
            points essentiels.
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {criteria.map((c) => (
            <div
              key={c.title}
              className="relative p-6 sm:p-8 rounded-[32px] overflow-hidden group bg-white"
            >
              <div
                className={`absolute inset-0 bg-gradient-to-br ${c.gradClass} opacity-5 group-hover:opacity-10 transition-opacity`}
              />
              <Icon name={c.icon} size={36} className={`${c.iconClass} mb-6`} />
              <h3 className="text-lg sm:text-xl font-bold mb-3">{c.title}</h3>
              <p className="text-gray-500 text-xs sm:text-sm">{c.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
