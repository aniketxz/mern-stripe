import { useCartStore } from "../store/cartStore"

const Cart = () => {
  const cartItems = useCartStore((s) => s.cartItems)
  const addToCart = useCartStore((s) => s.addToCart)
  const removeFromCart = useCartStore((s) => s.removeFromCart)
  const clearCart = useCartStore((s) => s.clearCart)
  const getCartTotalMinor = useCartStore((s) => s.getCartTotalMinor)

  const totalMinor = getCartTotalMinor()

  return (
    <div className='px-6 pb-12 max-w-5xl'>
      <h2 className='text-3xl font-semibold mb-6'>Your Cart</h2>
      {cartItems.length === 0 ? (
        <div className='text-gray-400'>Your cart is empty.</div>
      ) : (
        <div className='space-y-4 max-w-4xl mx-auto'>
          {cartItems.map((item) => {
            const { id, name, price, image, quantity } = item
            const lineTotal = price * quantity
            return (
              <div
                key={id}
                className='flex items-center justify-between bg-gray-800/50 border border-emerald-900 rounded-lg p-4'
              >
                <div className='flex items-center gap-4'>
                  <img
                    src={image}
                    alt={name}
                    className='w-20 h-16 object-cover rounded'
                  />
                  <div>
                    <div className='font-medium'>{name}</div>
                    <div className='text-sm text-gray-400'>
                      ${(price / 100).toFixed(2)} each
                    </div>
                  </div>
                </div>
                <div className='flex items-center gap-3'>
                  <button
                    className='size-8 bg-gray-700 rounded-full flex items-center justify-center'
                    onClick={() => removeFromCart(id)}
                  >
                    -
                  </button>
                  <span>{quantity}</span>
                  <button
                    className='size-8 bg-gray-700 rounded-full flex items-center justify-center'
                    onClick={() => addToCart(item)}
                  >
                    +
                  </button>
                </div>
                <div className='w-28 text-right font-semibold text-emerald-400'>
                  ${(lineTotal / 100).toFixed(2)}
                </div>
              </div>
            )
          })}

          <div className='flex items-center justify-between pt-4 border-t border-emerald-900'>
            <div className='text-lg'>Total</div>
            <div className='text-xl font-semibold text-emerald-400'>
              ${(totalMinor / 100).toFixed(2)}
            </div>
          </div>

          <div className='flex justify-end items-center gap-3'>
            <button className='gray-button' onClick={clearCart}>
              Clear Cart
            </button>
            <button
              className='green-button'
              onClick={() => {
                /* integrate in next step */
              }}
            >
              Proceed to Checkout
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

export default Cart
