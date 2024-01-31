import { Socket } from 'socket.io'
import { io } from './index.js'

export const setupNotificationSimulation = async (): Promise<void> => {
  io.on('connection', async (socket: Socket): Promise<void> => {
    console.log('A client connected', socket.id)

    socket.on('disconnect', (): void => {
      console.log('A client disconnected', socket.id)
    })
  })
}
