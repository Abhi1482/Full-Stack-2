import React from 'react';
import { Box, Typography, Button } from '@mui/material';
import { FileText } from 'lucide-react';

const EmptyState = () => {
    return (
        <Box
            sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                minHeight: '400px',
                textAlign: 'center',
                color: 'text.secondary',
            }}
        >
            <FileText size={64} style={{ marginBottom: '24px', opacity: 0.3 }} />
            <Typography variant="h5" color="text.primary" gutterBottom fontWeight={600}>
                Start Building Your Workspace
            </Typography>
            <Typography variant="body1" color="text.secondary" sx={{ mb: 3, maxWidth: '400px' }}>
                Drag a Course from the sidebar to begin organizing your academic materials
            </Typography>
            <Typography variant="body2" color="text.disabled">
                💡 Tip: Double-click components to navigate into them
            </Typography>
        </Box>
    );
};

export default EmptyState;
