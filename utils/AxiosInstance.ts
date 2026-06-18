import axios from 'axios'
import { applyInterceptors } from './Interceptors'

const api = axios.create({
  baseURL: 'https://moahmmed24-001-site1.ctempurl.com',
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
  withCredentials: true,
})

applyInterceptors(api)

export default api
