interface StockLevel {
  group: string
  pct: number
  status: string
  barClass: string
  chipClass: string
  statusClass: string
  bgClass: string
}

const stock: StockLevel[] = [
  { group: 'O+', pct: 15, status: 'Critique', barClass: 'bg-red-500', chipClass: 'bg-red-100 text-red-600', statusClass: 'text-red-600', bgClass: 'bg-red-50 border-red-100' },
  { group: 'O-', pct: 10, status: 'Urgence', barClass: 'bg-red-500', chipClass: 'bg-red-100 text-red-600', statusClass: 'text-red-600', bgClass: 'bg-red-50 border-red-100' },
  { group: 'A+', pct: 65, status: 'Stable', barClass: 'bg-blue-500', chipClass: 'bg-blue-100 text-blue-600', statusClass: 'text-blue-600', bgClass: 'bg-blue-50 border-blue-100' },
  { group: 'B+', pct: 35, status: 'Modéré', barClass: 'bg-orange-500', chipClass: 'bg-orange-100 text-orange-600', statusClass: 'text-orange-600', bgClass: 'bg-orange-50 border-orange-100' },
  { group: 'A-', pct: 55, status: 'Stable', barClass: 'bg-blue-500', chipClass: 'bg-blue-100 text-blue-600', statusClass: 'text-blue-600', bgClass: 'bg-blue-50 border-blue-100' },
  { group: 'B-', pct: 25, status: 'Modéré', barClass: 'bg-orange-500', chipClass: 'bg-orange-100 text-orange-600', statusClass: 'text-orange-600', bgClass: 'bg-orange-50 border-orange-100' },
  { group: 'AB+', pct: 40, status: 'Modéré', barClass: 'bg-orange-500', chipClass: 'bg-orange-100 text-orange-600', statusClass: 'text-orange-600', bgClass: 'bg-orange-50 border-orange-100' },
  { group: 'AB-', pct: 20, status: 'Critique', barClass: 'bg-red-500', chipClass: 'bg-red-100 text-red-600', statusClass: 'text-red-600', bgClass: 'bg-red-50 border-red-100' },
]

export default function StockSection() {
  return (
    <section className="py-12 sm:py-16 md:py-24 bg-white">
      <div className="max-w-7xl mx-auto px-3 sm:px-4 md:px-8">
        <div className="text-center mb-12 sm:mb-16">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4">
            État des réserves au Bénin
          </h2>
          <p className="text-sm sm:text-base text-gray-500">
            Mise à jour en temps réel par le CNTS
          </p>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-2 sm:gap-4 md:gap-8">
          {stock.map((s) => (
            <div
              key={s.group}
              className={`${s.bgClass} p-4 sm:p-6 rounded-3xl border-2 flex flex-col items-center text-center`}
            >
              <div
                className={`w-10 h-10 sm:w-12 sm:h-12 rounded-full ${s.chipClass} flex items-center justify-center font-bold mb-4 text-xs sm:text-base`}
              >
                {s.group}
              </div>
              <div className="h-1.5 sm:h-2 w-full bg-gray-200 rounded-full overflow-hidden">
                <div className={`h-full ${s.barClass} rounded-full`} style={{ width: `${s.pct}%` }} />
              </div>
              <p className={`text-[10px] sm:text-xs mt-3 font-bold uppercase ${s.statusClass}`}>
                {s.status}
              </p>
            </div>
          ))}
        </div>
        <p className="mt-8 text-center text-xs text-gray-400 max-w-2xl mx-auto">
          Les réserves en sang O et en plaquettes sont les plus critiques. Votre
          don, quel que soit votre groupe, est précieux : chaque groupe a des
          patients qui l'attendent spécifiquement.
        </p>
      </div>
    </section>
  )
}
