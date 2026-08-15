import { useMemo, useState } from 'react'
import { centres } from '../data/centres'
import type { Centre, DonType } from '../types'
import { isOpenNow } from '../lib/openStatus'
import { Icon } from './Icon'
import Reveal from './Reveal'

const donLabels: Record<DonType, string> = {
  total: 'Sang total',
  plasma: 'Plasma',
  plaquettes: 'Plaquettes',
}

const donTypes: DonType[] = ['total', 'plasma', 'plaquettes']

const cities = Array.from(new Set(centres.map((c) => c.city))).sort()

function CentersBackground() {
  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 z-0 overflow-hidden">
      <div className="absolute -top-24 -right-24 w-96 h-96 rounded-full bg-red-tint/60 blur-3xl" />
      <div className="absolute -bottom-28 -left-20 w-[28rem] h-[28rem] rounded-full bg-teal-soft/60 blur-3xl" />
      <Icon
        name="droplets"
        size={320}
        className="absolute -left-24 top-[38%] rotate-12 text-primary/10"
      />
      <span className="absolute left-[16%] top-[14%] text-2xl font-light text-primary/15">+</span>
      <span className="absolute right-[30%] bottom-[24%] text-xl font-light text-primary/15">+</span>
      <span className="absolute left-[46%] top-[7%] text-lg font-light text-secondary/15">+</span>
    </div>
  )
}

