import { PiCaretCircleDoubleDown } from 'react-icons/pi'
import { Button } from '../components/Buttons'

const Home: React.FC = () => {
	const scrollDownPage = () => {
		window.scrollTo({ top: window.innerHeight, behavior: 'smooth' })
	}
	return (
		<div>
			<div className="relative">
				<img
					className="h-dvh w-full object-cover"
					src="https://tourism.danang.vn/wp-content/uploads/2023/02/tour-du-lich-da-nang-1.jpg"
					alt=""
				/>
				<div className="absolute left-0 top-0 flex h-full w-full flex-col items-center justify-between bg-[#00000080] py-5 text-white">
					<div className="h-[60px]"></div>
					<div className="font-lora flex max-w-screen-xl flex-col items-center">
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
			<div className="h-[3000px]"></div>
		</div>
	)
}

export default Home
