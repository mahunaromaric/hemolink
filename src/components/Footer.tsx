import { Icon } from './Icon'

export default function Footer() {
  return (
    <footer className="bg-gray-50 py-20 border-t border-gray-100">
      <div className="max-w-7xl mx-auto px-3 sm:px-4 md:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center gap-2 mb-6">
              <Icon name="droplets" size={30} className="text-primary" />
              <span className="text-2xl font-bold tracking-tight">
                Hemo<span className="text-primary">Link</span>
              </span>
            </div>
            <p className="text-gray-500 max-w-sm mb-6">
              Une initiative citoyenne pour faciliter l'accès à l'information
              sur le don de sang au Bénin. Chaque goutte compte.
            </p>
            <div className="flex gap-4">
              {['facebook', 'twitter', 'instagram'].map((s) => (
                <a
                  key={s}
                  href="#home-hero"
                  aria-label={s}
                  className="w-10 h-10 rounded-full bg-white border flex items-center justify-center hover:text-primary hover:border-primary transition-all"
                >
                  <Icon name={s} size={18} />
                </a>
              ))}
            </div>
          </div>

          <div>
            <h5 className="font-bold mb-6">Navigation</h5>
            <ul className="space-y-4 text-gray-500 text-sm">
              <li><a href="#home-hero" className="hover:text-primary transition-colors">Accueil</a></li>
              <li><a href="#test" className="hover:text-primary transition-colors">Test d'éligibilité</a></li>
              <li><a href="#centres" className="hover:text-primary transition-colors">Nos centres</a></li>
              <li><a href="#faq" className="hover:text-primary transition-colors">Questions / Réponses</a></li>
            </ul>
          </div>

          <div>
            <h5 className="font-bold mb-6">Contact</h5>
            <ul className="space-y-4 text-gray-500 text-sm">
              <li className="flex items-center gap-2">
                <Icon name="phone" size={16} />
                <a href="tel:+22921301431" className="hover:text-primary transition-colors">+229 21 30 14 31</a>
              </li>
              <li className="flex items-center gap-2">
                <Icon name="map-pin" size={16} />
                <span>Cotonou, Bénin</span>
              </li>
            </ul>
            <p className="mt-6 text-xs text-gray-400 italic">
              * Le test d'éligibilité en ligne est indicatif. Seul un entretien
              médical professionnel peut confirmer l'aptitude au don.
            </p>
          </div>
        </div>
        <div className="pt-8 border-t border-gray-200 text-center text-xs text-gray-400">
          © {new Date().getFullYear()} HemoLink — Fait avec <span aria-hidden="true">❤</span> pour le Bénin.
        </div>
      </div>
    </footer>
  )
}
