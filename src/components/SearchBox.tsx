import { PiMagnifyingGlassBold } from 'react-icons/pi'
import { useState } from 'react'

type SearchBoxProps = {
	className?: string
	id?: string
	onChangeValue: (event: React.ChangeEvent<HTMLInputElement>) => void
	onClickSearch: () => void
}

const SearchBox: React.FC<SearchBoxProps> = ({
	className,
	id,
	onChangeValue,
	onClickSearch,
}) => {
	const [searchFocus, setSearchFocus] = useState(false)
	return (
		<div
			className={`flex h-8 items-center rounded-md border border-[#dddddd] bg-bgCol-2 px-2 py-0.5  ${searchFocus ? 'border-primary-2' : ''} ${className}`}
			id={id}
		>
			<input
				type="text"
				placeholder="Search"
				className="h-full w-full border-none bg-transparent text-xs focus:border-none"
				onFocus={() => setSearchFocus(true)}
				onBlur={() => setSearchFocus(false)}
				onChange={(event) => {
					onChangeValue(event)
				}}
			/>
			<button
				className="rounded-full p-1.5 text-txtCol-3 hover:bg-slate-100 hover:text-primary-1"
				onClick={onClickSearch}
			>
				<PiMagnifyingGlassBold />
			</button>
		</div>
	)
}

export default SearchBox