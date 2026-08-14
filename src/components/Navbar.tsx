import { useEffect, useState } from 'react'
import { Icon } from './Icon'

const links = [
  { href: '#impact', label: "L'Impact", id: 'nav-impact' },
  { href: '#test', label: 'Puis-je donner ?', id: 'nav-test' },
  { href: '#centres', label: 'Où donner ?', id: 'nav-centres' },
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
    <nav className="fixed top-0 w-full z-50 glass-nav border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        <a
          href="#home-hero"
          className="flex items-center gap-2"
          aria-label="HemoLink - retour à l'accueil"
        >
          <Icon name="droplets" size={30} className="text-primary" />
          <span className="text-2xl font-bold tracking-tight text-slatedark">
            Hemo<span className="text-primary">Link</span>
          </span>
        </a>

        <div className="hidden md:flex items-center gap-8">
          {links.map((link) => (
            <a
              key={link.id}
              href={link.href}
              id={link.id}
              className="text-sm font-semibold text-slatedark/80 hover:text-primary transition-colors"
            >
              {link.label}
            </a>
          ))}
          <a
            href="#test"
            className="bg-primary text-white px-6 py-3 rounded-xl font-bold text-sm hover:opacity-90 transition-all shadow-lg shadow-primary/20"
          >
            Vérifier mon éligibilité
          </a>
        </div>

        <button
          type="button"
          className="md:hidden p-2 rounded-xl text-slatedark"
          aria-label={open ? 'Fermer le menu' : 'Ouvrir le menu'}
          aria-expanded={open}
          aria-controls="mobile-menu"
          onClick={() => setOpen((v) => !v)}
        >
          <Icon name={open ? 'x' : 'menu'} size={28} />
        </button>
      </div>

      {/* Overlay mobile */}
      <div
        id="mobile-menu"
        className={`fixed inset-0 z-[-1] bg-white transition-transform duration-300 ease-in-out md:hidden ${
          open ? 'translate-x-0' : 'translate-x-full'
        }`}
        style={{ top: '80px' }}
      >
        <div className="flex flex-col gap-6 p-8">
          {links.map((link) => (
            <a
              key={link.id}
              href={link.href}
              className="text-xl font-semibold text-slatedark hover:text-primary"
              onClick={() => setOpen(false)}
            >
              {link.label}
            </a>
          ))}
          <a
            href="#test"
            className="mt-4 bg-primary text-white text-center py-4 rounded-2xl font-bold text-lg"
            onClick={() => setOpen(false)}
          >
            Vérifier mon éligibilité
          </a>
        </div>
        <div className="mt-auto p-8 border-t text-center">
          <p className="text-gray-400 text-xs uppercase tracking-widest mb-4">
            CNTS BÉNIN
          </p>
          <a href="tel:+22921301431" className="text-slatedark font-medium">
            +229 21 30 14 31
          </a>
        </div>
      </div>
    </nav>
  )
}
