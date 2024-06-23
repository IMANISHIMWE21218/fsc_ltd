//rateCounter.ts
import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'rateCounter',
  title: 'Rate Counter',
  type: 'document',
  fields: [
    defineField({
      name: 'iconClass',
      title: 'Icon Class',
      type: 'string',
    }),
    defineField({
      name: 'counterValue',
      title: 'Counter Value',
      type: 'number',
    }),
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
    }),
    defineField({
      name: 'symbol',
      title: 'Symbol',
      type: 'string',
      description: 'The symbol to display after the counter value, e.g., +, %, ?',
    }),
  ],
})
