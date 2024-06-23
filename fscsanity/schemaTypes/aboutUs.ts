// schemas/aboutUs.js

import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'aboutUs',
  type: 'document',
  title: 'About Us',
  fields: [
    defineField({
      name: 'title',
      type: 'string',
      title: 'Title',
    }),
    defineField({
      name: 'paragraph1',
      type: 'text',
      title: 'Paragraph 1',
    }),
    defineField({
      name: 'paragraph2',
      type: 'text',
      title: 'Paragraph 2',
    }),
    defineField({
      name: 'paragraph3',
      type: 'text',
      title: 'Paragraph 3',
    }),
    defineField({
      name: 'image',
      type: 'image',
      title: 'Image',
      options: {
        hotspot: true, // Enables image cropping
      },
      fields: [
        defineField({
          name: 'alt',
          type: 'string',
          title: 'Alternative Text',
        }),
      ],
    }),
  ],
})
