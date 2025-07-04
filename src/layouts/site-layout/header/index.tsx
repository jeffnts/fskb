'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Menu, X } from 'lucide-react'
import { Button } from '@/components/ui/button'
import Image from 'next/image'
import { homePageMenuItems, socialLinks } from '@/constants/layouts'
import useIsNavbarActive from '@/hooks/use-is-navbar-active'

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)

  const isActive = useIsNavbarActive()

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY
      setIsScrolled(scrollTop > 100)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 bg-blue-800 text-white shadow-lg transition-all duration-300 ${
        isScrolled ? 'py-2' : 'py-0'
      }`}
    >
      <div className="container mx-auto px-4">
        {/* Header Completo - Visível apenas quando não rolado */}
        <div
          className={`transition-all duration-300 overflow-hidden ${
            isScrolled ? 'max-h-0 opacity-0' : 'max-h-96 opacity-100'
          }`}
        >
          {/* Logo Section - Centralizado */}
          <div className="flex items-center justify-center py-6 relative">
            {/* Social Media - Desktop (Canto direito) */}
            <div className="hidden lg:flex items-center space-x-3 absolute right-0">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-200 hover:text-white transition-colors p-2 rounded-full hover:bg-blue-700"
                  aria-label={social.label}
                >
                  <social.icon className="h-5 w-5" />
                </a>
              ))}
            </div>

            {/* Logo e Nome Centralizados */}
            <Link href="/" className="flex flex-col items-center space-y-2">
              <p className="text-sm font-medium text-blue-200 tracking-wide">
                FEDERAÇÃO SERGIPANA DE KICKBOXING
              </p>
              <div className="flex items-center space-x-3">
                <Image
                  src="/images/logo/site-logo.png"
                  alt="FSKB Logo"
                  width={100}
                  height={100}
                  className="rounded-full"
                />
              </div>
            </Link>

            {/* Mobile Menu Button */}
            <Button
              variant="ghost"
              size="icon"
              className="lg:hidden text-white hover:bg-blue-700 absolute right-0"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </Button>
          </div>

          {/* Navigation Menu - Desktop */}
          <nav className="hidden lg:block border-t border-blue-700">
            <div className="flex items-center justify-center space-x-8 py-4">
              {homePageMenuItems.map((item) => (
                <Link
                  key={item.label}
                  href={item.href}
                  className={`
                    hover:text-yellow-400 transition-colors text-sm font-medium py-2 px-3 rounded hover:bg-blue-700
                    ${isActive(item.href) && 'text-yellow-400 bg-blue-700'}
                    `}
                >
                  {item.label.toLocaleUpperCase()}
                </Link>
              ))}
            </div>
          </nav>
        </div>

        {/* Header Compacto - Visível apenas quando rolado */}
        <div
          className={`transition-all duration-300 ${
            isScrolled ? 'opacity-100 max-h-20' : 'opacity-0 max-h-0 overflow-hidden'
          }`}
        >
          <div className="flex items-center justify-between py-3">
            {/* Logo Compacto */}
            <Link href="/" className="flex items-center space-x-3">
              <Image
                src="/images/logo/site-logo.png"
                alt="FSKB Logo"
                width={60}
                height={60}
                className="rounded-full"
              />
            </Link>

            <p className="text-lg lg:hidden font-bold text-blue-200 tracking-wide">FSKB</p>

            {/* Menu Horizontal Compacto - Desktop */}
            <nav className="hidden lg:flex items-center space-x-6">
              {homePageMenuItems.map((item) => (
                <Link
                  key={item.label}
                  href={item.href}
                  className={`hover:text-yellow-400 transition-colors text-xs font-medium py-1 px-2 rounded hover:bg-blue-700
                      ${isActive(item.href) && 'text-yellow-400 bg-blue-700'}
                    `}
                >
                  {item.label.toLocaleUpperCase()}
                </Link>
              ))}
            </nav>

            {/* Social Media Compacto - Desktop */}
            <div className="hidden lg:flex items-center space-x-2">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-200 hover:text-white transition-colors p-1 rounded-full hover:bg-blue-700"
                  aria-label={social.label}
                >
                  <social.icon className="h-4 w-4" />
                </a>
              ))}
            </div>

            {/* Mobile Menu Button - Compacto */}
            <Button
              variant="ghost"
              size="icon"
              className="lg:hidden text-white hover:bg-blue-700"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <nav className="lg:hidden border-t border-blue-700 pb-4 bg-blue-800">
            <div className="flex flex-col space-y-2 pt-4">
              {homePageMenuItems.map((item) => (
                <Link
                  key={item.label}
                  href={item.href}
                  className="hover:text-yellow-400 transition-colors text-sm font-medium py-3 px-4 rounded hover:bg-blue-700"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.label.toLocaleUpperCase()}
                </Link>
              ))}

              {/* Mobile Social Links */}
              <div className="flex items-center justify-center space-x-4 pt-4 mt-4 border-t border-blue-600">
                <span className="text-sm text-blue-200">Siga-nos:</span>
                {socialLinks.map((social) => (
                  <a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-200 hover:text-white transition-colors p-2 rounded-full hover:bg-blue-700"
                    aria-label={social.label}
                  >
                    <social.icon className="h-5 w-5" />
                  </a>
                ))}
              </div>
            </div>
          </nav>
        )}
      </div>
    </header>
  )
}
