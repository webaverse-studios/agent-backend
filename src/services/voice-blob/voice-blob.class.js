import * as blobService from 'feathers-blob'
import pkg from 'dauria';
const { getBase64DataURI } = pkg;

import mimeTypes from 'mime-types';

export class VoiceBlobService extends blobService.Service{
  async create(data, params){
      if (!data.uri && data.audioBlob){
        const file = data.audioBlob;
        const audioArray = await file.arrayBuffer();
        const audioBuffer = Buffer.from(audioArray);
        data.uri = getBase64DataURI(audioBuffer, file.type);
      }
      return super.create({id:`${data._id}.${mimeTypes.extension(data.audioBlob.type)}`, uri:data.uri}, params);
  }
}

export const getOptions = (app) => {
  return { app }
}
