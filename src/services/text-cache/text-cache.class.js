import { Service } from "feathers-nedb";
import crypto from "crypto";

export class TextCacheService extends Service {
  constructor(options) {
    super({
      ...options,
      name: "text-cache" // Set the name of the NeDB collection
    });
  }

  async create(data, params) {
    console.log("DATA IS: ", data)
    const { agentIDs, timestamp ,prompt, text } = data;
    // assert data is ok
    if (!agentIDs || !timestamp || !prompt || !text) {
      throw new Error("Invalid data");
    }

    // agentIDs is an array of agentIDs (e.g. ["agent1", "agent2"]) join them to a string, but if agentIDs is already a single string, just use that
    const agentID = Array.isArray(agentIDs) ? agentIDs.join("") : agentIDs;

    const hash = this.generateHash(agentID, prompt);
    // Get the existing data for the IDs
    try {
      const existingData = await this.get(hash);
      return existingData;
    } catch (e) {
      // store in db
      return await super.create({ _id: hash, text }, params);
    }
  }

  generateHash(agentID, prompt, timestamp) {
    const hash = crypto.createHash('md5');
    hash.update(agentID + prompt + timestamp);
    return hash.digest('hex');
  }

}

export const getOptions = (app) => {
  return { app };
};
