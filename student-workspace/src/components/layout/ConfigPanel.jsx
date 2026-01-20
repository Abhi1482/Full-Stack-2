import React, { useState } from 'react';
import {
    Drawer,
    Box,
    Typography,
    TextField,
    Button,
    IconButton,
    Divider,
    ToggleButton,
    ToggleButtonGroup,
    Stack,
} from '@mui/material';
import { X, Trash2, Calendar, Palette, Type, FileText } from 'lucide-react';
import { format } from 'date-fns';
import FileUpload from '../ui/FileUpload';

const ConfigPanel = ({ component, onUpdate, onDelete, onClose }) => {
    const [title, setTitle] = useState(component?.title || '');
    const [description, setDescription] = useState(component?.metadata?.description || '');
    const [dueDate, setDueDate] = useState(component?.metadata?.dueDate || '');
    const [color, setColor] = useState(component?.metadata?.color || 'default');
    const [files, setFiles] = useState(component?.metadata?.files || []);

    if (!component) {
        return null;
    }

    const handleSave = () => {
        onUpdate(component.id, {
            title,
            metadata: {
                ...component.metadata,
                description,
                dueDate,
                color,
                files,
            },
        });
    };

    const handleDelete = () => {
        if (window.confirm(`Are you sure you want to delete "${component.title}" and all its children?`)) {
            onDelete(component.id);
            onClose();
        }
    };

    const handleFilesChange = (newFiles) => {
        setFiles(newFiles);
        onUpdate(component.id, {
            title,
            metadata: {
                ...component.metadata,
                description,
                dueDate,
                color,
                files: newFiles,
            },
        });
    };

    const colorOptions = [
        { value: 'default', label: 'Default', color: '#94A3B8' },
        { value: '#6366F1', label: 'Indigo', color: '#6366F1' },
        { value: '#8B5CF6', label: 'Purple', color: '#8B5CF6' },
        { value: '#EC4899', label: 'Pink', color: '#EC4899' },
        { value: '#F59E0B', label: 'Amber', color: '#F59E0B' },
        { value: '#22C55E', label: 'Green', color: '#22C55E' },
        { value: '#EF4444', label: 'Red', color: '#EF4444' },
        { value: '#06B6D4', label: 'Cyan', color: '#06B6D4' },
    ];

    const showDatePicker = component.type === 'assignment' || component.type === 'test';
    const showFileUpload = component.type === 'notes' || component.type === 'assignment';

    return (
        <Drawer
            anchor="right"
            open={true}
            onClose={onClose}
            sx={{
                '& .MuiDrawer-paper': {
                    width: 400,
                    maxWidth: '90vw',
                    backgroundColor: '#FFFFFF',        // Right panel background - exact spec
                    borderLeft: '1px solid #E5E7EB', // Right panel border - exact spec
                },
            }}
        >
            {/* Header */}
            <Box sx={{ p: 2.5, display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderBottom: 1, borderColor: 'divider' }}>
                <Typography variant="h6" fontWeight={600}>
                    Configure Component
                </Typography>
                <IconButton onClick={onClose} size="small">
                    <X size={20} />
                </IconButton>
            </Box>

            {/* Content */}
            <Box sx={{ flex: 1, overflowY: 'auto', p: 3 }}>
                <Stack spacing={3}>
                    {/* Title */}
                    <Box>
                        <Typography variant="subtitle2" fontWeight={600} gutterBottom sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                            <Type size={16} />
                            Title
                        </Typography>
                        <TextField
                            fullWidth
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            onBlur={handleSave}
                            placeholder="Component title"
                            size="small"
                        />
                    </Box>

                    {/* Description */}
                    <Box>
                        <Typography variant="subtitle2" fontWeight={600} gutterBottom sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                            <FileText size={16} />
                            Description
                        </Typography>
                        <TextField
                            fullWidth
                            multiline
                            rows={4}
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            onBlur={handleSave}
                            placeholder="Add a description..."
                            size="small"
                        />
                    </Box>

                    {/* Due Date */}
                    {showDatePicker && (
                        <Box>
                            <Typography variant="subtitle2" fontWeight={600} gutterBottom sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                <Calendar size={16} />
                                Due Date
                            </Typography>
                            <TextField
                                fullWidth
                                type="date"
                                value={dueDate}
                                onChange={(e) => {
                                    setDueDate(e.target.value);
                                    handleSave();
                                }}
                                size="small"
                                InputLabelProps={{ shrink: true }}
                            />
                            {dueDate && (
                                <Typography variant="caption" color="text.secondary" sx={{ mt: 1, display: 'block' }}>
                                    Due: {format(new Date(dueDate), 'MMMM d, yyyy')}
                                </Typography>
                            )}
                        </Box>
                    )}

                    {/* File Upload */}
                    {showFileUpload && (
                        <Box>
                            <Typography variant="subtitle2" fontWeight={600} gutterBottom sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                <FileText size={16} />
                                Attached Files
                            </Typography>
                            <FileUpload
                                files={files}
                                onFilesChange={handleFilesChange}
                                maxSize={10}
                            />
                        </Box>
                    )}

                    {/* Color Tag */}
                    <Box>
                        <Typography variant="subtitle2" fontWeight={600} gutterBottom sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                            <Palette size={16} />
                            Color Tag
                        </Typography>
                        <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
                            {colorOptions.map((option) => (
                                <Box
                                    key={option.value}
                                    onClick={() => {
                                        setColor(option.value);
                                        handleSave();
                                    }}
                                    sx={{
                                        width: 36,
                                        height: 36,
                                        borderRadius: '50%',
                                        backgroundColor: option.color,
                                        cursor: 'pointer',
                                        border: color === option.value ? '3px solid' : '3px solid transparent',
                                        borderColor: color === option.value ? 'primary.main' : 'transparent',
                                        transition: 'all 0.2s',
                                        '&:hover': {
                                            transform: 'scale(1.1)',
                                            boxShadow: 2,
                                        },
                                    }}
                                    title={option.label}
                                />
                            ))}
                        </Box>
                    </Box>

                    <Divider />

                    {/* Component Info */}
                    <Box>
                        <Typography variant="subtitle2" fontWeight={600} gutterBottom>
                            Component Information
                        </Typography>
                        <Stack spacing={1.5}>
                            <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                                <Typography variant="body2" color="text.secondary">Type:</Typography>
                                <Typography variant="body2" fontWeight={500} textTransform="capitalize">{component.type}</Typography>
                            </Box>
                            {component.children?.length > 0 && (
                                <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                                    <Typography variant="body2" color="text.secondary">Children:</Typography>
                                    <Typography variant="body2" fontWeight={500}>{component.children.length}</Typography>
                                </Box>
                            )}
                            {files.length > 0 && (
                                <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                                    <Typography variant="body2" color="text.secondary">Files:</Typography>
                                    <Typography variant="body2" fontWeight={500}>{files.length}</Typography>
                                </Box>
                            )}
                            <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                                <Typography variant="body2" color="text.secondary">Created:</Typography>
                                <Typography variant="body2" fontWeight={500}>
                                    {component.metadata?.createdAt
                                        ? format(new Date(component.metadata.createdAt), 'MMM d, yyyy')
                                        : 'N/A'
                                    }
                                </Typography>
                            </Box>
                        </Stack>
                    </Box>
                </Stack>
            </Box>

            {/* Actions */}
            <Box sx={{ p: 2.5, borderTop: 1, borderColor: 'divider' }}>
                <Button
                    fullWidth
                    variant="outlined"
                    color="error"
                    startIcon={<Trash2 size={18} />}
                    onClick={handleDelete}
                >
                    Delete Component
                </Button>
            </Box>
        </Drawer>
    );
};

export default ConfigPanel;
