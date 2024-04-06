import axios, { type AxiosResponse } from 'axios'

type Headers = {
  headers: {
    Authorization: string
  }
}

export const monitoringHost = process.env.NODE_ENV == 'develop' ? 'localhost' : process.env.MONITORING_HOST
export const monitoringPort = process.env.NODE_ENV == 'develop' ? '4001' : process.env.MONITORING_PORT

export default class RequestHelper {
  static getHeaders(): Headers {
    return { headers: { Authorization: `Bearer ${process.env.SENSOR_BEARER_TOKEN}` } }
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
