import axios from 'axios'
import { useEffect, useState } from 'react'
import { PiCaretRightBold } from 'react-icons/pi'
import { twMerge } from 'tailwind-merge'
import { Button } from '../../components/Buttons'
import { useNavigate } from 'react-router-dom'
import { timeAgo } from '../../utils/TimeFormatters'

type BlogType = {
	id: number
	title: string
	type: string
	image: string
	description: string
	author: string
	created_at: string
}

const HomeBlogs: React.FC<{ className?: string }> = ({ className }) => {
	const [blogs, setBlogs] = useState<BlogType[]>([])

	const getBlogs = async () => {
		try {
			const response = await axios.get('/api/blog/home-blogs.json')
			setBlogs(response.data.data)
			console.log(response.data.data)
		} catch (error) {
			console.error(error)
		}
	}

	useEffect(() => {
		getBlogs()
	}, [])
	return (
		<div className={twMerge(`${className}`)}>
			<div className="flex h-6 w-full items-center justify-between">
				<h3 className="text-xl font-semibold leading-normal tracking-wide">
					Newest blogs
				</h3>
				<div className="flex cursor-pointer items-center justify-start gap-2 hover:text-primary-1 hover:underline">
					<h4 className="text-base font-normal leading-none">View more</h4>
					<PiCaretRightBold />
				</div>
			</div>
			<div className="mt-3 flex h-[400px] w-full items-center gap-5">
				<FirstBlog blog={blogs[0]} className="" />
				<div className="flex h-full flex-1 flex-col gap-5">
					<BlogCard blog={blogs[1]} className="flex-1" />
					<BlogCard blog={blogs[2]} className="flex-1" />
				</div>
				<div className="flex h-full flex-1 flex-col gap-5">
					<BlogCard blog={blogs[3]} className="flex-1" />
					<BlogCard blog={blogs[3]} className="flex-1" />
				</div>
			</div>
		</div>
	)
}

const FirstBlog: React.FC<{ blog: BlogType; className?: string }> = ({
	blog,
	className,
}) => {
	const navigate = useNavigate()
	return (
		<div
			className={twMerge(
				`relative h-[400px] w-[400px] overflow-hidden rounded-lg ${className}`,
			)}
		>
			<img
				className="h-full w-full object-cover"
				src={blog?.image}
				alt={blog?.title}
			/>
			<div className="absolute left-0 top-0 flex h-full w-full flex-col items-center justify-between bg-[#00000050] p-4">
				<div className="w-full">
					<div className="w-full rounded bg-[#ffffffa4] p-3">
						<div className="flex items-center gap-2">
							<span className=" rounded bg-secondary-2 px-2 py-1 text-xs font-semibold uppercase text-white">
								{blog?.type}
							</span>
							<span className="text-xs text-txtCol-2">
								{timeAgo(blog?.created_at)}
							</span>
						</div>
						<h4 className="mt-2 text-lg font-bold ">{blog?.title}</h4>
					</div>
					<div className="mt-1 text-xs text-white">by {blog?.author}</div>
				</div>
				<Button
					className="w-[120px] rounded-full border-2 border-white text-white hover:bg-[#ffffff30]"
					onClick={() => navigate(`/blog/${blog?.id}`)}
				>
					View details
				</Button>
			</div>
		</div>
	)
}

const BlogCard: React.FC<{ blog: BlogType; className?: string }> = ({
	blog,
	className,
}) => {
	// const navigate = useNavigate()
	console.log(blog)
	return (
		<div
			className={twMerge(
				`relative w-full overflow-hidden rounded-lg bg-slate-400 ${className}`,
			)}
		></div>
	)
}

export default HomeBlogs
