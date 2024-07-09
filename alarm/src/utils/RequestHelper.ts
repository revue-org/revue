import axios, { type AxiosResponse } from 'axios'

type Headers = {
  headers: {
    Authorization: string
  }
}

export const deviceHost = process.env.NODE_ENV == 'develop' ? 'localhost' : process.env.DEVICE_HOST
export const devicePort = process.env.NODE_ENV == 'develop' ? '4007' : process.env.DEVICE_PORT
export const notificationHost =
  process.env.NODE_ENV == 'develop' ? 'localhost' : process.env.NOTIFICATION_HOST
export const notificationPort = process.env.NODE_ENV == 'develop' ? '4004' : process.env.NOTIFICATION_PORT

export default class RequestHelper {
  static getHeaders(): Headers {
    return { headers: { Authorization: `Bearer ${process.env.ALARM_BEARER_TOKEN}` } }
  }

  static async get(url: string): Promise<AxiosResponse> {
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
