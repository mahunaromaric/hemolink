import { Icon } from './Icon'

const criteria = [
  {
    text: 'Il faut être majeur pour donner. Jusqu\u2019à 65 ans révolus, vous êtes un donneur potentiel.',
    value: '18–65 ans',
  },
  {
    text: 'Ce seuil garantit votre sécurité et le volume suffisant pour aider les patients receveurs.',
    value: '50 kg',
  },
  {
    text: 'Attendre 3 mois (hommes) ou 4 mois (femmes) entre deux dons de sang total.',
    value: '3–4 mois',
  },
]

export default function CriteriaSection() {
  return (
    <section id="criteria" className="py-16 sm:py-22 bg-gradient-to-b from-white to-cream-alt">
      <div className="max-w-6xl mx-auto px-4 sm:px-7">
        <div className="max-w-[640px] mb-8">
          <div className="eyebrow mb-4">
            <Icon name="check-circle" size={14} />
            Critères de base
          </div>
          <h2 className="text-3xl sm:text-4xl mb-4">Qui peut donner ?</h2>
          <p className="text-[1.02rem] text-ink-soft">
            La majorité des adultes peuvent sauver des vies. Vérifiez ces
            points essentiels.
          </p>
        </div>

        <div className="relative max-w-3xl">
          <div
            aria-hidden="true"
            className="absolute left-[9px] top-3 bottom-3 w-[2px] bg-secondary/30"
          />
          <ol className="space-y-6">
            {criteria.map((c, i) => (
              <li key={c.value} className="group relative pl-12">
                <span
                  aria-hidden="true"
                  className="absolute left-0 top-1 w-5 h-5 rounded-full border-2 border-line bg-cream-alt transition-all duration-300 group-hover:border-accent group-hover:bg-accent"
                />
                <div>
                  <div className="flex items-baseline gap-3 mb-1">
                    <p className="font-mono text-xs font-semibold text-accent">
                      {String(i + 1).padStart(2, '0')}
                    </p>
                    <p className="font-mono text-xl sm:text-2xl font-semibold text-secondary">
                      {c.value}
                    </p>
                  </div>
                  <p className="text-sm text-ink-soft leading-relaxed">{c.text}</p>
                </div>
              </li>
            ))}
          </ol>

          <div className="mt-7 pl-12">
            <a
              href="#eligibilite"
              className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-primary text-white font-semibold text-sm hover:bg-red-deep transition-colors"
            >
              <Icon name="clipboardCheck" size={16} />
              Je teste mon éligibilité
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
