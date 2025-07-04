'use server'
import configPromise from '@payload-config'
import { getPayload } from 'payload'

type GetNews = {
  limit?: number
  page?: number
  tags?: string[]
  search?: string
  notIn?: number
}

export async function getNews({ limit, page, tags, search, notIn }: GetNews) {
  const payload = await getPayload({
    config: configPromise,
  })

  const allSelectedTags = await payload.find({
    collection: 'tags',
    pagination: false,
    where: {
      name: {
        in: tags,
      },
    },
  })

  let where: any = {}
  if (tags?.length) {
    where.tags = {
      in: allSelectedTags.docs.map((tag: any) => tag.id),
    }
  }

  if (search?.length) {
    where = {
      ...where,
      or: [{ title: { contains: search } }, { subtitle: { contains: search } }],
    }
  }

  if (notIn) {
    where.id = {
      not_equals: notIn,
    }
  }

  return payload.find({
    collection: 'news',
    pagination: true,
    select: {
      id: true,
      slug: true,
      title: true,
      subtitle: true,
      image: true,
      tags: true,
      updatedAt: true,
    },
    limit,
    page,
    where,
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
    .then((result) => result?.docs[0])
}

export async function getAllTags() {
  const payload = await getPayload({
    config: configPromise,
  })

  return payload.find({
    collection: 'tags',
    pagination: false,
    select: {
      name: true,
    },
  })
}
