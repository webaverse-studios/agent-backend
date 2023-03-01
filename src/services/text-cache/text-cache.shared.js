export const textCachePath = 'text-cache'

export const textCacheMethods = ['find', 'get', 'create', 'patch', 'remove']

export const textCacheClient = (client) => {
  const connection = client.get('connection')

  client.use(textCachePath, connection.service(textCachePath), {
    methods: textCacheMethods
  })
}
