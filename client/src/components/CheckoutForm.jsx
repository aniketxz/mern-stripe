import { PaymentElement, useElements, useStripe } from "@stripe/react-stripe-js"
import { useNavigate } from "react-router-dom"
import { useCartStore } from "../store/cartStore"

const CheckoutForm = ({ setError, setLoading, loading }) => {
  const stripe = useStripe()
  const elements = useElements()
  const navigate = useNavigate()
  const clearCart = useCartStore((s) => s.clearCart)

  const handleConfirmPayment = async () => {
    if (!stripe || !elements) return
    setLoading(true)
    const { error, paymentIntent } = await stripe.confirmPayment({
      elements,
      redirect: "if_required",
    })
    if (error) {
      setError(error.message || "Payment failed")
      setLoading(false)
      navigate(`/payment-failed`)
      return
    }
    if (paymentIntent && paymentIntent.status === "succeeded") {
      navigate(`/payment-success`)
      clearCart()
      return
    }
    if (paymentIntent && paymentIntent.status === "processing") {
      navigate(`/payment-success`)
      return
    }
    setError("Payment failed, please try again.")
    setLoading(false)
    navigate(`/payment-failed`)
  }

  return (
    <div className='space-y-4 max-w-md'>
      <PaymentElement />
      <div className='flex justify-end'>
        <button
          className='green-button'
          onClick={handleConfirmPayment}
          disabled={!stripe || !elements || loading}
        >
          {loading ? "Confirming..." : "Pay now"}
        </button>
      </div>
    </div>
  )
}

export default CheckoutForm
