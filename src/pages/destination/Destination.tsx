import { useParams } from 'react-router-dom'
import PageNotFound from '../PageNotFound'
import DesImgSlider from './DesImgSlider'
import DestinationType from '../../types/DestinationType'
import { useEffect, useState } from 'react'
import axios from 'axios'

const Destination: React.FC = () => {
	const [destination, setDestination] = useState<DestinationType | undefined>(
		undefined,
	)
	const { id } = useParams()

	const getDestination = async (id: string) => {
		try {
			setDestination(undefined)
			const response = await axios.get(`/api/destination.${id}.json`)
			// simulate delay
			await new Promise((resolve) => setTimeout(resolve, 500))
			setDestination(response.data.data)
			console.log(response.data.data)
		} catch (error) {
			console.error(error)
		}
	}

	useEffect(() => {
		getDestination(id ?? '')
	}, [id])

	if (!destination) return <PageNotFound />
	return (
		<div>
			<h1 className="mx-auto flex min-h-screen justify-center pb-4 pt-[64px] text-txtCol-1 xl:max-w-screen-xl">
				<DesImgSlider
					className="w-full"
					imgUrls={destination.imgs}
					name={destination.general.name}
				/>
			</h1>
		</div>
	)
}

export default Destination
