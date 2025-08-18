import dotenv from 'dotenv'
import express from 'express'
import cors from 'cors'
import connectDB from './config/db.js'

import webhookRoutes from './routes/webhook.route.js'
import orderRoutes from './routes/order.route.js'
import productRoutes from './routes/product.route.js'

dotenv.config()
const app = express()
const PORT = process.env.PORT || 5000

connectDB()

app.use(cors({ origin: process.env.CLIENT_URL }))

app.use('/api/webhook', webhookRoutes)

app.use(express.json())
app.use('/api/products', productRoutes)
app.use('/api/orders', orderRoutes)

// Run server
app.listen(PORT, () => {
	console.log(`Server running on port ${PORT}!`)
})
