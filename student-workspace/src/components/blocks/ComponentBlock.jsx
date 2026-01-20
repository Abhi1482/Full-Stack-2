import React from 'react';
import { useDrag, useDrop } from 'react-dnd';
import Card from '../ui/Card';
import * as Icons from 'lucide-react';
import { ItemTypes, canDrop, getTypeColor, getTypeIcon } from '../../utils/constants';
import './ComponentBlock.css';

const ComponentBlock = ({
    component,
    isTemplate = false,
    onSelect,
    onViewFiles,
    onDrillDown,
    selected = false,
    showChildrenCount = false,
}) => {
    const IconComponent = Icons[getTypeIcon(component.type)];
    const color = component.metadata?.color !== 'default'
        ? component.metadata?.color
        : getTypeColor(component.type);

    // Drag setup
    const [{ isDragging }, drag] = useDrag({
        type: component.type,
        item: () => ({
            id: component.id,
            type: component.type,
            isTemplate: isTemplate,
            component: component
        }),
        collect: (monitor) => ({
            isDragging: monitor.isDragging(),
        }),
    });

    // Drop setup (for nesting)
    const [{ isOver, canDropHere }, drop] = useDrop({
        accept: Object.values(ItemTypes),
        canDrop: (item) => {
            if (isTemplate) return false;
            return canDrop(item.type, component.type);
        },
        drop: (item, monitor) => {
            if (monitor.didDrop()) return; // Already handled by child
            return { parentId: component.id, type: component.type };
        },
        collect: (monitor) => ({
            isOver: monitor.isOver({ shallow: true }),
            canDropHere: monitor.canDrop(),
        }),
    });

    const handleClick = (e) => {
        if (!isTemplate) {
            e.stopPropagation();

            // For Notes and Assignment with files, show file viewer instead of config
            if (['notes', 'assignment'].includes(component.type) && component.metadata?.files?.length > 0) {
                onViewFiles && onViewFiles(component);
            } else {
                onSelect && onSelect(component.id);
            }
        }
    };

    const handleDoubleClick = (e) => {
        if (!isTemplate && onDrillDown) {
            e.stopPropagation();
            onDrillDown(component);
        }
    };

    // Combine refs for drag and drop
    const attachRefs = (el) => {
        if (!isTemplate) {
            drag(drop(el));
        } else {
            drag(el);
        }
    };

    // Check if component can be opened (drilled into)
    const canOpen = !isTemplate && ['course', 'part', 'subject'].includes(component.type);
    const childCount = component.metadata?.childCount || 0;
    const fileCount = component.metadata?.files?.length || 0;

    return (
        <div
            ref={attachRefs}
            className={`
        component-block
        ${isTemplate ? 'template' : 'instance'}
        ${isDragging ? 'dragging' : ''}
        ${isOver && canDropHere ? 'drop-target' : ''}
        ${canOpen ? 'can-open' : ''}
      `}
            style={isTemplate ? {} : {
                opacity: isDragging ? 0.5 : 1,
            }}
        >
            <Card
                color={color}
                selected={selected}
                hoverable={!isTemplate}
                onClick={handleClick}
                onDoubleClick={handleDoubleClick}
                className="component-block-card"
            >
                <div className="component-header">
                    <div className="component-icon" style={{ color }}>
                        {IconComponent && <IconComponent size={20} />}
                    </div>
                    <div className="component-info">
                        <h4 className="component-title">{component.title}</h4>
                        {component.metadata?.description && !isTemplate && (
                            <p className="component-description">{component.metadata.description}</p>
                        )}
                        {canOpen && childCount > 0 && (
                            <p className="component-hint">
                                <Icons.ChevronRight size={14} />
                                {childCount} item{childCount !== 1 ? 's' : ''} • Double-click to open
                            </p>
                        )}
                        {canOpen && childCount === 0 && (
                            <p className="component-hint-empty">Double-click to open</p>
                        )}
                        {['notes', 'assignment'].includes(component.type) && fileCount > 0 && (
                            <p className="component-hint">
                                <Icons.Paperclip size={14} />
                                {fileCount} file{fileCount !== 1 ? 's' : ''} • Click to view
                            </p>
                        )}
                    </div>
                    {!isTemplate && childCount > 0 && (
                        <div className="component-badge">
                            {childCount}
                        </div>
                    )}
                    {!isTemplate && fileCount > 0 && (
                        <div className="component-badge file-badge" title={`${fileCount} files attached`}>
                            <Icons.Paperclip size={14} />
                            {fileCount}
                        </div>
                    )}
                </div>
            </Card>
        </div>
    );
};

export default ComponentBlock;
