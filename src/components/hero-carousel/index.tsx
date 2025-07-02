'use client'
import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { ChevronLeft, ChevronRight, Play } from 'lucide-react'

const slides = [
  {
    id: 1,
    title: 'Campeonato Sergipano 2024',
    subtitle: 'O maior evento de kickboxing do estado',
    description:
      'Inscrições abertas para todas as categorias. Participe e mostre seu talento no tatame!',
    cta: 'Inscrever-se Agora',
    ctaLink: '/inscricoes',
    image: null,
  },
  {
    id: 2,
    title: 'Atletas Sergipanos Brilham no Nacional',
    subtitle: 'Orgulho do kickboxing sergipano',
    description:
      'Nossos atletas conquistaram 8 medalhas no Campeonato Brasileiro, representando Sergipe com excelência.',
    cta: 'Conheça os Campeões',
    ctaLink: '/atletas-c',
    image: null,
  },
  {
    id: 3,
    title: 'Nova Academia Filiada',
    subtitle: 'Crescimento do kickboxing em Sergipe',
    description:
      'Mais uma academia se junta à família FSKB, expandindo o alcance do esporte no estado.',
    cta: 'Filie sua Academia',
    ctaLink: '/filiacao-a',
    image: null,
  },
  {
    id: 4,
    title: 'Nova Academia Filiada',
    subtitle: 'Crescimento do kickboxing em Sergipe',
    description:
      'Mais uma academia se junta à família FSKB, expandindo o alcance do esporte no estado.',
    cta: 'Filie sua Academia',
    ctaLink: '/filiacao-b',
    image: null,
  },
]

type Props = {
  isAutoPlaying?: boolean
}

export default function HeroCarousel({ isAutoPlaying = true }: Props) {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [isHovered, setIsHovered] = useState(false)

  useEffect(() => {
    if (!isAutoPlaying) return

    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length)
    }, 5000)

    return () => clearInterval(interval)
  }, [isAutoPlaying])

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length)
  }

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length)
  }

  const goToSlide = (index: number) => {
    setCurrentSlide(index)
  }

  return (
    <section
      className="relative h-[600px] overflow-hidden"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Slides */}
      <div className="relative h-full">
        {slides.map((slide, index) => (
          <div
            key={slide.id}
            className={`absolute inset-0 transition-opacity duration-1000  ${
              index === currentSlide ? 'opacity-100' : 'hidden'
            }`}
          >
            {/* Background Image */}
            <div className="absolute inset-0">
              {!!slide?.image && (
                <Image
                  src={slide.image || '/placeholder.svg'}
                  alt={slide.title}
                  fill
                  className="object-cover"
                  priority={index === 0}
                />
              )}
              <div className="absolute inset-0 bg-gradient-to-r from-blue-900/80 via-blue-800/60 to-transparent"></div>
            </div>

            {/* Content */}

            <div className="relative h-full flex items-center">
              <div className="container mx-auto px-8 lg:px-16">
                <div className="max-w-2xl text-white">
                  <div className="space-y-6">
                    <div>
                      <p className="text-yellow-400 font-semibold text-lg mb-2">{slide.subtitle}</p>
                      <h1 className="text-4xl lg:text-6xl font-bold leading-tight mb-4">
                        {slide.title}
                      </h1>
                      <p className="text-xl text-blue-100 leading-relaxed">{slide.description}</p>
                    </div>

                    <div className="flex flex-col sm:flex-row gap-4">
                      <Link href="#">
                        <Button
                          size="lg"
                          variant="outline"
                          className="w-full sm:w-fit border-2 border-white text-white hover:bg-white hover:text-blue-900 bg-transparent"
                        >
                          <Play className="h-5 w-5 mr-2" />
                          Veja mais
                        </Button>
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Navigation Arrows - Visíveis apenas no hover */}
      <button
        onClick={prevSlide}
        className={`absolute left-6 lg:left-8 top-1/2 -translate-y-1/2 bg-white/20 hover:bg-white/30 text-white p-3 rounded-full transition-all duration-300 backdrop-blur-sm ${
          isHovered ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-4'
        }`}
        aria-label="Slide anterior"
      >
        <ChevronLeft className="h-6 w-6" />
      </button>

      <button
        onClick={nextSlide}
        className={`absolute right-6 lg:right-8 top-1/2 -translate-y-1/2 bg-white/20 hover:bg-white/30 text-white p-3 rounded-full transition-all duration-300 backdrop-blur-sm ${
          isHovered ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-4'
        }`}
        aria-label="Próximo slide"
      >
        <ChevronRight className="h-6 w-6" />
      </button>

      {/* Dots Indicator */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex space-x-3">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`w-3 h-3 rounded-full transition-all ${
              index === currentSlide ? 'bg-yellow-400 scale-125' : 'bg-white/50 hover:bg-white/70'
            }`}
            aria-label={`Ir para slide ${index + 1}`}
          />
        ))}
      </div>
    </section>
  )
}
