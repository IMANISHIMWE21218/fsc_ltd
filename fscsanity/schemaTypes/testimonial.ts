import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'testimonial',
  title: 'Testimonial',
  type: 'document',
  fields: [
    defineField({
      name: 'comment',
      title: 'Comment',
      type: 'text',
    }),
    defineField({
      name: 'clientName',
      title: 'Client Name',
      type: 'string',
    }),
    defineField({
      name: 'designation',
      title: 'Designation',
      type: 'string',
    }),
    defineField({
      name: 'clientImage',
      title: 'Client Image',
      type: 'image',
      options: {
        hotspot: true, // Enables hotspot cropping
      },
    }),
  ],
})
