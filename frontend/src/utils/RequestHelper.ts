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

class RequestHelper {
  static getHeaders(): Headers {
    return { headers: { Authorization: `Bearer ${userStore().accessToken}` } }
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

  static async delete(url: string, body?: any): Promise<AxiosResponse> {
    return await axios.delete(url, body)
  }
}

// const requestHelper: RequestHelper = new RequestHelper()
export default RequestHelper
