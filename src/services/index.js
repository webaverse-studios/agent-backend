import { textCache } from './text-cache/text-cache.js'

import { voiceMetadata } from './voice-metadata/voice-metadata.js'

import { voiceBlob } from './voice-blob/voice-blob.js'

import { voiceCache } from './voice-cache/voice-cache.js'

export const services = (app) => {
  app.configure(textCache)

  app.configure(voiceMetadata)

  app.configure(voiceBlob)

  app.configure(voiceCache)

  // All services will be registered here
}
