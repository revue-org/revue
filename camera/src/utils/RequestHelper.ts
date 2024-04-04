import axios, { type AxiosResponse } from 'axios'

type Headers = {
  headers: {
    Authorization: string
  }
}

export const monitoringHost = process.env.NODE_ENV == 'develop' ? 'localhost' : process.env.MONITORING_HOST
export const monitoringPort = process.env.NODE_ENV == 'develop' ? '4001' : process.env.MONITORING_PORT
export const mediaServerHost = process.env.NODE_ENV == 'develop' ? 'localhost' : process.env.MEDIA_SERVER_HOST
export const mediaServerRtspPort = process.env.NODE_ENV == 'develop' ? '8554' : process.env.MEDIA_SERVER_PORTx

export default class RequestHelper {
  static getHeaders(): Headers {
    return { headers: { Authorization: `Bearer ${process.env.CAMERA_BEARER_TOKEN}` } }
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
