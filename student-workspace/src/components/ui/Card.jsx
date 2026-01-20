import React from 'react';
import './Card.css';

const Card = ({
    children,
    className = '',
    color = 'default',
    onClick,
    onDoubleClick,
    selected = false,
    hoverable = true,
    style = {}
}) => {
    return (
        <div
            className={`
        card 
        ${hoverable ? 'hoverable' : ''} 
        ${selected ? 'selected' : ''}
        ${className}
      `}
            onClick={onClick}
            onDoubleClick={onDoubleClick}
            style={{
                ...style,
                '--card-color': color !== 'default' ? color : 'var(--gray-300)',
            }}
        >
            {children}
        </div>
    );
};

export default Card;
