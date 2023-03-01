// For more information about this file see https://dove.feathersjs.com/guides/cli/service.html
import { authenticate } from '@feathersjs/authentication'

import { hooks as schemaHooks } from '@feathersjs/schema'
import {
  textCacheDataValidator,
  textCachePatchValidator,
  textCacheQueryValidator,
  textCacheResolver,
  textCacheExternalResolver,
  textCacheDataResolver,
  textCachePatchResolver,
  textCacheQueryResolver
} from './text-cache.schema.js'
import { TextCacheService, getOptions } from './text-cache.class.js'
import { textCachePath, textCacheMethods } from './text-cache.shared.js'
import { createModel } from "./text-cache.model.js";

export * from './text-cache.class.js'
export * from './text-cache.schema.js'

// A configure function that registers the service and its hooks via `app.configure`
export const textCache = (app) => {
  const options = {
    Model: createModel(app),
    paginate: app.get('paginate')
  };
  // Register our service on the Feathers application
  app.use(textCachePath, new TextCacheService(options), {
    // A list of all methods this service exposes externally
    methods: textCacheMethods,
    // You can add additional custom events to be sent to clients here
    events: []
  })
  // Initialize hooks
  app.service(textCachePath).hooks({
    around: {
      all: [
        // authenticate('jwt'),
        // schemaHooks.resolveExternal(textCacheExternalResolver),
        // schemaHooks.resolveResult(textCacheResolver)
      ]
    },
    before: {
      all: [
        // schemaHooks.validateQuery(textCacheQueryValidator),
        // schemaHooks.resolveQuery(textCacheQueryResolver)
      ],
      find: [],
      get: [],
      create: [
        // schemaHooks.validateData(textCacheDataValidator),
        // schemaHooks.resolveData(textCacheDataResolver)
      ],
      patch: [
        // schemaHooks.validateData(textCachePatchValidator),
        // schemaHooks.resolveData(textCachePatchResolver)
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
