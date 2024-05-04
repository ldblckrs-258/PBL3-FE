type ButtonProps = {
	children: React.ReactNode
	className?: string
	onClick: () => void
}

const PrimaryButton: React.FC<ButtonProps> = ({
	children,
	className,
	onClick,
}) => {
	return (
		<button
			className={`rounded-md bg-primary-2 py-1.5 text-sm font-medium text-bgCol-1 transition-all ${className}`}
			onClick={onClick}
		>
			{children}
		</button>
	)
}

const SecondaryButton: React.FC<ButtonProps> = ({
	children,
	className,
	onClick,
}) => {
	return (
		<button
			className={`rounded-md border-2 border-tertiary-1 py-1 text-sm text-tertiary-1 transition-all ${className}`}
			onClick={onClick}
		>
			{children}
		</button>
	)
}

export { PrimaryButton, SecondaryButton }
