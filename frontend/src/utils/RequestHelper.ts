import axios, { type AxiosResponse } from 'axios'
import { useUserStore } from '@/stores/user'

// lazy import of userStore
const userStore = () => {
  return useUserStore()
}

type Headers = {
  headers: {
    Authorization: string
  }
}

export const authHost: string = import.meta.env.VITE_AUTH_HOST || 'localhost'
export const authPort: string = import.meta.env.VITE_AUTH_PORT || '4000'
export const monitoringHost: string = import.meta.env.VITE_MONITORING_HOST || 'localhost'
export const monitoringPort: string = import.meta.env.VITE_MONITORING_PORT || '4001'
export const alarmHost: string = import.meta.env.VITE_ALARM_HOST || 'localhost'
export const alarmPort: string = import.meta.env.VITE_ALARM_PORT || '4002'

export default class RequestHelper {
  static getHeaders(): Headers {
    return { headers: { Authorization: `Bearer apikey-dev` } } //${userStore().accessToken}
  }

  static async get(url: string, params?: any): Promise<AxiosResponse> {
    return await axios.get(url, this.getHeaders())
  }

  static async post(url: string, body?: any): Promise<AxiosResponse> {
    console.log(this.getHeaders())
    return await axios.post(url, body, this.getHeaders())
  }

  static async put(url: string, body?: any): Promise<AxiosResponse> {
    return await axios.put(url, body, this.getHeaders())
  }

  static async delete(url: string): Promise<AxiosResponse> {
    return await axios.delete(url, this.getHeaders())
  }
}
