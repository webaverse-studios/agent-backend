export const imageCachePath = 'image-cache'

export const imageCacheMethods = ['find', 'get', 'create', 'patch', 'remove']

export const imageCacheClient = (client) => {
  const connection = client.get('connection')

  client.use(imageCachePath, connection.service(imageCachePath), {
    methods: imageCacheMethods
  })
}
