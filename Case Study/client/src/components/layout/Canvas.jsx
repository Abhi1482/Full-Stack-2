import React from 'react';
import { useDrop } from 'react-dnd';
import { Box, Container, Grid, Typography } from '@mui/material';
import ComponentBlock from '../blocks/ComponentBlock';
import AIAssistant from '../ai/AIAssistant';
import EmptyState from '../ui/EmptyState';
import { ItemTypes, canDrop } from '../../utils/constants';

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
            const canvasElement = document.querySelector('[data-canvas="true"]');
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
                <Grid item xs={12} sm={6} md={4} key={component.id}>
                    <Box sx={{ height: '100%' }}>
                        <AIAssistant
                            subjectTitle={
                                components.find(c => c.id === component.parentId)?.title || 'this subject'
                            }
                        />
                    </Box>
                </Grid>
            );
        }

        // Count children
        const childCount = components.filter(c => c.parentId === component.id).length;

        return (
            <Grid item xs={12} sm={6} md={4} key={component.id}>
                <ComponentBlock
                    component={{ ...component, metadata: { ...component.metadata, childCount } }}
                    isTemplate={false}
                    onSelect={onSelect}
                    onViewFiles={onViewFiles}
                    onDrillDown={onDrillDown}
                    selected={selectedId === component.id}
                    showChildrenCount={true}
                />
            </Grid>
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

    return (
        <Box
            ref={drop}
            data-canvas="true"
            sx={{
                flex: 1,
                position: 'relative',
                overflow: 'auto',
                backgroundColor: '#F8FAFC', // Canvas background - exact spec
                backgroundImage: `
          linear-gradient(rgba(15, 23, 42, 0.04) 1px, transparent 1px),
          linear-gradient(90deg, rgba(15, 23, 42, 0.04) 1px, transparent 1px)
        `, // Very subtle grid - exact spec
                backgroundSize: '20px 20px',
                transition: 'background-color 0.2s ease-in-out',
                ...(isOver && canDropOnCanvas && {
                    backgroundColor: 'rgba(99, 102, 241, 0.02)',
                }),
            }}
        >
            <Container maxWidth="xl" sx={{ py: 5, minHeight: '100%' }}>
                {displayComponents.length === 0 ? (
                    <EmptyState />
                ) : (
                    <Grid container spacing={3}>
                        {displayComponents.map(component => renderComponent(component))}
                    </Grid>
                )}

                {isOver && canDropOnCanvas && (
                    <Box
                        sx={{
                            position: 'fixed',
                            bottom: 40,
                            left: '50%',
                            transform: 'translateX(-50%)',
                            px: 3,
                            py: 1.5,
                            backgroundColor: 'primary.main',
                            color: 'white',
                            borderRadius: 2,
                            boxShadow: 8,
                            fontWeight: 600,
                            fontSize: '14px',
                            pointerEvents: 'none',
                            animation: 'slideIn 0.3s ease-in-out',
                            '@keyframes slideIn': {
                                from: {
                                    opacity: 0,
                                    transform: 'translateX(-50%) translateY(10px)',
                                },
                                to: {
                                    opacity: 1,
                                    transform: 'translateX(-50%) translateY(0)',
                                },
                            },
                        }}
                    >
                        Drop here to add component
                    </Box>
                )}
            </Container>
        </Box>
    );
};

export default Canvas;
