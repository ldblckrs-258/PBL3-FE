import { twMerge } from 'tailwind-merge'

const UsersTab: React.FC<{ className?: string }> = ({ className }) => {
	return (
		<div
			className={twMerge(
				'w-full rounded border border-borderCol-1 bg-white px-8 py-5',
				className,
			)}
		>
			Users
		</div>
	)
}

export default UsersTab
