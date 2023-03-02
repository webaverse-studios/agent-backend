// For more information about this file see https://dove.feathersjs.com/guides/cli/service.schemas.html
import { resolve, getValidator, querySyntax } from '@feathersjs/schema'
import { dataValidator, queryValidator } from '../../validators.js'

// Main data model schema
export const imageBlobSchema = {
  $id: 'ImageBlob',
  type: 'object',
  additionalProperties: false,
  required: ['id', 'text'],
  properties: {
    id: { type: 'number' },
    text: { type: 'string' }
  }
}
export const imageBlobValidator = getValidator(imageBlobSchema, dataValidator)
export const imageBlobResolver = resolve({})

export const imageBlobExternalResolver = resolve({})

// Schema for creating new data
export const imageBlobDataSchema = {
  $id: 'ImageBlobData',
  type: 'object',
  additionalProperties: false,
  required: ['text'],
  properties: {
    ...imageBlobSchema.properties
  }
}
export const imageBlobDataValidator = getValidator(imageBlobDataSchema, dataValidator)
export const imageBlobDataResolver = resolve({})

// Schema for updating existing data
export const imageBlobPatchSchema = {
  $id: 'ImageBlobPatch',
  type: 'object',
  additionalProperties: false,
  required: [],
  properties: {
    ...imageBlobSchema.properties
  }
}
export const imageBlobPatchValidator = getValidator(imageBlobPatchSchema, dataValidator)
export const imageBlobPatchResolver = resolve({})

// Schema for allowed query properties
export const imageBlobQuerySchema = {
  $id: 'ImageBlobQuery',
  type: 'object',
  additionalProperties: false,
  properties: {
    ...querySyntax(imageBlobSchema.properties)
  }
}
export const imageBlobQueryValidator = getValidator(imageBlobQuerySchema, queryValidator)
export const imageBlobQueryResolver = resolve({})
