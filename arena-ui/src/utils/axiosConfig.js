import axios from 'axios'

const instance = axios.create({
  baseURL: process.env.REACT_APP_BACKEND_URL || 'http://localhost:5002',
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json'
  }
})

export default instance
