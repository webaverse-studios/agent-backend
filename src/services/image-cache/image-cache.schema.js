// For more information about this file see https://dove.feathersjs.com/guides/cli/service.schemas.html
import { resolve, getValidator, querySyntax } from '@feathersjs/schema'
import { dataValidator, queryValidator } from '../../validators.js'

// Main data model schema
export const imageCacheSchema = {
  $id: 'ImageCache',
  type: 'object',
  additionalProperties: false,
  required: ['id', 'text'],
  properties: {
    id: { type: 'number' },
    text: { type: 'string' }
  }
}
export const imageCacheValidator = getValidator(imageCacheSchema, dataValidator)
export const imageCacheResolver = resolve({})

export const imageCacheExternalResolver = resolve({})

// Schema for creating new data
export const imageCacheDataSchema = {
  $id: 'ImageCacheData',
  type: 'object',
  additionalProperties: false,
  required: ['text'],
  properties: {
    ...imageCacheSchema.properties
  }
}
export const imageCacheDataValidator = getValidator(imageCacheDataSchema, dataValidator)
export const imageCacheDataResolver = resolve({})

// Schema for updating existing data
export const imageCachePatchSchema = {
  $id: 'ImageCachePatch',
  type: 'object',
  additionalProperties: false,
  required: [],
  properties: {
    ...imageCacheSchema.properties
  }
}
export const imageCachePatchValidator = getValidator(imageCachePatchSchema, dataValidator)
export const imageCachePatchResolver = resolve({})

// Schema for allowed query properties
export const imageCacheQuerySchema = {
  $id: 'ImageCacheQuery',
  type: 'object',
  additionalProperties: false,
  properties: {
    ...querySyntax(imageCacheSchema.properties)
  }
}
export const imageCacheQueryValidator = getValidator(imageCacheQuerySchema, queryValidator)
export const imageCacheQueryResolver = resolve({})
