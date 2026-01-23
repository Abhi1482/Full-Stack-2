import { createTheme } from '@mui/material/styles';

// Exact design system colors as specified
const theme = createTheme({
    palette: {
        mode: 'light',
        primary: {
            main: '#6366F1', // Indigo (exact spec)
            light: '#818CF8',
            dark: '#4F46E5',
            contrastText: '#ffffff',
        },
        secondary: {
            main: '#94A3B8', // Muted (exact spec)
            light: '#CBD5E1',
            dark: '#64748B',
        },
        success: {
            main: '#22C55E', // Success (exact spec)
            light: '#4ADE80',
            dark: '#16A34A',
        },
        error: {
            main: '#EF4444', // Danger (exact spec)
            light: '#F87171',
            dark: '#DC2626',
        },
        warning: {
            main: '#F59E0B', // Warning (exact spec)
            light: '#FBBF24',
            dark: '#D97706',
        },
        info: {
            main: '#6366F1',
            light: '#818CF8',
            dark: '#4F46E5',
        },
        background: {
            default: '#F8FAFC', // Canvas background (exact spec)
            paper: '#FFFFFF',   // Card background (exact spec)
        },
        text: {
            primary: '#1E293B',
            secondary: '#64748B',
        },
        divider: '#E5E7EB',
    },
    typography: {
        fontFamily: [
            'Inter',
            '-apple-system',
            'BlinkMacSystemFont',
            '"Segoe UI"',
            'Roboto',
            'Arial',
            'sans-serif',
        ].join(','),
        // Headings: 600 weight (as specified)
        h1: { fontSize: '2.5rem', fontWeight: 600, letterSpacing: '-0.02em' },
        h2: { fontSize: '2rem', fontWeight: 600, letterSpacing: '-0.01em' },
        h3: { fontSize: '1.75rem', fontWeight: 600, letterSpacing: '-0.01em' },
        h4: { fontSize: '1.5rem', fontWeight: 600 },
        h5: { fontSize: '1.25rem', fontWeight: 600 },
        h6: { fontSize: '1rem', fontWeight: 600 },
        // Body text: 400 weight (as specified)
        body1: { fontSize: '1rem', lineHeight: 1.6, fontWeight: 400 },
        body2: { fontSize: '0.875rem', lineHeight: 1.5, fontWeight: 400 },
    },
    shape: {
        borderRadius: 12, // Card border radius (exact spec)
    },
    shadows: [
        'none',
        '0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)',
        '0 4px 20px rgba(0,0,0,0.06)', // Card shadow (exact spec)
        '0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)',
        '0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)',
        '0 25px 50px -12px rgb(0 0 0 / 0.25)',
        '0 4px 20px rgba(0,0,0,0.06)',
        '0 8px 30px rgba(0,0,0,0.08)',
        '0 12px 40px rgba(0,0,0,0.1)',
        '0 16px 50px rgba(0,0,0,0.12)',
        '0 20px 60px rgba(0,0,0,0.15)',
        '0 25px 50px -12px rgb(0 0 0 / 0.25)',
        '0 25px 50px -12px rgb(0 0 0 / 0.25)',
        '0 25px 50px -12px rgb(0 0 0 / 0.25)',
        '0 25px 50px -12px rgb(0 0 0 / 0.25)',
        '0 25px 50px -12px rgb(0 0 0 / 0.25)',
        '0 25px 50px -12px rgb(0 0 0 / 0.25)',
        '0 25px 50px -12px rgb(0 0 0 / 0.25)',
        '0 25px 50px -12px rgb(0 0 0 / 0.25)',
        '0 25px 50px -12px rgb(0 0 0 / 0.25)',
        '0 25px 50px -12px rgb(0 0 0 / 0.25)',
        '0 25px 50px -12px rgb(0 0 0 / 0.25)',
        '0 25px 50px -12px rgb(0 0 0 / 0.25)',
        '0 25px 50px -12px rgb(0 0 0 / 0.25)',
        '0 25px 50px -12px rgb(0 0 0 / 0.25)',
    ],
    components: {
        MuiCssBaseline: {
            styleOverrides: {
                body: {
                    backgroundColor: '#F8FAFC',
                    '&::-webkit-scrollbar': {
                        width: '10px',
                        height: '10px',
                    },
                    '&::-webkit-scrollbar-track': {
                        background: '#F1F5F9',
                    },
                    '&::-webkit-scrollbar-thumb': {
                        background: '#CBD5E1',
                        borderRadius: '5px',
                        '&:hover': {
                            background: '#94A3B8',
                        },
                    },
                },
            },
        },
        MuiCard: {
            styleOverrides: {
                root: {
                    borderRadius: 12,
                    backgroundColor: '#FFFFFF',
                    boxShadow: '0 4px 20px rgba(0,0,0,0.06)',
                    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                    border: '1px solid #F1F5F9',
                    '&:hover': {
                        boxShadow: '0 8px 30px rgba(0,0,0,0.1)',
                        transform: 'translateY(-4px)',
                    },
                },
            },
        },
        MuiButton: {
            styleOverrides: {
                root: {
                    borderRadius: 10,
                    textTransform: 'none',
                    fontWeight: 600,
                    padding: '10px 20px',
                    transition: 'all 0.2s cubic-bezier(0.4, 0, 0.2, 1)',
                    '&:hover': {
                        transform: 'translateY(-2px)',
                    },
                },
                contained: {
                    boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)',
                    '&:hover': {
                        boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.15)',
                    },
                },
                outlined: {
                    borderWidth: '2px',
                    '&:hover': {
                        borderWidth: '2px',
                    },
                },
            },
        },
        MuiDrawer: {
            styleOverrides: {
                paper: {
                    borderRadius: 0,
                    backgroundColor: '#0F172A', // Sidebar background (exact spec)
                    color: '#E5E7EB',            // Sidebar text/icons (exact spec)
                    borderRight: '1px solid rgba(229, 231, 235, 0.1)',
                },
            },
        },
        MuiChip: {
            styleOverrides: {
                root: {
                    borderRadius: 16,
                    fontWeight: 600,
                    transition: 'all 0.2s',
                    '&:hover': {
                        transform: 'scale(1.05)',
                    },
                },
            },
        },
        MuiDialog: {
            styleOverrides: {
                paper: {
                    borderRadius: 20,
                    boxShadow: '0 25px 50px -12px rgb(0 0 0 / 0.25)',
                },
            },
        },
        MuiPaper: {
            styleOverrides: {
                root: {
                    backgroundImage: 'none',
                    backgroundColor: '#FFFFFF',
                },
                elevation1: {
                    boxShadow: '0 2px 8px rgba(0,0,0,0.06)',
                },
                elevation2: {
                    boxShadow: '0 4px 20px rgba(0,0,0,0.06)',
                },
                elevation3: {
                    boxShadow: '0 8px 24px rgba(0,0,0,0.08)',
                },
            },
        },
        MuiTextField: {
            styleOverrides: {
                root: {
                    '& .MuiOutlinedInput-root': {
                        borderRadius: 10,
                        transition: 'all 0.2s',
                        backgroundColor: '#FFFFFF',
                        '&:hover': {
                            '& .MuiOutlinedInput-notchedOutline': {
                                borderColor: '#6366F1',
                            },
                        },
                        '&.Mui-focused': {
                            '& .MuiOutlinedInput-notchedOutline': {
                                borderWidth: '2px',
                                borderColor: '#6366F1',
                            },
                        },
                    },
                },
            },
        },
        MuiIconButton: {
            styleOverrides: {
                root: {
                    transition: 'all 0.2s cubic-bezier(0.4, 0, 0.2, 1)',
                    '&:hover': {
                        transform: 'scale(1.1)',
                        backgroundColor: 'rgba(99, 102, 241, 0.1)',
                    },
                },
            },
        },
        MuiListItem: {
            styleOverrides: {
                root: {
                    borderRadius: 8,
                    transition: 'all 0.2s',
                    '&:hover': {
                        backgroundColor: '#1E293B', // Sidebar hover (exact spec)
                    },
                },
            },
        },
    },
});

export default theme;
