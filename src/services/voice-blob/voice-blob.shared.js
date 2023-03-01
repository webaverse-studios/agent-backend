export const voiceBlobPath = 'voice-blob'

export const voiceBlobMethods = [ 'get', 'create', 'remove']

export const voiceBlobClient = (client) => {
  const connection = client.get('connection')

  client.use(voiceBlobPath, connection.service(voiceBlobPath), {
    methods: voiceBlobMethods
  })
}
