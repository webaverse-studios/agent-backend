export const imageMetadataPath = 'image-metadata'

export const imageMetadataMethods = ['find', 'get', 'create', 'patch', 'remove']

export const imageMetadataClient = (client) => {
  const connection = client.get('connection')

  client.use(imageMetadataPath, connection.service(imageMetadataPath), {
    methods: imageMetadataMethods
  })
}
