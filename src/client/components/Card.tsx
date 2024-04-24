import React, { type ReactNode } from 'react';

interface CardProps {
    title?: string;
    content?: string | ReactNode;
    actions?: ReactNode;
    className?: string;
    children?: ReactNode;
}

/**
 * Card component that displays media, content, and actions.
 * It can be used to present a variety of content and actions.
 *
 * @param {CardProps} props - The properties of the card component.
 * @param {string} [props.title] - Title of the card.
 * @param {string|ReactNode} [props.content] - Main content of the card.
 * @param {ReactNode} [props.actions] - Actions related to the card's content.
 * @param {string} [props.imageSrc] - Source URL of the image to display on the card.
 * @param {string} [props.className] - Additional CSS classes for styling the card.
 * @returns {JSX.Element} - A stylized card component.
 */
export const Card: React.FC<CardProps> = ({ title, children, actions, className }) => {
    return (
        <article className={`bg-black border border-zinc-800 rounded-lg shadow-lg overflow-hidden p-4 ${className}`}>
            {title && <h3 className="text-lg font-semibold text-gray-900 mb-2">{title}</h3>}
            {children}
            {actions && <div className="mt-4">{actions}</div>}
        </article>
    );
};
