// For more information about this file see https://dove.feathersjs.com/guides/cli/service.html
import { authenticate } from '@feathersjs/authentication'

import { hooks as schemaHooks } from '@feathersjs/schema'
import {
  imageBlobDataValidator,
  imageBlobPatchValidator,
  imageBlobQueryValidator,
  imageBlobResolver,
  imageBlobExternalResolver,
  imageBlobDataResolver,
  imageBlobPatchResolver,
  imageBlobQueryResolver
} from './image-blob.schema.js'
import { ImageBlobService, getOptions } from './image-blob.class.js'
import { imageBlobPath, imageBlobMethods } from './image-blob.shared.js'

export * from './image-blob.class.js'
export * from './image-blob.schema.js'
import {disallow} from 'feathers-hooks-common';
import {createModel} from "./image-blob.model.js";
// A configure function that registers the service and its hooks via `app.configure`
export const imageBlob = (app) => {
  const blobStorage = createModel(app);
  // Register our service on the Feathers application
  app.use(imageBlobPath, new ImageBlobService({Model: blobStorage}), {
    // A list of all methods this service exposes externally
    methods: imageBlobMethods,
    // You can add additional custom events to be sent to clients here
    events: []
  })
  // Initialize hooks
  app.service(imageBlobPath).hooks({
    around: {
      all: [
        // authenticate('jwt'),
        // schemaHooks.resolveExternal(imageBlobExternalResolver),
        // schemaHooks.resolveResult(imageBlobResolver)
      ]
    },
    before: {
      all: [
        // schemaHooks.validateQuery(imageBlobQueryValidator),
        // schemaHooks.resolveQuery(imageBlobQueryResolver)
      ],
      find: [],
      get: [],
      create: [
        // schemaHooks.validateData(imageBlobDataValidator),
        // schemaHooks.resolveData(imageBlobDataResolver)
      ],
      patch: [
        // schemaHooks.validateData(imageBlobPatchValidator),
        // schemaHooks.resolveData(imageBlobPatchResolver)
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
