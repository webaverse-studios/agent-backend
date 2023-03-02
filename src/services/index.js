import { imageMetadata } from './image-metadata/image-metadata.js'

import { imageBlob } from './image-blob/image-blob.js'

import { imageCache } from './image-cache/image-cache.js'

import { textCache } from './text-cache/text-cache.js'

import { voiceMetadata } from './voice-metadata/voice-metadata.js'

import { voiceBlob } from './voice-blob/voice-blob.js'

import { voiceCache } from './voice-cache/voice-cache.js'

export const services = (app) => {
  app.configure(imageMetadata)

  app.configure(imageBlob)

  app.configure(imageCache)

  app.configure(textCache)

  app.configure(voiceMetadata)

  app.configure(voiceBlob)

  app.configure(voiceCache)

  // All services will be registered here
}
