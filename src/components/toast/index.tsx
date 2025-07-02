type ToastProps = {
  title: string
  description?: string
  duration?: number
  type?: 'success' | 'error' // Adiciona a propriedade type
}

export default function toast({ title, description, duration = 3000, type }: ToastProps) {
  const toastElement = document.createElement('div')

  // Define a cor do toast com base no tipo
  const backgroundColor =
    type === 'success'
      ? 'bg-green-500 text-white'
      : type === 'error'
        ? 'bg-red-500 text-white'
        : 'bg-white text-black'

  toastElement.className = `fixed bottom-4 right-4 ${backgroundColor} p-4 rounded-lg shadow-lg z-50 max-w-md`
  toastElement.innerHTML = `
      <h3 class="font-bold">${title}</h3>
      ${description ? `<p class="text-sm">${description}</p>` : ''}
    `

  document.body.appendChild(toastElement)

  setTimeout(() => {
    toastElement.classList.add('opacity-0', 'transition-opacity')
    setTimeout(() => {
      document.body.removeChild(toastElement)
    }, 300)
  }, duration)
}
