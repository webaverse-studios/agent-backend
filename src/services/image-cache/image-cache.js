// For more information about this file see https://dove.feathersjs.com/guides/cli/service.html
import { authenticate } from '@feathersjs/authentication'

import { hooks as schemaHooks } from '@feathersjs/schema'
import {
  imageCacheDataValidator,
  imageCachePatchValidator,
  imageCacheQueryValidator,
  imageCacheResolver,
  imageCacheExternalResolver,
  imageCacheDataResolver,
  imageCachePatchResolver,
  imageCacheQueryResolver
} from './image-cache.schema.js'
import { ImageCacheService, getOptions } from './image-cache.class.js'
import { imageCachePath, imageCacheMethods } from './image-cache.shared.js'

export * from './image-cache.class.js'
export * from './image-cache.schema.js'


import pkg from 'dauria';
const { getBase64DataURI } = pkg;

// A configure function that registers the service and its hooks via `app.configure`
export const imageCache = (app) => {
  // Register our service on the Feathers application
  app.use(imageCachePath, new ImageCacheService(getOptions(app)), {
    // A list of all methods this service exposes externally
    methods: imageCacheMethods,
    // You can add additional custom events to be sent to clients here
    events: []
  })
  // Initialize hooks
  app.service(imageCachePath).hooks({
    around: {
      all: [
        // authenticate('jwt'),
        // schemaHooks.resolveExternal(imageCacheExternalResolver),
        // schemaHooks.resolveResult(imageCacheResolver)
      ]
    },
    before: {
      all: [
        // schemaHooks.validateQuery(imageCacheQueryValidator),
        // schemaHooks.resolveQuery(imageCacheQueryResolver)
      ],
      find: [],
      get: [],
      create: [
        async function(context) {
          if (!context.data.uri && context.data.imageBlob) {
            const file = context.data.imageBlob;
            const imageArray = await file.arrayBuffer();
            const imageBuffer = Buffer.from(imageArray);
            context.data.uri = getBase64DataURI(imageBuffer, file.type);
          }
        }
        // schemaHooks.validateData(imageCacheDataValidator),
        // schemaHooks.resolveData(imageCacheDataResolver)
      ],
      patch: [
        // schemaHooks.validateData(imageCachePatchValidator),
        // schemaHooks.resolveData(imageCachePatchResolver)
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
