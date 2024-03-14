import { reactive } from 'vue'
import { io, Socket } from 'socket.io-client'
import { subscribeToAllTopics } from '@/topics'

export const monitoringSocketState = reactive({
  connected: false
})
export const notificationSocketState = reactive({
  connected: false
})

const monitoringHost: string = import.meta.env.VITE_MONITORING_HOST || 'localhost'
const monitoringPort: string = import.meta.env.VITE_MONITORING_PORT || '4001'
const monitoringUrl: string = `http://${monitoringHost}:${monitoringPort}`

const notificationHost: string = import.meta.env.VITE_NOTIFICATION_HOST || 'localhost'
const notificationPort: string = import.meta.env.VITE_NOTIFICATION_PORT || '4004'
const notificationUrl: string = `http://${notificationHost}:${notificationPort}`
export let monitoringSocket: Socket | undefined
export let notificationSocket: Socket | undefined

export const setupSocketServers = (accessToken: string): void => {
  monitoringSocket = io(`${monitoringUrl}`, { query: { token: accessToken } })
  notificationSocket = io(`${notificationUrl}`, { query: { token: accessToken } })

  notificationSocket.on('connect', (): void => {
    notificationSocketState.connected = true
    console.log('connected to notification socket')
  })

  notificationSocket.on('disconnect from notification socket', (): void => {
    notificationSocketState.connected = false
  })

  monitoringSocket.on('connect', async (): Promise<void> => {
    console.log('connected to monitoring socket')
    monitoringSocketState.connected = true
    await subscribeToAllTopics()
  })

  monitoringSocket.on('disconnect from monitoring socket', (): void => {
    monitoringSocketState.connected = false
  })
}

export const closeSocketServers = (): void => {
  monitoringSocket?.close()
  notificationSocket?.close()
}
