import { Icon } from './Icon'

const myths = [
  {
    myth: '« Le don affaiblit durablement »',
    reality: 'Réalité : Énergie retrouvée',
    text: 'Le volume prélevé est reconstitué en quelques heures par l\u2019organisme. Après une courte collation, 99% des donneurs reprennent leurs activités.',
  },
  {
    myth: '« C\u2019est dangereux de donner »',
    reality: 'Réalité : Sécurité absolue',
    text: 'Le matériel est stérile et à usage unique. Aucun risque de maladie. Le don est encadré par des médecins et infirmiers qualifiés.',
  },
  {
    myth: '« Seul le groupe O+ est utile »',
    reality: 'Réalité : Tous indispensables',
    text: 'Chaque groupe a des patients qui l\u2019attendent spécifiquement. A, B, AB ou O, votre sang sauvera quelqu\u2019un qui a le même groupe.',
  },
]

export default function MythsSection() {
  return (
    <section id="myths" className="py-12 sm:py-16 md:py-24 bg-slate-900 text-white">
      <div className="max-w-7xl mx-auto px-3 sm:px-4 md:px-8">
        <div className="text-center mb-12 sm:mb-16">
          <span className="text-accent font-bold uppercase tracking-widest text-xs sm:text-sm mb-4 block">
            Démystification
          </span>
          <h2 className="text-2xl sm:text-3xl md:text-5xl font-bold mb-6">
            Mythes vs Réalités
          </h2>
          <p className="text-base sm:text-lg text-white/60">
            Il est temps de déconstruire les fausses idées sur le don.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-white/10 rounded-[40px] overflow-hidden">
          {myths.map((m) => (
            <div key={m.myth} className="bg-slate-900 p-8">
              <div className="flex flex-col gap-6 items-center text-center">
                <div className="w-12 h-12 rounded-full bg-red-500/10 flex items-center justify-center text-red-500 shrink-0">
                  <Icon name="x-circle" size={24} />
                </div>
                <div>
                  <h3 className="font-bold mb-2">{m.myth}</h3>
                </div>
              </div>
              <div className="mt-8 flex flex-col gap-4 items-center text-center">
                <div className="w-12 h-12 rounded-full bg-green-500/10 flex items-center justify-center text-green-500 shrink-0">
                  <Icon name="check-circle" size={24} />
                </div>
                <div>
                  <h4 className="font-bold mb-2 text-green-400">{m.reality}</h4>
                  <p className="text-sm text-white/50">{m.text}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
