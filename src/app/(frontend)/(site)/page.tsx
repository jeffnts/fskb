import React from 'react'
import HeroCarousel from '@/components/hero-carousel'
import HomePageSection from '@/components/home-page-section'
import NewsCard from '@/components/news-card'
import ContactForm from '@/sections/contact/contact-form'
import { getNews } from '@/actions/news'
import { getEvents } from '@/actions/events'

export default async function SiteHomePage() {
  const news = await getNews({ limit: 6 })
  const events = await getEvents({ limit: 6 })

  return (
    <main>
      <HeroCarousel />
      <HomePageSection
        isVisible={!!news.docs?.length}
        title="Últimas Notícias"
        description="Fique por dentro de tudo que acontece no mundo do kickboxing sergipano"
        button={{
          link: '/noticias',
          text: 'Ver Todas as Notícias',
        }}
      >
        <div className="flex gap-4 flex-wrap px-6 ">
          {news.docs?.map((news) => (
            <NewsCard
              key={news.slug}
              slug={news.slug}
              title={news.title}
              subtitle={news?.subtitle as string}
              image={news?.image as any}
              tags={news.tags?.map(({ name }: any) => name)}
            />
          ))}
        </div>
      </HomePageSection>

      <HomePageSection
        isVisible={!!events.docs?.length}
        title="Próximos Eventos"
        description="Confira os próximos campeonatos, seminários e eventos da FSKB"
        button={{
          link: '/eventos',
          text: 'Ver Todas os Eventos',
        }}
      ></HomePageSection>

      <HomePageSection
        isVisible={false}
        title="Nossos Filiados"
        description="Academias parceiras que promovem o desenvolvimento do kickboxing em Sergipe"
        button={{
          link: '/filiados',
          text: 'Ver Todas os Filiados',
        }}
      ></HomePageSection>

      <HomePageSection
        title="Entre em Contato"
        description="Tem alguma dúvida ou quer saber mais sobre o kickboxing sergipano? Entre em contato conosco!"
      >
        <ContactForm />
      </HomePageSection>
    </main>
  )
}
