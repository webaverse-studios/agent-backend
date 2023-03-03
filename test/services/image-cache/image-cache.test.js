// For more information about this file see https://dove.feathersjs.com/guides/cli/service.test.html
import assert from "assert";
import { app } from "../../../src/app.js";
import fs from "fs";

function createBlobFromImageFile(filename){
  // read image from local file (filename) and create blob
  const imageBuffer = fs.readFileSync(filename)
  return new Blob([imageBuffer], { type: 'image/jpeg' })
}

describe('image-cache service', () => {
  it('registered the service', () => {
    const service = app.service('image-cache')

    assert.ok(service, 'Registered the service')
  })
})
const main = async () => {
  const service = app.service('image-cache')
  // create test image blob by opening test.jpg from local storage
  const imageBlob = createBlobFromImageFile("test/services/image-cache/test.jpg")
  console.log(imageBlob)
  console.log("waiting")
  const result = await service.create({agentID: "123", imageBlob: imageBlob})
  console.log(result)
  const getted = await service.get(result._id)
  console.log(getted)
  const removed = await service.remove(result._id)
  console.log(removed)
}
await main()
