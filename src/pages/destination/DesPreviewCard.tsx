import {
	PiClock,
	PiClockAfternoonFill,
	PiHeart,
	PiHeartFill,
	PiStarFill,
} from 'react-icons/pi'
import { useState } from 'react'

type DesPreviewCardProps = {
	className?: string
	name: string
	location: string
	rating: number
	cost: number
	openTime: string
	closeTime: string
	thumbnail: string
	tags: string[]
	pin?: string
	favorite?: boolean
}

const DesPreviewCard: React.FC<DesPreviewCardProps> = ({
	className = '',
	name,
	location,
	rating,
	cost,
	openTime,
	closeTime,
	thumbnail,
	tags,
	pin,
	favorite,
}) => {
	const [favor, setFavorite] = useState(favorite)
	return (
		<div
			className={`border-borderCol-1 relative flex min-h-10 w-[300px] cursor-pointer flex-col flex-nowrap items-start rounded-[8px] border bg-[#fff] p-3 ${className}`}
		>
			<img
				src={thumbnail}
				alt={name}
				className="aspect-[16/9] w-full rounded object-cover"
			/>
			<div className="my-2 flex w-full overflow-hidden">
				<div className="flex flex-1 flex-col items-start overflow-hidden">
					<h3 className="overflow-hidden text-ellipsis whitespace-nowrap text-base font-semibold">
						{name}
					</h3>
					<p className="overflow-hidden text-ellipsis whitespace-nowrap text-xs">
						{location}
					</p>
				</div>
				<button
					className="h-[30px] text-3xl"
					onClick={() => setFavorite(!favor)}
				>
					{favor ? (
						<PiHeartFill className=" text-tertiary-1" />
					) : (
						<PiHeart className=" hover:text-tertiary-2" />
					)}
				</button>
			</div>
			<div className="mb-1 flex w-full items-center">
				<div className="flex flex-1 items-center gap-1 text-sm font-semibold">
					<p className=" text-txtCol-2">Rating: </p>
					<p>{rating}</p>
					<PiStarFill />
				</div>
				<div className="flex flex-1 items-center gap-1 text-sm font-semibold">
					<p className="text-txtCol-2">Avg. Cost: </p>
					<p className="text-base">$</p>
					<p>{cost}</p>
				</div>
			</div>
			<div className="mb-2 flex w-full items-center text-sm">
				<div className="flex flex-1 items-center gap-1">
					<PiClock />
					<p>Open: {openTime}</p>
				</div>
				<div className="flex flex-1 items-center gap-1">
					<PiClockAfternoonFill />
					<p>Close: {closeTime}</p>
				</div>
			</div>
			<div className="flex w-full items-center gap-2 overflow-hidden">
				{tags &&
					tags.map((tag, index) => (
						<div
							key={index}
							className="border-borderCol-1 rounded-full border px-2 py-1 text-xs"
						>
							{tag}
						</div>
					))}
			</div>
			{pin && (
				<div className="absolute right-4 top-4 flex items-center gap-1 rounded-full bg-[#1d1c28af] px-3 py-0.5 text-[10px] text-white">
					<div
						className={`h-1.5 w-1.5 rounded-full ${pin == 'Hot' ? 'bg-tertiary-1' : ''} ${pin == 'New' ? 'bg-secondary-1' : ''} ${pin == 'Recommend' ? 'bg-primary-1' : ''}`}
					></div>
					{pin}
				</div>
			)}
		</div>
	)
}

export default DesPreviewCard
