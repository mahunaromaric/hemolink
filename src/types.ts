export type DonType = 'sang total' | 'plasma' | 'plaquettes'

export interface Centre {
  id: number
  name: string
  nature: string
  city: string
  address: string
  /** heures d'ouverture par jour de la semaine, index 0 = dimanche */
  hours: Record<number, { open: string; close: string } | null>
  contact: string
  email?: string
  types: DonType[]
  /** modalités d'accueil */
  mode: 'Sans RDV' | 'Sur RDV conseillé' | 'Sur RDV'
}
