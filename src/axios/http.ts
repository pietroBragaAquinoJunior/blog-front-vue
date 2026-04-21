import axios, { type AxiosInstance } from 'axios'

const apiClient: AxiosInstance = axios.create({
  baseURL: 'http://localhost:8005',
  headers: {
    'Content-type': 'application/json',
  },

})

// Add a request interceptor
apiClient.interceptors.request.use(function (config) {
    // Do something before request is sent

    config.headers.Authorization = "Bearer eyJhbGciOiJIUzI1NiJ9.eyJwZXJtaXNzaW9ucyI6WyJDQU5fU0VFX1BPU1RTIiwiQ0FOX0RJU0FCTEVfVVNFUiIsIkNBTl9DUkVBVEVfUE9TVCJdLCJyb2xlcyI6WyJBRE1JTiJdLCJzdWIiOiJwaWV0cm9AZ21haWwuY29tIiwiaWF0IjoxNzc2Nzc2MjYwLCJleHAiOjE3NzY4NjI2NjB9.vrWVk9ItdyDcoulYHfmagvrq82BXHf5e3jSbb8pJk0U"

    return config;
  }, function (error) {
    // Do something with request error
    return Promise.reject(error);
  },
  { synchronous: true, runWhen: () => true}
);

export default apiClient
