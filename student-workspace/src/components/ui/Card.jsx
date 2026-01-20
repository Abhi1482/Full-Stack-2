import React from 'react';
import { Card as MuiCard, CardContent } from '@mui/material';

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
        <MuiCard
            className={className}
            onClick={onClick}
            onDoubleClick={onDoubleClick}
            sx={{
                borderLeft: color !== 'default' ? `4px solid ${color}` : '4px solid transparent',
                cursor: hoverable ? 'pointer' : 'default',
                transition: 'all 0.2s ease-in-out',
                border: selected ? '2px solid' : 'none',
                borderColor: selected ? 'primary.main' : 'transparent',
                backgroundColor: selected ? 'action.selected' : 'background.paper',
                '&:hover': hoverable ? {
                    transform: 'translateY(-2px)',
                    boxShadow: 4,
                } : {},
                ...style,
            }}
        >
            <CardContent sx={{ padding: 0, '&:last-child': { paddingBottom: 0 } }}>
                {children}
            </CardContent>
        </MuiCard>
    );
};

export default Card;
