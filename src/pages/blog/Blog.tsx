import { useEffect, useState } from 'react'
import { BlogDetailType } from '../../types/blog.types'
import { useParams } from 'react-router-dom'
import axios from 'axios'
import { Loader } from '../../components'
import PageNotFound from '../PageNotFound'

const Blog: React.FC = () => {
	const [blog, setBlog] = useState<BlogDetailType | undefined>(undefined)
	const [loading, setLoading] = useState(true)
	const { id } = useParams()

	const getBlog = async (id: string) => {
		try {
			setBlog(undefined)
			const response = await axios.get(`/api/blog/id-${id}.json`)
			// simulate delay
			await new Promise((resolve) => setTimeout(resolve, 2500))
			setBlog(response.data.data)
		} catch (error) {
			console.error(error)
		}
		setLoading(false)
	}

	useEffect(() => {
		getBlog(id ?? '')
	}, [id])

	useEffect(() => {
		document.title = (blog?.title ?? 'Blogs') + ' | Da Nang Explore'
	}, [blog])

	if (loading)
		return (
			<div className="mx-auto mt-12 flex min-h-screen items-center justify-center xl:max-w-screen-xl">
				<Loader />
			</div>
		)
	else if (!blog) return <PageNotFound />
	return <div></div>
}

export default Blog
