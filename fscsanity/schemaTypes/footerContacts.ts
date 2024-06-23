// schemas/footerContacts.js
import {defineType} from 'sanity'

export default defineType({
  name: 'footerContacts',
  type: 'document',
  title: 'Footer Contacts',
  fields: [
    {
      name: 'address',
      type: 'string',
      title: 'Address',
    },
    {
      name: 'telephone',
      type: 'string',
      title: 'Telephone',
    },
    {
      name: 'email',
      type: 'string',
      title: 'Email',
    },
    {
      name: 'facebook',
      type: 'url',
      title: 'Facebook',
    },
    {
      name: 'twitter',
      type: 'url',
      title: 'Twitter',
    },
    {
      name: 'linkedin',
      type: 'url',
      title: 'LinkedIn',
    },
    {
      name: 'instagram',
      type: 'url',
      title: 'Instagram',
    },
  ],
})
