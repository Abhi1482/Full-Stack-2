import React, { useState } from 'react';
import { X, Trash2, Calendar, Palette, Type, FileText } from 'lucide-react';
import { format } from 'date-fns';
import FileUpload from '../ui/FileUpload';
import './ConfigPanel.css';

const ConfigPanel = ({ component, onUpdate, onDelete, onClose }) => {
    const [title, setTitle] = useState(component?.title || '');
    const [description, setDescription] = useState(component?.metadata?.description || '');
    const [dueDate, setDueDate] = useState(component?.metadata?.dueDate || '');
    const [color, setColor] = useState(component?.metadata?.color || 'default');
    const [files, setFiles] = useState(component?.metadata?.files || []);

    if (!component) {
        return (
            <div className="config-panel empty">
                <div className="empty-config">
                    <FileText size={48} className="empty-icon" />
                    <p>Select a component to configure</p>
                </div>
            </div>
        );
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
        <div className="config-panel">
            <div className="config-header">
                <h3>Configure Component</h3>
                <button className="close-btn" onClick={onClose}>
                    <X size={20} />
                </button>
            </div>

            <div className="config-content">
                {/* Title */}
                <div className="config-field">
                    <label>
                        <Type size={16} />
                        <span>Title</span>
                    </label>
                    <input
                        type="text"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        onBlur={handleSave}
                        placeholder="Component title"
                    />
                </div>

                {/* Description */}
                <div className="config-field">
                    <label>
                        <FileText size={16} />
                        <span>Description</span>
                    </label>
                    <textarea
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        onBlur={handleSave}
                        placeholder="Add a description..."
                        rows={4}
                    />
                </div>

                {/* Due Date (for assignments and tests) */}
                {showDatePicker && (
                    <div className="config-field">
                        <label>
                            <Calendar size={16} />
                            <span>Due Date</span>
                        </label>
                        <input
                            type="date"
                            value={dueDate}
                            onChange={(e) => {
                                setDueDate(e.target.value);
                                handleSave();
                            }}
                        />
                        {dueDate && (
                            <p className="field-hint">
                                Due: {format(new Date(dueDate), 'MMMM d, yyyy')}
                            </p>
                        )}
                    </div>
                )}

                {/* File Upload (for notes and assignments) */}
                {showFileUpload && (
                    <div className="config-field">
                        <label>
                            <FileText size={16} />
                            <span>Attached Files</span>
                        </label>
                        <FileUpload
                            files={files}
                            onFilesChange={handleFilesChange}
                            maxSize={10}
                        />
                    </div>
                )}

                {/* Color */}
                <div className="config-field">
                    <label>
                        <Palette size={16} />
                        <span>Color Tag</span>
                    </label>
                    <div className="color-picker">
                        {colorOptions.map((option) => (
                            <button
                                key={option.value}
                                className={`color-option ${color === option.value ? 'active' : ''}`}
                                style={{ backgroundColor: option.color }}
                                onClick={() => {
                                    setColor(option.value);
                                    handleSave();
                                }}
                                title={option.label}
                            />
                        ))}
                    </div>
                </div>

                {/* Component Info */}
                <div className="config-info">
                    <div className="info-row">
                        <span className="info-label">Type:</span>
                        <span className="info-value">{component.type}</span>
                    </div>
                    {component.children?.length > 0 && (
                        <div className="info-row">
                            <span className="info-label">Children:</span>
                            <span className="info-value">{component.children.length}</span>
                        </div>
                    )}
                    {files.length > 0 && (
                        <div className="info-row">
                            <span className="info-label">Files:</span>
                            <span className="info-value">{files.length}</span>
                        </div>
                    )}
                    <div className="info-row">
                        <span className="info-label">Created:</span>
                        <span className="info-value">
                            {component.metadata?.createdAt
                                ? format(new Date(component.metadata.createdAt), 'MMM d, yyyy')
                                : 'N/A'
                            }
                        </span>
                    </div>
                </div>
            </div>

            {/* Actions */}
            <div className="config-actions">
                <button className="delete-btn" onClick={handleDelete}>
                    <Trash2 size={18} />
                    <span>Delete Component</span>
                </button>
            </div>
        </div>
    );
};

export default ConfigPanel;
