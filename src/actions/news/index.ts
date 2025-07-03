'use server'
import configPromise from '@payload-config'
import { getPayload } from 'payload'

type GetNews = {
  limit?: number
}

export async function getNews({ limit }: GetNews) {
  const payload = await getPayload({
    config: configPromise,
  })

  return payload.find({
    collection: 'news',
    pagination: true,
    select: {
      slug: true,
      title: true,
      subtitle: true,
      image: true,
      tags: true,
    },
    limit,
  })
}

export async function getNewsBySlug(slug: string) {
  const payload = await getPayload({
    config: configPromise,
  })

  return payload
    .find({
      collection: 'news',
      where: {
        slug: {
          equals: slug,
        },
      },
      limit: 1,
    })
    .then((result) => result.docs[0])
}
