// For more information about this file see https://dove.feathersjs.com/guides/cli/service.html
import { authenticate } from '@feathersjs/authentication'

import {disallow} from 'feathers-hooks-common';

import { hooks as schemaHooks } from '@feathersjs/schema'
import {
  voiceBlobDataValidator,
  voiceBlobPatchValidator,
  voiceBlobQueryValidator,
  voiceBlobResolver,
  voiceBlobExternalResolver,
  voiceBlobDataResolver,
  voiceBlobPatchResolver,
  voiceBlobQueryResolver
} from './voice-blob.schema.js'
import { VoiceBlobService, getOptions } from './voice-blob.class.js'
import { voiceBlobPath, voiceBlobMethods } from './voice-blob.shared.js'
import {createModel} from "./voice-blob.model.js";

export * from './voice-blob.class.js'
export * from './voice-blob.schema.js'

// A configure function that registers the service and its hooks via `app.configure`
export const voiceBlob = (app) => {
  const blobStorage = createModel(app);
  // Register our service on the Feathers application
  app.use(voiceBlobPath,

    // Service class
    new VoiceBlobService({Model: blobStorage}), {
    // A list of all methods this service exposes externally
    methods: voiceBlobMethods,
    // You can add additional custom events to be sent to clients here
    events: []
  })
  // Initialize hooks
  app.service(voiceBlobPath).hooks({
    around: {
      all: [
        // authenticate('jwt'),
        // schemaHooks.resolveExternal(voiceBlobExternalResolver),
        // schemaHooks.resolveResult(voiceBlobResolver)
      ]
    },
    before: {
      all: [
        disallow('external'),
        // schemaHooks.validateQuery(voiceBlobQueryValidator),
        // schemaHooks.resolveQuery(voiceBlobQueryResolver)
      ],
      find: [],
      get: [],
      create: [
        // function(context) {
        //   if (!context.data.uri && context.data.audioBlob){
        //     const file = context.data.audioBlob;
        //     const uri = dauria.getBase64DataURI(file.buffer, file.type);
        //     context.data = {uri: uri};
        //   }
        // }
        // schemaHooks.validateData(voiceBlobDataValidator),
        // schemaHooks.resolveData(voiceBlobDataResolver)
      ],
      patch: [
        // schemaHooks.validateData(voiceBlobPatchValidator),
        // schemaHooks.resolveData(voiceBlobPatchResolver)
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
