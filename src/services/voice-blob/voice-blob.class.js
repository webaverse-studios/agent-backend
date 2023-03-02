import * as blobService from 'feathers-blob'

import mimeTypes from 'mime-types';

export class VoiceBlobService extends blobService.Service{
  async create(data, params){

      return super.create({id:`${data._id}.${mimeTypes.extension(data.audioBlob.type)}`, uri:data.uri}, params);
  }
}

export const getOptions = (app) => {
  return { app }
}
