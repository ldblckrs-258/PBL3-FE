import { useParams } from 'react-router-dom'
import { ScheduleType } from '../../types/schedule.types'
import { useEffect, useState } from 'react'
import axios from 'axios'
import {
	Button,
	DropdownSelect,
	Loader,
	SearchBox,
	ToggleButton,
} from '../../components'
import PageNotFound from '../PageNotFound'
import { timeAgo } from '../../utils/TimeFormatters'
import ScheduleOverview from './ScheduleOverview'
import ScheduleDay from './ScheduleDay'
import { PiGearFill, PiMapPinLineFill } from 'react-icons/pi'
import { twMerge } from 'tailwind-merge'

const Schedule: React.FC = () => {
	const { id } = useParams()
	const [schedule, setSchedule] = useState<ScheduleType | undefined>(undefined)
	const [loading, setLoading] = useState(true)
	const [isAddModalOpen, setIsAddModalOpen] = useState(false)

	const handleAddDestination = () => {
		setIsAddModalOpen(false)
		// window.location.reload()
	}
	const getSchedule = async (id: string) => {
		try {
			setSchedule(undefined)
			const response = await axios.get(`/api/schedule/id-${id}.json`)
			// simulate delay
			await new Promise((resolve) => setTimeout(resolve, 2500))
			setSchedule(response.data.data)
			console.log(response.data.data)
		} catch (error) {
			console.error(error)
		}
		setLoading(false)
	}

	useEffect(() => {
		getSchedule(id ?? '')
	}, [id])

	useEffect(() => {
		document.title = (schedule?.title ?? 'Schedules') + ' | Da Nang Explore'
	}, [schedule])

	if (loading)
		return (
			<div className="mx-auto mt-12 flex min-h-screen items-center justify-center xl:max-w-screen-xl">
				<Loader />
			</div>
		)
	else if (!schedule) return <PageNotFound />
	return (
		<div className="relative mx-auto min-h-screen xl:max-w-screen-xl">
			<div className="w-full pb-5 pt-[64px] text-txtCol-1">
				<div className="flex w-full flex-col items-start justify-start gap-2">
					<h2 className="my-2 text-3xl font-bold">{schedule.title}</h2>
					<div className="flex items-center gap-2 text-base">
						<img
							className="h-6 w-6 rounded-full object-cover"
							src={schedule.author.avatar}
							alt="author-avatar"
						/>
						<p>by {schedule.author.name}</p>
						<span className="mx-1 h-[6px] w-[6px] rounded-full bg-txtCol-2"></span>
						<h4 className="font-semibold">Last updated:</h4>
						<p>{timeAgo(schedule.updated_at)}</p>
					</div>
					<p className="text-base">{schedule.description}</p>
				</div>
				<div className="item-start mt-5 flex w-full gap-16">
					<div className="flex flex-1 flex-col items-start gap-4">
						<Button
							className="ml-[100px] h-9 w-[172px] bg-secondary-2 font-semibold text-white hover:bg-secondary-1 "
							onClick={() => setIsAddModalOpen(true)}
						>
							<PiMapPinLineFill className="text-lg" />
							Add destination
						</Button>
						{schedule.details.map((day, index) => (
							<ScheduleDay className="w-full" key={index} scheduleDay={day} />
						))}
					</div>
					<div className="flex w-[300px] flex-col items-end gap-4">
						<Button
							className="h-9 w-[100px] bg-primary-2 font-semibold text-white hover:bg-primary-1"
							onClick={function (): void {
								throw new Error('Function not implemented.')
							}}
						>
							<PiGearFill className="text-lg" />
							Set up
						</Button>
						<ScheduleOverview
							className="w-full"
							numbOfDes={schedule.details.reduce((total, detail) => {
								return total + detail.destinations.length
							}, 0)}
							totalTime={schedule.details.length}
							totalBudget={schedule.details.reduce((totalBudget, detail) => {
								return (
									totalBudget +
									detail.destinations.reduce(
										(total, destination) => total + destination.budget,
										0,
									)
								)
							}, 0)}
						/>
					</div>
				</div>
			</div>
			{isAddModalOpen && (
				<AddDestinationModal
					className="fixed left-0 top-0 z-10 h-screen w-screen"
					onCancel={() => setIsAddModalOpen(false)}
					onAdd={handleAddDestination}
				/>
			)}
		</div>
	)
}

const SortOptions = [
	'Sort by',
	'Rating Ascending',
	'Rating Descending',
	'Price Ascending',
	'Price Descending',
]

type DestinationType = {
	id: number
	name: string
	address: string
	openingTime: string
	closingTime: string
	cost: number
	rating: number
	favorite: boolean
}

