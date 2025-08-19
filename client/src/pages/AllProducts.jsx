import { useEffect, useState } from "react"
import { apiService } from "../services/api"
import { useCartStore } from "../store/cartStore"

const AllProducts = () => {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")
  const addToCart = useCartStore((s) => s.addToCart)

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const data = await apiService.getProducts()
        setProducts(data.products || [])
      } catch (err) {
        setError("Failed to load products")
        console.log(err.message)
      } finally {
        setLoading(false)
      }
    }

    fetchProducts()
  }, [])

  if (loading) return <div className='p-6'>Loading products...</div>
  if (error) return <div className='p-6 text-red-400'>{error}</div>

  return (
    <div className='px-6 pb-12'>
      <h2 className='text-3xl font-semibold mb-6'>All Products</h2>
      <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6'>
        {products.map((p) => (
          <div
            key={p.id}
            className='bg-gray-800/50 border border-emerald-900 rounded-lg overflow-hidden flex flex-col'
          >
            <img
              src={p.image}
              alt={p.name}
              className='h-48 w-full object-cover'
            />
            <div className='p-4 flex-1 flex flex-col'>
              <h3 className='text-xl font-medium'>{p.name}</h3>
              <p className='text-gray-400 text-sm flex-1'>{p.description}</p>
              <div className='mt-4 flex items-center justify-between'>
                <span className='text-emerald-400 font-semibold'>
                  ${(p.price / 100).toFixed(2)}
                </span>
                <button
                  onClick={() => addToCart(p)}
                  className='green-button cursor-pointer'
                >
                  Add to Cart
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default AllProducts
