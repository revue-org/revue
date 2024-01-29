import axios, { type AxiosResponse, HttpStatusCode as AxiosHttpStatusCode } from 'axios'

import { useUserStore } from '@/stores/user'
import router from '@/router'

// lazy import of userStore
const userStore = () => {
  return useUserStore()
}

type Headers = {
  headers: {
    Authorization: string
  }
}

const authHost: string = import.meta.env.VITE_AUTH_HOST || 'localhost'
const authPort: string = import.meta.env.VITE_AUTH_PORT || '4000'

class RequestHelper {
  getHeaders(): Headers {
    return { headers: { Authorization: `Bearer ${userStore().accessToken}` } }
  }

  async login(username: string, password: string): Promise<void> {
    console.log("faccio login")
    this.post(`http://${authHost}:${authPort}/login`, {
      username: username,
      password: password
    }).then((res): void => {
      if (res.status == AxiosHttpStatusCode.Ok) {
        userStore().username = username
        userStore().accessToken = res.data.accessToken
        userStore().refreshToken = res.data.refreshToken
        userStore().isLoggedIn = true
        router.push('/')
      } else {
        console.log(`Login failed with status code ${res.status} and message ${res.data.message}`)
      }
    })
      .catch((err): void => console.log(err))
  }

  async logout(): Promise<void> {
    this.post(`http://${authHost}:${authPort}/logout`, {
      username: userStore().username
    }).then((res): void => {
      if (res.status == AxiosHttpStatusCode.Ok) {
        useUserStore().clearFields()
        router.push('/login')
      } else {
        console.log(`Logout failed with status code ${res.status} and message ${res.data.message}`)
      }
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
