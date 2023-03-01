// For more information about this file see https://dove.feathersjs.com/guides/cli/client.html
import { feathers } from '@feathersjs/feathers'
import authenticationClient from '@feathersjs/authentication-client'
import { textCacheClient } from './services/text-cache/text-cache.shared.js'

import { voiceMetadataClient } from './services/voice-metadata/voice-metadata.shared.js'

import { voiceBlobClient } from './services/voice-blob/voice-blob.shared.js'

import { voiceCacheClient } from './services/voice-cache/voice-cache.shared.js'

/**
 * Returns a  client for the AI-backend app.
 *
 * @param connection The REST or Socket.io Feathers client connection
 * @param authenticationOptions Additional settings for the authentication client
 * @see https://dove.feathersjs.com/api/client.html
 * @returns The Feathers client application
 */
export const createClient = (connection, authenticationOptions = {}) => {
  const client = feathers()

  client.configure(connection)
  client.configure(authenticationClient(authenticationOptions))
  client.set('connection', connection)

  client.configure(voiceCacheClient)

  client.configure(voiceBlobClient)

  client.configure(voiceMetadataClient)

  client.configure(textCacheClient)

  return client
}
