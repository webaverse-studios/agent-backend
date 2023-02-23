const { Service } = require('feathers-nedb');

const crypto = require('crypto')
const {errors} = require('@feathersjs/errors');

exports.VoiceCache = class VoiceCache extends Service {
  async create(data, params) {
    // Check if the data contains the required fields
    const { prompt, recipient, response } = data;
    if (!prompt || !recipient || !response) {
      throw new errors.BadRequest('Missing required fields');
    }

    // Generate a hash from the prompt and recipient
    const hash = this.generateHash(prompt, recipient);

    // Check if the cache already contains the response for the prompt and recipient
    try {
      const cachedResponse = await this.get(hash);
      if (cachedResponse) {
        return cachedResponse;
      }
    } catch (error) {
      console.log('hash does not exist');
    }

    // Create a new cache entry for the response
    const doc = { _id: hash, response };
    return super.create(doc, params);
  }

  async find(params) {
    // Check if the query contains the required fields
    const { prompt, recipient } = params.query;
    if (!prompt || !recipient) {
      throw new errors.BadRequest('Missing required fields');
    }

    // Generate a hash from the prompt and recipient
    const hash = this.generateHash(prompt, recipient);

    // Check if the cache contains the response for the prompt and recipient
    const cachedResponse = await this.get(hash);
    if (cachedResponse) {
      return cachedResponse;
    }

    // Call the super.find() function to retrieve the response from the database
    return super.find(params);
  }

  generateHash(prompt, recipient) {
    const hash = crypto.createHash('md5');
    hash.update(prompt + recipient);
    return hash.digest('hex');
  }
};
