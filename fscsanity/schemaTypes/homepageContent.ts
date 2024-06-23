// homepageContent.js
import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'homepageContent',
  type: 'document',
  title: 'Homepage Content',
  fields: [
    defineField({
      name: 'titleOne',
      type: 'string',
      title: 'Title One',
    }),
    defineField({
      name: 'titleTwo',
      type: 'string',
      title: 'Title Two',
    }),
    defineField({
      name: 'titleThree',
      type: 'string',
      title: 'Title Three',
    }),
    defineField({
      name: 'headerDescription',
      type: 'string',
      title: 'Header Description',
    }),
  ],
})
