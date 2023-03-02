// For more information about this file see https://dove.feathersjs.com/guides/cli/service.html
import { authenticate } from '@feathersjs/authentication'

import pkg from 'dauria';
const { getBase64DataURI } = pkg;

import { hooks as schemaHooks } from '@feathersjs/schema'
import {
  voiceCacheDataValidator,
  voiceCachePatchValidator,
  voiceCacheQueryValidator,
  voiceCacheResolver,
  voiceCacheExternalResolver,
  voiceCacheDataResolver,
  voiceCachePatchResolver,
  voiceCacheQueryResolver
} from './voice-cache.schema.js'
import { VoiceCacheService, getOptions } from './voice-cache.class.js'
import { voiceCachePath, voiceCacheMethods } from './voice-cache.shared.js'

export * from './voice-cache.class.js'
export * from './voice-cache.schema.js'

// A configure function that registers the service and its hooks via `app.configure`
export const voiceCache = (app) => {
  // Register our service on the Feathers application
  app.use(voiceCachePath, new VoiceCacheService(getOptions(app)), {
    // A list of all methods this service exposes externally
    methods: voiceCacheMethods,
    // You can add additional custom events to be sent to clients here
    events: []
  })
  // Initialize hooks
  app.service(voiceCachePath).hooks({
    around: {
      all: [
        // authenticate('jwt'),
        // schemaHooks.resolveExternal(voiceCacheExternalResolver),
        // schemaHooks.resolveResult(voiceCacheResolver)
      ]
    },
    before: {
      all: [
        // schemaHooks.validateQuery(voiceCacheQueryValidator),
        // schemaHooks.resolveQuery(voiceCacheQueryResolver)
      ],
      find: [],
      get: [],
      create: [
        async function(context) {
          if (!context.data.uri && context.data.audioBlob) {
            const file = context.data.audioBlob;
            const audioArray = await file.arrayBuffer();
            const audioBuffer = Buffer.from(audioArray);
            context.data.uri = getBase64DataURI(audioBuffer, file.type);
          }
        }
        // schemaHooks.validateData(voiceCacheDataValidator),
        // schemaHooks.resolveData(voiceCacheDataResolver)
      ],
      patch: [
        // schemaHooks.validateData(voiceCachePatchValidator),
        // schemaHooks.resolveData(voiceCachePatchResolver)
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
