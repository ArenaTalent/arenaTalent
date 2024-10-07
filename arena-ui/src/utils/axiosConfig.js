import axios from 'axios'

const instance = axios.create({
  baseURL: process.env.REACT_APP_BACKEND_URL || 'http://localhost:5002', // Uses correct env variable for the backend
  withCredentials: true // Allows credentials (like cookies) to be sent with requests
})

export default instance
