import { Service } from 'feathers-nedb';
import { v4 as uuidv4 } from 'uuid';
import crypto from "crypto";

export class VoiceMetadataService extends Service {
  constructor(options) {
    super({
      ...options,
      name: 'voice-metadata' // Set the name of the NeDB collection
    });
  }

  async create(data, params) {
    // receives {agentID, prompt, audioBlob} from the client -> create hash from agentID and prompt -> store in db
    const {agentID, prompt, audioBlob} = data

    // assert data is ok
    if (!agentID || !prompt || !audioBlob) {
        throw new Error("Invalid data")
    }
    console.log("DATA IS: ", data)
    const hash = this.generateHash(agentID, prompt)

    // Get the existing data for the IDs
    const existingData = await this.get(hash);
    if (existingData) {
      return existingData
    }

    // extract metadata (mimetype, extension) from audioBlob
    const metadata = {
        type: audioBlob.type,
    }

    // store in db
    return await super.create({_id:hash, metadata}, params)
  }

  generateHash(agentID, prompt) {
    const hash = crypto.createHash('md5');
    hash.update(agentID + prompt);
    return hash.digest('hex');
  }
}

export const getOptions = (app) => {
  return { app }
}
