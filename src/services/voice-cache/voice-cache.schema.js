// For more information about this file see https://dove.feathersjs.com/guides/cli/service.schemas.html
import { resolve, getValidator, querySyntax } from '@feathersjs/schema'
import { dataValidator, queryValidator } from '../../validators.js'

// Main data model schema
export const voiceCacheSchema = {
  $id: 'VoiceCache',
  type: 'object',
  additionalProperties: false,
  required: ['id', 'text'],
  properties: {
    id: { type: 'number' },
    text: { type: 'string' }
  }
}
export const voiceCacheValidator = getValidator(voiceCacheSchema, dataValidator)
export const voiceCacheResolver = resolve({})

export const voiceCacheExternalResolver = resolve({})

// Schema for creating new data
export const voiceCacheDataSchema = {
  $id: 'VoiceCacheData',
  type: 'object',
  additionalProperties: false,
  required: ['text'],
  properties: {
    ...voiceCacheSchema.properties
  }
}
export const voiceCacheDataValidator = getValidator(voiceCacheDataSchema, dataValidator)
export const voiceCacheDataResolver = resolve({})

// Schema for updating existing data
export const voiceCachePatchSchema = {
  $id: 'VoiceCachePatch',
  type: 'object',
  additionalProperties: false,
  required: [],
  properties: {
    ...voiceCacheSchema.properties
  }
}
export const voiceCachePatchValidator = getValidator(voiceCachePatchSchema, dataValidator)
export const voiceCachePatchResolver = resolve({})

// Schema for allowed query properties
export const voiceCacheQuerySchema = {
  $id: 'VoiceCacheQuery',
  type: 'object',
  additionalProperties: false,
  properties: {
    ...querySyntax(voiceCacheSchema.properties)
  }
}
export const voiceCacheQueryValidator = getValidator(voiceCacheQuerySchema, queryValidator)
export const voiceCacheQueryResolver = resolve({})
