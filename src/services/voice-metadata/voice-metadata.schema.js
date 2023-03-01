// For more information about this file see https://dove.feathersjs.com/guides/cli/service.schemas.html
import { resolve, getValidator, querySyntax } from '@feathersjs/schema'
import { dataValidator, queryValidator } from '../../validators.js'

// Main data model schema
export const voiceMetadataSchema = {
  $id: 'VoiceMetadata',
  type: 'object',
  additionalProperties: false,
  required: ['id', 'text'],
  properties: {
    id: { type: 'number' },
    text: { type: 'string' }
  }
}
export const voiceMetadataValidator = getValidator(voiceMetadataSchema, dataValidator)
export const voiceMetadataResolver = resolve({})

export const voiceMetadataExternalResolver = resolve({})

// Schema for creating new data
export const voiceMetadataDataSchema = {
  $id: 'VoiceMetadataData',
  type: 'object',
  additionalProperties: false,
  required: ['text'],
  properties: {
    ...voiceMetadataSchema.properties
  }
}
export const voiceMetadataDataValidator = getValidator(voiceMetadataDataSchema, dataValidator)
export const voiceMetadataDataResolver = resolve({})

// Schema for updating existing data
export const voiceMetadataPatchSchema = {
  $id: 'VoiceMetadataPatch',
  type: 'object',
  additionalProperties: false,
  required: [],
  properties: {
    ...voiceMetadataSchema.properties
  }
}
export const voiceMetadataPatchValidator = getValidator(voiceMetadataPatchSchema, dataValidator)
export const voiceMetadataPatchResolver = resolve({})

// Schema for allowed query properties
export const voiceMetadataQuerySchema = {
  $id: 'VoiceMetadataQuery',
  type: 'object',
  additionalProperties: false,
  properties: {
    ...querySyntax(voiceMetadataSchema.properties)
  }
}
export const voiceMetadataQueryValidator = getValidator(voiceMetadataQuerySchema, queryValidator)
export const voiceMetadataQueryResolver = resolve({})
