import { Link } from "react-router-dom"
import { useCartStore } from "../store/cartStore"

const Navbar = () => {
  const itemCount = useCartStore((s) => s.getItemCount())

  return (
    <header className='fixed top-0 left-0 w-full bg-gray-900/10 backdrop-blur-md border-b border-emerald-800'>
      <div className='flex flex-wrap justify-between items-center px-4 py-3'>
        <Link
          to={"/"}
          className='text-2xl font-bold text-gray-300 hover:text-emerald-400 transition duration-700 ease-in-out'
        >
          SnapShop
        </Link>

        <div className='flex flex-wrap items-center gap-4'>
          <Link
            to={"/"}
            className='text-gray-300 hover:text-emerald-400 transition duration-300 ease-in-out'
          >
            Home
          </Link>
          <Link
            to={"/cart"}
            className='text-gray-300 hover:text-emerald-400 transition duration-300 ease-in-out relative'
          >
            Cart
            {itemCount > 0 && (
              <span className='absolute -top-2 -right-3 text-xs bg-emerald-500/50 text-white font-semibold px-2 py-0.5 rounded-full'>
                {itemCount}
              </span>
            )}
          </Link>
        </div>
      </div>
    </header>
  )
}

export default Navbar
