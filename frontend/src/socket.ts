import { reactive } from 'vue'
import { io, Socket } from 'socket.io-client'
import { monitoringHost, notificationHost } from '@/utils/RequestHelper'

export const monitoringSocketState = reactive({
  connected: false
})
export const notificationSocketState = reactive({
  connected: false
})

const monitoringUrl: string = `${monitoringHost}`
const notificationUrl: string = `${notificationHost}`
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
  })

  monitoringSocket.on('disconnect from monitoring socket', (): void => {
    monitoringSocketState.connected = false
  })
}

export const closeSocketServers = (): void => {
  monitoringSocket?.close()
  notificationSocket?.close()
}
