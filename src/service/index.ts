
import axios, { InternalAxiosRequestConfig } from 'axios'

declare global {
  interface Window {
    getToken: any
  }
}

const getHeader = () => {
  return {
    "Content-Type": "application/json",
  }
}

export const requests = (host?: string, apiKey?: string) => {
  // const baseUrl = 'http://127.0.0.1:8000/api'
  const baseUrl = 'https://crmapi.code4each.com/api'
  

  const axiosInstance = axios.create({
    baseURL: baseUrl,
    headers: getHeader(),
  })

  axiosInstance.interceptors.request.use(
    async (requestConfig: InternalAxiosRequestConfig<any>) => {
      try {
        const token = localStorage.getItem('access_token');
        if (token) {
            requestConfig.headers['Authorization'] = `Bearer ${token}`;
        }
      } catch (e) {
        console.error(e)
      }
      return requestConfig
    }
  )

  return axiosInstance
}