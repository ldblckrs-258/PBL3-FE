import { motion } from 'framer-motion'
import { useEffect, useState } from 'react'
import { PiSortAscendingBold, PiSortDescendingBold } from 'react-icons/pi'
import { twMerge } from 'tailwind-merge'

interface ButtonProps {
	id?: string
	children?: React.ReactNode
	className?: string
	onClick: () => void
	disabled?: boolean
}
const buttonVariants = {
	hover: {
		scale: 1.03,
	},
	tap: {
		scale: 0.93,
		opacity: 0.85,
	},
}

const Button: React.FC<ButtonProps> = ({
	children,
	className,
	onClick,
	disabled,
	id,
}) => {
	return (
		<motion.button
			className={twMerge(
				`flex items-center justify-center gap-2 rounded-md px-3 py-1.5 text-sm font-medium transition-all`,
				className,
				disabled ? 'cursor-not-allowed' : 'cursor-pointer',
			)}
			id={id}
			whileTap={disabled ? {} : 'tap'}
			variants={buttonVariants}
			transition={{ duration: 0.1 }}
			onClick={onClick}
			disabled={disabled}
		>
			{children}
		</motion.button>
	)
}

interface ToggleButtonProps extends ButtonProps {
	text: string
	toggledText: string
	icon?: React.ReactNode
	initToggled: boolean
	btnColor: string
}

const ToggleButton: React.FC<ToggleButtonProps> = ({
	className,
	onClick,
	text,
	toggledText,
	initToggled,
	icon,
	btnColor,
	id,
}) => {
	const [toggled, setToggled] = useState(initToggled)

	useEffect(() => {
		setToggled(initToggled)
	}, [initToggled])

	return (
		<motion.button
			className={twMerge(
				`flex items-center justify-center gap-2 rounded-md border-2 px-3 py-1.5 text-sm font-medium text-white transition-all`,
				className,
			)}
			id={id}
			style={{ borderColor: btnColor }}
			whileHover="hover"
			whileTap="tap"
			variants={buttonVariants}
			animate={
				toggled
					? {
							color: btnColor,
						}
					: { backgroundColor: btnColor }
			}
			transition={{ duration: 0.1 }}
			onClick={() => {
				onClick()
				setToggled(!toggled)
			}}
		>
			{icon}
			{toggled ? toggledText : text}
		</motion.button>
	)
}

interface SortTypeButtonProps extends ButtonProps {
	value: string
}
const SortTypeButton: React.FC<SortTypeButtonProps> = ({
	className,
	onClick,
	value = 'desc',
	id,
}) => {
	return (
		<button
			className={twMerge(
				`flex items-center justify-center rounded-full border-2 border-borderCol-1 bg-white text-xl text-txtCol-2 transition-all hover:border-primary-2 hover:text-primary-1`,
				className,
			)}
			id={id}
			onClick={onClick}
			title={value == 'desc' ? 'Descending' : 'Ascending'}
		>
			{value == 'desc' ? <PiSortAscendingBold /> : <PiSortDescendingBold />}
		</button>
	)
}

export { Button, ToggleButton, SortTypeButton }
