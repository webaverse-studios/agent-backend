import { Service } from "feathers-nedb";
import crypto from "crypto";

export class ImageMetadataService  extends Service {
  constructor(options) {
    super({
      ...options,
      name: 'image-metadata' // Set the name of the NeDB collection
    });
  }
  async create(data, params) {
    // receives {agentID, prompt, audioBlob} from the client -> create hash from agentID and prompt -> store in db
    const { agentID, timestamp, imageBlob } = data

    // assert data is ok
    if (!agentID || !timestamp || !imageBlob) {
      throw new Error("Invalid data")
    }
    console.log("DATA IS: ", data)
    const hash = this.generateHash(agentID)

    // Get the existing data for the IDs
    try {
      return await this.get(hash)
    } catch (e) {

      // extract metadata (mimetype, extension) from audioBlob
      const metadata = {
        type: imageBlob.type,
        size: imageBlob.size,
      }

      // store in db
      return await super.create({ _id: hash, metadata }, params)
    }
  }

  generateHash(agentID, timestamp) {
    const hash = crypto.createHash('md5');
    hash.update(agentID + timestamp);
    return hash.digest('hex');
  }

}

export const getOptions = (app) => {
  return { app }
}
