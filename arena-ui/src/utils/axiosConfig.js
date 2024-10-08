import axios from 'axios'

const instance = axios.create({
  baseURL: 'https://arena-talent-809eb598a3c0.herokuapp.com',
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json'
  }
})

// Add a request interceptor
instance.interceptors.request.use(
  function (config) {
    const token = localStorage.getItem('authToken') // Adjust this based on how you store your token
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  function (error) {
    return Promise.reject(error)
  }
)

export default instance
