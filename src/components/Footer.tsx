import { Icon } from './Icon'

const navLinks = [
  { href: '#pourquoi', label: 'Pourquoi donner' },
  { href: '#eligibilite', label: 'Suis-je éligible' },
  { href: '#deroulement', label: 'Le déroulement' },
  { href: '#centres', label: 'Centres' },
]

const resourceLinks = [
  { href: '#reserves', label: 'État des réserves' },
  { href: '#impact-stories', label: 'En chiffres' },
  { href: 'https://ants.bj', label: 'ANTS (source officielle)', external: true },
  { href: '#faq', label: 'Questions fréquentes' },
]

export default function Footer() {
  return (
    <footer className="bg-secondary text-teal-soft pt-12 pb-7">
      <div className="max-w-6xl mx-auto px-4 sm:px-7">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mb-9">
          <div>
            <div className="flex items-center gap-2 mb-3">
              <Icon name="droplets" size={20} className="text-[#FF6B7A]" />
              <span className="text-xl font-bold text-white">
                Hemo<span className="text-[#FF6B7A]">Link</span>
              </span>
            </div>
            <p className="text-sm max-w-[32ch]">
              Informer, rassurer, orienter — pour que donner son sang devienne
              un geste simple et accessible.
            </p>
            <div className="flex items-center gap-2 mt-4 text-sm">
              <Icon name="phone" size={16} className="text-[#FF6B7A] shrink-0" />
              <a href="tel:+22921320435" className="inline-flex items-center min-h-12 hover:text-white transition-colors">
                +229 21 32 04 35
              </a>
            </div>
          </div>

          <div>
            <h4 className="text-white text-[0.85rem] uppercase tracking-[0.08em] mb-3.5 font-sans">
              Navigation
            </h4>
            <ul className="space-y-1">
              {navLinks.map((l) => (
                <li key={l.href}>
                  <a href={l.href} className="flex items-center min-h-12 py-1 text-sm hover:text-white transition-colors">
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-white text-[0.85rem] uppercase tracking-[0.08em] mb-3.5 font-sans">
              Ressources
            </h4>
            <ul className="space-y-1">
              {resourceLinks.map((l) => (
                <li key={l.href}>
                  <a
                    href={l.href}
                    target={l.external ? '_blank' : undefined}
                    rel={l.external ? 'noopener noreferrer' : undefined}
                    className="flex items-center min-h-12 py-1 text-sm hover:text-white transition-colors"
                  >
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="border-t border-white/15 pt-5 flex flex-wrap justify-between gap-5 text-xs text-teal-soft/70">
          <span>© 2026 HemoLink — Tous droits réservés.</span>
          <span>Don de sang au Bénin.</span>
        </div>
      </div>
    </footer>
  )
}