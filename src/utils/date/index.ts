export function formatDate(dateString: string): string {
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

  const [year, month, day] = dateString.split('-')

  return `${day.slice(0, 2)} de ${months[+month - 1]}, ${year}`
}
