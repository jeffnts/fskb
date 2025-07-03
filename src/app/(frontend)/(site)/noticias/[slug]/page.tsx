import { FC } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { Badge } from '@/components/ui/badge'
import { Calendar, Clock, User, Eye, ArrowLeft } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'
import ShareLinks from '@/components/share-links'
import RichText from '@/components/rich-text'
import Breadcrumbs from '@/components/breadcrumbs'
import { getNewsBySlug } from '@/actions/news'
import { formatDate } from '@/utils/date'
import { calculateReadingTime } from '@/utils/text'

type Params = Promise<{ slug: string }>

const NoticiaPage: FC<{ params: Params }> = async ({ params }) => {
  const { slug } = await params
  const news = await getNewsBySlug(slug)

  return (
    <section className="container mx-auto px-4 py-8">
      <article className="max-w-4xl mx-auto">
        {/* Breadcrumb */}
        <Breadcrumbs
          links={[
            {
              name: 'Home',
              link: '/',
            },
            {
              name: 'Notícas',
              link: '/noticias',
            },
          ]}
        />

        <div className="flex gap-2 my-2">
          {news?.tags?.map((tag, index) => (
            <span
              key={index}
              className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800"
            >
              {
                //@ts-ignore
                tag.name
              }
            </span>
          ))}
        </div>

        {/* Article Header */}
        <header className="mb-8">
          <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6 leading-tight">
            {news.title}
          </h1>

          {!!news.subtitle && <h2 className="text-lg text-gray-400 mb-4">{news.subtitle}</h2>}

          <div className="flex flex-col gap-4 sm:flex-row items-center justify-between text-sm text-gray-500 mb-6">
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <Calendar size={16} />
                <span>{formatDate(news.updatedAt)}</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock size={16} />
                <span>{calculateReadingTime(news.content)} min de leitura</span>
              </div>
            </div>

            <div className="sm:ml-auto">
              <ShareLinks title={news.title} link="" />
            </div>
          </div>
        </header>

        {/* Featured Image */}
        <div className="relative h-64 lg:h-96 mb-8 rounded-lg overflow-hidden">
          <Image
            src={
              //@ts-ignore
              news.image?.url || '/images/placeholders/card-placeholder.png'
            }
            alt={news.title}
            fill
            className="object-cover"
          />
        </div>

        {/* Article Content */}
        <div className="prose prose-lg max-w-none mb-8">
          <RichText data={news.content} />
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
