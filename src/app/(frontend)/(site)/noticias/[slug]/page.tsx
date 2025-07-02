import { FC } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { Badge } from '@/components/ui/badge'
import { Calendar, User, Eye, ArrowLeft } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'
import ShareLinks from '@/components/share-links'

type Params = Promise<{ slug: string }>

const news = {
  id: 1,
  title: 'Campeonato Sergipano de Kickboxing 2024 - Inscrições Abertas',
  excerpt:
    'Estão abertas as inscrições para o maior evento de kickboxing do estado. Participe e mostre seu talento!',
  content:
    "O Campeonato Sergipano de Kickboxing 2024 promete ser o maior evento da modalidade já realizado no estado. Com expectativa de mais de 200 atletas inscritos, o campeonato acontecerá nos dias 15 e 16 de março no Ginásio Constâncio Vieira, em Aracaju.\n\nAs inscrições estão abertas até o dia 28 de fevereiro e podem ser feitas através do site oficial da FSKB. O evento contará com todas as categorias, desde iniciantes até profissionais, oferecendo oportunidade para atletas de todos os níveis demonstrarem suas habilidades.\n\nO presidente da FSKB, destacou a importância do evento: 'Este campeonato representa o crescimento do kickboxing em nosso estado. Esperamos receber atletas de todo o Nordeste, consolidando Sergipe como um centro de excelência da modalidade.'\n\nAs categorias disponíveis incluem:\n- Infantil (8 a 12 anos)\n- Juvenil (13 a 17 anos)\n- Adulto (18 a 35 anos)\n- Master (acima de 35 anos)\n\nCada categoria será dividida por peso e nível técnico, garantindo competições equilibradas e seguras para todos os participantes.",
  image: '/placeholder.svg?height=400&width=800',
  date: '2024-01-15',
  author: 'FSKB',
  category: 'Competições',
  featured: true,
  views: 1250,
  tags: ['campeonato', 'sergipe', 'inscricoes', '2024'],
}

const NoticiaPage: FC<{ params: Params }> = async ({ params }) => {
  const { slug } = await params

  return (
    <section className="container mx-auto px-4 py-8">
      <article className="max-w-4xl mx-auto">
        {/* Breadcrumb */}
        <nav className="mb-6">
          <Link
            href="/noticias"
            className="inline-flex items-center text-blue-600 hover:text-blue-800 font-medium"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Voltar para Notícias
          </Link>
        </nav>

        {/* Article Header */}
        <header className="mb-8">
          <Badge className="mb-4 bg-blue-600">{news.category}</Badge>

          <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6 leading-tight">
            {news.title}
          </h1>

          <div className="flex items-center justify-between text-sm text-gray-500 mb-6">
            <div className="flex items-center space-x-6">
              <div className="flex items-center space-x-2">
                <Calendar className="h-4 w-4" />
                <span>
                  {new Date(news.date).toLocaleDateString('pt-BR', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                  })}
                </span>
              </div>
              <div className="flex items-center space-x-2">
                <User className="h-4 w-4" />
                <span>Por {news.author}</span>
              </div>
              <div className="flex items-center space-x-2">
                <Eye className="h-4 w-4" />
                <span>{news.views} visualizações</span>
              </div>
            </div>
          </div>
        </header>

        {/* Featured Image */}
        <div className="relative h-64 lg:h-96 mb-8 rounded-lg overflow-hidden">
          <Image
            src={news.image || '/placeholder.svg'}
            alt={news.title}
            fill
            className="object-cover"
          />
        </div>

        {/* Article Content */}
        <div className="prose prose-lg max-w-none mb-8">
          {news.content.split('\n\n').map((paragraph, index) => (
            <p key={index} className="text-gray-700 leading-relaxed mb-6">
              {paragraph}
            </p>
          ))}
        </div>

        {/* Share Section */}
        <Card className="mb-8">
          <CardContent className="py-0">
            <div className="flex flex-col sm:flex-row gap-4   items-center sm:justify-between">
              <div className="flex flex-col items-center sm:items-start">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  Compartilhe esta notícia
                </h3>
                <p className="text-gray-600">Ajude a divulgar o kickboxing sergipano</p>
              </div>
              <ShareLinks title={news.title} link="" />
            </div>
          </CardContent>
        </Card>
      </article>
    </section>
  )
}

export default NoticiaPage
