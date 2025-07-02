import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import ShareLinks from '@/components/share-links'

type Props = {
  slug: string
  title?: string
  subtitle?: string
  image?: {
    url?: string
  }
  tags?: string[]
}

const NewsCard: React.FC<Props> = ({ slug, title, subtitle, image, tags }) => {
  return (
    <div
      key={slug}
      className="flex flex-col justify-between  w-full sm:w-[400px] bg-white shadow-md rounded"
    >
      <div className="relative w-full h-48">
        <Image
          //@ts-ignore
          src={image?.url || '/images/placeholders/card-placeholder.png'}
          alt={title || 'Imagem da notícia'}
          layout="fill"
          objectFit="cover"
        />
      </div>

      <div className="p-4 flex flex-col">
        <div className="flex flex-wrap gap-2 mb-3">
          {tags?.map((tag, index) => (
            <span
              key={index}
              className="inline-flex  items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800"
            >
              {tag}
            </span>
          ))}
        </div>

        <Link href={`/noticias/${slug}`}>
          <h3 className="text-xl font-bold mb-2 hover:text-primary transition-colors">{title}</h3>
        </Link>
        {!!subtitle && <p className="text-gray-600 mb-4 text-sm">{subtitle}</p>}
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
          <Button
            variant="outline"
            size="sm"
            className="hover:bg-blue-800 hover:text-white w-full sm:w-fit"
          >
            <Link href={`/noticias/${slug}`}>Leia mais</Link>
          </Button>

          <ShareLinks link={slug} title={title} />
        </div>
      </div>
    </div>
  )
}

export default NewsCard
