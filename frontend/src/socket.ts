import { reactive } from 'vue'
import { io, Socket } from 'socket.io-client'

export const state = reactive({
  connected: false
})
const monitoringHost: string = import.meta.env.VITE_MONITORING_HOST || 'localhost'
const monitoringPort: string = import.meta.env.VITE_MONITORING_PORT || '4001'
const monitoringUrl: string = `http://${monitoringHost}:${monitoringPort}`
console.log(`connect to ${monitoringUrl}`)
export const socket: Socket = io(`${monitoringUrl}`)

socket.on('connect', () => {
  state.connected = true
  console.log('connected')
})

socket.on('disconnect', () => {
  state.connected = false
})
