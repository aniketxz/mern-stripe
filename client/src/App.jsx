import { Route, Routes } from "react-router-dom"
import Home from "./pages/Home"
import AllProducts from "./pages/AllProducts"
import Navbar from "./components/Navbar"
import Cart from "./pages/Cart"
import PaymentSuccess from "./pages/PaymentSuccess"
import PaymentFailed from "./pages/PaymentFailed"

function App() {
  return (
    <div className='min-h-screen bg-gray-900 text-white relative overflow-hidden'>
      {/* Background gradient */}
      <div className='absolute inset-0 overflow-hidden'>
        <div className='absolute inset-0'>
          <div className='absolute top-0 left-1/2 -translate-x-1/2 w-full h-full bg-[radial-gradient(ellipse_at_top,rgba(16,185,129,0.3)_0%,rgba(10,80,60,0.2)_45%,rgba(0,0,0,0.1)_100%)]' />
        </div>
      </div>

      <div className='relative z-50 pt-20'>
        <Navbar />
        <Routes>
          <Route index element={<Home />} />
          <Route path='/products' element={<AllProducts />} />
          <Route path='/cart' element={<Cart />} />
          <Route path='/payment-success' element={<PaymentSuccess />} />
          <Route path='/payment-failed' element={<PaymentFailed />} />
        </Routes>
      </div>
    </div>
  )
}

export default App
