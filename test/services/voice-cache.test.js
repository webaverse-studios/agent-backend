const assert = require('assert');
const app = require('../../src/app');

describe('\'voice-cache\' service', () => {
  it('registered the service', () => {
    const service = app.service('voice-cache');

    assert.ok(service, 'Registered the service');
  });
});
