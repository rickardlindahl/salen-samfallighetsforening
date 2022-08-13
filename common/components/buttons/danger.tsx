import type { FC } from 'react'
import type { ButtonProps } from './types'
import Button from './button'

interface DangerButtonProps extends ButtonProps {
	bg?: string
	shadow?: string
}

const DangerButton: FC<DangerButtonProps> = ({
	bg = 'bg-red-500',
	children,
	className,
	isDisabled,
	isLoading,
	loadingText,
	onClick,
	shadow = '',
	textColor = 'text-white',
	type = 'button',
}) => {
	return (
		<Button
			bg={bg}
			className={`${className} ${shadow}`}
			isDisabled={isDisabled}
			isLoading={isLoading}
			loadingText={loadingText}
			onClick={onClick}
			textColor={textColor}
			type={type}
		>
			{children}
		</Button>
	)
}

export default DangerButton
