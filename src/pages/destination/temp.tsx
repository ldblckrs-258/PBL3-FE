export default function Temp() {
	return (
		<>
			<div className="mt-8 h-auto w-[260px]">
				{locations && (
					<div className="mb-4 flex w-full flex-col gap-2">
						<label className="text-sm font-semibold" htmlFor="location-filter">
							Locations
						</label>
						<DropdownSelect
							id="location-filter"
							className="w-full"
							options={locations}
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
				<div className="mb-4 flex flex-col gap-2">
					<label className="text-sm font-semibold">Price</label>
					<div className="mb-3 flex w-full items-center justify-start gap-2 text-sm text-txtCol-2">
						<p>From $</p>
						<input
							className="w-[60px]"
							type="number"
							placeholder="0"
							min={0}
							max={filter.price.max === -1 ? 1000000 : filter.price.max}
							value={filter.price.min === -1 ? '' : filter.price.min}
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
							className="w-[80px]"
							type="number"
							placeholder="100"
							min={filter.price.min === -1 ? 0 : filter.price.min}
							value={filter.price.max === -1 ? '' : filter.price.max}
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
					<label className="text-sm font-semibold"> Rating </label>
					<div className="mb-3 flex w-full items-center justify-start gap-2 text-sm text-txtCol-2">
						<p>From</p>
						<input
							className="w-[52px] border-borderCol-1"
							type="number"
							placeholder="0"
							min={0}
							max={filter.rating.max === -1 ? 5 : filter.rating.max}
							value={filter.rating.min === -1 ? '' : filter.rating.min}
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
							min={filter.rating.min === -1 ? 0 : filter.rating.min}
							max={5}
							value={filter.rating.max === -1 ? '' : filter.rating.max}
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
				<div className="relative flex items-center justify-between gap-5">
					<Button
						className="text-bold h-8 w-20 border-2 border-tertiary-1 text-tertiary-1"
						onClick={() => {
							setFilter(initFilter)
							console.log(filter)
						}}
					>
						Reset
					</Button>
					<Button
						className="flex-1 bg-primary-2 text-white"
						onClick={() => {
							console.log(filter)
							toast.info('Filter applied', 'Check console for filter data')
						}}
					>
						Apply
					</Button>
				</div>
			</div>
		</>
	)
}
