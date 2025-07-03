'use server'
import configPromise from '@payload-config'
import { getPayload } from 'payload'

type GetEvents = {
  limit?: number
}

export async function getEvents({ limit }: GetEvents) {
  const payload = await getPayload({
    config: configPromise,
  })

  return payload.find({
    collection: 'events',
    pagination: true,
    limit,
  })
}
