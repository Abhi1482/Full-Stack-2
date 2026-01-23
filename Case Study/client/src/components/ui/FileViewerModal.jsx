import React, { useState, useEffect } from 'react';
import {
    Dialog,
    DialogTitle,
    DialogContent,
    Box,
    Typography,
    IconButton,
    List,
    ListItem,
    ListItemText,
    ListItemSecondaryAction,
    Button,
    CircularProgress,
} from '@mui/material';
import { X, FileText, Image as ImageIcon, Download, Eye, FolderOpen } from 'lucide-react';
import { fileAPI } from '../../utils/api';

const FileViewerModal = ({ component, onClose }) => {
    const [previewFile, setPreviewFile] = useState(null);
    const [previewUrl, setPreviewUrl] = useState(null);
    const [loading, setLoading] = useState(false);
    const files = component?.metadata?.files || [];

    // Cleanup object URL
    useEffect(() => {
        return () => {
            if (previewUrl) {
                URL.revokeObjectURL(previewUrl);
            }
        };
    }, [previewUrl]);

    const handleDownload = async (file) => {
        try {
            const response = await fileAPI.get(file.id || file._id);
            const url = window.URL.createObjectURL(new Blob([response]));
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', file.originalName || file.name);
            document.body.appendChild(link);
            link.click();
            link.remove();
            window.URL.revokeObjectURL(url);
        } catch (error) {
            console.error('Download failed:', error);
            alert('Failed to download file');
        }
    };

    const handlePreview = async (file) => {
        try {
            setLoading(true);
            setPreviewFile(file);
            const response = await fileAPI.get(file.id || file._id);
            const url = window.URL.createObjectURL(new Blob([response], { type: file.mimeType || file.type }));
            setPreviewUrl(url);
        } catch (error) {
            console.error('Preview failed:', error);
            alert('Failed to load preview');
            setPreviewFile(null);
        } finally {
            setLoading(false);
        }
    };

    const handleClosePreview = () => {
        setPreviewFile(null);
        setPreviewUrl(null);
    };

    const formatFileSize = (bytes) => {
        if (!bytes) return '0 B';
        if (bytes < 1024) return bytes + ' B';
        if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + ' KB';
        return (bytes / (1024 * 1024)).toFixed(1) + ' MB';
    };

    if (files.length === 0) {
        return (
            <Dialog open={true} onClose={onClose} maxWidth="sm" fullWidth>
                <DialogTitle sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <Typography variant="h6" fontWeight={600}>{component.title}</Typography>
                    <IconButton onClick={onClose} size="small">
                        <X size={20} />
                    </IconButton>
                </DialogTitle>
                <DialogContent>
                    <Box sx={{ textAlign: 'center', py: 6 }}>
                        <FolderOpen size={64} style={{ opacity: 0.3, marginBottom: 24 }} />
                        <Typography variant="h6" gutterBottom>No files attached yet</Typography>
                        <Typography variant="body2" color="text.secondary">
                            Use the config panel to upload files
                        </Typography>
                    </Box>
                </DialogContent>
            </Dialog>
        );
    }

    return (
        <>
            <Dialog open={true} onClose={onClose} maxWidth="sm" fullWidth>
                <DialogTitle sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', pb: 1 }}>
                    <Box>
                        <Typography variant="h6" fontWeight={600}>{component.title}</Typography>
                        <Typography variant="caption" color="text.secondary">
                            {files.length} file{files.length !== 1 ? 's' : ''} attached
                        </Typography>
                    </Box>
                    <IconButton onClick={onClose} size="small">
                        <X size={20} />
                    </IconButton>
                </DialogTitle>
                <DialogContent sx={{ pt: 2 }}>
                    <List>
                        {files.map((file) => (
                            <ListItem
                                key={file.id || file._id}
                                divider
                                sx={{
                                    borderRadius: 1,
                                    '&:hover': { bgcolor: 'action.hover' }
                                }}
                            >
                                <Box sx={{ mr: 2, display: 'flex', alignItems: 'center' }}>
                                    {(file.mimeType || file.type)?.includes('pdf') ? (
                                        <FileText size={24} color="#6366F1" />
                                    ) : (
                                        <ImageIcon size={24} color="#6366F1" />
                                    )}
                                </Box>
                                <ListItemText
                                    primary={file.originalName || file.name}
                                    secondary={formatFileSize(file.size)}
                                    primaryTypographyProps={{ noWrap: true, fontWeight: 500 }}
                                />
                                <ListItemSecondaryAction>
                                    <IconButton
                                        onClick={() => handlePreview(file)}
                                        color="primary"
                                        title="Preview"
                                        size="small"
                                        sx={{ mr: 1 }}
                                    >
                                        <Eye size={18} />
                                    </IconButton>
                                    <IconButton
                                        onClick={() => handleDownload(file)}
                                        title="Download"
                                        size="small"
                                    >
                                        <Download size={18} />
                                    </IconButton>
                                </ListItemSecondaryAction>
                            </ListItem>
                        ))}
                    </List>
                </DialogContent>
            </Dialog>

            {/* Fullscreen Preview */}
            {previewFile && (
                <Dialog
                    open={true}
                    onClose={handleClosePreview}
                    maxWidth="xl"
                    fullWidth
                    PaperProps={{
                        sx: {
                            height: '90vh',
                            backgroundColor: 'grey.900',
                        },
                    }}
                >
                    <DialogTitle sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', color: 'white' }}>
                        <Typography variant="h6" fontWeight={600} noWrap>
                            {previewFile.originalName || previewFile.name}
                        </Typography>
                        <IconButton onClick={handleClosePreview} sx={{ color: 'white' }}>
                            <X size={20} />
                        </IconButton>
                    </DialogTitle>
                    <DialogContent sx={{ p: 3, display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: 'grey.900' }}>
                        {loading ? (
                            <CircularProgress sx={{ color: 'white' }} />
                        ) : previewUrl ? (
                            (previewFile.mimeType || previewFile.type)?.includes('pdf') ? (
                                <iframe
                                    src={previewUrl}
                                    title={previewFile.name}
                                    style={{ width: '100%', height: '100%', border: 'none', borderRadius: 8 }}
                                />
                            ) : (
                                <img
                                    src={previewUrl}
                                    alt={previewFile.name}
                                    style={{ maxWidth: '100%', maxHeight: '100%', objectFit: 'contain' }}
                                />
                            )
                        ) : (
                            <Typography color="error">Failed to load preview</Typography>
                        )}
                    </DialogContent>
                </Dialog>
            )}
        </>
    );
};


export default FileViewerModal;
