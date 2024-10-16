import axios from 'axios'

const instance = axios.create({
  baseURL:
    process.env.NODE_ENV === 'production'
      ? 'https://arena-talent-809eb598a3c0.herokuapp.com'
      : 'http://localhost:5002',
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json'
  }
  // maxRedirects: 0 // Prevent following redirects
})

// Add a response interceptor
instance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response) {
      console.error(
        'Response error:',
        error.response.status,
        error.response.data
      )
    } else if (error.request) {
      console.error('Request error:', error.request)
    } else {
      console.error('Error:', error.message)
    }
    return Promise.reject(error)
  }
)

export default instance
