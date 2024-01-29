import axios from 'axios'

export class RequestHelper {
  static headers(): { headers: any } {
    return {
      headers: { Authorization: `Bearer apikey-dev` } //TOKEN TO RETRIEVE FROM WHERE IS STORED
    }
  }

  static async get(url: string, params?: any) {
    return await axios.get(url, RequestHelper.headers())
  }

  static async post(url: string, body?: any) {
    return await axios.post(url, body, RequestHelper.headers())
  }

  static async put(url: string, body?: any) {
    return await axios.put(url, body, RequestHelper.headers())
  }

  static async delete(url: string) {
    return await axios.delete(url, RequestHelper.headers())
  }
}
