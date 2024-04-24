import { type FC, type MouseEvent, type ReactNode } from 'react';

interface ButtonProps {
    variant?: 'contained' | 'text';
    color?: 'primary' | 'secondary' | 'default' | 'danger' | 'success';
    size?: 'small' | 'medium' | 'large';
    disabled?: boolean;
    onClick?: (event: MouseEvent<HTMLButtonElement>) => void;
    className?: string;
    children: ReactNode;
    icon?: ReactNode;
}

const baseStyle =
    'focus:outline-none transition duration-150 ease-in-out rounded-lg shadow-sm flex items-center justify-center';

const sizeClasses = {
    small: 'text-sm px-3 py-1.5',
    medium: 'text-base px-4 py-2',
    large: 'text-lg px-5 py-2.5',
};

const variantClasses = {
    contained: {
        primary: 'bg-blue-600 hover:bg-blue-700 focus:border active:bg-blue-800 text-white shadow hover:shadow-md',
        secondary: 'bg-green-600 hover:bg-green-700 focus:border active:bg-green-800 text-white shadow hover:shadow-md',
        default: 'bg-gray-400 hover:bg-gray-500 focus:border active:bg-gray-600 text-black shadow hover:shadow-md',
        danger: 'bg-red-600 hover:bg-red-700 focus:border active:bg-red-800 text-white shadow hover:shadow-md',
        success: 'bg-green-600 hover:bg-green-700 focus:border active:bg-green-800 text-white shadow hover:shadow-md',
    },
    text: {
        primary: 'text-blue-600 hover:bg-blue-100 focus:bg-blue-200 active:bg-blue-300 shadow hover:shadow-md',
        secondary: 'text-green-600 hover:bg-green-100 focus:bg-green-200 active:bg-green-300 shadow hover:shadow-md',
        default: 'text-gray-600 hover:bg-gray-100 focus:bg-gray-200 active:bg-gray-300 shadow hover:shadow-md',
        danger: 'text-red-600 hover:bg-red-100 focus:bg-red-200 active:bg-red-300 shadow hover:shadow-md',
        success: 'text-green-600 hover:bg-green-100 focus:bg-green-200 active:bg-green-300 shadow hover:shadow-md',
    },
};

const disabledClasses = {
    contained: 'bg-gray-500 text-gray-50 cursor-not-allowed',
    outlined: 'border-gray-400 text-gray-400 cursor-not-allowed',
    text: 'text-gray-400 cursor-not-allowed hover:bg-transparent',
};

export const Button: FC<ButtonProps> = ({
    variant = 'contained',
    color = 'default',
    size = 'medium',
    disabled = false,
    onClick,
    className = '',
    children,
    icon,
}) => {
    const variantColorClasses = disabled ? disabledClasses[variant] : variantClasses[variant][color];

    return (
        <button
            type="button"
            className={`${baseStyle} ${sizeClasses[size]} ${variantColorClasses} ${className}`}
            onClick={!disabled ? onClick : undefined}
            disabled={disabled}
        >
            {icon && <span className="icon-container mr-2 align-middle">{icon}</span>}
            {children}
        </button>
    );
};
