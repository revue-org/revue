import axios, { type AxiosResponse, HttpStatusCode } from 'axios'
import { useUserStore } from '@/stores/user'
import router from '@/router'

const userStore = () => {
  return useUserStore()
}

type Headers = {
  headers: {
    Authorization: string
  }
}

export const authHost = import.meta.env.DEV ? 'localhost' : import.meta.env.VITE_AUTH_HOST
export const authPort = import.meta.env.DEV ? '4000' : import.meta.env.VITE_AUTH_PORT
export const monitoringHost = import.meta.env.DEV ? 'localhost' : import.meta.env.VITE_MONITORING_HOST
export const monitoringPort = import.meta.env.DEV ? '4001' : import.meta.env.VITE_MONITORING_PORT
export const alarmHost = import.meta.env.DEV ? 'localhost' : import.meta.env.VITE_ALARM_HOST
export const alarmPort = import.meta.env.DEV ? '4002' : import.meta.env.VITE_ALARM_PORT
export const logHost = import.meta.env.DEV ? 'localhost' : import.meta.env.VITE_LOG_HOST
export const logPort = import.meta.env.DEV ? '4003' : import.meta.env.VITE_LOG_PORT
export const notificationHost = import.meta.env.DEV ? 'localhost' : import.meta.env.VITE_NOTIFICATION_HOST
export const notificationPort = import.meta.env.DEV ? '4004' : import.meta.env.VITE_NOTIFICATION_PORT
export const mediaServerHost = import.meta.env.DEV ? 'localhost' : import.meta.env.VITE_MEDIA_SERVER_HOST

export default class RequestHelper {
  static getHeaders(): Headers {
    return { headers: { Authorization: `Bearer ${userStore().accessToken}` } }
  }

  static async get(url: string): Promise<AxiosResponse | void> {
    return await axios.get(url, this.getHeaders()).catch((error): void => {
      if (error.response.status === HttpStatusCode.Forbidden) {
        userStore().clearFields()
        router.push('/login')
      }
    })
  }

  static async post(url: string, body?: any): Promise<AxiosResponse | void> {
    if (url.includes('login')) {
      return await axios.post(url, body)
    }
    return await axios.post(url, body, this.getHeaders()).catch((error): void => {
      if (error.response.status === HttpStatusCode.Forbidden) {
        userStore().clearFields()
        router.push('/login')
      }
    })
  }

  static async put(url: string, body?: any): Promise<AxiosResponse> {
    return await axios.put(url, body, this.getHeaders())
  }

  static async delete(url: string): Promise<AxiosResponse> {
    return await axios.delete(url, this.getHeaders())
  }
}
