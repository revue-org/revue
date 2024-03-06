import axios, { type AxiosResponse } from 'axios'

type Headers = {
  headers: {
    Authorization: string
  }
}

export const authHost: string =
  process.env.NODE_ENV == 'develop' ? 'localhost' : process.env.AUTH_HOST || 'localhost'
export const authPort: string = process.env.NODE_ENV == 'develop' ? '4000' : process.env.AUTH_PORT || '4000'
export const monitoringHost: string =
  process.env.NODE_ENV == 'develop' ? 'localhost' : process.env.MONITORING_HOST || 'localhost'
export const monitoringPort: string =
  process.env.NODE_ENV == 'develop' ? '4001' : process.env.MONITORING_PORT || '4001'
export const alarmHost: string =
  process.env.NODE_ENV == 'develop' ? 'localhost' : process.env.ALARM_HOST || 'localhost'
export const alarmPort: string = process.env.NODE_ENV == 'develop' ? '4002' : process.env.ALARM_PORT || '4002'
export const logHost: string =
  process.env.NODE_ENV == 'develop' ? 'localhost' : process.env.LOG_HOST || 'localhost'
export const logPort: string = process.env.NODE_ENV == 'develop' ? '4003' : process.env.LOG_PORT || '4003'
export const notificationHost: string =
  process.env.NODE_ENV == 'develop' ? 'localhost' : process.env.NOTIFICATION_HOST || 'localhost'
export const notificationPort: string =
  process.env.NODE_ENV == 'develop' ? '4004' : process.env.NOTIFICATION_PORT || '4004'

export default class RequestHelper {
  static getHeaders(): Headers {
    return { headers: { Authorization: `Bearer apikey-dev` } } // TODO: create an API key for the log service, same for sensors and cameras
  }

  static async get(url: string, params?: any): Promise<AxiosResponse> {
    return await axios.get(url, this.getHeaders())
  }

  static async post(url: string, body?: any): Promise<AxiosResponse> {
    return await axios.post(url, body, this.getHeaders())
  }

  static async put(url: string, body?: any): Promise<AxiosResponse> {
    return await axios.put(url, body, this.getHeaders())
  }

  static async delete(url: string): Promise<AxiosResponse> {
    return await axios.delete(url, this.getHeaders())
  }
}
