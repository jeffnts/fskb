import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import ShareLinks from '@/components/share-links'
import { Calendar } from 'lucide-react'
import { formatDate } from '@/utils/date'

type Props = {
  slug: string
  title: string
  subtitle?: string | null
  image?: {
    url?: string
  }
  tags?: { name: string }[] | null
  updatedAt: string
}

const NewsArticleCard: React.FC<Props> = ({ slug, title, subtitle, image, tags, updatedAt }) => (
  <Card className="overflow-hidden hover:shadow-lg transition-shadow p-0 mb-6">
    <div className="grid md:grid-cols-3 gap-0">
      <div className="relative h-48 md:h-full">
        <Image
          src={image?.url || '/images/placeholders/card-placeholder.png'}
          alt={title}
          fill
          className="object-cover"
        />
      </div>

      <CardContent className="md:col-span-2 p-6">
        <div className="flex flex-wrap gap-2 mb-3">
          {tags?.map((tag, index) => (
            <span
              key={index}
              className="inline-flex  items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800"
            >
              {tag.name}
            </span>
          ))}
        </div>

        <h3 className="text-xl font-bold text-gray-900 mb-3 line-clamp-2">{title}</h3>

        {!!subtitle && <p className="text-gray-600 mb-4 line-clamp-2">{subtitle}</p>}

        <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-1">
              <Calendar className="h-4 w-4" />
              <span>{formatDate(updatedAt)}</span>
            </div>
          </div>
        </div>

        <div className="flex flex-col items-center gap-8 sm:flex-row sm:justify-between">
          <Button
            variant="outline"
            size="sm"
            className="hover:bg-blue-800 hover:text-white w-full sm:w-fit"
          >
            <Link href={`/noticias/${slug}`}>Leia a matéria completa →</Link>
          </Button>

          <ShareLinks link={slug} title={title} />
        </div>
      </CardContent>
    </div>
  </Card>
)

export default NewsArticleCard
