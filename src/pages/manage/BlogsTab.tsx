import { twMerge } from 'tailwind-merge'

const BlogsTab: React.FC<{ className?: string }> = ({ className }) => {
	return (
		<div
			className={twMerge(
				'w-full rounded border border-borderCol-1 bg-white px-8 py-5',
				className,
			)}
		>
			Blogs
		</div>
	)
}

export default BlogsTab
