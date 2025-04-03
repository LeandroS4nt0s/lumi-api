import { Server } from './server'

(async () => {
  const server = new Server()
  await server.initialize()
  server.start()
})()
