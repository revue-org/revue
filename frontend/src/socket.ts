import { reactive } from 'vue'
import { io, Socket } from 'socket.io-client'
import { useTopicsStore } from '@/stores/topics'
import RequestHelper from '@/utils/RequestHelper'

export const state = reactive({
  connected: false
})
const monitoringHost: string = import.meta.env.VITE_MONITORING_HOST || 'localhost'
const monitoringPort: string = import.meta.env.VITE_MONITORING_PORT || '4001'
const monitoringUrl: string = `http://${monitoringHost}:${monitoringPort}`
console.log(`connect to ${monitoringUrl}`)
export const socket: Socket = io(`${monitoringUrl}`)

socket.on('connect', (): void => {
  state.connected = true
  subscribeToAllTopics()
  console.log('connected')
})

socket.on('disconnect', (): void => {
  state.connected = false
})


const subscribeToAllTopics = (): void => {
  RequestHelper.get('/topics').then((topics: string[]): void => {

  })
  console.log('subscribe to all topics')
  console.log(useTopicsStore().subscribedTopics)
  socket.emit('subscribe', useTopicsStore().subscribedTopics)
}