function CentreCard({ centre }: { centre: Centre }) {
  const isOpenNowVal = isOpenNow(centre)
  return (
    <article className="group bg-white border border-line rounded-2xl shadow-card hover:-translate-y-1 hover:shadow-[0_28px_50px_-24px_rgba(200,16,46,0.25)] transition-all duration-300 overflow-hidden">
      <div className="p-4 sm:p-5 flex flex-col h-full">
        <div className="flex items-center justify-between gap-3 mb-2">
          <span
            className={`inline-flex items-center gap-1.5 font-mono text-[0.7rem] font-semibold px-2.5 py-1 rounded-full ${
              isOpenNowVal ? 'bg-sage-tint text-[#2E4A38]' : 'bg-cream-alt text-ink-faint'
            }`}
          >
            <span
              className={`w-1.5 h-1.5 rounded-full ${isOpenNowVal ? 'bg-secondary' : 'bg-ink-faint/40'}`}
            />
            {isOpenNowVal ? 'Ouvert' : 'Fermé'}
          </span>
          <span className="text-xs text-ink-faint uppercase tracking-[0.06em]">{centre.type}</span>
        </div>

        <h3 className="text-lg leading-snug mb-1">{centre.name}</h3>
        <p className="text-sm text-ink-soft mb-3">{centre.city}</p>

        <div className="space-y-1.5 text-sm text-ink-soft">
          <p className="flex gap-2 items-start">
            <Icon name="map-pin" size={14} className="text-primary mt-0.5 shrink-0" />
            {centre.address}
          </p>
          <p className="flex gap-2 items-start">
            <Icon name="clock" size={14} className="text-primary mt-0.5 shrink-0" />
            {centre.hoursText}
          </p>
          <p className="flex gap-2 items-start">
            <Icon name="calendarCheck" size={14} className="text-primary mt-0.5 shrink-0" />
            {centre.rdv}
          </p>
        </div>

        <div className="flex flex-wrap gap-1.5 mt-3">
          {centre.donTypes.map((t) => (
            <span
              key={t}
              className="font-mono text-xs text-secondary bg-teal-soft px-2.5 py-1 rounded-md"
            >
              {donLabels[t]}
            </span>
          ))}
        </div>

        <div className="flex gap-2.5 mt-3">
          <a
            href={`https://www.google.com/maps/dir/?api=1&destination=${centre.lat},${centre.lng}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 flex-1 px-3 py-1.5 rounded-xl border border-secondary/30 text-secondary font-semibold text-sm hover:bg-teal-soft transition-colors"
          >
            <Icon name="map-pin" size={14} />
            Itinéraire
          </a>
          <a
            href={`tel:${centre.phone}`}
            className="inline-flex items-center justify-center gap-2 flex-1 px-3 py-1.5 rounded-xl bg-primary text-white font-semibold text-sm hover:bg-red-deep transition-colors"
          >
            <Icon name="phone" size={14} />
            Appeler
          </a>
        </div>
      </div>
    </article>
  )
}

export default function CentersSection() {
  const [query, setQuery] = useState('')
  const [city, setCity] = useState('all')
  const [donTypesFilter, setDonTypesFilter] = useState<DonType[]>([])
  const [openOnly, setOpenOnly] = useState(false)

  const result = useMemo(() => {
    const q = query.trim().toLowerCase()
    return centres.filter((c) => {
      if (q) {
        const hay = `${c.name} ${c.city} ${c.address}`.toLowerCase()
        if (!hay.includes(q)) return false
      }
      if (city !== 'all' && c.city !== city) return false
      if (donTypesFilter.length > 0 && !donTypesFilter.some((t) => c.donTypes.includes(t)))
        return false
      if (openOnly && !isOpenNow(c)) return false
      return true
    })
  }, [query, city, donTypesFilter, openOnly])

  const openCount = result.filter((c) => isOpenNow(c)).length

  const toggleDonType = (t: DonType) =>
    setDonTypesFilter((prev) =>
      prev.includes(t) ? prev.filter((x) => x !== t) : [...prev, t],
    )

  const hasActiveFilters =
    query !== '' || city !== 'all' || donTypesFilter.length > 0 || openOnly

  const resetFilters = () => {
    setQuery('')
    setCity('all')
    setDonTypesFilter([])
    setOpenOnly(false)
  }

  return (
    <section id="centres" className="relative overflow-hidden py-14 sm:py-20 bg-gradient-to-b from-pink-tint to-white">
      <CentersBackground />
      <Reveal className="relative z-10 max-w-6xl mx-auto px-4 sm:px-7">
        <div className="max-w-[640px] mb-10">
          <div className="eyebrow mb-4">
            <Icon name="map-pin" size={14} />
            Où donner
          </div>
          <h2 className="text-3xl sm:text-4xl mb-4">
            Trouver un centre de don
          </h2>
          <p className="text-[1.02rem] text-ink-soft">
            Il y a forcément un centre proche de vous parmi nos 8 sites répartis
            sur tout le Bénin.
          </p>
        </div>

        <div className="space-y-3 mb-10">
          <div className="relative max-w-xl">
            <Icon
              name="search"
              size={18}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-ink-faint"
            />
            <input
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Rechercher un centre ou une ville"
              aria-label="Rechercher un centre ou une ville"
              className="w-full rounded-xl bg-white border border-line py-3 pl-11 pr-4 text-sm placeholder:text-ink-faint focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary/50"
            />
          </div>

          <div className="flex flex-wrap items-center gap-2.5">
            <div className="relative">
              <Icon
                name="map-pin"
                size={15}
                className="absolute left-3.5 top-1/2 -translate-y-1/2 text-ink-faint pointer-events-none"
              />
              <select
                value={city}
                onChange={(e) => setCity(e.target.value)}
                aria-label="Filtrer par ville"
                className="rounded-full bg-white border border-line pl-9 pr-4 py-2 text-sm text-ink-soft focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary/50"
              >
                <option value="all">Toutes les villes</option>
                {cities.map((c) => (
                  <option key={c} value={c}>
                    {c}
                  </option>
                ))}
              </select>
            </div>

            <div className="flex items-center gap-1.5">
              {donTypes.map((t) => {
                const active = donTypesFilter.includes(t)
                return (
                  <button
                    key={t}
                    type="button"
                    onClick={() => toggleDonType(t)}
                    aria-pressed={active}
                    className={`inline-flex items-center gap-1.5 font-mono text-xs px-3 py-2 rounded-full border transition-colors ${
                      active
                        ? 'bg-secondary text-white border-secondary'
                        : 'bg-white text-ink-soft border-line hover:border-secondary/50'
                    }`}
                  >
                    <Icon
                      name="droplets"
                      size={14}
                      className={active ? 'text-white' : 'text-secondary'}
                    />
                    {donLabels[t]}
                  </button>
                )
              })}
            </div>

            <button
              type="button"
              onClick={() => setOpenOnly((v) => !v)}
              aria-pressed={openOnly}
              className="flex items-center gap-2.5"
            >
              <span className="text-sm text-ink-soft">Ouverts maintenant</span>
              <span
                className={`relative inline-flex items-center h-6 w-11 rounded-full transition-colors ${
                  openOnly ? 'bg-secondary' : 'bg-ink-faint/30'
                }`}
              >
                <span
                  className={`inline-block w-4 h-4 bg-white rounded-full shadow transition-transform ${
                    openOnly ? 'translate-x-6' : 'translate-x-1'
                  }`}
                />
              </span>
            </button>
          </div>

          <div className="flex flex-wrap items-center justify-between gap-2 max-w-xl">
            <span className="font-mono text-xs text-ink-faint">
              {result.length} centre{result.length > 1 ? 's' : ''} affiché
              {result.length > 1 ? 's' : ''} · {openCount} ouvert{openCount > 1 ? 's' : ''} actuellement
            </span>
            <button
              type="button"
              onClick={resetFilters}
              disabled={!hasActiveFilters}
              className="inline-flex items-center gap-1.5 font-mono text-xs text-ink-faint hover:text-primary transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
            >
              <Icon name="rotate-ccw" size={14} />
              Tout réinitialiser
            </button>
          </div>
        </div>

        {result.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {result.map((c) => (
              <CentreCard key={c.id} centre={c} />
            ))}
          </div>
        ) : (
          <div className="bg-white border border-line rounded-2xl p-8 text-center max-w-xl">
            <Icon name="search" size={24} className="mx-auto text-ink-faint mb-3" />
            <p className="text-sm text-ink-soft">
              Aucun centre ne correspond à ces critères.
            </p>
          </div>
        )}
      </Reveal>
    </section>
  )
}