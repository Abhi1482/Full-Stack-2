import React, { useState } from 'react';
import {
    Paper,
    Box,
    Typography,
    TextField,
    IconButton,
    List,
    ListItem,
    ListItemText,
    CircularProgress,
    InputAdornment,
} from '@mui/material';
import { Send, Bot, User } from 'lucide-react';

const AIAssistant = ({ subjectTitle }) => {
    const [messages, setMessages] = useState([
        {
            id: 1,
            role: 'ai',
            content: `Hello! I'm your AI study assistant for ${subjectTitle}. How can I help you today?`,
            timestamp: new Date().toISOString(),
        },
    ]);
    const [input, setInput] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const handleSend = async () => {
        if (!input.trim()) return;

        const userMessage = {
            id: Date.now(),
            role: 'user',
            content: input,
            timestamp: new Date().toISOString(),
        };

        setMessages([...messages, userMessage]);
        setInput('');
        setIsLoading(true);

        // Simulate AI response
        setTimeout(() => {
            const aiMessage = {
                id: Date.now() + 1,
                role: 'ai',
                content: generateMockResponse(input, subjectTitle),
                timestamp: new Date().toISOString(),
            };
            setMessages(prev => [...prev, aiMessage]);
            setIsLoading(false);
        }, 1500);
    };

    const generateMockResponse = (query, subject) => {
        const responses = {
            default: `Based on ${subject}, here's what I found:\n\n• Key concept analysis\n• Related topics to explore\n• Study recommendations\n\nWould you like me to elaborate on any of these points?`,
            explain: `Let me explain ${subject} concepts:\n\n1. **Core Principles**: Understanding the fundamentals\n2. **Applications**: How it's used in practice\n3. **Common Pitfalls**: What to watch out for\n\nNeed more details on any specific aspect?`,
            summarize: `Here's a summary of ${subject}:\n\n**Main Points:**\n- Foundation concepts\n- Key methodologies\n- Practical applications\n\n**Recommended Focus Areas:**\n- Practice problems\n- Real-world examples`,
        };

        const lowerQuery = query.toLowerCase();
        if (lowerQuery.includes('explain') || lowerQuery.includes('what is')) {
            return responses.explain;
        } else if (lowerQuery.includes('summarize') || lowerQuery.includes('summary')) {
            return responses.summarize;
        }
        return responses.default;
    };

    const handleKeyPress = (e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            handleSend();
        }
    };

    return (
        <Paper
            elevation={2}
            sx={{
                height: 500,
                display: 'flex',
                flexDirection: 'column',
                overflow: 'hidden',
            }}
        >
            {/* Header */}
            <Box sx={{ p: 2, borderBottom: 1, borderColor: 'divider', backgroundColor: 'primary.main' }}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                    <Box
                        sx={{
                            width: 40,
                            height: 40,
                            borderRadius: '50%',
                            backgroundColor: 'white',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            color: 'primary.main',
                        }}
                    >
                        <Bot size={24} />
                    </Box>
                    <Box>
                        <Typography variant="subtitle1" fontWeight={600} color="white">
                            AI Study Assistant
                        </Typography>
                        <Typography variant="caption" color="rgba(255, 255, 255, 0.8)">
                            for {subjectTitle}
                        </Typography>
                    </Box>
                </Box>
            </Box>

            {/* Messages */}
            <Box sx={{ flex: 1, overflowY: 'auto', p: 2, backgroundColor: 'grey.50' }}>
                <List>
                    {messages.map((message) => (
                        <ListItem
                            key={message.id}
                            sx={{
                                flexDirection: 'column',
                                alignItems: message.role === 'user' ? 'flex-end' : 'flex-start',
                                p: 0,
                                mb: 2,
                            }}
                        >
                            <Box
                                sx={{
                                    maxWidth: '80%',
                                    p: 1.5,
                                    borderRadius: 2,
                                    backgroundColor: message.role === 'user' ? 'primary.main' : 'white',
                                    color: message.role === 'user' ? 'white' : 'text.primary',
                                    boxShadow: 1,
                                }}
                            >
                                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 0.5 }}>
                                    {message.role === 'ai' ? <Bot size={16} /> : <User size={16} />}
                                    <Typography variant="caption" fontWeight={600}>
                                        {message.role === 'ai' ? 'AI Assistant' : 'You'}
                                    </Typography>
                                </Box>
                                <Typography variant="body2" sx={{ whiteSpace: 'pre-wrap' }}>
                                    {message.content}
                                </Typography>
                            </Box>
                        </ListItem>
                    ))}
                    {isLoading && (
                        <ListItem sx={{ flexDirection: 'column', alignItems: 'flex-start', p: 0 }}>
                            <Box
                                sx={{
                                    maxWidth: '80%',
                                    p: 1.5,
                                    borderRadius: 2,
                                    backgroundColor: 'white',
                                    boxShadow: 1,
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: 1,
                                }}
                            >
                                <CircularProgress size={16} />
                                <Typography variant="body2" color="text.secondary">
                                    AI is thinking...
                                </Typography>
                            </Box>
                        </ListItem>
                    )}
                </List>
            </Box>

            {/* Input */}
            <Box sx={{ p: 2, borderTop: 1, borderColor: 'divider' }}>
                <TextField
                    fullWidth
                    multiline
                    maxRows={3}
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyPress={handleKeyPress}
                    placeholder="Ask a question..."
                    size="small"
                    InputProps={{
                        endAdornment: (
                            <InputAdornment position="end">
                                <IconButton
                                    onClick={handleSend}
                                    disabled={!input.trim() || isLoading}
                                    color="primary"
                                    edge="end"
                                >
                                    <Send size={20} />
                                </IconButton>
                            </InputAdornment>
                        ),
                    }}
                />
            </Box>
        </Paper>
    );
};

export default AIAssistant;
