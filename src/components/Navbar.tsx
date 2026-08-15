import { useEffect, useState } from 'react'
import { Icon } from './Icon'

const links = [
  { href: '#pourquoi', label: 'Pourquoi donner', id: 'nav-pourquoi' },
  { href: '#eligibilite', label: 'Éligibilité', id: 'nav-eligibilite' },
  { href: '#deroulement', label: 'Déroulement', id: 'nav-deroulement' },
  { href: '#centres', label: 'Centres', id: 'nav-centres' },
  { href: '#reserves', label: 'État des réserves', id: 'nav-reserves' },
  { href: '#faq', label: 'FAQ', id: 'nav-faq' },
]

export default function Navbar() {
  const [open, setOpen] = useState(false)

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [open])

  return (
    <header className="sticky top-0 z-50 bg-white/90 backdrop-blur-md border-b border-line">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 h-[74px] flex items-center justify-between gap-4">
        <a
          href="#home-hero"
          className="flex items-center gap-2 shrink-0 min-h-12"
          aria-label="HemoLink - retour à l'accueil"
        >
          <Icon name="droplets" size={24} className="text-primary" />
          <span className="text-xl font-bold tracking-tight">
            Hemo<span className="text-primary">Link</span>
          </span>
        </a>

        <nav aria-label="Navigation principale">
          <ul className="hidden xl:flex items-center gap-0.5">
            {links.map((link) => (
              <li key={link.id}>
                <a
                  href={link.href}
                  id={link.id}
                  className="flex items-center min-h-12 whitespace-nowrap px-3 text-sm font-medium text-ink-soft hover:text-secondary hover:bg-teal-soft rounded-lg transition-colors"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="hidden xl:flex items-center gap-2">
          <a
            href="#centres"
            className="inline-flex items-center gap-2 whitespace-nowrap min-h-12 px-4 py-2.5 rounded-xl border-[1.5px] border-line font-semibold text-sm hover:border-secondary transition-colors"
          >
            <Icon name="map-pin" size={15} />
            Trouver un centre
          </a>
          <a
            href="#eligibilite"
            className="inline-flex items-center gap-2 whitespace-nowrap min-h-12 px-4 py-2.5 rounded-xl bg-primary text-white font-semibold text-sm hover:bg-red-deep transition-colors"
          >
            <Icon name="heart-pulse" size={15} />
            Tester mon éligibilité
          </a>
        </div>

        <button
          type="button"
          className="xl:hidden w-10 h-10 shrink-0 inline-flex items-center justify-center rounded-lg border-[1.5px] border-line text-slatedark"
          aria-label={open ? 'Fermer le menu' : 'Ouvrir le menu'}
          aria-expanded={open}
          aria-controls="mobile-menu"
          onClick={() => setOpen((v) => !v)}
        >
          <Icon name={open ? 'x' : 'menu'} size={22} />
        </button>
      </div>

      {open && (
        <div id="mobile-menu" className="xl:hidden bg-white border-t border-line">
          <ul className="flex flex-col gap-1 p-4">
            {links.map((link) => (
              <li key={link.id}>
                <a
                  href={link.href}
                  className="block px-4 py-3 text-base font-medium text-slatedark hover:text-secondary"
                  onClick={() => setOpen(false)}
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
          <div className="flex flex-col gap-3 p-4 border-t border-line">
            <a
              href="#eligibilite"
              className="text-center min-h-12 flex items-center justify-center px-5 py-3 rounded-xl bg-primary text-white font-semibold text-sm hover:bg-red-deep"
              onClick={() => setOpen(false)}
            >
              Tester mon éligibilité
            </a>
          </div>
        </div>
      )}
    </header>
  )
}
