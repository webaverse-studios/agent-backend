import { app } from "../../app.js";
import mimeTypes from "mime-types";
import { errors } from "@feathersjs/errors";

export class VoiceCacheService{
    constructor(options){
        this.options = options || {};
    }
    async find(params){
        return [];
    }
    async get(id, params){
        // get metadata from voice-metadata service.get
        const results = await app.service('voice-metadata').get(id, params)
        if (!results) {
            throw new errors.NotFound(`Blob not found with id ${id}`);
        }
        // get audioBlob from voice-blob service.get
        const fileName = `${id}.${mimeTypes.extension(results.metadata.type)}`
        return await app.service('voice-blob').get(fileName, params);
    }
    async create(data, params) {
        console.log("PARAMS", params)
        // receives {agentID, prompt, audioBlob} from the client -> sends to voice-metadata service.create
        const results = await app.service('voice-metadata').create(data, params)
        console.log(results, data.audioBlob)
        data._id = results._id
        const blob_results = await app.service('voice-blob').create(data, params)
        console.log("BLOB-RESULTS:",blob_results)
        return results
    }
    async update(id, data, params){
        return {};
    }
    async patch(id, data, params){
        return {};
    }
    async remove(id, params){

        // get metadata from voice-metadata service.get
        const results = await app.service('voice-metadata').get(id, params)
        //  remove from voice-metadata service.remove
        await app.service('voice-metadata').remove(id, params)

        //  remove from voice-blob service.remove
        const fileName = `${id}.${mimeTypes.extension(results.metadata.type)}`
        return await app.service('voice-blob').remove(fileName, params);
    }

}

export const getOptions = (app) => {
    return { app }
}