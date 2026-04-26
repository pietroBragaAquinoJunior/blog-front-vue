import axios, { type AxiosInstance } from 'axios'

import router from '../router/index'

const apiClient: AxiosInstance = axios.create({
  baseURL: 'http://localhost:8005',
  headers: {
    'Content-type': 'application/json',
  },
  withCredentials: true, // PASSAR O COOKIE QUE VEIO DO BACK EM TODAS AS REQUISIÇÕES.
})

apiClient.interceptors.response.use(
  function onFulfilled(response) {
    // STATUS 2XX
    return response
  },
  function onRejected(error) {
    // QUALQUER OUTRO STATUS
    if (error.status == 401 || error.status == 403) {
      console.log('resposta foi 401 ou 403.')
      router.push('login')
    }
    return Promise.reject(error)
  },
)

export default apiClient
