const users = require('./users/users.service.js');
const memories = require('./voice-cache/voice-cache.service.js');
// eslint-disable-next-line no-unused-vars
module.exports = function (app) {
  app.configure(users);
  app.configure(memories);
};
