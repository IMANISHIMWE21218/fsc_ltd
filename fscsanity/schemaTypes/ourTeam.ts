import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'ourTeam',
  type: 'document',
  title: 'Our Team Member',
  fields: [
    defineField({
      name: 'image',
      type: 'image',
      title: 'Image',
      options: {
        hotspot: true, // Enables hotspot for image
      },
    }),
    defineField({
      name: 'name',
      type: 'string',
      title: 'Name',
    }),
    defineField({
      name: 'position',
      type: 'string',
      title: 'Position',
    }),
    defineField({
      name: 'description',
      type: 'text',
      title: 'Description',
    }),
    defineField({
      name: 'social',
      type: 'object',
      title: 'Social Links',
      fields: [
        defineField({
          name: 'facebook',
          type: 'url',
          title: 'Facebook',
        }),
        defineField({
          name: 'twitter',
          type: 'url',
          title: 'Twitter',
        }),
        defineField({
          name: 'linkedin',
          type: 'url',
          title: 'LinkedIn',
        }),
        defineField({
          name: 'instagram',
          type: 'url',
          title: 'Instagram',
        }),
      ],
    }),
  ],
})
