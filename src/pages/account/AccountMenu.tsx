import { motion } from 'framer-motion'
import { twMerge } from 'tailwind-merge'
import { UserContext, defaultUser } from '../../context/UserContext'
import { useContext } from 'react'
import {
	PiHardDrivesFill,
	PiMapPinFill,
	PiSignOutBold,
	PiUserFill,
} from 'react-icons/pi'
import { Link } from 'react-router-dom'

const AccountMenu: React.FC<{
	className?: string
	onClose: () => void
}> = ({ className = '', onClose }) => {
	const { user, setUser } = useContext(UserContext)
	const handleSignOut = () => {
		sessionStorage.removeItem('user')
		setUser(defaultUser.user)
		onClose()
		window.location.reload()
	}

	return (
		<motion.div
			className={twMerge(
				'shadow-modal w-[280px] select-none rounded-lg bg-white px-3 pb-2 pt-4',
				className,
			)}
			initial={{ opacity: 0, y: '100%' }}
			animate={{ opacity: 1, y: '105%' }}
			exit={{ opacity: 0, y: '100%' }}
		>
			<p className="mb-1 line-clamp-1 select-text px-2 text-right text-sm text-primary-1">
				{user.email}
			</p>
			<Link
				className="flex cursor-pointer items-center rounded py-2 pl-2 pr-1 transition-all hover:bg-gray-100 active:bg-gray-200"
				to="/account"
				onClick={onClose}
			>
				<div className="flex h-8 w-8 items-center justify-center rounded-full bg-gray-300 text-xl">
					<PiUserFill />
				</div>
				<p className="ml-4 flex-1 text-sm font-semibold">My Account</p>
			</Link>
			<div className="flex cursor-pointer items-center rounded py-2 pl-2 pr-1 transition-all hover:bg-gray-100 active:bg-gray-200">
				<div className="flex h-8 w-8 items-center justify-center rounded-full bg-gray-300 text-xl">
					<PiMapPinFill />
				</div>
				<p className="ml-4 flex-1 text-sm font-semibold">
					Favorite Destinations
				</p>
			</div>
			<div className="flex cursor-pointer items-center rounded py-2 pl-2 pr-1 transition-all hover:bg-gray-100 active:bg-gray-200">
				<div className="flex h-8 w-8 items-center justify-center rounded-full bg-gray-300 text-xl">
					<PiHardDrivesFill />
				</div>
				<p className="ml-4 flex-1 text-sm font-semibold">My Blogs</p>
			</div>
			<div className="my-1 h-[1px] w-full bg-borderCol-1"></div>
			<button
				className="flex w-full items-center rounded py-2 pl-2 pr-1 transition-all hover:bg-gray-100 active:bg-gray-200"
				onClick={handleSignOut}
			>
				<div className="flex h-8 w-8 items-center justify-center rounded-full bg-gray-300 text-xl">
					<PiSignOutBold />
				</div>
				<p className="ml-4 flex-1 text-left text-sm font-semibold">Sign Out</p>
			</button>
		</motion.div>
	)
}

export default AccountMenu
