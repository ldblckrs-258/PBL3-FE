import { twMerge } from 'tailwind-merge'
import { DropdownSelect, Pagination, SearchBox } from '../../components'
import React, { useEffect, useState } from 'react'
import { SortTypeButton } from '../../components/Buttons'
import { ManageDesProps } from '../../types/destination'
import { useToast } from '../../hook/useToast'
import { PiEyeFill, PiPenFill, PiTrashSimpleFill } from 'react-icons/pi'
import axios from 'axios'
import { toDisplayDateTime } from '../../utils/TimeFormatters'

const sortBy = [
	{
		value: 'created_at',
		label: 'Release date',
	},
	{
		value: 'name',
		label: 'Name',
	},
	{
		value: 'rating',
		label: 'Avg. Rating',
	},
	{
		value: 'review',
		label: 'Review count',
	},
	{
		value: 'favorite',
		label: 'Favorite count',
	},
]

const DestinationsTab: React.FC<{ className?: string }> = ({ className }) => {
	const [searchValue, setSearchValue] = useState('')
	const [sort, setSort] = useState({
		by: 0,
		type: 'desc',
	})
	const [currentPage, setCurrentPage] = useState(1)
	const limit = 12
	const [total, setTotal] = useState(0)
	const toast = useToast()
	const [destinations, setDestinations] = useState<ManageDesProps[]>()
	const handleSearch = () => {
		console.log(searchValue, sortBy[sort.by].value, sort.type)
	}

	const handleGetDestinations = async () => {
		try {
			const response = await axios.get('api/destination/manage-1.json')
			const res = response.data.data
			setDestinations(res.items)
			setTotal(res.total)
		} catch (error) {
			toast.error('Error', 'Failed to get destinations')
			console.log(error)
		}
	}

	useEffect(() => {
		handleGetDestinations()
	}, [])

	return (
		<div
			className={twMerge(
				'w-full rounded border border-borderCol-1 bg-white px-6 py-4',
				className,
			)}
		>
			<div className="mb-4 flex w-full items-center justify-between">
				<SearchBox
					className="h-9 w-[220px]"
					onChangeValue={(event) => setSearchValue(event.target.value)}
					onClickSearch={handleSearch}
				/>
				<div className="item-center relative flex gap-4">
					<DropdownSelect
						id="sort-by"
						className="h-9 w-[168px]"
						options={sortBy.map((item) => item.label)}
						value={sort.by}
						onChange={(event) => {
							setSort({
								...sort,
								by: Number(event.target.value),
							})
						}}
					/>
					<SortTypeButton
						id="sort-type"
						className="h-9 w-9"
						value={sort.type}
						onClick={() => {
							setSort({
								...sort,
								type: sort.type === 'asc' ? 'desc' : 'asc',
							})
						}}
					/>
				</div>
			</div>
			<div className="mb-4 flex w-full flex-col items-center border border-borderCol-1">
				<Table
					header={[
						'Id',
						'Name',
						'Rating',
						'Review',
						'Favorite',
						'Created At',
						'Actions',
					]}
					buttons={[
						{
							icon: <PiEyeFill />,
							color: '#76C893',
							bgColor: '#76C8933f',
							title: 'View',
							onClick: (id: number) => {
								window.open(`/destination/${id}`, '_blank')
							},
						},
						{
							icon: <PiPenFill />,
							color: '#64B8DC',
							bgColor: '#64B8DC3f',
							title: 'Edit',
							onClick: (id: number) => {
								window.open(`/destination/new?id=${id}`, '_blank')
							},
						},
						{
							icon: <PiTrashSimpleFill />,
							color: '#ee685e',
							bgColor: '#ee685e3f',
							title: 'Delete',
							onClick: (id: number) => {
								toast.info('Call API', `Call delete API with id ${id}`)
							},
						},
					]}
					colStyles={[
						'w-[92px]',
						'flex-1 text-left',
						'w-[80px]',
						'w-[80px]',
						'w-[80px]',
						'w-[140px]',
						'w-[140px]',
					]}
					lines={
						destinations?.map((des) => [
							des.id,
							des.name,
							des.rating,
							des.review,
							des.favorite,
							toDisplayDateTime(des.created_at),
						]) || []
					}
				/>
			</div>
			<div className="flex items-center justify-between">
				<div className="flex h-8 items-center rounded border border-borderCol-1 px-3 text-txtCol-2">
					{(currentPage - 1) * limit + 1}
					{' - '}
					{currentPage * limit > total ? total : currentPage * limit}
					{' of '}
					{total}
				</div>
				<Pagination
					numbOfPages={Math.ceil(total / limit)}
					currentPage={currentPage}
					setCurrentPage={setCurrentPage}
				/>
			</div>
		</div>
	)
}

interface TableProps {
	className?: string
	header: string[]
	lines: Array<Array<string | number>>
	colStyles?: string[]
	buttons: Array<{
		icon: React.ReactNode
		title: string
		color: string
		bgColor: string
		onClick: (id: number) => void
	}>
}

const Table: React.FC<TableProps> = ({
	className,
	header,
	lines,
	colStyles,
	buttons,
}) => {
	return (
		<div className={twMerge('flex w-full flex-col items-center', className)}>
			<header className="flex w-full items-center gap-2 border-b border-borderCol-1 px-2">
				{header.map((item, index) => (
					<div
						key={index}
						className={` py-1 text-center font-semibold ${colStyles?.[index]}`}
					>
						{item}
					</div>
				))}
			</header>
			{lines.map((line, index) => (
				<div
					className={`flex h-10 w-full items-center gap-2 px-2 text-sm hover:bg-[#64ccdc3f] ${index % 2 && 'bg-gray-100'}`}
					key={index}
				>
					{line.map((item, index) => (
						<div
							key={index}
							className={twMerge(
								'line-clamp-1 text-center',
								colStyles?.[index],
							)}
						>
							{item}
						</div>
					))}
					<div
						className={twMerge(
							'flex items-center justify-center gap-3',
							colStyles?.[colStyles.length - 1],
						)}
					>
						{buttons.map((button, index) => (
							<button
								key={index}
								className="flex h-6 w-6 items-center justify-center rounded-full border-2"
								title={button.title}
								style={{
									color: button.color,
									backgroundColor: button.bgColor,
									borderColor: button.color,
								}}
								onClick={() => button.onClick(Number(line[0]))}
							>
								{button.icon}
							</button>
						))}
					</div>
				</div>
			))}
		</div>
	)
}

export default DestinationsTab
