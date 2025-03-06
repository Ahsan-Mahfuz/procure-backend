import { Server, Socket } from 'socket.io'
import { Server as HttpServer } from 'http'

let io: Server
let admins: Array<Socket> = []
let notifications: Array<{ email: string; timestamp: string }> = []
export const initializeSocket = (server: HttpServer) => {
  io = new Server(server, {
    cors: {
      origin: '*',
      methods: ['GET', 'POST'],
    },
  })

  io.on('connection', (socket) => {
    console.log('Admin connected:', socket.id)
    admins.push(socket)

    socket.on('disconnect', () => {
      admins = admins.filter((s) => s !== socket)
      console.log('Admin disconnected:', socket.id)
    })
  })

  return io
}

export const getIo = (): Server => {
  if (!io) {
    throw new Error('Socket.io is not initialized!')
  }
  return io
}

