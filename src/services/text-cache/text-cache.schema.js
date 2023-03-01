// For more information about this file see https://dove.feathersjs.com/guides/cli/service.schemas.html
import { resolve, getValidator, querySyntax } from '@feathersjs/schema'
import { dataValidator, queryValidator } from '../../validators.js'

// Main data model schema
export const textCacheSchema = {
  $id: 'TextCache',
  type: 'object',
  additionalProperties: false,
  required: ['id', 'text'],
  properties: {
    id: { type: 'number' },
    text: { type: 'string' }
  }
}
export const textCacheValidator = getValidator(textCacheSchema, dataValidator)
export const textCacheResolver = resolve({})

export const textCacheExternalResolver = resolve({})

// Schema for creating new data
export const textCacheDataSchema = {
  $id: 'TextCacheData',
  type: 'object',
  additionalProperties: false,
  required: ['text'],
  properties: {
    ...textCacheSchema.properties
  }
}
export const textCacheDataValidator = getValidator(textCacheDataSchema, dataValidator)
export const textCacheDataResolver = resolve({})

// Schema for updating existing data
export const textCachePatchSchema = {
  $id: 'TextCachePatch',
  type: 'object',
  additionalProperties: false,
  required: [],
  properties: {
    ...textCacheSchema.properties
  }
}
export const textCachePatchValidator = getValidator(textCachePatchSchema, dataValidator)
export const textCachePatchResolver = resolve({})

// Schema for allowed query properties
export const textCacheQuerySchema = {
  $id: 'TextCacheQuery',
  type: 'object',
  additionalProperties: false,
  properties: {
    ...querySyntax(textCacheSchema.properties)
  }
}
export const textCacheQueryValidator = getValidator(textCacheQuerySchema, queryValidator)
export const textCacheQueryResolver = resolve({})
