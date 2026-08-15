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

function Accordion({ item, isOpen, onToggle }: { item: FaqItem; isOpen: boolean; onToggle: () => void }) {
  const panelId = `faq-panel-${item.q}`
  return (
    <>
      <h3 className="m-0">
        <button
          type="button"
          id={`faq-button-${item.q}`}
          aria-expanded={isOpen}
          aria-controls={panelId}
          onClick={onToggle}
          className="w-full flex items-center justify-between gap-4 py-6 text-left transition-colors group"
        >
          <span className="font-display text-lg font-medium group-hover:text-primary transition-colors">
            {item.q}
          </span>
          <Icon
            name="plus"
            size={18}
            className={`text-primary shrink-0 transition-transform duration-200 ${isOpen ? 'rotate-45' : ''}`}
          />
        </button>
      </h3>
      {isOpen && (
        <div
          id={panelId}
          role="region"
          aria-labelledby={`faq-button-${item.q}`}
          className="pb-6"
        >
          <p className="text-sm text-ink-soft max-w-[70ch]">{item.a}</p>
        </div>
      )}
    </>
  )
}

export default function FaqSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  return (
    <section id="faq" className="py-16 sm:py-22 bg-cream-alt relative overflow-hidden">
      <Reveal className="max-w-6xl mx-auto px-4 sm:px-7">
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

          <div>
            {faqs.map((item, i) => (
              <div key={item.q} className="border-b border-line">
                <Accordion
                  item={item}
                  isOpen={openIndex === i}
                  onToggle={() => setOpenIndex(openIndex === i ? null : i)}
                />
              </div>
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
