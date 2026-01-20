import React, { useState, useCallback } from 'react';
import { Upload, X, FileText, Image as ImageIcon, Download, Eye } from 'lucide-react';
import './FileUpload.css';

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
            const isValidSize = file.size <= maxSize * 1024 * 1024; // Convert MB to bytes

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

        // Convert files to base64 for storage
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
        if (previewFile?.id === fileId) {
            setPreviewFile(null);
        }
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
        <div className="file-upload">
            <div
                className={`file-drop-zone ${isDragging ? 'dragging' : ''}`}
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
                onClick={() => document.getElementById('file-input').click()}
            >
                <Upload size={32} />
                <p className="drop-text">Drop PDFs or images here</p>
                <p className="drop-hint">or click to browse</p>
                <input
                    id="file-input"
                    type="file"
                    multiple
                    accept=".pdf,image/*"
                    onChange={handleFileInput}
                    style={{ display: 'none' }}
                />
            </div>

            {files.length > 0 && (
                <div className="file-list">
                    <h4 className="file-list-title">Uploaded Files ({files.length})</h4>
                    {files.map(file => (
                        <div key={file.id} className="file-item">
                            <div className="file-icon">
                                {file.type === 'application/pdf' ? (
                                    <FileText size={20} />
                                ) : (
                                    <ImageIcon size={20} />
                                )}
                            </div>
                            <div className="file-info">
                                <p className="file-name">{file.name}</p>
                                <p className="file-size">{formatFileSize(file.size)}</p>
                            </div>
                            <div className="file-actions">
                                <button
                                    className="file-action-btn"
                                    onClick={() => setPreviewFile(file)}
                                    title="Preview"
                                >
                                    <Eye size={16} />
                                </button>
                                <button
                                    className="file-action-btn"
                                    onClick={() => handleDownload(file)}
                                    title="Download"
                                >
                                    <Download size={16} />
                                </button>
                                <button
                                    className="file-action-btn delete"
                                    onClick={() => handleRemoveFile(file.id)}
                                    title="Remove"
                                >
                                    <X size={16} />
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            )}

            {previewFile && (
                <div className="file-preview-modal" onClick={() => setPreviewFile(null)}>
                    <div className="file-preview-content" onClick={(e) => e.stopPropagation()}>
                        <div className="file-preview-header">
                            <h3>{previewFile.name}</h3>
                            <button
                                className="close-preview-btn"
                                onClick={() => setPreviewFile(null)}
                            >
                                <X size={20} />
                            </button>
                        </div>
                        <div className="file-preview-body">
                            {previewFile.type === 'application/pdf' ? (
                                <iframe
                                    src={previewFile.data}
                                    title={previewFile.name}
                                    width="100%"
                                    height="100%"
                                />
                            ) : (
                                <img
                                    src={previewFile.data}
                                    alt={previewFile.name}
                                    style={{ maxWidth: '100%', maxHeight: '100%' }}
                                />
                            )}
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default FileUpload;
