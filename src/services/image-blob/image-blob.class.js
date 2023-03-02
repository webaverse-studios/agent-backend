import * as blobService from "feathers-blob";
import mimeTypes from "mime-types";

export class ImageBlobService extends blobService.Service {
  async create(data, params) {

    return super.create({ id: `${data._id}.${mimeTypes.extension(data.imageBlob.type)}`, uri: data.uri }, params);
  }
}

export const getOptions = (app) => {
  return { app };
};
