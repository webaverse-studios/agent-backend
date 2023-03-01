// For more information about this file see https://dove.feathersjs.com/guides/cli/service.schemas.html
import { resolve, getValidator, querySyntax } from '@feathersjs/schema'
import { dataValidator, queryValidator } from '../../validators.js'

// Main data model schema
export const voiceBlobSchema = {
  $id: 'VoiceBlob',
  type: 'object',
  additionalProperties: false,
  required: ['id', 'text'],
  properties: {
    id: { type: 'number' },
    text: { type: 'string' }
  }
}
export const voiceBlobValidator = getValidator(voiceBlobSchema, dataValidator)
export const voiceBlobResolver = resolve({})

export const voiceBlobExternalResolver = resolve({})

// Schema for creating new data
export const voiceBlobDataSchema = {
  $id: 'VoiceBlobData',
  type: 'object',
  additionalProperties: false,
  required: ['text'],
  properties: {
    ...voiceBlobSchema.properties
  }
}
export const voiceBlobDataValidator = getValidator(voiceBlobDataSchema, dataValidator)
export const voiceBlobDataResolver = resolve({})

// Schema for updating existing data
export const voiceBlobPatchSchema = {
  $id: 'VoiceBlobPatch',
  type: 'object',
  additionalProperties: false,
  required: [],
  properties: {
    ...voiceBlobSchema.properties
  }
}
export const voiceBlobPatchValidator = getValidator(voiceBlobPatchSchema, dataValidator)
export const voiceBlobPatchResolver = resolve({})

// Schema for allowed query properties
export const voiceBlobQuerySchema = {
  $id: 'VoiceBlobQuery',
  type: 'object',
  additionalProperties: false,
  properties: {
    ...querySyntax(voiceBlobSchema.properties)
  }
}
export const voiceBlobQueryValidator = getValidator(voiceBlobQuerySchema, queryValidator)
export const voiceBlobQueryResolver = resolve({})
