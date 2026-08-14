import { useEffect, useMemo, useState } from 'react'
import { centres } from '../data/centres'
import type { Centre, DonType } from '../types'
import { getOpenStatus } from '../lib/openStatus'
import { Icon } from './Icon'

interface Filters {
  query: string
  city: string
  type: DonType | 'all'
  openNow: boolean
}

const cities = [...new Set(centres.map((c) => c.city))].sort()
const types: (DonType | 'all')[] = ['all', 'sang total', 'plasma', 'plaquettes']

function filterCentres(list: Centre[], f: Filters): Centre[] {
  return list.filter((c) => {
    const q = f.query.trim().toLowerCase()
    if (q && !`${c.name} ${c.city} ${c.address}`.toLowerCase().includes(q)) return false
    if (f.city !== 'all' && c.city !== f.city) return false
    if (f.type !== 'all' && !c.types.includes(f.type)) return false
    if (f.openNow && !getOpenStatus(c).open) return false
    return true
  })
}

function CentreCard({ centre }: { centre: Centre }) {
  const status = getOpenStatus(centre)
  return (
    <article className="bg-white border border-gray-100 p-8 rounded-[32px] card-hover relative overflow-hidden group">
      <div className="absolute top-0 right-0 px-4 py-2 bg-softblue rounded-bl-3xl text-secondary">
        <Icon name="building" size={18} />
      </div>
      <p className="text-[10px] uppercase tracking-widest text-gray-400 font-bold mb-2">
        {centre.nature}
      </p>
      <h3 className="text-xl font-bold mb-2">{centre.name}</h3>
      <div className="space-y-2 text-sm text-gray-500 mb-4">
        <p className="flex items-start gap-2">
          <Icon name="map-pin" size={16} className="mt-0.5 shrink-0" />
          <span>{centre.address}, {centre.city}</span>
        </p>
        <p className="flex items-center gap-2">
          <Icon name="phone" size={16} className="shrink-0" />
          <a href={`tel:${centre.contact.replace(/\s/g, '')}`} className="hover:text-primary transition-colors">
            {centre.contact}
          </a>
        </p>
      </div>
      <div className="flex flex-wrap gap-2 mb-4">
        {centre.types.map((t) => (
          <span key={t} className="text-[10px] font-bold uppercase tracking-wide px-3 py-1 rounded-full bg-softblue text-secondary">
            {t}
          </span>
        ))}
        <span className="text-[10px] font-bold uppercase tracking-wide px-3 py-1 rounded-full bg-gray-100 text-gray-600">
          {centre.mode}
        </span>
      </div>
      <div className="flex items-center justify-between pt-4 border-t border-gray-100">
        <span
          className={`inline-flex items-center gap-2 text-xs font-bold ${
            status.open ? 'text-green-600' : 'text-red-600'
          }`}
        >
          <span
            className={`h-2 w-2 rounded-full ${status.open ? 'bg-green-500' : 'bg-red-500'}`}
            aria-hidden="true"
          />
          {status.open ? 'Ouvert maintenant' : 'Fermé'}
        </span>
        <span className="text-xs text-gray-500">
          {status.todayHours ? `${status.todayHours.open} – ${status.todayHours.close}` : 'Fermé aujourd\u2019hui'}
        </span>
      </div>
    </article>
  )
}

function SkeletonCard() {
  return (
    <div className="bg-white border border-gray-100 p-8 rounded-[32px] animate-pulse" aria-hidden="true">
      <div className="h-3 w-24 bg-gray-200 rounded mb-4" />
      <div className="h-5 w-40 bg-gray-200 rounded mb-4" />
      <div className="h-3 w-full bg-gray-100 rounded mb-2" />
      <div className="h-3 w-2/3 bg-gray-100 rounded mb-6" />
      <div className="h-6 w-32 bg-gray-100 rounded mb-4" />
      <div className="h-4 w-1/2 bg-gray-100 rounded" />
    </div>
  )
}

