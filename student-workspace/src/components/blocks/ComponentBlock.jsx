import React from 'react';
import { useDrag, useDrop } from 'react-dnd';
import { Card, CardContent, Box, Typography, Chip, Tooltip } from '@mui/material';
import * as Icons from 'lucide-react';
import { ItemTypes, canDrop, getTypeColor, getTypeIcon } from '../../utils/constants';

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
            if (monitor.didDrop()) return;
            return { parentId: component.id, type: component.type };
        },
        collect: (monitor) => ({
            isOver: monitor.isOver({ shallow: true }),
            canDropHere: monitor.canDrop(),
        }),
    });

    // Add click delay to prevent single-click from interfering with double-click
    const clickTimerRef = React.useRef(null);
    const [clickCount, setClickCount] = React.useState(0);

    const handleClick = (e) => {
        if (isTemplate) return;
        e.stopPropagation();

        // Increment click count
        setClickCount(prev => prev + 1);

        // Clear existing timer
        if (clickTimerRef.current) {
            clearTimeout(clickTimerRef.current);
        }

        // Check if component can be drilled down
        const canOpen = ['course', 'part', 'subject'].includes(component.type);

        // Set a timer to handle single click
        clickTimerRef.current = setTimeout(() => {
            // Check if it was a single click (clickCount will be 1)
            // For openable components, don't open config on single click - only on double click
            if (!canOpen || clickCount === 1) {
                // For Notes and Assignment with files, show file viewer instead of config
                if (['notes', 'assignment'].includes(component.type) && component.metadata?.files?.length > 0) {
                    onViewFiles && onViewFiles(component);
                } else if (!canOpen) {
                    // Only open config panel for non-openable components
                    onSelect && onSelect(component.id);
                }
            }
            setClickCount(0);
        }, 250); // 250ms delay to detect double-click
    };

    const handleDoubleClick = (e) => {
        if (isTemplate) return;
        e.stopPropagation();

        // Clear the single-click timer
        if (clickTimerRef.current) {
            clearTimeout(clickTimerRef.current);
        }
        setClickCount(0);

        // Check if component can be drilled down
        const canOpen = ['course', 'part', 'subject'].includes(component.type);

        if (canOpen && onDrillDown) {
            // Drill down into the component
            onDrillDown(component);
        } else {
            // For non-openable components, open config panel
            onSelect && onSelect(component.id);
        }
    };

    // Cleanup timer on unmount
    React.useEffect(() => {
        return () => {
            if (clickTimerRef.current) {
                clearTimeout(clickTimerRef.current);
            }
        };
    }, []);


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
        <Box
            ref={attachRefs}
            sx={{
                opacity: isDragging ? 0.5 : 1,
                cursor: isTemplate ? 'grab' : (canOpen ? 'pointer' : 'auto'),
                marginBottom: isTemplate ? 1.5 : 0,
                width: '100%',
                position: 'relative',
            }}
        >
            <Card
                onClick={handleClick}
                onDoubleClick={handleDoubleClick}
                sx={{
                    borderLeft: `4px solid ${color}`,
                    cursor: isTemplate ? 'grab' : 'pointer',
                    backgroundColor: isTemplate ? 'rgba(30, 41, 59, 0.04)' : 'background.paper',
                    border: isOver && canDropHere ? '2px solid' : (selected ? '2px solid' : 'none'),
                    borderColor: isOver && canDropHere ? 'primary.main' : (selected ? 'primary.main' : 'transparent'),
                    boxShadow: isOver && canDropHere ? 6 : (selected ? 4 : 1),
                    transition: 'all 0.2s ease-in-out',
                    minHeight: isTemplate ? 'auto' : 90,
                    padding: isTemplate ? 1.5 : 2,
                    '&:hover': canOpen ? {
                        transform: 'translateY(-4px)',
                        boxShadow: 8,
                    } : {},
                }}
            >
                <CardContent sx={{ padding: 0, '&:last-child': { paddingBottom: 0 } }}>
                    <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 1.5 }}>
                        {/* Icon */}
                        <Box
                            sx={{
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                width: isTemplate ? 32 : 40,
                                height: isTemplate ? 32 : 40,
                                backgroundColor: `${color}15`,
                                borderRadius: 1,
                                flexShrink: 0,
                                color: color,
                            }}
                        >
                            {IconComponent && <IconComponent size={20} />}
                        </Box>

                        {/* Content */}
                        <Box sx={{ flex: 1, minWidth: 0 }}>
                            <Typography
                                variant={isTemplate ? 'body2' : 'h6'}
                                fontWeight={600}
                                color={isTemplate ? 'text.secondary' : 'text.primary'}
                                sx={{
                                    whiteSpace: 'nowrap',
                                    overflow: 'hidden',
                                    textOverflow: 'ellipsis',
                                    mb: component.metadata?.description ? 0.5 : 0,
                                }}
                            >
                                {component.title}
                            </Typography>

                            {component.metadata?.description && !isTemplate && (
                                <Typography
                                    variant="body2"
                                    color="text.secondary"
                                    sx={{
                                        display: '-webkit-box',
                                        WebkitLineClamp: 2,
                                        WebkitBoxOrient: 'vertical',
                                        overflow: 'hidden',
                                        lineHeight: 1.4,
                                        mb: 1,
                                    }}
                                >
                                    {component.metadata.description}
                                </Typography>
                            )}

                            {/* Hints */}
                            {canOpen && childCount > 0 && (
                                <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5, mt: 1 }}>
                                    <Icons.ChevronRight size={14} color={color} />
                                    <Typography variant="caption" color="primary" fontWeight={500}>
                                        {childCount} item{childCount !== 1 ? 's' : ''} • Double-click to open
                                    </Typography>
                                </Box>
                            )}

                            {canOpen && childCount === 0 && (
                                <Typography variant="caption" color="text.disabled" fontStyle="italic" sx={{ mt: 0.75, display: 'block' }}>
                                    Double-click to open
                                </Typography>
                            )}

                            {['notes', 'assignment'].includes(component.type) && fileCount > 0 && (
                                <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5, mt: 1 }}>
                                    <Icons.Paperclip size={14} color={color} />
                                    <Typography variant="caption" color="primary" fontWeight={500}>
                                        {fileCount} file{fileCount !== 1 ? 's' : ''} • Click to view
                                    </Typography>
                                </Box>
                            )}
                        </Box>

                        {/* Badges */}
                        <Box sx={{ display: 'flex', gap: 1, flexShrink: 0 }}>
                            {!isTemplate && childCount > 0 && (
                                <Chip
                                    label={childCount}
                                    size="small"
                                    color="primary"
                                    sx={{ fontWeight: 600, height: 28 }}
                                />
                            )}

                            {!isTemplate && fileCount > 0 && (
                                <Tooltip title={`${fileCount} files attached`}>
                                    <Chip
                                        icon={<Icons.Paperclip size={14} />}
                                        label={fileCount}
                                        size="small"
                                        color="success"
                                        sx={{ fontWeight: 600, height: 28 }}
                                    />
                                </Tooltip>
                            )}
                        </Box>
                    </Box>
                </CardContent>
            </Card>
        </Box>
    );
};

export default ComponentBlock;
