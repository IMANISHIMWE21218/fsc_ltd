// ./schemas/homeAboutUs.ts

import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'home_aboutUs',
  title: 'Home About Us',
  type: 'document',
  fields: [
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
      name: 'text_content',
      title: 'Text Content',
      type: 'array',
      of: [{type: 'block'}],
    }),
    defineField({
      name: 'image',
      title: 'Image',
      type: 'image',
      options: {
        hotspot: true, // Enables image hotspot functionality
      },
      fields: [
        defineField({
          name: 'alt',
          title: 'Alternative text',
          type: 'string',
        }),
      ],
    }),
  ],
})
