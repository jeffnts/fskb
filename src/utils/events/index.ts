import { capitalizeFirstLetter } from '@/utils/text'

type DateItem = { id: string; date: string }

export const formatEventDates = (dates: DateItem[]): string => {
  const months = [
    'Janeiro',
    'Fevereiro',
    'Março',
    'Abril',
    'Maio',
    'Junho',
    'Julho',
    'Agosto',
    'Setembro',
    'Outubro',
    'Novembro',
    'Dezembro',
  ]

  // Obter o ano corrente
  const currentYear = new Date().getFullYear()

  // Agrupar as datas por mês
  const groupedDates = dates.reduce((acc: Record<number, number[]>, d) => {
    const date = new Date(d.date)
    const monthIndex = date.getUTCMonth()
    const day = date.getUTCDate()

    if (!acc[monthIndex]) {
      acc[monthIndex] = []
    }

    acc[monthIndex].push(day)
    return acc
  }, {})

  // Formatar as datas agrupadas
  const formattedDates = Object.entries(groupedDates)
    .map(([monthIndex, days]) => {
      const monthName = months[parseInt(monthIndex, 10)]
      const prefix = days.length > 1 ? 'dias' : 'dia'
      return `${prefix} ${days.join(', ')} de ${monthName}`
    })
    .join(' e ')

  return capitalizeFirstLetter(`${formattedDates} de ${currentYear}`)
}
