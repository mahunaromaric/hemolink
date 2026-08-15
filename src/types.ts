export type DonType = 'total' | 'plasma' | 'plaquettes'

export interface Centre {
  id: number
  name: string
  /** type de structure : Siège, Hôpital, Antenne... */
  type: string
  city: string
  address: string
  phone: string
  donTypes: DonType[]
  /** modalités d'accueil */
  rdv: string
  /** libellé horaires affiché */
  hoursText: string
  /** jours d'ouverture, index 1 = lundi ... 6 = samedi */
  days: number[]
  /** heure d'ouverture en décimal (ex. 7.5 = 07h30) */
  open: number
  /** heure de fermeture en décimal (ex. 17.5 = 17h30) */
  close: number
  /** coordonnées GPS approximatives */
  lat: number
  lng: number
}
