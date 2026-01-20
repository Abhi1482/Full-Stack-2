import React, { useState } from 'react';
import {
    Dialog,
    DialogTitle,
    DialogContent,
    Box,
    Typography,
    IconButton,
    ImageList,
    ImageListItem,
    ImageListItemBar,
    Button,
    Stack,
} from '@mui/material';
import { X, FileText, Image as ImageIcon, Download, Eye, FolderOpen } from 'lucide-react';

const FileViewerModal = ({ component, onClose }) => {
    const [previewFile, setPreviewFile] = useState(null);
    const files = component?.metadata?.files || [];

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
            <Dialog open={true} onClose={onClose} maxWidth="md" fullWidth>
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
                    <ImageList cols={3} gap={16}>
                        {files.map((file) => (
                            <ImageListItem
                                key={file.id}
                                sx={{
                                    cursor: 'pointer',
                                    borderRadius: 2,
                                    overflow: 'hidden',
                                    border: 1,
                                    borderColor: 'divider',
                                    '&:hover': {
                                        boxShadow: 4,
                                        transform: 'translateY(-4px)',
                                        transition: 'all 0.2s',
                                    },
                                }}
                            >
                                <Box
                                    onClick={() => setPreviewFile(file)}
                                    sx={{
                                        width: '100%',
                                        height: 200,
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        backgroundColor: 'grey.100',
                                        position: 'relative',
                                    }}
                                >
                                    {file.type === 'application/pdf' ? (
                                        <Box sx={{ textAlign: 'center', color: 'primary.main' }}>
                                            <FileText size={48} />
                                            <Typography variant="caption" fontWeight={600} display="block" mt={1}>
                                                PDF
                                            </Typography>
                                        </Box>
                                    ) : (
                                        <img
                                            src={file.data}
                                            alt={file.name}
                                            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                                        />
                                    )}
                                    <Box
                                        sx={{
                                            position: 'absolute',
                                            top: 0,
                                            left: 0,
                                            right: 0,
                                            bottom: 0,
                                            backgroundColor: 'rgba(0, 0, 0, 0.7)',
                                            display: 'flex',
                                            flexDirection: 'column',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            gap: 1,
                                            color: 'white',
                                            opacity: 0,
                                            transition: 'opacity 0.2s',
                                            '&:hover': {
                                                opacity: 1,
                                            },
                                        }}
                                    >
                                        <Eye size={24} />
                                        <Typography variant="caption" fontWeight={600}>Preview</Typography>
                                    </Box>
                                </Box>
                                <ImageListItemBar
                                    title={
                                        <Typography variant="body2" fontWeight={500} noWrap>
                                            {file.name}
                                        </Typography>
                                    }
                                    subtitle={formatFileSize(file.size)}
                                    actionIcon={
                                        <IconButton
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                handleDownload(file);
                                            }}
                                            sx={{ color: 'white' }}
                                        >
                                            <Download size={18} />
                                        </IconButton>
                                    }
                                />
                            </ImageListItem>
                        ))}
                    </ImageList>
                </DialogContent>
            </Dialog>

            {/* Fullscreen Preview */}
            {previewFile && (
                <Dialog
                    open={true}
                    onClose={() => setPreviewFile(null)}
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
                            {previewFile.name}
                        </Typography>
                        <IconButton onClick={() => setPreviewFile(null)} sx={{ color: 'white' }}>
                            <X size={20} />
                        </IconButton>
                    </DialogTitle>
                    <DialogContent sx={{ p: 3, display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: 'grey.900' }}>
                        {previewFile.type === 'application/pdf' ? (
                            <iframe
                                src={previewFile.data}
                                title={previewFile.name}
                                style={{ width: '100%', height: '100%', border: 'none', borderRadius: 8 }}
                            />
                        ) : (
                            <img
                                src={previewFile.data}
                                alt={previewFile.name}
                                style={{ maxWidth: '100%', maxHeight: '100%', objectFit: 'contain' }}
                            />
                        )}
                    </DialogContent>
                </Dialog>
            )}
        </>
    );
};

export default FileViewerModal;
