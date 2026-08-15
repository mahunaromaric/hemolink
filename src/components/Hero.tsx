import { Icon } from './Icon'
import { centres } from '../data/centres'
import Reveal from './Reveal'

const stats = [
  { value: '3', label: 'vies aidées par un seul don' },
  { value: '10 min', label: 'durée du prélèvement' },
  { value: `${centres.length}`, label: 'centres référencés au Bénin' },
]

function HeroIllustration() {
  return (
    <svg
      viewBox="0 0 600 480"
      preserveAspectRatio="xMidYMid meet"
      role="img"
      aria-label="Illustration d'un don de sang : un donneur dans un fauteuil de prélèvement, relié par une tubulure à une poche de sang sur son support, et trois gouttes représentant trois vies sauvées"
      className="w-full h-auto"
    >
      <title>Don de sang : trois gouttes pour trois vies sauvées</title>
      <circle cx="530" cy="60" r="180" fill="#E3EEEC" opacity="0.7" />
      <circle cx="80" cy="440" r="200" fill="#FDEBEE" opacity="0.6" />
      <circle cx="320" cy="120" r="230" fill="#FBF4F1" opacity="0.5" />

      <g stroke="#C8102E" strokeWidth="6" strokeLinecap="round" opacity="0.14">
        <path d="M 56 118 v 18 M 47 127 h 18" />
        <path d="M 554 170 v 18 M 545 179 h 18" />
      </g>

      <ellipse cx="300" cy="452" rx="232" ry="14" fill="#221416" opacity="0.07" />

      {/* fauteuil de prélèvement */}
      <rect x="96" y="414" width="216" height="16" rx="8" fill="#0E333A" />
      <rect x="122" y="430" width="26" height="14" rx="6" fill="#0E333A" />
      <rect x="258" y="430" width="26" height="14" rx="6" fill="#0E333A" />
      <rect x="112" y="332" width="195" height="86" rx="26" fill="#12414A" />
      <g transform="rotate(-10 130 260)">
        <rect x="88" y="170" width="84" height="180" rx="34" fill="#0E333A" />
      </g>
      <rect x="226" y="318" width="74" height="26" rx="13" fill="#0E333A" />

      {/* donneur */}
      <g transform="rotate(8 150 300)">
        <ellipse cx="152" cy="296" rx="64" ry="46" fill="#D8E7E3" />
      </g>
      <circle cx="122" cy="214" r="34" fill="#221416" />
      <circle cx="118" cy="222" r="28" fill="#F3E7E1" />
      <rect x="132" y="236" width="16" height="30" rx="6" fill="#F3E7E1" />
      <rect x="158" y="284" width="118" height="26" rx="13" fill="#F3E7E1" />
      <circle cx="278" cy="297" r="15" fill="#F3E7E1" />
      <circle cx="252" cy="297" r="7" fill="#FBE4E6" />

      {/* tubulure */}
      <path
        d="M 258 300 C 300 308 330 200 436 164"
        fill="none"
        stroke="#C8102E"
        strokeWidth="3.5"
        strokeLinecap="round"
        opacity="0.85"
      />
      <circle cx="442" cy="158" r="5" fill="#C8102E" />

      {/* pied à poche */}
      <rect x="430" y="122" width="11" height="316" rx="5.5" fill="#221416" />
      <rect x="408" y="434" width="55" height="10" rx="5" fill="#221416" />
      <path d="M 441 132 q 34 -4 30 24 l -14 0 q 2 -12 -16 -11 z" fill="#221416" />

      {/* poche de sang */}
      <path
        d="M 458 152 L 476 152 L 489 170 L 492 258 Q 492 280 470 280 Q 448 280 446 258 L 451 170 Z"
        fill="#C8102E"
      />
      <path d="M 452 178 L 468 176 L 468 220 L 456 220 Z" fill="#FBE4E6" opacity="0.5" />
      <rect x="452" y="228" width="40" height="26" rx="4" fill="#FBF4F1" opacity="0.92" />
      <rect x="459" y="236" width="26" height="4" rx="2" fill="#C8102E" opacity="0.7" />

      {/* trois gouttes — trois vies */}
      <g opacity="0.9">
        <g className="animate-pulse">
          <path transform="translate(506,330)" d="M0 -12 C7 2 13 8 13 15 A13 13 0 1 1 -13 15 C -13 8 -7 2 0 -12 Z" fill="#C8102E" />
        </g>
      </g>
      <g opacity="0.7">
        <g className="animate-pulse [animation-delay:150ms]">
          <path transform="translate(548,358) scale(0.8)" d="M0 -12 C7 2 13 8 13 15 A13 13 0 1 1 -13 15 C -13 8 -7 2 0 -12 Z" fill="#C8102E" />
        </g>
      </g>
      <g opacity="0.5">
        <g className="animate-pulse [animation-delay:300ms]">
          <path transform="translate(584,382) scale(0.6)" d="M0 -12 C7 2 13 8 13 15 A13 13 0 1 1 -13 15 C -13 8 -7 2 0 -12 Z" fill="#C8102E" />
        </g>
      </g>
    </svg>
  )
}

export default function Hero() {
  return (
    <section
      id="home-hero"
      className="bg-cream-alt pt-16 sm:pt-24 md:pt-32 pb-14 sm:pb-20 overflow-hidden"
    >
        <Reveal className="max-w-6xl mx-auto px-4 sm:px-7 grid grid-cols-1 lg:grid-cols-[1.05fr_0.95fr] gap-10 lg:gap-14 items-center">
          <div>
            <div className="eyebrow mb-4 whitespace-nowrap">
              <Icon name="droplets" size={14} />
              Don de sang au Bénin
            </div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl mb-5 text-balance">
              Un geste de dix minutes.
              <br />
              <em className="not-italic text-primary">
                Trois vies sauvées.
              </em>
            </h1>
            <p className="text-lg text-ink-soft max-w-xl leading-relaxed">
              Chaque jour au Bénin, des centaines de vies dépendent de la
              générosité de donneurs comme vous. Pas besoin d'être un héros
              pour sauver des vies, juste d'être humain.
            </p>
            <div className="flex flex-wrap gap-3.5 mt-8">
              <a
                href="#eligibilite"
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-primary text-white font-semibold text-sm hover:bg-red-deep transition-colors"
              >
                <Icon name="clipboardCheck" size={16} />
                Tester mon éligibilité
              </a>
              <a
                href="#centres"
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl border-[1.5px] border-line font-semibold text-sm hover:border-secondary transition-colors"
              >
                <Icon name="map-pin" size={16} />
                Trouver un centre
              </a>
            </div>
            <div className="mt-10 grid grid-cols-3 max-w-md gap-4">
              {stats.map((s) => (
                <div key={s.label}>
                  <p className="font-mono text-2xl sm:text-3xl font-semibold text-secondary whitespace-nowrap">
                    {s.value}
                  </p>
                  <p className="text-xs text-ink-faint leading-snug">{s.label}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="relative self-center">
            <HeroIllustration />
          </div>
        </Reveal>
      </section>
  )
}
