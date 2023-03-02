// For more information about this file see https://dove.feathersjs.com/guides/cli/service.schemas.html
import { resolve, getValidator, querySyntax } from '@feathersjs/schema'
import { dataValidator, queryValidator } from '../../validators.js'

// Main data model schema
export const imageMetadataSchema = {
  $id: 'ImageMetadata',
  type: 'object',
  additionalProperties: false,
  required: ['id', 'text'],
  properties: {
    id: { type: 'number' },
    text: { type: 'string' }
  }
}
export const imageMetadataValidator = getValidator(imageMetadataSchema, dataValidator)
export const imageMetadataResolver = resolve({})

export const imageMetadataExternalResolver = resolve({})

// Schema for creating new data
export const imageMetadataDataSchema = {
  $id: 'ImageMetadataData',
  type: 'object',
  additionalProperties: false,
  required: ['text'],
  properties: {
    ...imageMetadataSchema.properties
  }
}
export const imageMetadataDataValidator = getValidator(imageMetadataDataSchema, dataValidator)
export const imageMetadataDataResolver = resolve({})

// Schema for updating existing data
export const imageMetadataPatchSchema = {
  $id: 'ImageMetadataPatch',
  type: 'object',
  additionalProperties: false,
  required: [],
  properties: {
    ...imageMetadataSchema.properties
  }
}
export const imageMetadataPatchValidator = getValidator(imageMetadataPatchSchema, dataValidator)
export const imageMetadataPatchResolver = resolve({})

// Schema for allowed query properties
export const imageMetadataQuerySchema = {
  $id: 'ImageMetadataQuery',
  type: 'object',
  additionalProperties: false,
  properties: {
    ...querySyntax(imageMetadataSchema.properties)
  }
}
export const imageMetadataQueryValidator = getValidator(imageMetadataQuerySchema, queryValidator)
export const imageMetadataQueryResolver = resolve({})
