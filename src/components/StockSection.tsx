import { Icon } from './Icon'
import Reveal from './Reveal'
import { useReveal } from '../hooks/useReveal'

type Level = 'critique' | 'faible' | 'correct' | 'stable'

interface StockLevel {
  group: string
  pct: number
  level: Level
}

const stock: StockLevel[] = [
  { group: 'O–', pct: 18, level: 'critique' },
  { group: 'O+', pct: 34, level: 'faible' },
  { group: 'A+', pct: 52, level: 'correct' },
  { group: 'A–', pct: 40, level: 'faible' },
  { group: 'B+', pct: 61, level: 'correct' },
  { group: 'B–', pct: 22, level: 'critique' },
  { group: 'AB+', pct: 75, level: 'stable' },
  { group: 'AB–', pct: 45, level: 'faible' },
]

const levelStyles: Record<Level, { label: string; chip: string; bar: string }> = {
  critique: { label: 'Critique', chip: 'bg-red-tint text-red-deep', bar: 'bg-[#C8102E]' },
  faible: { label: 'Faible', chip: 'bg-amber-tint text-[#6E4A22]', bar: 'bg-[#D97706]' },
  correct: { label: 'Correct', chip: 'bg-teal-soft text-secondary', bar: 'bg-[#0F766E]' },
  stable: { label: 'Stable', chip: 'bg-sage-tint text-[#2E4A38]', bar: 'bg-[#16A34A]' },
}

const levels: Level[] = ['critique', 'faible', 'correct', 'stable']

export default function StockSection() {
  const critical = stock.filter((s) => s.level === 'critique')
  const { ref, inView } = useReveal<HTMLDivElement>()

  return (
    <section id="reserves" className="py-16 sm:py-22">
      <Reveal className="max-w-6xl mx-auto px-4 sm:px-7">
        <div className="max-w-[640px] mb-10">
          <div className="eyebrow mb-4">
            <Icon name="trendingUp" size={14} />
            État des réserves
          </div>
          <h2 className="text-3xl sm:text-4xl mb-4">
            Certains groupes manquent davantage que d'autres.
          </h2>
          <p className="text-[1.02rem] text-ink-soft">
            Niveau des stocks par groupe sanguin — chiffres indicatifs, l'ANTS
            ne publie pas de données en temps réel.
          </p>
        </div>

        <div className="bg-white border border-line rounded-2xl shadow-card p-5 sm:p-7">
          {critical.length > 0 && (
            <div className="mb-6 flex items-start gap-3 bg-red-tint text-red-deep rounded-xl px-4 py-3 text-sm">
              <Icon name="alert-triangle" size={18} className="shrink-0 mt-0.5" />
              <p>
                <strong>{critical.map((s) => s.group).join(', ')}</strong>{' '}
                en niveau critique : besoin urgent de nouveaux donneurs
                compatibles.
              </p>
            </div>
          )}

          <div className="flex gap-2 sm:gap-4">
            {stock.map((s) => (
              <div key={s.group} className="flex-1 flex flex-col items-center gap-2">
                <span className="font-mono text-[0.72rem] text-ink-faint">{s.pct}%</span>
              </div>
            ))}
          </div>

          <div ref={ref} className="flex gap-2 sm:gap-4 mt-2">
            {stock.map((s, i) => {
              const styles = levelStyles[s.level]
              return (
                <div
                  key={s.group}
                  className="flex-1 h-32 sm:h-44 flex items-end rounded-md bg-cream-alt/60 overflow-hidden"
                >
                  <div
                    className={`bar-fill w-full ${styles.bar} rounded-t-md`}
                    style={{
                      height: inView ? `${s.pct}%` : '0%',
                      transition: inView
                        ? `height 800ms cubic-bezier(0.22, 1, 0.36, 1) ${i * 70}ms`
                        : 'none',
                    }}
                    title={`${s.group} : ${s.pct}% du stock cible`}
                  />
                </div>
              )
            })}
          </div>

          <div className="flex gap-2 sm:gap-4 mt-2">
            {stock.map((s) => (
              <div key={s.group} className="flex-1 flex flex-col items-center gap-2">
                <span className="font-mono text-xs font-semibold">{s.group}</span>
              </div>
            ))}
          </div>

          <div className="flex flex-wrap gap-x-5 gap-y-2 mt-6 pt-5 border-t border-line">
            {levels.map((l) => (
              <span
                key={l}
                className="inline-flex items-center gap-2 font-mono text-xs text-ink-soft"
              >
                <span className={`w-2.5 h-2.5 rounded-full ${levelStyles[l].bar}`} />
                {levelStyles[l].label}
              </span>
            ))}
          </div>

          <p className="font-mono text-[0.72rem] text-ink-faint mt-4">
            Chiffres indicatifs à des fins de démonstration. Voir les
            statistiques de l'ANTS sur{' '}
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
        </div>
      </Reveal>
    </section>
  )
}