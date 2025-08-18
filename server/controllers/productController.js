import { products } from '../data/products.js'

export const getAllProducts = (req, res) => {
  res.json({ products })
} 