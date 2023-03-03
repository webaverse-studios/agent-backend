import GUN from 'gun'
import * as http from 'http'

const server = http.createServer().listen(8080)
export const gun = GUN({web: server})
export const agents = gun.get('agents')
