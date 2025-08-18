import mongoose from "mongoose"

const orderSchema = new mongoose.Schema(
  {
    products: [
      {
        productId: { type: String, required: true },
        quantity: { type: Number, required: true, min: 1 },
        price: { type: Number, required: true },
      },
    ],
    totalAmount: { type: Number, required: true },
    status: {
      type: String,
      enum: ["pending", "paid", "cancelled"],
      default: "pending",
    },
    paymentId: { type: String },
  },
  { timestamps: true }
)

export const Order = mongoose.model("Order", orderSchema)
