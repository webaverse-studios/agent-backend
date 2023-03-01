import {app} from "../../app.js";

export class VoiceCacheService{
    constructor(options){
        this.options = options || {};
    }
    async find(params){
        return [];
    }
    async get(id, params){
        return {};
    }
    async create(data, params) {
        console.log("PARAMS", params)
        // receives {agentID, prompt, audioBlob} from the client -> sends to voice-metadata service.create
        const results = await app.service('voice-metadata').create(data, params)
        console.log(results, data.audioBlob)
        data._id = results._id
        const blob_results = await app.service('voice-blob').create(data, params)
        console.log("BLOBRESULTS:",blob_results)
        return results
    }
    async update(id, data, params){
        return {};
    }
    async patch(id, data, params){
        return {};
    }
    async remove(id, params){
        return {};
    }

}

export const getOptions = (app) => {
    return { app }
}