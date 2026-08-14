const stories = [
  {
    name: 'Mariam, 8 ans',
    tag: 'Leucémie – Cotonou',
    tagClass: 'text-primary',
    quote: '« Merci aux 47 donneurs qui m\u2019ont permis de fêter mon anniversaire cette année. »',
    img: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=400',
    alt: 'Portrait de Mariam',
  },
  {
    name: 'Koffi, 42 ans',
    tag: 'Accidenté – Parakou',
    tagClass: 'text-secondary',
    quote: '« Sans transfusion immédiate après mon accident, je ne serais plus là pour mes enfants. »',
    img: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=400',
    alt: 'Portrait de Koffi',
  },
  {
    name: 'Saliou, Infirmière',
    tag: 'CNTS – Porto-Novo',
    tagClass: 'text-green-600',
    quote: '« Chaque jour, je vois l\u2019angoisse des familles s\u2019apaiser quand le stock de sang arrive. »',
    img: 'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?auto=format&fit=crop&q=80&w=400',
    alt: 'Portrait de Saliou',
  },
  {
    name: 'Mme Adjovi',
    tag: 'Maternité – Abomey',
    tagClass: 'text-orange-600',
    quote: '« Grâce au don, ma complication post-partum a pu être traitée en urgence. »',
    img: 'https://images.unsplash.com/photo-1531123897727-8f129e1688ce?auto=format&fit=crop&q=80&w=400',
    alt: 'Portrait de Mme Adjovi',
  },
]

export default function TestimonialsSection() {
  return (
    <section id="impact-stories" className="py-12 sm:py-16 md:py-24 bg-white">
      <div className="max-w-7xl mx-auto px-3 sm:px-4 md:px-8">
        <div className="text-center mb-12 sm:mb-16">
          <span className="text-primary font-bold uppercase tracking-widest text-xs sm:text-sm mb-4 block">
            Trajectoires de vies
          </span>
          <h2 className="text-2xl sm:text-3xl md:text-5xl font-bold mb-6 text-slatedark">
            L'impact de votre geste
          </h2>
          <p className="text-base sm:text-lg text-slatedark/60">
            Derrière chaque poche de sang se cache un sourire retrouvé au Bénin.
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {stories.map((s) => (
            <article key={s.name} className="bg-gray-50 p-6 rounded-[32px] border border-gray-100">
              <div className="aspect-square rounded-2xl bg-gray-200 mb-6 overflow-hidden">
                <img
                  src={s.img}
                  alt={s.alt}
                  loading="lazy"
                  className="w-full h-full object-cover grayscale"
                />
              </div>
              <h3 className="font-bold text-lg mb-1">{s.name}</h3>
              <p className={`text-xs font-bold uppercase mb-4 ${s.tagClass}`}>{s.tag}</p>
              <p className="text-sm text-gray-500 italic font-medium">{s.quote}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
