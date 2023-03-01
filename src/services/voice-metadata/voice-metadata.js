// For more information about this file see https://dove.feathersjs.com/guides/cli/service.html
import { authenticate } from '@feathersjs/authentication'

import { hooks as schemaHooks } from '@feathersjs/schema'
import {
  voiceMetadataDataValidator,
  voiceMetadataPatchValidator,
  voiceMetadataQueryValidator,
  voiceMetadataResolver,
  voiceMetadataExternalResolver,
  voiceMetadataDataResolver,
  voiceMetadataPatchResolver,
  voiceMetadataQueryResolver
} from './voice-metadata.schema.js'
import { VoiceMetadataService, getOptions } from './voice-metadata.class.js'
import { voiceMetadataPath, voiceMetadataMethods } from './voice-metadata.shared.js'
import {createModel} from './voice-metadata.model.js'

export * from './voice-metadata.class.js'
export * from './voice-metadata.schema.js'

// A configure function that registers the service and its hooks via `app.configure`
export const voiceMetadata = (app) => {
  const options = {
    Model: createModel(app),
    paginate: app.get('paginate')
  };


  // Register our service on the Feathers application
  app.use(voiceMetadataPath, new VoiceMetadataService(options), {
    // A list of all methods this service exposes externally
    methods: voiceMetadataMethods,
    // You can add additional custom events to be sent to clients here
    events: []
  })
  // Initialize hooks
  app.service(voiceMetadataPath).hooks({
    around: {
      all: [
        // authenticate('jwt'),
        // schemaHooks.resolveExternal(voiceMetadataExternalResolver),
        // schemaHooks.resolveResult(voiceMetadataResolver)
      ]
    },
    before: {
      all: [
        // schemaHooks.validateQuery(voiceMetadataQueryValidator),
        // schemaHooks.resolveQuery(voiceMetadataQueryResolver)
      ],
      find: [],
      get: [],
      create: [
        // schemaHooks.validateData(voiceMetadataDataValidator),
        // schemaHooks.resolveData(voiceMetadataDataResolver)
      ],
      patch: [
        // schemaHooks.validateData(voiceMetadataPatchValidator),
        // schemaHooks.resolveData(voiceMetadataPatchResolver)
      ],
      remove: []
    },
    after: {
      all: []
    },
    error: {
      all: []
    }
  })
}
