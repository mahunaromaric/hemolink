import { Icon } from './Icon'

const steps = [
  'Accueil et remplissage d\u2019un questionnaire médical.',
  'Entretien confidentiel avec un professionnel de santé.',
  'Le don proprement dit (environ 450 ml).',
  'Repos et collation gourmande bien méritée.',
]

const preparation = [
  {
    icon: 'coffee',
    iconWrap: 'bg-primary',
    title: 'Avant le don',
    text: 'Hydratez-vous bien (500 ml d\u2019eau), mangez léger et évitez l\u2019alcool les 24h précédentes. N\u2019oubliez pas votre pièce d\u2019identité.',
  },
  {
    icon: 'heart-pulse',
    iconWrap: 'bg-secondary',
    title: 'Pendant le don',
    text: 'Détendez-vous ! Le prélèvement dure 10 min. Vous êtes sous la surveillance de nos infirmiers bienveillants.',
  },
  {
    icon: 'cookie',
    iconWrap: 'bg-green-500',
    title: 'Après le don',
    text: 'Une collation vous est offerte. Reposez-vous 20 minutes avant de repartir. Bravo, vous avez sauvé des vies !',
  },
]

export default function ProcessSection() {
  return (
    <section className="py-12 sm:py-16 md:py-24 bg-slatedark text-white overflow-hidden relative">
      <div className="absolute top-0 right-0 w-96 h-96 bg-primary/20 blur-[120px] rounded-full -mr-48 -mt-48" aria-hidden="true" />
      <div className="max-w-7xl mx-auto px-3 sm:px-4 md:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 sm:gap-16 md:gap-20 items-center">
          <div className="order-2 lg:order-1">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
              {preparation.map((p) => (
                <div
                  key={p.title}
                  className={`bg-white/5 border border-white/10 p-6 sm:p-8 rounded-3xl ${
                    p.title === 'Après le don' ? 'md:col-span-2' : ''
                  }`}
                >
                  <div className={`w-10 h-10 sm:w-12 sm:h-12 ${p.iconWrap} rounded-2xl flex items-center justify-center mb-6`}>
                    <Icon name={p.icon} size={24} />
                  </div>
                  <h3 className="text-lg sm:text-xl font-bold mb-3">{p.title}</h3>
                  <p className="text-white/60 text-xs sm:text-sm leading-relaxed">{p.text}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="order-1 lg:order-2 text-center lg:text-left">
            <span className="text-primary font-bold uppercase tracking-widest text-sm mb-4 block">
              Guide Pratique
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-8 leading-tight">
              Comment se passe un don chez HemoLink ?
            </h2>
            <div className="space-y-6 text-lg text-white/80">
              {steps.map((step, i) => (
                <div key={i} className="flex items-start gap-4">
                  <div className="w-8 h-8 rounded-full border-2 border-primary flex items-center justify-center shrink-0 text-sm font-bold">
                    {i + 1}
                  </div>
                  <p>{step}</p>
                </div>
              ))}
            </div>
            <div className="mt-8 inline-flex items-center gap-3 bg-white/10 rounded-2xl px-5 py-3">
              <Icon name="clock" size={18} className="text-primary" />
              <p className="text-sm font-semibold text-white/90">
                Durée totale : environ 45 minutes
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
