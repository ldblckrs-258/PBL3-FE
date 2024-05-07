import { PiCaretRightBold } from 'react-icons/pi'
import { twMerge } from 'tailwind-merge'
import Stars from '../../components/Stars'
import { Button } from '../../components/Buttons'
import { useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react'
import axios from 'axios'
import { AnimatePresence, motion } from 'framer-motion'

type HomeDestinationsProps = {
	className?: string
}

type HomeDestinationType = {
	id: number
	name: string
	address: string
	rating: number
	thumbnail: string
}

const HomeDestinations: React.FC<HomeDestinationsProps> = ({ className }) => {
	const navigate = useNavigate()
	const [destinations, setDestinations] = useState<HomeDestinationType[]>([])
	const [sliderIndex, setSliderIndex] = useState(1)
	const getHomeDestinations = async () => {
		try {
			const response = await axios.get('/api/destination/home-des.json')
			setDestinations(response.data.data)
		} catch (error) {
			console.error(error)
		}
	}

	useEffect(() => {
		getHomeDestinations()
	}, [])

	useEffect(() => {
		const interval = setInterval(() => {
			setSliderIndex((prev) => (prev + 1) % destinations.length)
		}, 5000)
		return () => clearInterval(interval)
	}, [sliderIndex, destinations.length])
	return (
		<div className={twMerge(`${className}`)}>
			<div className="flex h-6 w-full items-center justify-between">
				<h3 className="text-xl font-semibold leading-normal tracking-wide">
					Hot destinations
				</h3>
				<div className="flex cursor-pointer items-center justify-start gap-2 hover:text-primary-1 hover:underline">
					<h4 className="text-base font-normal leading-none">View more</h4>
					<PiCaretRightBold />
				</div>
			</div>
			<div className="relative mt-3 h-[400px] w-full overflow-hidden rounded-lg">
				<AnimatePresence>
					<motion.img
						key={destinations[sliderIndex]?.id}
						className="h-full w-full rounded object-cover"
						src={destinations[sliderIndex]?.thumbnail}
						alt={`image ${sliderIndex}`}
						initial={{ opacity: 0 }}
						animate={{ opacity: 1 }}
						exit={{
							zIndex: -1,
							position: 'absolute',
							opacity: 0,
						}}
						transition={{ duration: 1 }}
					/>
				</AnimatePresence>

				<div className="absolute left-0 top-0 flex h-full w-full flex-col items-center justify-between bg-[#00000075] p-5">
					<div className="flex w-full items-start justify-between">
						<div>
							<h4 className="text-lg font-semibold text-white">
								{destinations[sliderIndex]?.name}
							</h4>
							<p className=" text-base text-white opacity-80">
								{destinations[sliderIndex]?.address}
							</p>
							<Stars rating={4.7} className="mt-2 text-xl" />
						</div>
						<Button
							className="w-[120px] rounded-full border-2 border-white text-white hover:bg-[#ffffff30]"
							onClick={() =>
								navigate(`/destination/${destinations[sliderIndex]?.id}`)
							}
						>
							View details
						</Button>
					</div>
					<SliderNav
						count={destinations.length}
						current={sliderIndex}
						onClick={(index) => setSliderIndex(index)}
					></SliderNav>
				</div>
			</div>
		</div>
	)
}

const SliderNav: React.FC<{
	count: number
	current: number
	onClick: (index: number) => void
}> = ({ count, current, onClick }) => {
	return (
		<div className="flex w-full items-center justify-center gap-2 rounded-[inherit] text-base">
			{Array.from({ length: count }).map((_, index) => (
				<button
					key={index}
					className={` h-2 rounded-full transition-all duration-1000 hover:bg-primary-3 ${
						current === index ? 'w-10 bg-white' : ' w-2 bg-borderCol-1'
					}`}
					onClick={() => onClick(index)}
				></button>
			))}
		</div>
	)
}

export default HomeDestinations
