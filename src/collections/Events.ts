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

export const Events: CollectionConfig = {
  slug: 'events',
  admin: {
    ...ADMIN_SITE_GROUP,
    description: 'Gerencie as notícias do site',
  },
  hooks: {
    afterChange: [
      async ({ doc, req }) => {
        await relalidatePaths({
          req,
          paths: ['/', '/eventos', `/eventos/${doc?.slug}`],
        })
      },
    ],
    afterDelete: [
      async ({ doc, req }) => {
        await relalidatePaths({
          req,
          paths: ['/', '/eventos', `/eventos/${doc?.slug}`],
        })
      },
    ],
  },
  labels: {
    singular: {
      pt: 'Evento',
    },
    plural: {
      pt: 'Eventos',
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
        placeholder: 'Digite o nome da evento',
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
      name: 'image',
      type: 'upload',
      relationTo: 'media',
      required: false,
      label: {
        pt: 'Banner no evento',
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
