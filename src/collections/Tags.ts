import type { CollectionConfig } from 'payload'

export const Tags: CollectionConfig = {
  slug: 'tags',
  admin: {
    hidden: true,
    useAsTitle: 'name',
    description: 'Tags reutilizáveis para notícias',
  },
  labels: {
    singular: { pt: 'Tag' },
    plural: { pt: 'Tags' },
  },
  fields: [
    {
      name: 'name',
      type: 'text',
      required: true,
      unique: true,
      label: { pt: 'Nome da Tag' },
    },
  ],
}