const AddDestinationModal: React.FC<{
	className?: string
	onCancel: () => void
	onAdd: () => void
}> = ({ className = '', onCancel, onAdd }) => {
	const [searchValue, setSearchValue] = useState('')
	const [sortIndex, setSortIndex] = useState(0)
	const [isFavorite, setIsFavorite] = useState(false)
	const [destinations, setDestinations] = useState<DestinationType[]>([])

	const getDestinations = async () => {
		try {
			const response = await axios.get('/api/destination/page-1.json')
			setDestinations(response.data.data)
			console.log(response.data.data)
		} catch (error) {
			console.error(error)
		}
	}

	const [scheduleDestination, setScheduleDestination] = useState({
		destination_id: 0,
		date: '',
		arrival_time: '',
		departure_time: '',
	})

	const handleAddDestination = () => {
		if (scheduleDestination.destination_id === 0) {
			window.alert('Please select a destination')
			return
		}

		if (
			scheduleDestination.date === '' ||
			scheduleDestination.arrival_time === '' ||
			scheduleDestination.departure_time === ''
		) {
			window.alert('Please fill in all fields')
			return
		}

		if (
			scheduleDestination.arrival_time >= scheduleDestination.departure_time
		) {
			window.alert('Arrival time must be before departure time')
			return
		}
		onAdd()
		console.log('Add destination:', scheduleDestination)
	}

	useEffect(() => {
		getDestinations()
	}, [])
	return (
		<div
			className={`flex items-center justify-center bg-[#0000004b] ${className}`}
		>
			<div className="flex w-[1000px] flex-col items-center gap-4 rounded-xl bg-white p-5">
				<h3 className="text-xl font-semibold">Add destination to schedule</h3>
				<div className="flex w-full items-center justify-between">
					<SearchBox
						className="h-8 w-[200px]"
						onChangeValue={(event) => {
							setSearchValue(event.target.value)
						}}
						onClickSearch={() => {
							console.log('Searching for:', searchValue)
						}}
					/>
					<div className="flex items-center gap-4">
						<ToggleButton
							onClick={() => {
								setIsFavorite(!isFavorite)
							}}
							text="Favorite"
							toggledText="All"
							initToggled={true}
							btnColor={'#64B8DC'}
							className="h-8 w-[80px]"
						></ToggleButton>
						<DropdownSelect
							id={''}
							className="h-8 w-[172px]"
							options={SortOptions}
							value={sortIndex}
							onChange={(event) => {
								setSortIndex(Number(event.target.value))
							}}
						></DropdownSelect>
					</div>
				</div>
				<div className="w-full rounded border border-borderCol-1 py-2 pr-1">
					<div className="flex w-full items-center gap-2 pr-3 text-center text-sm font-semibold">
						<div className="w-[212px]">Destination name</div>
						<div className="flex-1">Address</div>
						<div className="w-[92px]">Open time</div>
						<div className="w-[92px]">Close time</div>
						<div className="w-[84px]">Avg. cost</div>
						<div className="w-[84px]">Avg. rating</div>
					</div>
					<div className="h-[400px] overflow-y-auto pt-2">
						{destinations?.map((destination, index) => (
							<div
								key={destination.id}
								className={twMerge(
									`flex w-full items-center gap-2 py-2 pl-2 text-center text-sm ${index % 2 === 0 ? 'bg-[#0000000d]' : 'bg-white'} ${scheduleDestination.destination_id === destination.id && 'bg-[#2898c82a] font-semibold'}`,
								)}
								onClick={() => {
									setScheduleDestination({
										...scheduleDestination,
										destination_id: destination.id,
									})
								}}
							>
								<a
									className={`line-clamp-1 w-[212px] text-left hover:text-primary-1 hover:underline`}
									title={destination.name}
									href={`/destination/${destination.id}`}
									target="_blank"
								>
									{destination.name}
								</a>
								<div
									className="line-clamp-1 flex-1 text-left"
									title={destination.address}
								>
									{destination.address}
								</div>
								<div className="w-[92px]">{destination.openingTime}</div>
								<div className="w-[92px]">{destination.closingTime}</div>
								<div className="w-[84px]">${destination.cost}</div>
								<div className="w-[84px]">{destination.rating}</div>
							</div>
						))}
					</div>
				</div>
				<div className="flex w-full justify-between">
					<div className="flex items-center gap-3 text-sm">
						<div className="font-semibold">Date</div>
						<input
							className="h-8 bg-bgCol-1"
							type="date"
							value={scheduleDestination.date}
							onChange={(event) =>
								setScheduleDestination({
									...scheduleDestination,
									date: event.target.value,
								})
							}
						/>
						<div className="ml-2 font-semibold">Arrival time</div>
						<input
							className="h-8 bg-bgCol-1"
							type="time"
							value={scheduleDestination.arrival_time}
							onChange={(event) =>
								setScheduleDestination({
									...scheduleDestination,
									arrival_time: event.target.value,
								})
							}
						/>
						<div className="ml-2 font-semibold">Departure time</div>
						<input
							className="h-8 bg-bgCol-1"
							type="time"
							value={scheduleDestination.departure_time}
							onChange={(event) =>
								setScheduleDestination({
									...scheduleDestination,
									departure_time: event.target.value,
								})
							}
						/>
					</div>
					<div className="flex items-center gap-5">
						<Button
							className="h-8 w-[100px] border-[2px] border-tertiary-1 text-tertiary-1 hover:bg-[#e75b5125]"
							onClick={onCancel}
						>
							Cancel
						</Button>
						<Button
							className="h-8 w-[100px] bg-primary-2 text-white hover:bg-primary-1"
							onClick={handleAddDestination}
						>
							Add
						</Button>
					</div>
				</div>
			</div>
		</div>
	)
}

export default Schedule
