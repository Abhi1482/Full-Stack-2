import React from 'react';
import { Drawer, Box, Typography, Divider, List, ListItem, Alert, Button } from '@mui/material';
import { Info } from 'lucide-react';
import ComponentBlock from '../blocks/ComponentBlock';
import { ItemTypes, getTypeLabel } from '../../utils/constants';
import { useAuth } from '../../hooks/useAuth.jsx';

const Sidebar = ({ currentContext }) => {
    // Template components to drag from
    const templates = [
        { id: 'template-course', type: ItemTypes.COURSE, title: getTypeLabel(ItemTypes.COURSE) },
        { id: 'template-part', type: ItemTypes.PART, title: getTypeLabel(ItemTypes.PART) },
        { id: 'template-subject', type: ItemTypes.SUBJECT, title: getTypeLabel(ItemTypes.SUBJECT) },
        { id: 'template-notes', type: ItemTypes.NOTES, title: getTypeLabel(ItemTypes.NOTES) },
        { id: 'template-assignment', type: ItemTypes.ASSIGNMENT, title: getTypeLabel(ItemTypes.ASSIGNMENT) },
        { id: 'template-test', type: ItemTypes.TEST, title: getTypeLabel(ItemTypes.TEST) },
        { id: 'template-ai', type: ItemTypes.AI, title: getTypeLabel(ItemTypes.AI) },
    ];

    // Get contextual message
    const getContextMessage = () => {
        if (!currentContext) {
            return 'Drag a Course to start';
        }

        const messages = {
            course: 'Add Parts/Modules to this course',
            part: 'Add Subjects to this module',
            subject: 'Add content items',
        };

        return messages[currentContext.type] || 'Drag components to organize';
    };

    return (
        <Drawer
            variant="permanent"
            sx={{
                width: 280,
                flexShrink: 0,
                '& .MuiDrawer-paper': {
                    width: 280,
                    boxSizing: 'border-box',
                    backgroundColor: 'rgb(30, 41, 59)',
                    color: 'white',
                    borderRight: '1px solid rgba(255, 255, 255, 0.1)',
                },
            }}
        >
            {/* Header */}
            <Box sx={{ p: 3, display: 'flex', alignItems: 'center', gap: 1.5 }}>
                <Box
                    sx={{
                        width: 40,
                        height: 40,
                        borderRadius: 2,
                        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontSize: '20px',
                    }}
                >
                    C
                </Box>
                <Typography variant="h6" fontWeight={600} color="white">
                    Components
                </Typography>
            </Box>

            <Divider sx={{ borderColor: 'rgba(255, 255, 255, 0.1)' }} />

            {/* Context Info */}
            {currentContext && (
                <Alert
                    icon={<Info size={16} />}
                    severity="info"
                    sx={{
                        mx: 2,
                        mt: 2,
                        backgroundColor: 'rgba(99, 102, 241, 0.15)',
                        color: '#A5B4FC',
                        '& .MuiAlert-icon': {
                            color: '#A5B4FC',
                        },
                    }}
                >
                    <Typography variant="caption" fontWeight={500}>
                        Inside: {currentContext.title}
                    </Typography>
                </Alert>
            )}

            {/* Description */}
            <Box sx={{ px: 2.5, py: 2, backgroundColor: 'rgba(0, 0, 0, 0.2)' }}>
                <Typography variant="caption" color="rgba(255, 255, 255, 0.6)" lineHeight={1.5}>
                    {getContextMessage()}
                </Typography>
            </Box>

            {/* Component Palette */}
            <Box sx={{ flex: 1, overflowY: 'auto', px: 2.5, py: 2.5 }}>
                {/* Structure */}
                <Typography
                    variant="caption"
                    fontWeight={600}
                    color="rgba(255, 255, 255, 0.5)"
                    textTransform="uppercase"
                    letterSpacing={0.5}
                    display="block"
                    mb={1.5}
                >
                    Structure
                </Typography>
                <List sx={{ p: 0 }}>
                    {templates.slice(0, 3).map(template => (
                        <ListItem key={template.id} sx={{ p: 0, mb: 1.5 }}>
                            <ComponentBlock
                                component={template}
                                isTemplate={true}
                            />
                        </ListItem>
                    ))}
                </List>

                {/* Content */}
                <Typography
                    variant="caption"
                    fontWeight={600}
                    color="rgba(255, 255, 255, 0.5)"
                    textTransform="uppercase"
                    letterSpacing={0.5}
                    display="block"
                    mb={1.5}
                    mt={3}
                >
                    Content
                </Typography>
                <List sx={{ p: 0 }}>
                    {templates.slice(3, 6).map(template => (
                        <ListItem key={template.id} sx={{ p: 0, mb: 1.5 }}>
                            <ComponentBlock
                                component={template}
                                isTemplate={true}
                            />
                        </ListItem>
                    ))}
                </List>

                {/* Tools */}
                <Typography
                    variant="caption"
                    fontWeight={600}
                    color="rgba(255, 255, 255, 0.5)"
                    textTransform="uppercase"
                    letterSpacing={0.5}
                    display="block"
                    mb={1.5}
                    mt={3}
                >
                    Tools
                </Typography>
                <List sx={{ p: 0 }}>
                    {templates.slice(6).map(template => (
                        <ListItem key={template.id} sx={{ p: 0, mb: 1.5 }}>
                            <ComponentBlock
                                component={template}
                                isTemplate={true}
                            />
                        </ListItem>
                    ))}
                </List>
            </Box>

            {/* Footer */}
            <Divider sx={{ borderColor: 'rgba(255, 255, 255, 0.1)' }} />
            <Box sx={{ p: 2 }}>
                <UserProfile />
                <Typography variant="caption" color="rgba(255, 255, 255, 0.4)" textAlign="center" display="block" mt={2}>
                    Smart Student Workspace
                </Typography>
            </Box>
        </Drawer>
    );
};

// User Profile Component
const UserProfile = () => {
    const { user, logout } = useAuth();

    if (!user) return null;

    return (
        <Box>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 1 }}>
                <Box
                    sx={{
                        width: 36,
                        height: 36,
                        borderRadius: '50%',
                        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontSize: '14px',
                        fontWeight: 600,
                        color: 'white',
                    }}
                >
                    {user.name?.charAt(0).toUpperCase()}
                </Box>
                <Box sx={{ flex: 1 }}>
                    <Typography variant="body2" fontWeight={600} color="white" noWrap>
                        {user.name}
                    </Typography>
                    <Typography variant="caption" color="rgba(255, 255, 255, 0.5)" noWrap>
                        {user.email}
                    </Typography>
                </Box>
            </Box>
            <Button
                fullWidth
                variant="outlined"
                size="small"
                onClick={logout}
                sx={{
                    color: 'rgba(255, 255, 255, 0.7)',
                    borderColor: 'rgba(255, 255, 255, 0.2)',
                    textTransform: 'none',
                    '&:hover': {
                        borderColor: 'rgba(255, 255, 255, 0.4)',
                        backgroundColor: 'rgba(255, 255, 255, 0.05)',
                    },
                }}
            >
                Logout
            </Button>
        </Box>
    );
};

export default Sidebar;
