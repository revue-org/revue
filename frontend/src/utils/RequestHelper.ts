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

const protocol: string = 'http://'

const getHost = (service: string): string => {
  if (import.meta.env.DEV) {
    return protocol + 'localhost:' + import.meta.env[`VITE_${service.toUpperCase().replace('-', '_')}_PORT`]
  } else if (window.location.href.includes('localhost')) {
    return protocol + service + '.localhost'
  } else {
    return protocol + 'revue-' + service
  }
}

export const authHost = getHost(import.meta.env.VITE_AUTH_HOST)
export const userHost = getHost(import.meta.env.VITE_USER_HOST)
export const locationHost = getHost(import.meta.env.VITE_LOCATION_HOST)
export const deviceHost = getHost(import.meta.env.VITE_DEVICE_HOST)
export const monitoringHost = getHost(import.meta.env.VITE_MONITORING_HOST)
export const alarmHost = getHost(import.meta.env.VITE_ALARM_HOST)
export const logHost = getHost(import.meta.env.VITE_LOG_HOST)
export const notificationHost = getHost(import.meta.env.VITE_NOTIFICATION_HOST)
export const mediaServerHost = getHost(import.meta.env.VITE_MEDIA_SERVER_HOST)

export default class RequestHelper {
  static getHeaders(): Headers {
    return { headers: { Authorization: `Bearer ${userStore().accessToken}` } }
  }

  static async get(url: string): Promise<AxiosResponse | void> {
    return await axios.get(url, this.getHeaders()).catch((error): void => {
      this.errorHandling(error)
    })
  }

  static async post(url: string, body?: any): Promise<AxiosResponse | void> {
    if (url.includes('login')) {
      return await axios.post(url, body)
    }
    return await axios.post(url, body, this.getHeaders()).catch((error): void => {
      this.errorHandling(error)
    })
  }

  static async put(url: string, body?: any): Promise<AxiosResponse> {
    return await axios.put(url, body, this.getHeaders())
  }

  static async delete(url: string): Promise<AxiosResponse> {
    return await axios.delete(url, this.getHeaders())
  }

  private static errorHandling(error: any): void {
    if (error.code === 'ECONNREFUSED') {
      console.error('Connection refused. Please check if the server is running.')
    }
    if (error.response) {
      if (error.response.status === HttpStatusCode.Forbidden) {
        userStore().clearFields()
        router.push('/login')
      }
    }
  }
}
