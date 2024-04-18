import { useLocation, Link } from 'react-router-dom'
import userAvatar from '../assets/user-avatar.png'
import {
	PiCaretDownBold,
	PiHouseBold,
	PiCompassBold,
	PiArticleBold,
	PiCalendarBlankBold,
} from 'react-icons/pi'

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

export default function Navbar() {
	const location = useLocation()
	return (
		<nav className="bg-bgCol-2 fixed left-0 top-0 z-10 flex h-14 w-full justify-center shadow-md">
			<div className="my-auto flex h-10 w-full items-center justify-between xl:max-w-screen-xl">
				<div className="h-full w-[200px]">
					<Link
						className="text-primary-1 cursor-pointer select-none text-xl font-bold leading-10"
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
									className={`relative flex min-w-[120px] items-center justify-center gap-2 px-3 text-lg  ${
										location.pathname === item.path
											? 'text-primary-1'
											: 'text-txtCol-3'
									} rounded-lg transition-all hover:bg-[#eeeeee]`}
								>
									<item.icon />
									<p
										className={`${
											location.pathname === item.path
												? 'text-txtCol-1'
												: 'text-txtCol-3'
										} text-base font-semibold leading-10`}
									>
										{item.name}
									</p>
									<span
										className={`bg-primary-2 absolute bottom-[-8px] h-[2px] w-full ${location.pathname === item.path ? 'block' : 'hidden'}`}
									></span>
								</Link>
							</li>
						))}
					</ul>
				</div>
				<div className="flex w-[200px] items-center justify-end gap-4">
					<p className=" font-semibold">dev01d</p>
					<button className="relative h-10 w-10 rounded-full">
						<img
							className="h-full w-full rounded-full object-cover"
							src={userAvatar}
							alt="User Avatar"
						/>
						<span className="bg-bgCol-2 absolute bottom-[-3px] right-[-3px] rounded-full">
							<div className=" mx-[2px] my-[2px] rounded-[inherit] bg-[#dddddd] px-[1px] py-[1px] text-xs">
								<PiCaretDownBold />
							</div>
						</span>
					</button>
				</div>
			</div>
		</nav>
	)
}
