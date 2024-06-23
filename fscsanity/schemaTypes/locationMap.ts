// schemas/locationMap.js

import {defineType} from 'sanity'

export default defineType({
  name: 'locationMap',
  title: 'Location Map',
  type: 'document',
  fields: [
    {
      name: 'iframeCode',
      title: 'IFrame Code',
      type: 'text',
      rows: 10, // Adjust rows based on content size
      validation: (Rule) => Rule.required(),
    },
  ],
})
