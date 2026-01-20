import { useState, useEffect, useCallback, useRef } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { saveWorkspace, loadWorkspace } from '../utils/localStorage';

export const useWorkspace = () => {
    const [components, setComponents] = useState([]);
    const [selectedId, setSelectedId] = useState(null);
    const isInitialMount = useRef(true);

    // Load workspace from localStorage on mount
    useEffect(() => {
        const loaded = loadWorkspace();
        setComponents(loaded);
    }, []);

    // Save workspace to localStorage whenever components change
    useEffect(() => {
        // Skip saving on initial mount to prevent overwriting loaded data
        if (isInitialMount.current) {
            isInitialMount.current = false;
            return;
        }

        saveWorkspace(components);
    }, [components]);

    // Add new component
    const addComponent = useCallback((type, parentId = null, position = { x: 100, y: 100 }) => {
        const newComponent = {
            id: uuidv4(),
            type,
            title: `New ${type.charAt(0).toUpperCase() + type.slice(1)}`,
            parentId,
            children: [],
            metadata: {
                description: '',
                color: 'default',
                createdAt: new Date().toISOString(),
                files: [], // Store uploaded files
            },
            position,
        };

        setComponents(prev => {
            const updated = [...prev, newComponent];

            // Update parent's children array
            if (parentId) {
                return updated.map(comp =>
                    comp.id === parentId
                        ? { ...comp, children: [...comp.children, newComponent.id] }
                        : comp
                );
            }

            return updated;
        });

        return newComponent.id;
    }, []);

    // Update component
    const updateComponent = useCallback((id, updates) => {
        setComponents(prev =>
            prev.map(comp =>
                comp.id === id ? { ...comp, ...updates } : comp
            )
        );
    }, []);

    // Delete component and its children recursively
    const deleteComponent = useCallback((id) => {
        setComponents(prev => {
            const toDelete = new Set([id]);
            const component = prev.find(c => c.id === id);

            // Recursively find all children
            const findChildren = (compId) => {
                const comp = prev.find(c => c.id === compId);
                if (comp && comp.children) {
                    comp.children.forEach(childId => {
                        toDelete.add(childId);
                        findChildren(childId);
                    });
                }
            };

            findChildren(id);

            // Remove from parent's children array
            const parentId = component?.parentId;

            return prev
                .filter(comp => !toDelete.has(comp.id))
                .map(comp =>
                    comp.id === parentId
                        ? { ...comp, children: comp.children.filter(cid => cid !== id) }
                        : comp
                );
        });

        if (selectedId === id) {
            setSelectedId(null);
        }
    }, [selectedId]);

    // Get component by ID
    const getComponent = useCallback((id) => {
        return components.find(comp => comp.id === id);
    }, [components]);

    // Get children of a component
    const getChildren = useCallback((id) => {
        const component = components.find(comp => comp.id === id);
        if (!component) return [];

        return component.children.map(childId =>
            components.find(comp => comp.id === childId)
        ).filter(Boolean);
    }, [components]);

    // Clear entire workspace
    const clearWorkspace = useCallback(() => {
        setComponents([]);
        setSelectedId(null);
    }, []);

    return {
        components,
        selectedId,
        setSelectedId,
        addComponent,
        updateComponent,
        deleteComponent,
        getComponent,
        getChildren,
        clearWorkspace,
    };
};
