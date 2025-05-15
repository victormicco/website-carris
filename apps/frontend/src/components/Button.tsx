import React from 'react';

interface ButtonProps {
	children: React.ReactNode
	className?: string
	disabled?: boolean
	onClick?: () => void
	variant?: 'primary' | 'secondary'
}

const Button: React.FC<ButtonProps> = ({
	children,
	className = '',
	disabled = false,
	onClick,
	variant = 'primary',
}) => {
	const baseStyles = 'px-4 py-2 rounded-md font-medium transition-colors duration-200';
	const variantStyles = {
		primary: 'bg-blue-600 text-white hover:bg-blue-700',
		secondary: 'bg-gray-200 text-gray-800 hover:bg-gray-300',
	};
	const disabledStyles = 'opacity-50 cursor-not-allowed';

	return (
		<button
			disabled={disabled}
			onClick={onClick}
			className={`
        ${baseStyles}
        ${variantStyles[variant]}
        ${disabled ? disabledStyles : ''}
        ${className}
      `}
		>
			{children}
		</button>
	);
};

export default Button;
