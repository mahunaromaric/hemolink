import { useState } from 'react'
import { Icon } from './Icon'

interface FaqItem {
  q: string
  a: string
}

interface FaqGroup {
  title: string
  icon: string
  iconClass: string
  items: FaqItem[]
}

const groups: FaqGroup[] = [
  {
    title: 'Avant le don',
    icon: 'calendar',
    iconClass: 'text-primary',
    items: [
      {
        q: '« Est-ce que ça fait mal ? »',
        a: 'Pas plus qu\u2019une prise de sang classique. La piqûre ne dure qu\u2019une seconde.',
      },
      {
        q: '« Combien de temps ça prend ? »',
        a: 'Comptez 45 min au total, mais le prélèvement lui-même ne dure que 10 min.',
      },
      {
        q: '« Tatouages et piercings ? »',
        a: 'Oui, mais il faut attendre 4 mois après l\u2019intervention.',
      },
    ],
  },
  {
    title: 'Pendant & Après',
    icon: 'activity',
    iconClass: 'text-secondary',
    items: [
      {
        q: '« Et si je me sens mal ? »',
        a: 'Nos équipes médicales veillent sur vous en permanence. Un petit étourdissement peut arriver mais passe vite avec du repos.',
      },
      {
        q: '« Sport juste après ? »',
        a: 'Mieux vaut éviter les efforts physiques intenses dans les 24h qui suivent.',
      },
      {
        q: '« Que devient mon sang ? »',
        a: 'Il est testé, préparé et distribué aux hôpitaux en fonction des besoins urgents.',
      },
    ],
  },
  {
    title: 'Généralités',
    icon: 'info',
    iconClass: 'text-slatedark',
    items: [
      {
        q: '« Peut-on donner avec ses règles ? »',
        a: 'Oui, ce n\u2019est pas une contre-indication si vous vous sentez bien et n\u2019êtes pas anémiée.',
      },
      {
        q: '« Contre-indications fréquentes ? »',
        a: 'Prise d\u2019antibiotiques récents, voyage en zone à risque, comportements sexuels à risque.',
      },
      {
        q: '« Manger juste après ? »',
        a: 'C\u2019est même recommandé ! Une collation vous est offerte sur place.',
      },
      {
        q: '« Fréquence maximale ? »',
        a: 'Jusqu\u2019à 6 fois par an pour un homme, 4 fois pour une femme.',
      },
    ],
  },
]

function Accordion({ item }: { item: FaqItem }) {
  const [open, setOpen] = useState(false)
  const panelId = `faq-panel-${item.q}`

  return (
    <div className="border border-gray-100 rounded-2xl overflow-hidden shadow-sm">
      <h3>
        <button
          type="button"
          id={`faq-button-${item.q}`}
          aria-expanded={open}
          aria-controls={panelId}
          onClick={() => setOpen((v) => !v)}
          className="w-full flex items-center justify-between p-6 text-left hover:bg-gray-50 transition-colors"
        >
          <span className="font-semibold pr-4">{item.q}</span>
          <Icon
            name="chevronDown"
            size={20}
            className={`text-gray-400 shrink-0 transition-transform duration-200 ${open ? 'rotate-180' : ''}`}
          />
        </button>
      </h3>
      {open && (
        <div
          id={panelId}
          role="region"
          aria-labelledby={`faq-button-${item.q}`}
          className="p-6 bg-gray-50 border-t border-gray-100 text-gray-600"
        >
          {item.a}
        </div>
      )}
    </div>
  )
}

export default function FaqSection() {
  return (
    <section id="faq" className="py-12 sm:py-16 md:py-24 bg-white">
      <div className="max-w-4xl mx-auto px-3 sm:px-4 md:px-8 text-center">
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-12">
          Questions & Idées reçues
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 sm:gap-12 text-left">
          {groups.map((group) => (
            <div key={group.title}>
              <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
                <Icon name={group.icon} className={group.iconClass} />
                {group.title}
              </h3>
              <div className="space-y-4">
                {group.items.map((item) => (
                  <Accordion key={item.q} item={item} />
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
