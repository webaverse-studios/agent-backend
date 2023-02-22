// Initializes the `memories` service on path `/memories`
const { VoiceCache } = require('./voice-cache.class');
const createModel = require('../../models/voice-cache.model');
const hooks = require('./voice-cache.hooks');

module.exports = function (app) {
  const options = {
    Model: createModel(app),
    paginate: app.get('paginate')
  };

  // Initialize our service with any options it requires
  app.use('/voice-cache', new VoiceCache(options, app));

  // Get our initialized service so that we can register hooks
  const service = app.service('voice-cache');

  service.hooks(hooks);
};
