import React from 'react';
import { Breadcrumbs, Link, Typography } from '@mui/material';
import { Home } from 'lucide-react';

const Breadcrumb = ({ navigationStack, onNavigate }) => {
    return (
        <Breadcrumbs
            aria-label="breadcrumb"
            sx={{
                padding: '16px 24px',
                backgroundColor: 'background.paper',
                borderBottom: '1px solid',
                borderColor: 'divider',
            }}
        >
            <Link
                component="button"
                underline="hover"
                color="text.primary"
                onClick={() => onNavigate(null)}
                sx={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 0.5,
                    fontWeight: 600,
                    cursor: 'pointer',
                    '&:hover': {
                        color: 'primary.main',
                    },
                }}
            >
                <Home size={16} />
                Workspace
            </Link>

            {navigationStack.map((item, index) => {
                const isLast = index === navigationStack.length - 1;

                if (isLast) {
                    return (
                        <Typography
                            key={item.id}
                            color="primary"
                            fontWeight={600}
                            fontSize="14px"
                        >
                            {item.title}
                        </Typography>
                    );
                }

                return (
                    <Link
                        key={item.id}
                        component="button"
                        underline="hover"
                        color="text.secondary"
                        onClick={() => onNavigate(item.id)}
                        sx={{
                            fontWeight: 500,
                            fontSize: '14px',
                            cursor: 'pointer',
                            '&:hover': {
                                color: 'text.primary',
                            },
                        }}
                    >
                        {item.title}
                    </Link>
                );
            })}
        </Breadcrumbs>
    );
};

export default Breadcrumb;
