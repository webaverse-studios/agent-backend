import { app } from "../src/app.js";
import { gun } from "../src/gun_src/gun_app.js";
import fs from "fs";
import { addAgentToGunDB } from "../src/gun_src/agent-utils.js";
import { addMemoryToGunDB, remember , addMemory} from "../src/memory/memory-utils.js";

function createBlobFromImageFile(filename){
  // read image from local file (filename) and create blob
  const imageBuffer = fs.readFileSync(filename)
  return new Blob([imageBuffer], { type: 'image/jpeg' })
}


const main = async () => {
  const bob = addAgentToGunDB("bob")

  // timestamp for the cache
  const timestamp = Date.now()

  // cache a test text in the feathers database
  const text = "This is a test"
  const agentIDs = "bob"
  const prompt = "test-prompt"
  const data = {agentIDs, prompt, text, timestamp:timestamp}

  // cache a test image in the feathers database after loading test.jpg and turning it into a blob
  const imageBlob = createBlobFromImageFile("./test.jpg")
  const image_data = {agentID: "bob", imageBlob: imageBlob, timestamp:timestamp}

  // open wav file and turn into blob
  const wavFile = fs.readFileSync("./test.wav")
  const wavBlob = new Blob([wavFile], {type: 'audio/wav'})
  const voice_data = {agentIDs: "bob", prompt:"test-prompt", audioBlob: wavBlob, timestamp:timestamp}
  // add a test memory to the gun database
  await addMemory("bob", timestamp, {text: data, image: image_data, voice: voice_data})
  const memory = await remember("bob", timestamp)
  console.log("MEMORY:", memory)

}
await main()
