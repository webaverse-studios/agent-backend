// For more information about this file see https://dove.feathersjs.com/guides/cli/service.test.html
import assert from 'assert'
import { app } from '../../../src/app.js'
import fs from "fs";

describe('voice-cache service', () => {
  it('registered the service', () => {
    const service = app.service('voice-cache')
    assert.ok(service, 'Registered the service')


  })
})

const main = async () => {
  const service = app.service('voice-cache')
  // open wav file and turn into blob
  const wavFile = fs.readFileSync("test/test.wav")
  const audioBlob = new Blob([wavFile], {type: 'audio/wav'})
  console.log("waiting")
  const timestamp = Date.now()
  const result = await service.create({agentIDs: ["123", "345"], prompt: "test10sec", audioBlob: audioBlob, timestamp: timestamp})
  console.log(result)
  const getted = await service.get(result._id)
  console.log(getted)
  const removed = await service.remove(result._id)
  console.log(removed)
}
 await main()
