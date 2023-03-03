import {  agents } from "./gun_app.js"

export function addAgentToGunDB(agentID) {
  return agents.put(agentID)
}