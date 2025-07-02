import Link from 'next/link'
import Image from 'next/image'
import { Facebook, Instagram, Youtube, Mail, Phone, MapPin } from 'lucide-react'
import { homePageMenuItems, socialLinks } from '@/constants/layouts'

export default function Footer() {
  return (
    <footer className="bg-blue-900 text-white">
      <div className="container mx-auto px-4 py-12">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Logo e Descrição */}
          <div>
            <div className="flex items-center space-x-3 mb-4">
              <Image
                src="/images/logo/site-logo.png"
                alt="FSKB Logo"
                width={60}
                height={60}
                className="rounded-full"
              />
              <div>
                <h3 className="text-lg font-bold">FSKB</h3>
                <p className="text-sm text-blue-200">Federação Sergipana de Kickboxing</p>
              </div>
            </div>
            <p className="text-blue-200 text-sm">
              Promovendo o desenvolvimento do kickboxing em Sergipe através da excelência esportiva.
            </p>
          </div>

          {/* Links Rápidos */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Links Rápidos</h4>
            <ul className="space-y-2">
              {homePageMenuItems.map((item) => (
                <li>
                  <Link
                    key={item.label}
                    href={item.href}
                    className="text-blue-200 hover:text-white transition-colors"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contato */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Contato</h4>
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <Phone className="h-4 w-4 text-blue-300" />
                <span className="text-blue-200 text-sm">(79) 99999-9999</span>
              </div>
              <div className="flex items-center space-x-3">
                <Mail className="h-4 w-4 text-blue-300" />
                <span className="text-blue-200 text-sm">contato@fskb.com.br</span>
              </div>
              <div className="flex items-start space-x-3">
                <MapPin className="h-4 w-4 text-blue-300 mt-1" />
                <span className="text-blue-200 text-sm">
                  Rua Exemplo, 123
                  <br />
                  Centro - Aracaju/SE
                  <br />
                  CEP: 49000-000
                </span>
              </div>
            </div>
          </div>

          {/* Redes Sociais */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Redes Sociais</h4>
            <div className="flex space-x-4">
              {socialLinks.map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  aria-label={item.label}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-200 hover:text-white transition-colors"
                >
                  <item.icon className="h-6 w-6" />
                </a>
              ))}
            </div>
            <p className="text-blue-200 text-sm mt-4">
              Siga-nos nas redes sociais para ficar por dentro de todas as novidades!
            </p>
          </div>
        </div>

        <div className="border-t border-blue-800 mt-8 pt-8 text-center">
          <p className="text-blue-200 text-sm">
            © {new Date().getFullYear()} FSKB - Federação Sergipana de Kickboxing. Todos os
            direitos reservados.
          </p>
        </div>
      </div>
    </footer>
  )
}
