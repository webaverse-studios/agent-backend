// For more information about this file see https://dove.feathersjs.com/guides/cli/service.test.html
import assert from 'assert'
import { app } from '../../../src/app.js'

describe('voice-cache service', () => {
  it('registered the service', () => {
    const service = app.service('voice-cache')
    assert.ok(service, 'Registered the service')


  })
})

const main = async () => {
  const service = app.service('voice-cache')
  // create test audio blob with white noise for 10 seconds as audio data
  const audioBlob = new Blob([new Array(0.5 * 44100).fill(0).map(() => Math.random() * 2 - 1)], {type: 'audio/wav'})
  console.log("waiting")
  const result = await service.create({agentID: "123", prompt: "test", audioBlob: audioBlob})
  console.log(result)
}
 await main()