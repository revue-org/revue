import axios, { type AxiosResponse } from 'axios'

type Headers = {
  headers: {
    Authorization: string
  }
}

export const authHost = process.env.NODE_ENV == 'develop' ? 'localhost' : process.env.AUTH_HOST
export const authPort = process.env.AUTH_PORT
export const userHost = process.env.NODE_ENV == 'develop' ? 'localhost' : process.env.USER_HOST
export const userPort = process.env.USER_PORT
export const locationHost = process.env.NODE_ENV == 'develop' ? 'localhost' : process.env.LOCATION_HOST
export const locationPort = process.env.LOCATION_PORT
export const deviceHost = process.env.NODE_ENV == 'develop' ? 'localhost' : process.env.DEVICE_HOST
export const devicePort = process.env.DEVICE_PORT
export const monitoringHost = process.env.NODE_ENV == 'develop' ? 'localhost' : process.env.MONITORING_HOST
export const monitoringPort = process.env.MONITORING_PORT
export const mediaServerHost = process.env.NODE_ENV == 'develop' ? 'localhost' : process.env.MEDIA_SERVER_HOST
export const mediaServerRtspPort =
  process.env.NODE_ENV == 'develop' ? '8554' : process.env.MEDIA_SERVER_RTSP_PORT
export const alarmHost = process.env.NODE_ENV == 'develop' ? 'localhost' : process.env.ALARM_HOST
export const alarmPort = process.env.ALARM_PORT
export const notificationHost =
  process.env.NODE_ENV == 'develop' ? 'localhost' : process.env.NOTIFICATION_HOST
export const notificationPort = process.env.NOTIFICATION_PORT
export const logHost = process.env.NODE_ENV == 'develop' ? 'localhost' : process.env.LOG_HOST
export const logPort = process.env.LOG_PORT

export default class RequestHelper {
  static getHeaders(): Headers {
    return { headers: { Authorization: `Bearer ${process.env.DEV_API_KEY}` } }
  }

  static async get(url: string): Promise<AxiosResponse> {
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
