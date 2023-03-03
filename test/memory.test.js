import { app } from "../src/app.js";
import { gun } from "../src/gun_src/gun_app.js";
import fs from "fs";
import { addAgentToGunDB } from "../src/gun_src/agent-utils.js";
import { addMemoryToGunDB, remember } from "../src/gun_src/memory/memory-utils.js";

function createBlobFromImageFile(filename){
  // read image from local file (filename) and create blob
  const imageBuffer = fs.readFileSync(filename)
  return new Blob([imageBuffer], { type: 'image/jpeg' })
}


const main = async () => {
  const bob = addAgentToGunDB("bob")
  // cache a test text in the feathers database
  const text = "This is a test"
  const agentIDs = "bob"
  const prompt = "test-prompt"
  const data = {agentIDs, prompt, text}
  const create_text_results = await app.service('text-cache').create(data)
  console.log("CREATE TEXT RESULTS:", create_text_results)

  // cache a test image in the feathers database after loading test.jpg and turning it into a blob
  const imageBlob = createBlobFromImageFile("test/test.jpg")
  const image_data = {agentID: "bob", imageBlob: imageBlob}
  const create_image_results = await app.service('image-cache').create(image_data)
  console.log("CREATE IMAGE RESULTS:", create_image_results)

  // add a test memory to the gun database
  const timestamp = Date.now()
  await addMemoryToGunDB("bob", timestamp, {text: create_text_results._id, image: create_image_results._id})

  const memory = await remember("bob", timestamp)
  console.log("MEMORY:", memory)

}
await main()
