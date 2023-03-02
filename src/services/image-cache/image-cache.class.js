import { app } from "../../app.js";
import mimeTypes from "mime-types";
import { errors } from "@feathersjs/errors";
export class ImageCacheService {
  constructor(options) {
    this.options = options
  }

  async find(_params) {
    return []
  }

  async get(id, params){
    // get metadata from voice-metadata service.get
    const results = await app.service('image-metadata').get(id, params)
    if (!results) {
      throw new errors.NotFound(`Blob not found with id ${id}`);
    }
    // get audioBlob from voice-blob service.get
    const fileName = `${id}.${mimeTypes.extension(results.metadata.type)}`
    return await app.service('image-blob').get(fileName, params);
  }
  async create(data, params) {
    const results = await app.service('image-metadata').create(data, params)
    data._id = results._id
    const blob_results = await app.service('image-blob').create(data, params)
    return results
  }

  // This method has to be added to the 'methods' option to make it available to clients
  async update(id, data, _params) {
    return {
      id: 0,
      ...data
    }
  }

  async patch(id, data, _params) {
    return {
      id: 0,
      text: `Fallback for ${id}`,
      ...data
    }
  }

  async remove(id, params){

    // get metadata from voice-metadata service.get
    const results = await app.service('image-metadata').get(id, params)
    //  remove from voice-metadata service.remove
    await app.service('image-metadata').remove(id, params)

    //  remove from voice-blob service.remove
    const fileName = `${id}.${mimeTypes.extension(results.metadata.type)}`
    return await app.service('image-blob').remove(fileName, params);
  }
}

export const getOptions = (app) => {
  return { app }
}
