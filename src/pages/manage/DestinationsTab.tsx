import { twMerge } from 'tailwind-merge'
import { DropdownSelect, SearchBox } from '../../components'
import { useState } from 'react'
import { SortTypeButton } from '../../components/Buttons'

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
	const handleSearch = () => {
		console.log(searchValue, sortBy[sort.by].value, sort.type)
	}
	return (
		<div
			className={twMerge(
				'w-full rounded border border-borderCol-1 bg-white px-8 py-5',
				className,
			)}
		>
			<div className="mb-5 flex w-full items-center justify-between">
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
			<div className="flex w-full flex-col items-center border border-borderCol-1"></div>
		</div>
	)
}

export default DestinationsTab
