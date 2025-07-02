'use client'

import { Facebook, Twitter, Link2, Phone } from 'lucide-react'
import Tooltip from '@/components/tooltip'
import toast from '@/components/toast'

type Props = {
  title?: string
  link?: string
}

export default function ShareLinks({ link, title }: Props) {
  const handleCopyLink = () => {
    navigator.clipboard.writeText(`${window.location.href}${link}`)
    toast({
      title: 'Link copiado!',
      description: 'O link foi copiado para a área de transferência.',
      duration: 3000,
    })
  }

  const shareOnWhatsApp = () => {
    const url = `https://wa.me/?text=${title}; Saiba mais - ${window.location.href}${link}`
    window.open(url, '_blank')
  }

  const shareOnFacebook = () => {
    const url = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
      `${window.location.href}${link}`,
    )}&quote=${`${title}; Saiba mais - ${window.location.href}${link}`}`
    window.open(url, '_blank')
  }

  const shareOnTwitter = () => {
    const url = `https://twitter.com/intent/tweet?url=${encodeURIComponent(
      `${window.location.href}${link}`,
    )}&text=${`${title}; Saiba mais -> ${window.location.href}${link}`}`
    window.open(url, '_blank')
  }

  return (
    <div className="flex items-center space-x-2">
      <Tooltip message="Compartilhar pelo Facebook">
        <div
          className="bg-blue-600 hover:bg-blue-700 text-white rounded-full w-8 h-8 flex justify-center items-center cursor-pointer"
          aria-label="Compartilhar no Facebook"
          onClick={shareOnFacebook}
        >
          <Facebook size={16} />
        </div>
      </Tooltip>
      <Tooltip message="Compartilhar pelo Twitter">
        <div
          className="bg-sky-500 hover:bg-sky-600 text-white rounded-full w-8 h-8 flex justify-center items-center cursor-pointer"
          aria-label="Compartilhar no Twitter"
          onClick={shareOnTwitter}
        >
          <Twitter size={16} />
        </div>
      </Tooltip>
      <Tooltip message="Compartilhar pelo WhatsApp">
        <div
          className="bg-green-400 hover:bg-green-500 text-white rounded-full w-8 h-8 flex justify-center items-center cursor-pointer"
          aria-label="Compartilhar no LinkedIn"
          onClick={shareOnWhatsApp}
        >
          <Phone size={16} />
        </div>
      </Tooltip>
      <Tooltip message="Copiar Link">
        <div
          className="bg-gray-700 hover:bg-gray-800 text-white rounded-full w-8 h-8 flex justify-center items-center cursor-pointer"
          aria-label="Copiar link"
          onClick={handleCopyLink}
        >
          <Link2 size={16} />
        </div>
      </Tooltip>
    </div>
  )
}
