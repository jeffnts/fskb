import React from 'react'
import { Skeleton } from '@/components/ui/skeleton'
import NewsSidebar from '@/sections/news/news-sidebar'

export default function Loading() {
  return (
    <section className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">Notícias</h1>
        <p className="text-gray-600 text-lg">
          Fique por dentro de tudo que acontece no mundo do kickboxing sergipano
        </p>
      </div>

      <Skeleton className="h-[400px] w-full bg-gray-200 mb-10" />

      <div className="grid lg:grid-cols-4 gap-8">
        <NewsSidebar tags={[]} />

        {/* News List */}
        <div className="lg:col-span-3 ">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Outras Notícias</h2>

          <div className="grid gap-6">
            {Array.from({ length: 3 }).map((_, i) => (
              <Skeleton key={i} className="h-60 w-full bg-gray-200" />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
