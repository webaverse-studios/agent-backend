export const voiceMetadataPath = 'voice-metadata'

export const voiceMetadataMethods = ['find', 'get', 'create', 'patch', 'remove']

export const voiceMetadataClient = (client) => {
  const connection = client.get('connection')

  client.use(voiceMetadataPath, connection.service(voiceMetadataPath), {
    methods: voiceMetadataMethods
  })
}
