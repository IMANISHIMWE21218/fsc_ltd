import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'qualities',
  type: 'document',
  title: 'Qualities Section',
  fields: [
    defineField({
      name: 'icon',
      type: 'string',
      title: 'Icon URL or Class Name',
    }),
    defineField({
      name: 'title',
      type: 'string',
      title: 'Title',
    }),
    defineField({
      name: 'description',
      type: 'text',
      title: 'Description',
    }),
  ],
})
