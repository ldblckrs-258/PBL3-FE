import { PiCaretCircleDoubleDown } from 'react-icons/pi'
import { Button } from '../../components/Buttons'
import HomeDestinations from './HomeDestinations'
import HomeBlogs from './HomeBlogs'

const Home: React.FC = () => {
	const scrollDownPage = () => {
		window.scrollTo({ top: window.innerHeight, behavior: 'smooth' })
	}
	return (
		<div>
			<div className="relative shadow-lg">
				<img
					className="h-dvh w-full object-cover"
					src="https://tourism.danang.vn/wp-content/uploads/2023/02/tour-du-lich-da-nang-1.jpg"
					alt="thumbnail"
				/>
				<div className="absolute left-0 top-0 flex h-full w-full flex-col items-center justify-between bg-[#00000080] py-5 text-white">
					<div className="h-[60px]"></div>
					<div className="flex max-w-screen-xl select-none flex-col items-center font-lora">
						<h2 className="mb-2 text-3xl font-semibold">Discover Da Nang</h2>
						<h3 className="text-6xl font-semibold">
							Unveiling the beauty of Central Vietnam
						</h3>
					</div>
					<Button
						className=" text-6xl transition-all hover:text-primary-3"
						onClick={() => scrollDownPage()}
					>
						<PiCaretCircleDoubleDown />
					</Button>
				</div>
			</div>
			<div className="mx-auto min-h-screen w-full xl:max-w-screen-xl">
				<HomeDestinations className="mt-10 w-full" />
				<HomeBlogs className="my-10 w-full" />
			</div>
		</div>
	)
}

export default Home
