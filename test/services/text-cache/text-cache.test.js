// For more information about this file see https://dove.feathersjs.com/guides/cli/service.test.html
import assert from 'assert'
import { app } from '../../../src/app.js'

describe('text-cache service', () => {
  it('registered the service', () => {
    const service = app.service('text-cache')

    assert.ok(service, 'Registered the service')


  })
})

const main = async () => {
  const service = app.service('text-cache')
  // test the service create, get and remove text
  const text = "This is a test"
  const agentIDs = ["test-agent", "test-agent2"]
  const prompt = "test-prompt"
  const timestamp = Date.now()
  const data = {agentIDs, prompt, text, timestamp}
  const create_results = await service.create(data)
  console.log("CREATE RESULTS:", create_results)
  const get_results = await  service.get(create_results._id)
  console.log("GET RESULTS:", get_results)
  const remove_results = await service.remove(create_results._id)
  console.log("REMOVE RESULTS:", remove_results)
}

await main()