import { app } from "../../app.js";

export const imageBlobPath = 'image-blob'

export const imageBlobMethods = [ 'get', 'create', 'remove']

export const imageBlobClient = (client) => {
  const connection = client.get('connection')

  client.use(imageBlobPath, connection.service(imageBlobPath), {
    methods: imageBlobMethods
  })
}



