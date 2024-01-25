import { reactive } from 'vue'
import { io, Socket } from 'socket.io-client'

export const state = reactive({
  connected: false
})

export const socket: Socket = io('http://localhost:3001')

socket.on('connect', () => {
  state.connected = true
  console.log('connected')
})

socket.on('disconnect', () => {
  state.connected = false
})
