import { useState, useEffect } from 'react'
import axios from 'axios'
import { PiMagnifyingGlassBold } from 'react-icons/pi'

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
]

const DestinationPage = () => {
	const [destinations, setDestinations] = useState([])
	const [searchFocus, setSearchFocus] = useState(false)

	useEffect(() => {
		// getDestinations()
	}, [])

	const getDestinations = async () => {
		try {
			const response = await axios.get('/api/destinationList.json')
			setDestinations(response.data)
			console.log(response.data)
		} catch (error) {
			console.error(error)
		}
	}
	return (
		<div className="text-txtCol-1 mx-auto flex h-screen justify-center pb-6 pt-20 xl:max-w-screen-xl">
			<div className="flex h-full w-full justify-start gap-8">
				<div className="my-auto h-auto w-[280px]">
					{filterOptions &&
						filterOptions.map((filter, index) => (
							<div className="mb-4 flex w-full flex-col gap-2" key={index}>
								<label htmlFor="filter_1">{filter.name}</label>
								<select className="w-full" title="location" id="filter_1">
									{filter.options.map((option, index) => (
										<option key={index} value={index}>
											{option}
										</option>
									))}
								</select>
							</div>
						))}
					<div className="mb-4 flex flex-col gap-2">
						<label>Price</label>
						<div className="text-txtCol-2 mb-3 flex w-full items-center justify-start gap-2 text-sm">
							<p>From $</p>
							<input
								className="w-[92px]"
								type="number"
								placeholder="0"
								min={0}
							/>
							<p>to $</p>
							<input
								className="w-[92px]"
								type="number"
								placeholder="100"
								min={0}
							/>
						</div>
					</div>
					<div className="mb-4 flex flex-col gap-2">
						<label> Rating </label>
						<div className="text-txtCol-2 mb-3 flex w-full items-center justify-start gap-2 text-sm">
							<p>From</p>
							<input
								className="w-[60px]"
								type="number"
								placeholder="0"
								min={0}
								max={5}
							/>
							<p>stars to</p>
							<input
								className="w-[60px]"
								type="number"
								placeholder="5"
								min={0}
								max={5}
							/>
							<p>stars</p>
						</div>
					</div>
					<div className="mb-8 flex flex-col gap-2">
						<label>Others</label>
						<div className="text-txtCol-2 flex w-full items-center justify-start gap-2 text-sm">
							<input type="radio" id="hot_filter" name="others_filter" />
							<label htmlFor="hot_filter">Hot destination</label>
						</div>
						<div className="text-txtCol-2 flex w-full items-center justify-start gap-2 text-sm">
							<input type="radio" id="new_filter" name="others_filter" />
							<label htmlFor="new_filter">New destination</label>
						</div>
						<div className="text-txtCol-2 flex w-full items-center justify-start gap-2 text-sm">
							<input type="radio" id="rcm_filter" name="others_filter" />
							<label htmlFor="rcm_filter">Recommended</label>
						</div>
					</div>
					<div className="relative flex items-center justify-between gap-5">
						<button className="text-tertiary-1 border-tertiary-1 w-[120px] rounded-md border-2 py-1 ">
							Clear
						</button>
						<button className="bg-primary-2 text-bgCol-1 w-full rounded-md py-1.5 font-medium">
							Apply
						</button>
					</div>
				</div>
				<div className="h-full flex-1 overflow-y-auto">
					<div className="flex w-full items-center justify-between">
						<div
							className={`bg-bgCol-2 flex h-9 w-[200px] items-center gap-1 rounded-md border-[2px] border-[#dddddd] px-2 py-1 pl-3 ${searchFocus ? 'border-primary-2' : ''}`}
						>
							<PiMagnifyingGlassBold className="text-txtCol-3" />
							<input
								type="text"
								placeholder="Search"
								className="h-full w-full border-none bg-transparent text-sm focus:border-none"
								onFocus={() => setSearchFocus(true)}
								onBlur={() => setSearchFocus(false)}
							/>
						</div>
						<select className="bg-bgCol-2 h-9 w-[140px] rounded-md border-[2px] border-[#dddddd] px-3 py-1 text-sm">
							<option value="sort">Sort by</option>
							<option value="price">Price</option>
							<option value="rating">Rating</option>
						</select>
					</div>
				</div>
			</div>
		</div>
	)
}

export default DestinationPage
