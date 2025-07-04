import React from 'react'
import Pagination from '@/components/pagination'
import LatestArticleCard from '@/sections/news/latest-article-card'
import NewsSidebar from '@/sections/news/news-sidebar'
import NewsArticleCard from '@/sections/news/news-article-card'
import { getNews, getAllTags } from '@/actions/news'

type SearchParams = Promise<{ [key: string]: string }>

type Props = {
  searchParams: SearchParams
}

const NoticiasPage: React.FC<Props> = async ({ searchParams }) => {
  const [latestNews] = (await getNews({ limit: 1 }))?.docs || []
  const tags = (await getAllTags()).docs.map((tag) => tag.name) || []

  const { pagina = 1, limite = 5, tags: tagsParams, noticia } = await searchParams

  const tagsArray = (tagsParams?.split(',') || [])
    .map((tag) => tag.trim())
    .filter((tag) => tag !== '')

  const allNews = await getNews({
    limit: +limite,
    page: +pagina,
    tags: tagsArray,
    search: noticia,
    notIn: latestNews?.id,
  })

  return (
    <section className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">Notícias</h1>
        <p className="text-gray-600 text-lg">
          Fique por dentro de tudo que acontece no mundo do kickboxing sergipano
        </p>
      </div>

      {!!latestNews && (
        <LatestArticleCard
          slug={latestNews.slug}
          title={latestNews.title}
          subtitle={latestNews?.subtitle}
          image={latestNews.image as any}
          tags={latestNews?.tags as any}
          updatedAt={latestNews.updatedAt}
        />
      )}

      <div className="grid lg:grid-cols-4 gap-8">
        <NewsSidebar tags={tags} />

        {/* News List */}
        <div className="lg:col-span-3 ">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Outras Notícias</h2>

          <div className="grid gap-6">
            {allNews?.docs?.map((news) => (
              <NewsArticleCard
                key={news.slug}
                slug={news.slug}
                title={news.title}
                subtitle={news?.subtitle as string}
                image={news?.image as any}
                tags={news.tags as []}
                updatedAt={news.updatedAt}
              />
            ))}
          </div>
          <Pagination
            data={allNews?.docs}
            title="notícias"
            page={+pagina}
            limit={+limite}
            totalPages={allNews.totalPages}
          />
        </div>
      </div>
    </section>
  )
}

export default NoticiasPage
