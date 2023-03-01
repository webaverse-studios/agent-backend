export const voiceCachePath = 'voice-cache'

export const voiceCacheMethods = ['find', 'get', 'create', 'patch', 'remove']

export const voiceCacheClient = (client) => {
  const connection = client.get('connection')

  client.use(voiceCachePath, connection.service(voiceCachePath), {
    methods: voiceCacheMethods
  })
}
