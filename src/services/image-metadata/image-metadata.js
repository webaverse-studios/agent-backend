// For more information about this file see https://dove.feathersjs.com/guides/cli/service.html
import { authenticate } from '@feathersjs/authentication'

import { hooks as schemaHooks } from '@feathersjs/schema'
import {
  imageMetadataDataValidator,
  imageMetadataPatchValidator,
  imageMetadataQueryValidator,
  imageMetadataResolver,
  imageMetadataExternalResolver,
  imageMetadataDataResolver,
  imageMetadataPatchResolver,
  imageMetadataQueryResolver
} from './image-metadata.schema.js'
import { ImageMetadataService, getOptions } from './image-metadata.class.js'
import { imageMetadataPath, imageMetadataMethods } from './image-metadata.shared.js'

import {disallow} from 'feathers-hooks-common';
export * from './image-metadata.class.js'
export * from './image-metadata.schema.js'
import {createModel} from './image-metadata.model.js'

// A configure function that registers the service and its hooks via `app.configure`
export const imageMetadata = (app) => {

  const options = {
    Model: createModel(app),
    paginate: app.get('paginate')
  };
  // Register our service on the Feathers application
  app.use(imageMetadataPath, new ImageMetadataService(options), {
    // A list of all methods this service exposes externally
    methods: imageMetadataMethods,
    // You can add additional custom events to be sent to clients here
    events: []
  })
  // Initialize hooks
  app.service(imageMetadataPath).hooks({
    around: {
      all: [
        // authenticate('jwt'),
        // schemaHooks.resolveExternal(imageMetadataExternalResolver),
        // schemaHooks.resolveResult(imageMetadataResolver)
      ]
    },
    before: {
      all: [
        // schemaHooks.validateQuery(imageMetadataQueryValidator),
        // schemaHooks.resolveQuery(imageMetadataQueryResolver)
      ],
      find: [],
      get: [],
      create: [
        // schemaHooks.validateData(imageMetadataDataValidator),
        // schemaHooks.resolveData(imageMetadataDataResolver)
      ],
      patch: [
        // schemaHooks.validateData(imageMetadataPatchValidator),
        // schemaHooks.resolveData(imageMetadataPatchResolver)
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
