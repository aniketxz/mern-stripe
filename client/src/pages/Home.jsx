import { Link } from 'react-router-dom'

const Home = () => {
  return (
    <div>
      <main className='min-h-screen flex justify-center items-center flex-col gap-6'>
        <h1 className='text-5xl font-semibold'>Welcome to SnapShop</h1>
        <Link to='/products' className='green-button'>All Products</Link>
      </main>
    </div>
  )
}

export default Home