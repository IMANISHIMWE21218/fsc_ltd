// schemas/service.ts:
import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'service',
  title: 'Service',
  type: 'document',
  fields: [
    defineField({
      name: 'iconClass',
      title: 'Icon Class',
      type: 'string',
    }),
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
    }),
    defineField({
      name: 'detailImage',
      title: 'Detail Image',
      type: 'image',
      options: {
        hotspot: true,
      },
    }),
    defineField({
      name: 'detailText',
      title: 'Detail Text',
      type: 'array',
      of: [{type: 'block'}],
    }),
  ],
})
