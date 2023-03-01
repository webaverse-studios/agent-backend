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
    const { agentID, prompt, text } = data;
    // assert data is ok
    if (!agentID || !prompt || !text) {
      throw new Error("Invalid data");
    }

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

  generateHash(agentID, prompt) {
    const hash = crypto.createHash('md5');
    hash.update(agentID + prompt);
    return hash.digest('hex');
  }

}

export const getOptions = (app) => {
  return { app };
};
