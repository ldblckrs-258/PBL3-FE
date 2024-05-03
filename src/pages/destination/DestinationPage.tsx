import { useState, useEffect } from 'react'
import DropdownSelect from '../../components/DropdownSelect'
import SearchBox from '../../components/SearchBox'
import DesPreviewCard, { DPCLoading } from './DesPreviewCard'
import axios from 'axios'
import Pagination from '../../components/Pagination'

const filterOptions = [
	{
		name: 'Location',
		options: [
			'All',
			'Hải Châu',
			'Cẩm Lệ',
			'Thanh Khê',
			'Liên Chiểu',
			'Ngũ Hành Sơn',
			'Sơn Trà',
			'Hòa Vang',
			'Hoàng Sa',
		],
	},
	{
		name: 'Type',
		options: ['All', 'Nature', 'Culture', 'Entertainment', 'Accommodation'],
	},
	{
		name: 'Others',
		options: ['Hot destination', 'New destination', 'Recommended'],
	},
]

type DestinationType = {
	name: string
	address: string
	openingHours: string
	closingHours: string
	averageCost: number
	rating: number
	tags: string[]
	thumbnail: string
	pin: string
	favorite: boolean
}

const sortOptions = ['Sort by', 'Price', 'Rating']

const DestinationPage: React.FC = () => {
	const [destinations, setDestinations] = useState<DestinationType[]>()
	const [searchValue, setSearchValue] = useState('')
	const [filter, setFilter] = useState({
		location: 0,
		type: 0,
		price: {
			min: 0,
			max: 100,
		},
		rating: {
			min: 0,
			max: 5,
		},
		hot: false,
		new: false,
		rcm: false,
		others: -1,
	})
	const [sort, setSort] = useState(0)
	const [currentPage, setCurrentPage] = useState(1)
	useEffect(() => {
		getDestinations(currentPage)
	}, [currentPage])

	const getDestinations = async (page: number) => {
		try {
			setDestinations(undefined)
			const response = await axios.get(`/api/destination.page${page}.json`)
			// simulate delay
			await new Promise((resolve) => setTimeout(resolve, 1000))
			setDestinations(response.data.data)
		} catch (error) {
			console.error(error)
		}
	}
	return (
		<div className="mx-auto flex min-h-screen justify-center pb-6 pt-20 text-txtCol-1 xl:max-w-screen-xl">
			<div className="flex h-full w-full justify-start gap-8">
				<div className="sticky top-0 h-auto w-[280px] pt-14">
					{filterOptions[0] && (
						<div className="mb-4 flex w-full flex-col gap-2">
							<label htmlFor={`filter_0`}>{filterOptions[0].name}</label>
							<DropdownSelect
								id={`filter_0`}
								className="w-full"
								options={filterOptions[0].options}
								value={filter.location}
								onChange={(event) => {
									setFilter({
										...filter,
										location: Number(event.target.value),
									})
								}}
							/>
						</div>
					)}

					{filterOptions[1] && (
						<div className="mb-4 flex w-full flex-col gap-2">
							<label htmlFor={`filter_1`}>{filterOptions[1].name}</label>
							<DropdownSelect
								id={`filter_1`}
								className="w-full"
								options={filterOptions[1].options}
								value={filter.type}
								onChange={(event) => {
									setFilter({
										...filter,
										type: Number(event.target.value),
									})
								}}
							/>
						</div>
					)}

					<div className="mb-4 flex flex-col gap-2">
						<label>Price</label>
						<div className="mb-3 flex w-full items-center justify-start gap-2 text-sm text-txtCol-2">
							<p>From $</p>
							<input
								className="w-[92px]"
								type="number"
								placeholder="0"
								min={0}
								max={filter.price.max}
								onChange={(event) => {
									setFilter({
										...filter,
										price: {
											...filter.price,
											min: Number(event.target.value),
										},
									})
								}}
							/>
							<p>to $</p>
							<input
								className="w-[92px]"
								type="number"
								placeholder="100"
								min={filter.price.min}
								onChange={(event) => {
									setFilter({
										...filter,
										price: {
											...filter.price,
											max: Number(event.target.value),
										},
									})
								}}
							/>
						</div>
					</div>
					<div className="mb-4 flex flex-col gap-2">
						<label> Rating </label>
						<div className="mb-3 flex w-full items-center justify-start gap-2 text-sm text-txtCol-2">
							<p>From</p>
							<input
								className="w-[60px] border-borderCol-1"
								type="number"
								placeholder="0"
								min={0}
								max={filter.rating.max}
								onChange={(event) => {
									setFilter({
										...filter,
										rating: {
											...filter.rating,
											min: Number(event.target.value),
										},
									})
								}}
							/>
							<p>stars to</p>
							<input
								className="w-[60px] border-borderCol-1"
								type="number"
								placeholder="5"
								min={filter.rating.min}
								max={5}
								onChange={(event) => {
									setFilter({
										...filter,
										rating: {
											...filter.rating,
											max: Number(event.target.value),
										},
									})
								}}
							/>
							<p>stars</p>
						</div>
					</div>
					<div className="mb-8 flex flex-col gap-2">
						<label>Others</label>
						{filterOptions[2]?.options?.map((item, index) => (
							<div
								key={index}
								className="flex w-full items-center justify-start gap-2 text-sm text-txtCol-2"
							>
								<input
									type="radio"
									id={`others_${index}`}
									name="others_filter"
									checked={filter.others === index}
									onChange={() => {
										setFilter({
											...filter,
											others: index,
										})
									}}
								/>
								<label htmlFor={`others_${index}`}>{item}</label>
							</div>
						))}
					</div>
					<div className="relative flex items-center justify-between gap-5">
						<button className="w-[80px] rounded-md border-2 border-tertiary-1 py-1 text-tertiary-1 transition-all hover:scale-105 active:scale-100">
							Clear
						</button>
						<button className="flex-1 rounded-md bg-primary-2 py-1.5 font-medium text-bgCol-1 transition-all hover:scale-105 active:scale-100">
							Apply
						</button>
					</div>
				</div>
				<div className="h-full flex-1">
					<div className="mb-5 flex w-full items-center justify-between">
						<SearchBox
							className="w-[220px]"
							onChangeValue={(event) => setSearchValue(event.target.value)}
							onClickSearch={() => console.log(searchValue)}
						/>
						<DropdownSelect
							id={`sort`}
							className="w-[120px]"
							options={sortOptions}
							value={sort}
							onChange={(event) => {
								setSort(Number(event.target.value))
							}}
						/>
					</div>
					<div className="flex flex-wrap justify-between gap-y-5">
						{destinations
							? destinations.map((des, index) => (
									<DesPreviewCard
										key={index}
										thumbnail={(des as any).thumbnail}
										name={des.name}
										location={des.address}
										rating={des.rating}
										cost={des.averageCost}
										openTime={des.openingHours}
										closeTime={des.closingHours}
										tags={des.tags}
										pin={des.pin}
										favorite={des.favorite}
									/>
								))
							: Array.from({ length: 6 }).map((_, index) => (
									<DPCLoading key={index} />
								))}

						<Pagination
							className="mt-2 w-full justify-center"
							numbOfPages={8}
							currentPage={currentPage}
							setCurrentPage={(numb) => {
								setCurrentPage(numb)
								console.log(numb)
							}}
						/>
					</div>
				</div>
			</div>
		</div>
	)
}

export default DestinationPage
