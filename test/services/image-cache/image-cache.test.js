// For more information about this file see https://dove.feathersjs.com/guides/cli/service.test.html
import assert from 'assert'
import { app } from '../../../src/app.js'

describe('image-cache service', () => {
  it('registered the service', () => {
    const service = app.service('image-cache')

    assert.ok(service, 'Registered the service')
  })
})
const main = async () => {
  const service = app.service('image-cache')
  // create test image blob with a random RGBA image of size 512x512
  const imageBlob = new Blob([new Array(512 * 512 * 4).fill(0).map(() => Math.random() * 255)], {type: 'image/png'})
  console.log("waiting")
  const result = await service.create({agentID: "123", imageBlob: imageBlob})
  console.log(result)
  const getted = await service.get(result._id)
  console.log(getted)
  const removed = await service.remove(result._id)
  console.log(removed)
}
await main()
