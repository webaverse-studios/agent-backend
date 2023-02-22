const assert = require('assert');
const app = require('../../src/app');

describe('\'memories\' service', () => {
  it('registered the service', () => {
    const service = app.service('memories');

    assert.ok(service, 'Registered the service');
  });
});