export default function CentersSection() {
  const [filters, setFilters] = useState<Filters>({
    query: '',
    city: 'all',
    type: 'all',
    openNow: false,
  })
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const t = setTimeout(() => setLoading(false), 600)
    return () => clearTimeout(t)
  }, [])

  const result = useMemo(() => filterCentres(centres, filters), [filters])

  const cityCount = useMemo(
    () => new Set(centres.map((c) => c.city)).size,
    [],
  )

  return (
    <section id="centres" className="py-12 sm:py-16 md:py-24 bg-white">
      <div className="max-w-7xl mx-auto px-3 sm:px-4 md:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div className="max-w-xl">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4">
              Trouver un centre de don
            </h2>
            <p className="text-sm sm:text-base text-gray-600">
              Il y a forcément un centre proche de vous parmi nos {centres.length} sites
              répartis sur {cityCount} villes du Bénin.
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
            <div className="relative w-full sm:w-64">
              <Icon name="search" size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
              <label htmlFor="centerSearch" className="sr-only">
                Chercher un centre par nom ou ville
              </label>
              <input
                type="search"
                id="centerSearch"
                placeholder="Chercher une ville..."
                value={filters.query}
                onChange={(e) => setFilters((f) => ({ ...f, query: e.target.value }))}
                className="pl-10 sm:pl-12 pr-4 py-2.5 sm:py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-secondary focus:border-transparent outline-none w-full"
              />
            </div>
            <div className="flex flex-wrap gap-3">
              <label className="sr-only" htmlFor="cityFilter">Ville</label>
              <select
                id="cityFilter"
                value={filters.city}
                onChange={(e) => setFilters((f) => ({ ...f, city: e.target.value }))}
                className="px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-secondary outline-none"
              >
                <option value="all">Toutes les villes</option>
                {cities.map((c) => (
                  <option key={c} value={c}>{c}</option>
                ))}
              </select>
              <label className="sr-only" htmlFor="donationTypeFilter">Type de don</label>
              <select
                id="donationTypeFilter"
                value={filters.type}
                onChange={(e) => setFilters((f) => ({ ...f, type: e.target.value as Filters['type'] }))}
                className="px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-secondary outline-none"
              >
                {types.map((t) => (
                  <option key={t} value={t}>
                    {t === 'all' ? 'Tous les types de dons' : t.charAt(0).toUpperCase() + t.slice(1)}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        <label className="inline-flex items-center gap-3 cursor-pointer text-sm text-gray-600 mb-8 bg-softblue rounded-xl px-4 py-3">
          <input
            type="checkbox"
            checked={filters.openNow}
            onChange={(e) => setFilters((f) => ({ ...f, openNow: e.target.checked }))}
            className="w-4 h-4 rounded accent-secondary"
          />
          <span className="font-semibold text-slatedark">Ouverts maintenant</span>
          <span className="text-xs text-gray-500">(filtrer selon les horaires actuels)</span>
        </label>

        {error ? (
          <div
            className="py-20 text-center rounded-[32px] border-2 border-red-100 bg-red-50"
            role="alert"
          >
            <Icon name="alert-circle" size={64} className="text-red-300 mb-4 mx-auto" />
            <p className="text-xl font-medium text-gray-400">{error}</p>
            <button
              type="button"
              onClick={() => { setError(null); setLoading(true); setTimeout(() => setLoading(false), 400) }}
              className="mt-6 px-6 py-3 rounded-xl bg-primary text-white font-bold hover:opacity-90 transition-all"
            >
              Réessayer
            </button>
          </div>
        ) : loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8" aria-busy="true">
            {Array.from({ length: 6 }).map((_, i) => (
              <SkeletonCard key={i} />
            ))}
          </div>
        ) : result.length === 0 ? (
          <div className="py-20 text-center">
            <Icon name="map-pin-off" size={64} className="text-gray-300 mb-4 mx-auto" />
            <p className="text-xl font-medium text-gray-400">
              Aucun centre ne correspond à votre recherche.
            </p>
            <button
              type="button"
              onClick={() => setFilters({ query: '', city: 'all', type: 'all', openNow: false })}
              className="mt-6 px-6 py-3 rounded-xl bg-primary text-white font-bold hover:opacity-90 transition-all"
            >
              Réinitialiser les filtres
            </button>
          </div>
        ) : (
          <>
            <p className="text-sm text-gray-500 mb-6" role="status">
              {result.length} centre{result.length > 1 ? 's' : ''} trouvé
              {result.length > 1 ? 's' : ''}
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {result.map((c) => (
                <CentreCard key={c.id} centre={c} />
              ))}
            </div>
          </>
        )}
      </div>
    </section>
  )
}
