import React, { useState, useCallback } from 'react';
import {
    Box,
    Paper,
    Typography,
    Button,
    List,
    ListItem,
    ListItemText,
    ListItemSecondaryAction,
    IconButton,
    LinearProgress,
} from '@mui/material';
import { Upload, X, FileText, Image as ImageIcon, Download, Eye } from 'lucide-react';

const FileUpload = ({ files = [], onFilesChange, maxSize = 10 }) => {
    const [isDragging, setIsDragging] = useState(false);
    const [previewFile, setPreviewFile] = useState(null);

    const handleDragOver = useCallback((e) => {
        e.preventDefault();
        e.stopPropagation();
        setIsDragging(true);
    }, []);

    const handleDragLeave = useCallback((e) => {
        e.preventDefault();
        e.stopPropagation();
        setIsDragging(false);
    }, []);

    const handleDrop = useCallback((e) => {
        e.preventDefault();
        e.stopPropagation();
        setIsDragging(false);

        const droppedFiles = Array.from(e.dataTransfer.files);
        processFiles(droppedFiles);
    }, []);

    const handleFileInput = useCallback((e) => {
        const selectedFiles = Array.from(e.target.files);
        processFiles(selectedFiles);
    }, []);

    const processFiles = async (fileList) => {
        const validFiles = fileList.filter(file => {
            const isValidType = file.type === 'application/pdf' || file.type.startsWith('image/');
            const isValidSize = file.size <= maxSize * 1024 * 1024;

            if (!isValidType) {
                alert(`${file.name} is not a valid file type. Only PDFs and images are allowed.`);
                return false;
            }

            if (!isValidSize) {
                alert(`${file.name} exceeds the ${maxSize}MB size limit.`);
                return false;
            }

            return true;
        });

        const filePromises = validFiles.map(file => {
            return new Promise((resolve) => {
                const reader = new FileReader();
                reader.onload = (e) => {
                    resolve({
                        id: Date.now() + Math.random(),
                        name: file.name,
                        type: file.type,
                        size: file.size,
                        data: e.target.result,
                        uploadedAt: new Date().toISOString(),
                    });
                };
                reader.readAsDataURL(file);
            });
        });

        const newFiles = await Promise.all(filePromises);
        onFilesChange([...files, ...newFiles]);
    };

    const handleRemoveFile = (fileId) => {
        onFilesChange(files.filter(f => f.id !== fileId));
    };

    const handleDownload = (file) => {
        const link = document.createElement('a');
        link.href = file.data;
        link.download = file.name;
        link.click();
    };

    const formatFileSize = (bytes) => {
        if (bytes < 1024) return bytes + ' B';
        if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + ' KB';
        return (bytes / (1024 * 1024)).toFixed(1) + ' MB';
    };

    return (
        <Box>
            <Paper
                variant="outlined"
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
                onClick={() => document.getElementById('file-input-mui').click()}
                sx={{
                    p: 4,
                    textAlign: 'center',
                    cursor: 'pointer',
                    borderStyle: 'dashed',
                    borderWidth: 2,
                    borderColor: isDragging ? 'primary.main' : 'divider',
                    backgroundColor: isDragging ? 'action.hover' : 'background.paper',
                    transition: 'all 0.2s',
                    '&:hover': {
                        borderColor: 'primary.main',
                        backgroundColor: 'action.hover',
                    },
                }}
            >
                <Upload size={32} style={{ marginBottom: 12, opacity: 0.5 }} />
                <Typography variant="body1" fontWeight={500} gutterBottom>
                    Drop PDFs or images here
                </Typography>
                <Typography variant="caption" color="text.secondary">
                    or click to browse
                </Typography>
                <input
                    id="file-input-mui"
                    type="file"
                    multiple
                    accept=".pdf,image/*"
                    onChange={handleFileInput}
                    style={{ display: 'none' }}
                />
            </Paper>

            {files.length > 0 && (
                <Box sx={{ mt: 2 }}>
                    <Typography variant="subtitle2" fontWeight={600} gutterBottom>
                        Uploaded Files ({files.length})
                    </Typography>
                    <List sx={{ bgcolor: 'background.paper', borderRadius: 1 }}>
                        {files.map((file, index) => (
                            <ListItem
                                key={file.id}
                                divider={index < files.length - 1}
                                sx={{
                                    '&:hover': {
                                        backgroundColor: 'action.hover',
                                    },
                                }}
                            >
                                <Box sx={{ mr: 2, display: 'flex', alignItems: 'center' }}>
                                    {file.type === 'application/pdf' ? (
                                        <FileText size={24} color="#6366F1" />
                                    ) : (
                                        <ImageIcon size={24} color="#6366F1" />
                                    )}
                                </Box>
                                <ListItemText
                                    primary={file.name}
                                    secondary={formatFileSize(file.size)}
                                    primaryTypographyProps={{ noWrap: true, fontWeight: 500 }}
                                    secondaryTypographyProps={{ variant: 'caption' }}
                                />
                                <ListItemSecondaryAction>
                                    <IconButton edge="end" size="small" onClick={() => handleDownload(file)} sx={{ mr: 0.5 }}>
                                        <Download size={18} />
                                    </IconButton>
                                    <IconButton edge="end" size="small" onClick={() => handleRemoveFile(file.id)} color="error">
                                        <X size={18} />
                                    </IconButton>
                                </ListItemSecondaryAction>
                            </ListItem>
                        ))}
                    </List>
                </Box>
            )}
        </Box>
    );
};

export default FileUpload;
