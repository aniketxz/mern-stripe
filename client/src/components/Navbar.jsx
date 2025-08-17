import { Link } from 'react-router-dom'

const Navbar = () => {
	return (
		<header className='fixed top-0 left-0 w-full bg-gray-900/10 backdrop-blur-md border-b border-emerald-800'>
			<div className='flex flex-wrap justify-between items-center px-4 py-3'>
				<Link
					to={'/'}
					className='text-2xl font-bold text-gray-300 hover:text-emerald-400 transition duration-700 ease-in-out'
				>
					SnapShop
				</Link>

				<div className='flex flex-wrap items-center gap-4'>
					<Link
						to={'/'}
						className='text-gray-300 hover:text-emerald-400 transition duration-300 ease-in-out'
					>
						Home
					</Link>
					<Link
						to={'/cart'}
						className='text-gray-300 hover:text-emerald-400 transition duration-300 ease-in-out'
					>
						Cart
					</Link>
				</div>
			</div>
		</header>
	)
}

export default Navbar
