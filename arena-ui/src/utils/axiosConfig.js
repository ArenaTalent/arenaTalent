import axios from 'axios'

const instance = axios.create({
  baseURL:
    'https://arena-talent-809eb598a3c0.herokuapp.com' ||
    'http://localhost:5002',
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json'
  }
})

export default instance
