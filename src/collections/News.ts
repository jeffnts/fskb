import type { CollectionConfig } from 'payload'
import { FixedToolbarFeature, lexicalEditor } from '@payloadcms/richtext-lexical'
import {
  YoutubeFeature,
  TextColorFeature,
  HighlightColorFeature,
  BgColorFeature,
} from 'payloadcms-lexical-ext'

import { relalidatePaths, createSlug } from '@/utils/payload'
import { ADMIN_SITE_GROUP } from '@/constants/payload'

export const News: CollectionConfig = {
  slug: 'news',
  admin: {
    ...ADMIN_SITE_GROUP,
    description: 'Gerencie as notícias do site',
  },
  hooks: {
    afterChange: [
      async ({ doc, req }) => {
        await relalidatePaths({
          req,
          paths: ['/', '/noticias', `/noticias/${doc?.slug}`],
        })
      },
    ],
    afterDelete: [
      async ({ doc, req }) => {
        await relalidatePaths({
          req,
          paths: ['/', '/noticias', `/noticias/${doc?.slug}`],
        })
      },
    ],
  },
  labels: {
    singular: {
      pt: 'Notícia',
    },
    plural: {
      pt: 'Notícias',
    },
  },

  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
      label: {
        pt: 'Título',
      },
      admin: {
        placeholder: 'Digite o título da notícia',
      },
    },
    {
      name: 'subtitle',
      type: 'text',
      required: false,
      label: {
        pt: 'Subtítulo',
      },
      admin: {
        placeholder: 'Digite o subtítulo da notícia',
      },
    },

    {
      name: 'slug',
      type: 'text',
      required: true,
      unique: true,
      label: {
        pt: 'Slug',
      },
      admin: {
        readOnly: true,
      },
      hooks: {
        beforeValidate: [({ data, value }) => createSlug({ data, value })],
      },
    },
    {
      name: 'tags',
      type: 'relationship',
      //@ts-ignore
      relationTo: 'tags',
      hasMany: true,
      label: {
        pt: 'Tags',
      },
      required: false,
    },

    {
      name: 'image',
      type: 'upload',
      relationTo: 'media',
      required: false,
      label: {
        pt: 'Imagem',
      },
    },
    {
      name: 'content',
      label: {
        pt: 'Conteúdo',
      },
      type: 'richText',
      required: true,
      editor: lexicalEditor({
        features: ({ defaultFeatures }) => [
          YoutubeFeature(),
          TextColorFeature(),
          HighlightColorFeature(),
          BgColorFeature(),
          ...defaultFeatures,
          FixedToolbarFeature(),
        ],
      }),
    },
  ],
}
