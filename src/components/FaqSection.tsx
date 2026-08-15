import { useState } from 'react'
import { Icon } from './Icon'
import Reveal from './Reveal'

interface FaqItem {
  q: string
  a: string
}

const faqs: FaqItem[] = [
  {
    q: 'Est-ce que donner son sang fait mal ?',
    a: 'La sensation se limite à une légère piqûre au moment de l\u2019insertion de l\u2019aiguille, comparable à une prise de sang classique. Le prélèvement en lui-même n\u2019est pas douloureux.',
  },
  {
    q: 'Combien de temps dure vraiment un don ?',
    a: 'Le prélèvement dure environ dix minutes. En comptant l\u2019accueil, l\u2019entretien médical et la collation, prévoyez environ 45 minutes au total.',
  },
  {
    q: 'Puis-je donner si je prends des médicaments ?',
    a: 'Cela dépend du traitement en cours. C\u2019est justement l\u2019objet de l\u2019entretien médical confidentiel réalisé avant chaque don, qui permettra de statuer précisément sur votre cas.',
  },
  {
    q: 'Y a-t-il un risque de contracter une maladie en donnant ?',
    a: 'Non. Le matériel utilisé est à usage unique et stérile pour chaque donneur. Il n\u2019existe aucun risque de contamination lors d\u2019un don de sang.',
  },
  {
    q: 'Que se passe-t-il si mon groupe sanguin n\u2019est pas prioritaire ?',
    a: 'Tous les groupes sont utiles : même un groupe abondant contribue aux réserves globales. Consultez la section « État des réserves » pour voir les besoins du moment.',
  },
  {
    q: 'Puis-je choisir de ne donner que du plasma ou des plaquettes ?',
    a: 'Certains centres proposent des dons ciblés par aphérèse (plasma, plaquettes). Vérifiez la disponibilité de cette option dans la fiche du centre choisi.',
  },
]

const DROP_BG = 'M13 0 C18 8 26 14 26 21 A13 13 0 1 1 0 21 C0 14 8 8 13 0 Z'

function FaqBackground() {
  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 z-0 overflow-hidden">
      <svg
        viewBox="0 0 26 28"
        className="drop-drift absolute -top-20 -left-16 w-80 h-80 text-primary/15 blur-2xl"
      >
        <path d={DROP_BG} fill="currentColor" />
      </svg>
      <svg
        viewBox="0 0 26 28"
        className="drop-drift absolute -bottom-16 -right-20 w-[24rem] h-[24rem] text-primary/10 blur-2xl"
        style={{ animationDelay: '-8s', animationDuration: '19s' }}
      >
        <path d={DROP_BG} fill="currentColor" />
      </svg>
      <svg
        viewBox="0 0 26 28"
        className="drop-drift absolute top-[22%] right-[6%] w-56 h-56 text-red-deep/10 blur-3xl"
        style={{ animationDelay: '-13s', animationDuration: '17s' }}
      >
        <path d={DROP_BG} fill="currentColor" />
      </svg>
    </div>
  )
}

function Accordion({
  index,
  item,
  isOpen,
  onToggle,
}: {
  index: number
  item: FaqItem
  isOpen: boolean
  onToggle: () => void
}) {
  const panelId = `faq-panel-${index}`
  return (
    <div
      className={`relative rounded-2xl transition-colors ${
        isOpen ? 'bg-white shadow-card' : 'hover:bg-white/60'
      }`}
    >
      {isOpen && (
        <span
          aria-hidden
          className="absolute left-0 top-4 bottom-4 w-1 rounded-full bg-primary"
        />
      )}
      <h3 className="m-0">
        <button
          type="button"
          id={`faq-button-${index}`}
          aria-expanded={isOpen}
          aria-controls={panelId}
          onClick={onToggle}
          className="group w-full flex items-center gap-4 px-4 sm:px-5 py-5 text-left"
        >
          <span
            className={`font-mono text-xs font-semibold w-8 shrink-0 transition-colors ${
              isOpen ? 'text-primary' : 'text-ink-faint'
            }`}
          >
            {String(index + 1).padStart(2, '0')}
          </span>
          <span
            className={`flex-1 font-display text-lg font-medium leading-snug transition-colors ${
              isOpen ? 'text-primary' : 'group-hover:text-primary'
            }`}
          >
            {item.q}
          </span>
          <span
            className={`shrink-0 w-9 h-9 inline-flex items-center justify-center rounded-full transition-colors ${
              isOpen
                ? 'bg-primary text-white'
                : 'bg-red-tint text-primary group-hover:bg-primary group-hover:text-white'
            }`}
          >
            <Icon
              name="plus"
              size={16}
              className={`transition-transform duration-200 ${isOpen ? 'rotate-45' : ''}`}
            />
          </span>
        </button>
      </h3>
      <div
        id={panelId}
        role="region"
        aria-labelledby={`faq-button-${index}`}
        aria-hidden={!isOpen}
        inert={!isOpen}
        className="faq-panel grid transition-[grid-template-rows] duration-300 ease-out"
        style={{ gridTemplateRows: isOpen ? '1fr' : '0fr' }}
      >
        <div className="overflow-hidden">
          <p className="px-4 sm:px-5 pb-5 pt-1 text-sm text-ink-soft max-w-[70ch]">
            {item.a}
          </p>
        </div>
      </div>
    </div>
  )
}

export default function FaqSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  return (
    <section
      id="faq"
      className="relative py-16 sm:py-22 bg-gradient-to-b from-pink-tint to-white overflow-hidden"
    >
      <FaqBackground />
      <Reveal className="relative z-10 max-w-6xl mx-auto px-4 sm:px-7">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_2fr] gap-x-12 gap-y-8 items-start">
          <div className="max-w-[640px]">
            <div className="eyebrow mb-4">
              <Icon name="help-circle" size={14} />
              Questions fréquentes
            </div>
            <h2 className="text-3xl sm:text-4xl">Les idées reçues, passées au crible.</h2>
            <p className="mt-4 text-[1.02rem] text-ink-soft">
              Tout ce qu&apos;il faut savoir avant de donner, expliqué simplement.
            </p>
          </div>

          <div className="flex flex-col gap-2.5">
            {faqs.map((item, i) => (
              <Reveal key={item.q} delay={i * 60}>
                <Accordion
                  index={i}
                  item={item}
                  isOpen={openIndex === i}
                  onToggle={() => setOpenIndex(openIndex === i ? null : i)}
                />
              </Reveal>
            ))}
          </div>
        </div>

        <div
          aria-hidden
          className="mt-14 sm:mt-20 pointer-events-none select-none text-center leading-[0.85]"
        >
          <Icon
            name="droplets"
            size={72}
            className="mx-auto mb-5 text-primary/10"
          />
          <span className="block font-bold whitespace-nowrap tracking-tight text-slatedark/[0.06] text-[clamp(2.5rem,8vw,9rem)] -mb-[0.14em]">
            HemoLink
          </span>
        </div>
      </Reveal>
    </section>
  )
}