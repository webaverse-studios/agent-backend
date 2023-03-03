import { app } from "../../app.js"
import {agents} from "../gun_app.js";
import {flipCoin} from "../../utils.js";

export async function addMemoryToGunDB(agent, timestamp, data) {
  // add a memory to the gun database data should be the hash/ id for the feathers database entry
  if (typeof data === 'object' && data !== null) {
    Object.keys(data).forEach(key => {
      agents.get(agent).get("memories").get(timestamp).get(key).put(data[key])
    })
    return getMemoryFromGunDB(agent, timestamp)
  } else {
    console.log("Invalid data:", data)
    throw new Error("Invalid data")
  }
}

export async function getMemoryFromGunDB(agent, timestamp) {
  // get memories from the gun database
  return agents.get(agent).get("memories").get(timestamp)
}



export async function remember(agent, timestamp) {
  // get memory from the gun database and return them as a javascript object
  // for every memory modality we perform their remember function (which can modify the memory)
  const memory = {};

  async function rememberText(modality) {
    // get the text from the feathers database
    const {text} = await app.service('text-cache').get(modality)

    if (flipCoin(0.5)) {
      // if the coin flip is true we return the text
      return text
    } else {
      // else we perform a random transformation on the text
      const transformations = [
        (text) => text.toUpperCase(),
        (text) => text.toLowerCase(),
        (text) => text.split("").reverse().join(""),
        (text) => text.split("").reverse().join("").toUpperCase(),
        (text) => text.split("").reverse().join("").toLowerCase()
      ]
      const randomTransformation = transformations[Math.floor(Math.random() * transformations.length)]
      return randomTransformation(text)
    }
  }

  async function rememberImage(modality) {
    // get the image from the feathers database
    const image = await app.service('image-cache').get(modality)

    if (flipCoin(0.5)) {
      // if the coin flip is true we return the image
      return image
    } else {
      // else we perform a random transformation on the image
      const transformations = [
        (image) => image,
      ]
      const randomTransformation = transformations[Math.floor(Math.random() * transformations.length)]
      return randomTransformation(image)
    }
  }

  async function rememberVoice(modality) {
    // get the audio from the feathers database
    const voice = app.service('voice-cache').get(modality)

    if (flipCoin(0.5)) {
      // if the coin flip is true we return the audio
      return voice
    } else {
      // else we perform a random transformation on the audio
      const transformations = [
        (voice) => voice,
      ]
      const randomTransformation = transformations[Math.floor(Math.random() * transformations.length)]
      return randomTransformation(voice)
    }
  }

  // get the memory from the gun database
  const gun_memory = await getMemoryFromGunDB(agent, timestamp)

  for (const key of Object.keys(gun_memory._['>'])) {
    const modality = gun_memory[key]

    // depending on the key we perform a different remember function
    if (key === "text") {
      memory.text = await rememberText(modality)
    }
    if (key === "image") {
      memory.image = await rememberImage(modality)
    }
    if (key === "voice") {
      memory.voice = rememberVoice(modality)
    }
  }
  return memory
}
