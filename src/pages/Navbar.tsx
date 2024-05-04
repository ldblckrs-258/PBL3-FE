import { useLocation, Link } from 'react-router-dom'
import userAvatar from '../assets/user-avatar.png'
import { motion, useScroll, useMotionValueEvent } from 'framer-motion'
import {
	PiCaretDownBold,
	PiHouseBold,
	PiCompassBold,
	PiArticleBold,
	PiCalendarBlankBold,
} from 'react-icons/pi'
import { useState } from 'react'

const NavItems = [
	{
		name: 'Home',
		icon: PiHouseBold,
		path: '/',
	},
	{
		name: 'Destination',
		icon: PiCompassBold,
		path: '/destination',
	},
	{
		name: 'Blog',
		icon: PiArticleBold,
		path: '/blog',
	},
	{
		name: 'Schedule',
		icon: PiCalendarBlankBold,
		path: '/schedule',
	},
]

const Navbar: React.FC = () => {
	const location = useLocation()
	const firstPath = '/' + location.pathname.split('/')[1]
	const [hidden, setHidden] = useState(false)
	const { scrollY } = useScroll()

	useMotionValueEvent(scrollY, 'change', (latest) => {
		const previous = scrollY.getPrevious() as number
		if (latest > previous && latest > 100) setHidden(true)
		else setHidden(false)
	})

	return (
		<motion.nav
			variants={{
				visible: { y: 0 },
				hidden: { y: '-100%' },
			}}
			animate={hidden ? 'hidden' : 'visible'}
			transition={{ duration: 0.35, ease: 'easeInOut' }}
			className="fixed left-0 top-0 z-10 flex h-12 w-full justify-center bg-bgCol-2 shadow-md"
		>
			<div className="my-auto flex h-10 w-full items-center justify-between xl:max-w-screen-xl">
				<div className="h-full w-[200px]">
					<Link
						className="cursor-pointer select-none text-xl font-bold leading-10 text-primary-1"
						to="/"
					>
						Da Nang Explore
					</Link>
				</div>
				<div className="h-full">
					<ul className="flex h-full gap-1">
						{NavItems.map((item, index) => (
							<li key={index}>
								<Link
									to={item.path}
									className={`relative flex min-w-[120px] items-center justify-center gap-2 px-3 text-base ${
										firstPath === item.path ? 'text-primary-1' : 'text-txtCol-3'
									} rounded-lg transition-all hover:bg-[#eeeeee]`}
								>
									<item.icon />
									<p
										className={`${
											firstPath === item.path
												? 'text-txtCol-1'
												: 'text-txtCol-3'
										} text-sm font-semibold leading-10`}
									>
										{item.name}
									</p>
									<span
										className={`absolute bottom-[-4px] h-[2px] w-full bg-primary-2 ${firstPath === item.path ? 'block' : 'hidden'}`}
									></span>
								</Link>
							</li>
						))}
					</ul>
				</div>
				<div className="flex w-[200px] items-center justify-end gap-4">
					<p className="text-sm font-semibold">dev01d</p>
					<button className="relative h-8 w-8 rounded-full">
						<img
							className="h-full w-full rounded-full object-cover"
							src={userAvatar}
							alt="User Avatar"
						/>
						<span className="absolute bottom-[-3px] right-[-3px] rounded-full bg-bgCol-2">
							<div className=" mx-[2px] my-[2px] rounded-[inherit] bg-[#dddddd] px-[1px] py-[1px] text-xs">
								<PiCaretDownBold />
							</div>
						</span>
					</button>
				</div>
			</div>
		</motion.nav>
	)
}

export default Navbar
