import React from 'react';
import { useDrop } from 'react-dnd';
import ComponentBlock from '../blocks/ComponentBlock';
import AIAssistant from '../ai/AIAssistant';
import EmptyState from '../ui/EmptyState';
import { ItemTypes, canDrop } from '../../utils/constants';
import './Canvas.css';

const Canvas = ({ components, currentContext, onDrop, onSelect, onViewFiles, onDrillDown, selectedId }) => {
    const [{ isOver, canDropOnCanvas }, drop] = useDrop({
        accept: Object.values(ItemTypes),
        canDrop: (item) => {
            // In root context, only allow courses
            if (!currentContext) {
                return item.type === ItemTypes.COURSE;
            }

            // Get context component to determine what can be dropped
            const contextComponent = components.find(c => c.id === currentContext);
            if (!contextComponent) return false;

            // Check if item can be dropped in this context
            return canDrop(item.type, contextComponent.type);
        },
        drop: (item, monitor) => {
            // Check if a child component already handled the drop
            if (monitor.didDrop()) {
                const dropResult = monitor.getDropResult();
                if (dropResult && dropResult.parentId) {
                    onDrop(item, dropResult.parentId, null);
                }
                return;
            }

            // Handle drop in current context
            const offset = monitor.getClientOffset();
            const canvasElement = document.querySelector('.canvas-content');
            const canvasRect = canvasElement.getBoundingClientRect();

            const position = {
                x: offset.x - canvasRect.left,
                y: offset.y - canvasRect.top,
            };

            // Drop with current context as parent (or null for root)
            onDrop(item, currentContext, position);
        },
        collect: (monitor) => ({
            isOver: monitor.isOver({ shallow: true }),
            canDropOnCanvas: monitor.canDrop(),
        }),
    });

    // Get components to display based on current context
    const displayComponents = currentContext
        ? components.filter(c => c.parentId === currentContext)
        : components.filter(c => !c.parentId); // Root level

    // Render component (no nesting in view, just cards)
    const renderComponent = (component) => {
        // Special rendering for AI component
        if (component.type === ItemTypes.AI) {
            return (
                <div key={component.id} className="canvas-component ai-component">
                    <AIAssistant
                        subjectTitle={
                            components.find(c => c.id === component.parentId)?.title || 'this subject'
                        }
                    />
                </div>
            );
        }

        // Count children
        const childCount = components.filter(c => c.parentId === component.id).length;

        return (
            <ComponentBlock
                key={component.id}
                component={{ ...component, metadata: { ...component.metadata, childCount } }}
                isTemplate={false}
                onSelect={onSelect}
                onViewFiles={onViewFiles}
                onDrillDown={onDrillDown}
                selected={selectedId === component.id}
                showChildrenCount={true}
            />
        );
    };

    // Get context info for empty state
    const getEmptyStateMessage = () => {
        if (!currentContext) {
            return {
                title: 'Start Building Your Workspace',
                description: 'Drag a Course from the sidebar to begin organizing your studies',
            };
        }

        const contextComponent = components.find(c => c.id === currentContext);
        if (!contextComponent) return {};

        const messages = {
            course: {
                title: 'Add Parts or Modules',
                description: 'Drag Part/Module blocks to organize this course into sections',
            },
            part: {
                title: 'Add Subjects',
                description: 'Drag Subject blocks to add topics to this module',
            },
            subject: {
                title: 'Add Content',
                description: 'Drag Notes, Assignments, Tests, or AI Assistant blocks',
            },
        };

        return messages[contextComponent.type] || {};
    };

    const emptyMessage = getEmptyStateMessage();

    return (
        <div className="canvas" ref={drop}>
            <div className={`canvas-content ${isOver && canDropOnCanvas ? 'drop-active' : ''}`}>
                {displayComponents.length === 0 ? (
                    <div className="empty-state">
                        <div className="empty-state-icon">
                            <span className="empty-icon">📚</span>
                        </div>
                        <h2>{emptyMessage.title}</h2>
                        <p className="text-muted">{emptyMessage.description}</p>
                    </div>
                ) : (
                    <div className="canvas-grid-layout">
                        {displayComponents.map(component => renderComponent(component))}
                    </div>
                )}

                {isOver && canDropOnCanvas && (
                    <div className="drop-indicator">
                        Drop here to add component
                    </div>
                )}
            </div>

            {/* Grid pattern background */}
            <div className="canvas-grid"></div>
        </div>
    );
};

export default Canvas;
