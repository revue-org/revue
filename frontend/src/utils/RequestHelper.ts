import axios, { type AxiosResponse } from 'axios'

import { useUserStore } from '@/stores/user'
import router from '@/router'

// lazy import of userStore
const userStore = () => {
  return useUserStore()
}

type Headers = {
  headers: {
    Authorization: string;
  };
};

const authHost: string = import.meta.env.VITE_AUTH_HOST || 'localhost'
const authPort: string = import.meta.env.VITE_AUTH_PORT || '4000'

class RequestHelper {

  getHeaders(): Headers {
    return { headers: { Authorization: userStore().accessToken } }
  }

  async login(username: string, password: string): Promise<void> {
    this.post(`http://${authHost}:${authPort}/login`, {
      username: username,
      password: password
    }).then((res): void => {
      console.log(res.status)
      userStore().username = username
      userStore().accessToken = res.data.accessToken
      userStore().refreshToken = res.data.refreshToken
      userStore().isLoggedIn = true
      router.push('/')
    })
  }

  async logout(): Promise<void> {
    this.post(`http://${authHost}:${authPort}/logout`, {
      username: userStore().username
    }).then((res): void => {
      console.log(res.status)
      userStore().username = ''
      userStore().accessToken = ''
      userStore().refreshToken = ''
      userStore().isLoggedIn = false
      router.push('/login')
    })
  }

  async get(url: string, params?: any): Promise<AxiosResponse> {
    return await axios.get(url, this.getHeaders())
  }

  async post(url: string, body?: any): Promise<AxiosResponse> {
    console.log(this.getHeaders())
    return await axios.post(url, body, this.getHeaders())
  }

  async put(url: string, body?: any): Promise<AxiosResponse> {
    return await axios.put(url, body, this.getHeaders())
  }

  async delete(url: string, body?: any): Promise<AxiosResponse> {
    return await axios.delete(url, body)
  }
}

const requestHelper: RequestHelper = new RequestHelper()
export default requestHelper
