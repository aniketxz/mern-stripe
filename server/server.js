import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import productRoutes from './routes/product.route.js'
import connectDB from './config/db.js'

dotenv.config()

const app = express()
app.use(cors({ origin: process.env.CLIENT_URL }))
app.use(express.json())

// Checking if server is running
app.get('/', (req, res) => {
	res.json({ message: 'API is running...' })
})

app.use('/api/products', productRoutes)

// Connect DB
connectDB()

// Run server
const PORT = process.env.PORT || 5000
app.listen(PORT, () => console.log(`Server running on port ${PORT}!`))
