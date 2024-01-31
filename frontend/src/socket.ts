import { reactive } from 'vue'
import { io, Socket } from 'socket.io-client'
import { subscribeToAllTopics } from '@/topics'

export const monitoringSocketState = reactive({
  connected: false
})
export const alarmSocketState = reactive({
  connected: false
})
const monitoringHost: string = import.meta.env.VITE_MONITORING_HOST || 'localhost'
const monitoringPort: string = import.meta.env.VITE_MONITORING_PORT || '4001'
const monitoringUrl: string = `http://${monitoringHost}:${monitoringPort}`

const alarmHost: string = import.meta.env.VITE_ALARM_HOST || 'localhost'
const alarmPort: string = import.meta.env.VITE_ALARM_PORT || '4002'
const alarmUrl: string = `http://${alarmHost}:${alarmPort}`
export const monitoringSocket: Socket = io(`${monitoringUrl}`)
export const alarmSocket: Socket = io(`${alarmUrl}`)

alarmSocket.on('connect', (): void => {
  alarmSocketState.connected = true
  console.log('connected to alarm socket')
})

alarmSocket.on('disconnect from alarm socket', (): void => {
  alarmSocketState.connected = false
})

monitoringSocket.on('connect', async (): Promise<void> => {
  console.log('connected to monitoring socket')
  monitoringSocketState.connected = true
  await subscribeToAllTopics()
})

monitoringSocket.on('disconnect from monitoring socket', (): void => {
  monitoringSocketState.connected = false
})
