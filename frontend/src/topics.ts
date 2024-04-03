import { useTopicsStore } from '@/stores/topics'
import RequestHelper, { monitoringHost, monitoringPort } from '@/utils/RequestHelper'
import { type AxiosResponse, HttpStatusCode as AxiosHttpStatusCode } from 'axios'
import { monitoringSocket } from '@/socket'
import router from '@/router'
import { DeviceType } from '@domain/device/core/impl/enum/DeviceType.js'
import { DeviceTypeConverter } from '@utils/DeviceTypeConverter.js'

export const subscribeToAllTopics = async (): Promise<void> => {
  console.log('subscribe to all topics')

  const res: AxiosResponse = await RequestHelper.get(`http://${monitoringHost}:${monitoringPort}/devices`)
  console.log(res)
  if (res.status == AxiosHttpStatusCode.Ok) {
    for (let i = 0; i < res.data.length; i++) {
      useTopicsStore().addTopic(res.data[i]._id.type + '_' + res.data[i]._id.code)
    }
    monitoringSocket?.on('subscribed', (): void => {
      console.log('subscribed')

      if (router.currentRoute.value.name === 'Home') {
        monitoringSocket?.emit(
          'resume',
          useTopicsStore().subscribedTopics.filter((topic: string): boolean =>
            topic.startsWith(DeviceTypeConverter.convertToString(DeviceType.SENSOR))
          )
        )
      } else if (router.currentRoute.value.name === 'Monitoring') {
        monitoringSocket?.emit(
          'resume',
          useTopicsStore().subscribedTopics.filter((topic: string): boolean =>
            topic.startsWith(DeviceTypeConverter.convertToString(DeviceType.CAMERA))
          )
        )
      }
    })
    monitoringSocket?.emit('subscribe', useTopicsStore().subscribedTopics)
  } else {
    console.log('Error while fetching devices')
  }
}
