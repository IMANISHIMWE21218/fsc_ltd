// schemas/shareholders.js
import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'shareholders',
  title: 'Shareholders',
  type: 'document',
  fields: [
    defineField({
      name: 'image',
      title: 'Image',
      type: 'image',
      options: {
        hotspot: true,
      },
    }),
  ],
})
