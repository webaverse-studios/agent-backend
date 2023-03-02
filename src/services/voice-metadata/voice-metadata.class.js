import { Service } from "feathers-nedb";
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
    const { agentIDs, prompt, audioBlob } = data
    if (!agentIDs || !prompt || !audioBlob) {
      throw new Error("Invalid data")
    }

    // agentIDs is an array of agentIDs (e.g. ["agent1", "agent2"]) join them to a string, but if agentIDs is already a single string, just use that
    const agentID = Array.isArray(agentIDs) ? agentIDs.join("") : agentIDs

    console.log("AGENTID IS: ", agentID)
    // assert data is ok

    console.log("DATA IS: ", data)
    const hash = this.generateHash(agentID, prompt)

    // Get the existing data for the IDs
    try {
      return await this.get(hash)
    } catch (e) {

      // extract metadata (mimetype, extension) from audioBlob
      const metadata = {
        type: audioBlob.type,
        size: audioBlob.size,
      }

      // store in db
      return await super.create({ _id: hash, metadata }, params)
    }
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
