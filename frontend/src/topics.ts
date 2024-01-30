import { useTopicsStore } from '@/stores/topics'
import RequestHelper, { monitoringHost, monitoringPort } from '@/utils/RequestHelper'
import { type AxiosResponse, HttpStatusCode as AxiosHttpStatusCode } from 'axios'
import { socket } from '@/socket'
import router from '@/router'

export const subscribeToAllTopics = async (): Promise<void> => {
  console.log('subscribe to all topics')

  const res: AxiosResponse = await RequestHelper.get(`http://${monitoringHost}:${monitoringPort}/devices`)
  if (res.status == AxiosHttpStatusCode.Ok) {
    for (let i = 0; i < res.data.length; i++) {
      useTopicsStore().addTopic(res.data[i]._id.type + '_' + res.data[i]._id.code)
    }

    socket.on('subscribed', (): void => {
      console.log('subscribed')
      if (router.currentRoute.value.name === 'Home') {
        socket.emit('resume', useTopicsStore().subscribedTopics.filter((topic: string): boolean => topic.startsWith('SENSOR')))
      } else if (router.currentRoute.value.name === 'Monitoring') {
        socket.emit('resume', useTopicsStore().subscribedTopics.filter((topic: string): boolean => topic.startsWith('CAMERA')))
      }
    })
    socket.emit('subscribe', useTopicsStore().subscribedTopics)
  } else {
    console.log('Error while fetching devices')
  }
}


