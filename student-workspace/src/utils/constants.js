// Drag and drop type constants
export const ItemTypes = {
    COURSE: 'course',
    PART: 'part',
    SUBJECT: 'subject',
    NOTES: 'notes',
    ASSIGNMENT: 'assignment',
    TEST: 'test',
    AI: 'ai',
};

// Validation rules for nesting
export const canDrop = (dragType, dropType) => {
    const rules = {
        [ItemTypes.COURSE]: ['canvas'],
        [ItemTypes.PART]: [ItemTypes.COURSE],
        [ItemTypes.SUBJECT]: [ItemTypes.PART],
        [ItemTypes.NOTES]: [ItemTypes.SUBJECT],
        [ItemTypes.ASSIGNMENT]: [ItemTypes.SUBJECT],
        [ItemTypes.TEST]: [ItemTypes.SUBJECT],
        [ItemTypes.AI]: [ItemTypes.SUBJECT],
    };

    return rules[dragType]?.includes(dropType) || false;
};

// Get color for component type
export const getTypeColor = (type) => {
    const colors = {
        [ItemTypes.COURSE]: '#6366F1',
        [ItemTypes.PART]: '#8B5CF6',
        [ItemTypes.SUBJECT]: '#EC4899',
        [ItemTypes.NOTES]: '#F59E0B',
        [ItemTypes.ASSIGNMENT]: '#22C55E',
        [ItemTypes.TEST]: '#EF4444',
        [ItemTypes.AI]: '#06B6D4',
    };

    return colors[type] || '#94A3B8';
};

// Get icon name for component type (for lucide-react)
export const getTypeIcon = (type) => {
    const icons = {
        [ItemTypes.COURSE]: 'BookOpen',
        [ItemTypes.PART]: 'FolderOpen',
        [ItemTypes.SUBJECT]: 'FileText',
        [ItemTypes.NOTES]: 'StickyNote',
        [ItemTypes.ASSIGNMENT]: 'Clipboard',
        [ItemTypes.TEST]: 'CheckSquare',
        [ItemTypes.AI]: 'Sparkles',
    };

    return icons[type] || 'Box';
};

// Get label for component type
export const getTypeLabel = (type) => {
    const labels = {
        [ItemTypes.COURSE]: 'Course',
        [ItemTypes.PART]: 'Part / Module',
        [ItemTypes.SUBJECT]: 'Subject',
        [ItemTypes.NOTES]: 'Notes',
        [ItemTypes.ASSIGNMENT]: 'Assignment',
        [ItemTypes.TEST]: 'Test',
        [ItemTypes.AI]: 'AI Assistant',
    };

    return labels[type] || type;
};
