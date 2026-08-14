import { Icon } from './Icon'

const stats = [
  { value: '85%', label: 'Besoins couverts' },
  { value: '15min', label: 'Temps de don' },
  { value: '3 vies', label: 'Sauvées par don' },
]

export default function Hero() {
  return (
    <header
      id="home-hero"
      className="pt-20 pb-16 sm:pt-32 sm:pb-20 md:pt-48 md:pb-32 gradient-bg overflow-hidden relative"
    >
      <div className="max-w-7xl mx-auto px-3 sm:px-4 md:px-8 flex flex-col md:flex-row items-center gap-8 sm:gap-12">
        <div className="flex-1 text-center md:text-left z-10">
          <div className="inline-flex items-center gap-2 bg-white/80 backdrop-blur px-4 py-2 rounded-full border border-primary/10 mb-6">
            <span className="flex h-2 w-2 rounded-full bg-primary animate-pulse" />
            <span className="text-primary font-semibold text-[10px] sm:text-xs uppercase tracking-widest">
              Urgence Vitale au Bénin
            </span>
          </div>
          <h1 className="text-3xl sm:text-5xl md:text-7xl font-bold text-slatedark leading-tight mb-6">
            Votre sang est le <span className="text-primary">lien</span> qui
            sauve.
          </h1>
          <p className="text-base sm:text-lg text-slatedark/70 max-w-xl mb-10 leading-relaxed">
            Chaque jour au Bénin, des centaines de vies dépendent de la
            générosité de donneurs comme vous. Pas besoin d'être un héros pour
            sauver des vies, juste d'être humain.
          </p>
          <div className="flex flex-col sm:flex-row items-center gap-4 justify-center md:justify-start">
            <a
              href="#test"
              className="w-full sm:w-auto bg-primary text-white px-8 py-3 sm:py-4 rounded-2xl font-bold text-base sm:text-lg hover:opacity-90 transition-all shadow-xl shadow-primary/20 flex items-center justify-center gap-2"
            >
              Je teste mon éligibilité <Icon name="chevronRight" size={20} />
            </a>
            <a
              href="#centres"
              className="w-full sm:w-auto bg-white border border-gray-200 text-slatedark px-8 py-3 sm:py-4 rounded-2xl font-bold text-base sm:text-lg hover:bg-gray-50 transition-all flex items-center justify-center gap-2"
            >
              Trouver un centre
            </a>
          </div>
          <div className="mt-12 flex flex-col sm:flex-row items-center justify-center md:justify-start gap-6 sm:gap-8">
            {stats.map((s, i) => (
              <div key={s.label} className="flex flex-col sm:flex-row items-center gap-6 sm:gap-8">
                {i > 0 && (
                  <>
                    <span className="hidden sm:block w-px h-10 bg-gray-200" />
                    <span className="sm:hidden w-10 h-px bg-gray-200" />
                  </>
                )}
                <div className="text-center md:text-left">
                  <p className="text-2xl font-bold text-slatedark">{s.value}</p>
                  <p className="text-[10px] sm:text-xs text-slatedark/60 font-medium uppercase tracking-wider">
                    {s.label}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="flex-1 w-full relative hidden md:block" aria-hidden="true">
          <div className="absolute -inset-4 bg-primary/10 blur-3xl rounded-full" />
          <div className="relative rounded-3xl border-4 border-white shadow-2xl bg-white/60 backdrop-blur p-8 flex flex-col items-center gap-6">
            <div className="w-24 h-24 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center shadow-xl shadow-primary/30">
              <Icon name="droplets" size={48} className="text-white" />
            </div>
            <p className="text-slatedark font-bold text-xl text-center">
              Un geste simple.
              <br />
              <span className="text-primary">Trois vies sauvées.</span>
            </p>
            <div className="w-full grid grid-cols-3 gap-3">
              {['Globules rouges', 'Plasma', 'Plaquettes'].map((p) => (
                <div
                  key={p}
                  className="bg-softblue rounded-xl px-2 py-3 text-center"
                >
                  <p className="text-[10px] font-bold text-secondary uppercase tracking-wide">
                    {p}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </header>
  )
}
