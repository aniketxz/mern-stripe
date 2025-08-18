import express from "express"
import { createOrder, getOrderById } from '../controllers/orderController.js'

const router = express.Router()

// create order & paymentIntent
router.post("/", createOrder)

// get order by id
router.get("/:id", getOrderById)

export default router