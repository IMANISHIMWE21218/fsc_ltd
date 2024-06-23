// schemas/jobOpening.js
import {defineType} from 'sanity'

export default defineType({
  name: 'jobOpening',
  type: 'document',
  title: 'Job Opening',
  fields: [
    {
      name: 'title',
      type: 'string',
      title: 'Title',
    },
    {
      name: 'location',
      type: 'string',
      title: 'Location',
    },
    {
      name: 'employmentType',
      type: 'string',
      title: 'Employment Type',
    },
    {
      name: 'salary',
      type: 'number',
      title: 'Salary (monthly)',
    },
    {
      name: 'description',
      type: 'text',
      title: 'Description',
    },
    {
      name: 'applicationLink',
      type: 'url',
      title: 'Application Link',
    },
  ],
})
