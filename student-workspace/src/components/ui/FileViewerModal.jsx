import React, { useState } from 'react';
import { X, FileText, Image as ImageIcon, Download, Eye, FolderOpen } from 'lucide-react';
import './FileViewerModal.css';

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
            <div className="file-viewer-modal" onClick={onClose}>
                <div className="file-viewer-content empty" onClick={(e) => e.stopPropagation()}>
                    <div className="file-viewer-header">
                        <h3>{component.title}</h3>
                        <button className="close-btn" onClick={onClose}>
                            <X size={20} />
                        </button>
                    </div>
                    <div className="empty-files">
                        <FolderOpen size={64} className="empty-icon" />
                        <p>No files attached yet</p>
                        <p className="text-muted">Use the config panel to upload files</p>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="file-viewer-modal" onClick={onClose}>
            <div className="file-viewer-content" onClick={(e) => e.stopPropagation()}>
                <div className="file-viewer-header">
                    <div>
                        <h3>{component.title}</h3>
                        <p className="file-count">{files.length} file{files.length !== 1 ? 's' : ''} attached</p>
                    </div>
                    <button className="close-btn" onClick={onClose}>
                        <X size={20} />
                    </button>
                </div>

                <div className="file-viewer-body">
                    <div className="file-grid">
                        {files.map((file) => (
                            <div key={file.id} className="file-card">
                                <div
                                    className="file-preview-thumb"
                                    onClick={() => setPreviewFile(file)}
                                >
                                    {file.type === 'application/pdf' ? (
                                        <div className="pdf-thumb">
                                            <FileText size={48} />
                                            <span>PDF</span>
                                        </div>
                                    ) : (
                                        <img src={file.data} alt={file.name} />
                                    )}
                                    <div className="preview-overlay">
                                        <Eye size={24} />
                                        <span>Preview</span>
                                    </div>
                                </div>
                                <div className="file-card-info">
                                    <p className="file-card-name" title={file.name}>{file.name}</p>
                                    <p className="file-card-size">{formatFileSize(file.size)}</p>
                                    <button
                                        className="download-file-btn"
                                        onClick={() => handleDownload(file)}
                                    >
                                        <Download size={14} />
                                        Download
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {previewFile && (
                    <div className="fullscreen-preview" onClick={() => setPreviewFile(null)}>
                        <div className="fullscreen-preview-content" onClick={(e) => e.stopPropagation()}>
                            <div className="fullscreen-preview-header">
                                <h4>{previewFile.name}</h4>
                                <button
                                    className="close-preview-btn"
                                    onClick={() => setPreviewFile(null)}
                                >
                                    <X size={20} />
                                </button>
                            </div>
                            <div className="fullscreen-preview-body">
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
                                    />
                                )}
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default FileViewerModal;
