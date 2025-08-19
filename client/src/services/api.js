import axios from 'axios'

const api = axios.create({
  baseURL: `${import.meta.env.VITE_API_URL || 'http://localhost:5000'}/api`,
  headers: {
    'Content-Type': 'application/json',
  },
})

export const apiService = {
  getProducts: async () => {
    const response = await api.get('/products')
    return response.data
  },

  createOrder: async (products) => {
    const response = await api.post('/orders', { products })
    return response.data
  },

  getOrder: async (orderId) => {
    const response = await api.get(`/orders/${orderId}`)
    return response.data
  },
}

api.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error('API Error:', error.response?.data || error.message)
    return Promise.reject(error)
  }
)

export default api 