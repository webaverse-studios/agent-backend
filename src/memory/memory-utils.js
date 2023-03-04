import assert from "assert";
import { app } from "../app.js";
import { agents } from "../gun_src/gun_app.js";
import { flipCoin } from "../utils.js";

export async function addMemoryToGunDB(agent, timestamp, data) {
  // add a memory to the gun database data should be the hash/ id for the feathers database entry
  if (typeof data === "object" && data !== null) {
    Object.keys(data).forEach(key => {
      agents.get(agent).get("memories").get(timestamp).get(key).put(data[key]);
    });
    return getMemoryFromGunDB(agent, timestamp);
  } else {
    console.log("Invalid data:", data);
    throw new Error("Invalid data");
  }
}

export async function getMemoryFromGunDB(agent, timestamp) {
  // get memories from the gun database
  return agents.get(agent).get("memories").get(timestamp);
}


function rgbToHsl(r, g, b) {
  (r /= 255), (g /= 255), (b /= 255);
  const max = Math.max(r, g, b),
    min = Math.min(r, g, b);
  let h,
    s,
    l = (max + min) / 2;

  if (max === min) {
    h = s = 0; // achromatic
  } else {
    const d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
    switch (max) {
      case r:
        h = (g - b) / d + (g < b ? 6 : 0);
        break;
      case g:
        h = (b - r) / d + 2;
        break;
      case b:
        h = (r - g) / d + 4;
        break;
    }
    h /= 6;
  }

  return [h, s, l];
}

function hslToRgb(hslElement, hslElement2, hslElement3) {
  let h = hslElement;
  let s = hslElement2;
  let l = hslElement3;
  let r, g, b;

  if (s === 0) {
    r = g = b = l; // achromatic
  } else {
    const hue2rgb = (p, q, t) => {
      if (t < 0) t += 1;
      if (t > 1) t -= 1;
      if (t < 1 / 6) return p + (q - p) * 6 * t;
      if (t < 1 / 2) return q;
      if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6;
      return p;
    };

    const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
    const p = 2 * l - q;
    r = hue2rgb(p, q, h + 1 / 3);
    g = hue2rgb(p, q, h);
    b = hue2rgb(p, q, h - 1 / 3);
  }

  return [r * 255, g * 255, b * 255];
}

export async function remember(agent, timestamp) {
  // get memory from the gun database and return them as a javascript object
  // for every memory modality we perform their remember function (which can modify the memory)
  const memory = {};

  async function rememberText(modality) {
    // get the text from the feathers database
    const { text } = await app.service("text-cache").get(modality);

    if (flipCoin(0.5)) {
      // if the coin flip is true we return the text
      return text;
    } else {
      // else we perform a random transformation on the text
      const transformations = [
        (text) => text.toUpperCase(),
        (text) => text.toLowerCase(),
        (text) => text.split("").reverse().join(""),
        (text) => text.split("").reverse().join("").toUpperCase(),
        (text) => text.split("").reverse().join("").toLowerCase()
      ];
      const randomTransformation = transformations[Math.floor(Math.random() * transformations.length)];
      return randomTransformation(text);
    }
  }

  async function rememberImage(modality) {
    // get the image from the feathers database
    const image_response = await app.service("image-cache").get(modality);
    const img_uri = image_response.uri;
    // img uri into an int array buffer called image
    const arrayBuffer = await fetch(img_uri).then(response => response.arrayBuffer());
    const image = new Uint8ClampedArray(arrayBuffer);
    if (flipCoin(0.5)) {
      // if the coin flip is true we return the image
      return image;
    } else {
      // else we perform a random transformation on the image e.g. make image grayscale or shift hue
      const transformations = [
          // grayscale image
          (image) => {
            // iterate over all pixels
            for (let i = 0; i < image.length; i += 4) {
              // calculate average
              const avg = (image[i] + image[i + 1] + image[i + 2]) / 3;
              // set each pixel to average
              image[i] = avg;
              image[i + 1] = avg;
              image[i + 2] = avg;
            }
            return image;
          },
          // hue shift
          (image) => {
            // iterate over all pixels
            for (let i = 0; i < image.length; i += 4) {
              // perform hue shift
              const r = image[i];
              const g = image[i + 1];
              const b = image[i + 2];
              const hsl = rgbToHsl(r, g, b);
              hsl[0] = (hsl[0] + 0.5) % 1;
              const rgb = hslToRgb(hsl[0], hsl[1], hsl[2]);
              image[i] = rgb[0];
              image[i + 1] = rgb[1];
              image[i + 2] = rgb[2];
            }
            return image;
          },
        ]
      ;
      const randomTransformation = transformations[Math.floor(Math.random() * transformations.length)];
      return randomTransformation(image);
    }
  }

  async function rememberVoice(modality) {
    // get the audio from the feathers database
    const voice_response = await app.service("voice-cache").get(modality);
    const voice_uri = voice_response.uri;

    // voice uri into an array buffer called voice
    const arrayBuffer = await fetch(voice_uri).then(response => response.arrayBuffer());
    const voice = new Uint8ClampedArray(arrayBuffer);

    if (flipCoin(0.5)) {
      // if the coin flip is true we return the audio
      return voice;
    } else {
      // else we perform a random transformation on the audio
      const transformations = [
        // reverse audio
        (voice) => {
          return voice.reverse();
        },
        // pitch shift
        (voice) => {
          // shift pitch by 1 octave
          for (let i = 0; i < voice.length; i += 2) {
            voice[i] = voice[i] * 2;
          }
          return voice;
        }

      ];
      const randomTransformation = transformations[Math.floor(Math.random() * transformations.length)];
      return randomTransformation(voice);
    }
  }

  // get the memory from the gun database
  const gun_memory = await getMemoryFromGunDB(agent, timestamp);

  for (const key of Object.keys(gun_memory._[">"])) {
    const modality = gun_memory[key];

    // depending on the key we perform a different remember function
    if (key === "text") {
      memory.text = await rememberText(modality);
    }
    if (key === "image") {
      const image =  await rememberImage(modality);
      console.log("IMAGE AFTER TRANSFORMATION:", image)
      memory.image = image;
    }
    if (key === "voice") {
      memory.voice = await rememberVoice(modality);
    }
  }
  return memory;
}

export async function addMemory(agent, timestamp, data) {
  // iterate over data and add to both gun and feathers
  // data should be an object with keys "text", "image", "voice"
  // each key should be a string
  // if the key is not present we do not add it to the memory

  // add to feathers and store the id in the gun database

  for (const key of Object.keys(data)) {
    const modality = data[key];
    if (key === "text") {
      const { _id } = await app.service("text-cache").create(modality);
      await addMemoryToGunDB(agent, timestamp, { text: _id });
    }
    if (key === "image") {
      const { _id } = await app.service("image-cache").create(modality);
      await addMemoryToGunDB(agent, timestamp, { image: _id });
    }
    if (key === "voice") {
      const { _id } = await app.service("voice-cache").create(modality);
      await addMemoryToGunDB(agent, timestamp, { voice: _id });
    }
  }
}
