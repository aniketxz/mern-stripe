import Stripe from 'stripe'
import { Order } from '../models/Order.model.js'

// create order & paymentIntent
export const createOrder = async (req, res) => {
  try {
    const stripe = new Stripe(process.env.STRIPE_SECRET_KEY)
    const { products } = req.body

    const totalAmount = products.reduce((sum, item) => sum + item.price * item.quantity, 0)

    const order = await Order.create({
      products,
      totalAmount,
      status: "pending"
    })

    // creating stripe payment intent
    const paymentIntent = await stripe.paymentIntents.create({
      amount: totalAmount, // in cents
      currency: "usd", // hardcoding this
      metadata: { orderId: order._id.toString() }
    })

    order.paymentId = paymentIntent.id
    await order.save()

    res.json({
      clientSecret: paymentIntent.client_secret,
      orderId: order._id
    })
  } catch (error) {
    console.error("Error creating object: ", error)
    res.status(500).json({ error: "Failed to create order!" })
  }
}

// get order by id
export const getOrderById = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id)
    if (!order) return res.status(404).json({ error: "Order not found!" })
    res.json(order)
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch order!" })
  }
} 