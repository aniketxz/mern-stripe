import Stripe from 'stripe'
import { Order } from '../models/Order.model.js'

export const handleWebhook = async (req, res) => {
  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY)
  const signature = req.headers["stripe-signature"]

  try {
    const event = stripe.webhooks.constructEvent(
      req.body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET
    )

    if (event.type === "payment_intent.succeeded") {
      const paymentIntent = event.data.object

      await Order.findOneAndUpdate(
        { paymentId: paymentIntent.id },
        { status: "paid" }
      )
    }

    if (event.type === "payment_intent.payment_failed") {
      const paymentIntent = event.data.object

      await Order.findOneAndUpdate(
        { paymentId: paymentIntent.id },
        { status: "cancelled" }
      )
    }

    res.json({ received: true })
  } catch (error) {
    console.error("Webhook error: ", error.message)
    res.status(400).send(`Webhook Error: ${error.message}`)
  }
} 