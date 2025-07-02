'use server'
import configPromise from '@payload-config'
import { getPayload } from 'payload'

type News = {
  limit?: number
}

export async function getNews({ limit }: News) {
  const payload = await getPayload({
    config: configPromise,
  })

  return payload.find({
    collection: 'news',
    pagination: true,
    limit,
  })
}
