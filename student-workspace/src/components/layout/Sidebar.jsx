import React from 'react';
import ComponentBlock from '../blocks/ComponentBlock';
import { ItemTypes, getTypeLabel } from '../../utils/constants';
import { Layers, Info } from 'lucide-react';
import './Sidebar.css';

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
        <div className="sidebar">
            <div className="sidebar-header">
                <Layers size={24} />
                <h2>Components</h2>
            </div>

            {currentContext && (
                <div className="sidebar-context">
                    <Info size={14} />
                    <span>Inside: {currentContext.title}</span>
                </div>
            )}

            <div className="sidebar-description">
                <p>{getContextMessage()}</p>
            </div>

            <div className="sidebar-content">
                <div className="component-palette">
                    <div className="palette-section">
                        <h3 className="palette-section-title">Structure</h3>
                        {templates.slice(0, 3).map(template => (
                            <ComponentBlock
                                key={template.id}
                                component={template}
                                isTemplate={true}
                            />
                        ))}
                    </div>

                    <div className="palette-section">
                        <h3 className="palette-section-title">Content</h3>
                        {templates.slice(3, 6).map(template => (
                            <ComponentBlock
                                key={template.id}
                                component={template}
                                isTemplate={true}
                            />
                        ))}
                    </div>

                    <div className="palette-section">
                        <h3 className="palette-section-title">Tools</h3>
                        {templates.slice(6).map(template => (
                            <ComponentBlock
                                key={template.id}
                                component={template}
                                isTemplate={true}
                            />
                        ))}
                    </div>
                </div>
            </div>

            <div className="sidebar-footer">
                <p className="text-muted">Smart Student Workspace</p>
            </div>
        </div>
    );
};

export default Sidebar;
