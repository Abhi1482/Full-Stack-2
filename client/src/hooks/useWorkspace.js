import { useState, useEffect, useCallback, useRef } from 'react';
import { componentAPI } from '../utils/api';
import { useAuth } from './useAuth.jsx';

export const useWorkspace = () => {
    const { isAuthenticated } = useAuth();
    const [components, setComponents] = useState([]);
    const [selectedId, setSelectedId] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const isInitialMount = useRef(true);

    const loadComponents = useCallback(async () => {
        try {
            setLoading(true);
            setError(null);
            const response = await componentAPI.getAll();

            // Helper to normalize IDs recursively including files
            const normalizeIds = (item) => {
                const normalized = { ...item, id: item._id || item.id };

                // Ensure metadata exists
                if (!normalized.metadata) {
                    normalized.metadata = {};
                }

                if (Array.isArray(normalized.metadata.files)) {
                    normalized.metadata = {
                        ...normalized.metadata,
                        files: normalized.metadata.files.map(f => {
                            if (!f) return null;
                            // If it's a full file object
                            if (typeof f === 'object') {
                                return { ...f, id: f._id || f.id };
                            }
                            // If it's just an ID string (populate failed)
                            return { id: f, _id: f, name: 'Unknown File', size: 0, type: 'unknown' };
                        }).filter(Boolean)
                    };
                }
                return normalized;
            };

            setComponents((response.data || []).map(normalizeIds));
        } catch (err) {
            console.error('Error loading components:', err);
            setError(err.message || 'Failed to load components');
            setComponents([]);
        } finally {
            setLoading(false);
        }
    }, []);

    // Load components from API on mount
    useEffect(() => {
        if (isAuthenticated) {
            loadComponents();
        } else {
            setComponents([]);
            setLoading(false);
        }
    }, [isAuthenticated, loadComponents]);

    // Add new component
    const addComponent = useCallback(async (type, parentId = null, position = { x: 100, y: 100 }) => {
        try {
            const newComponentData = {
                type,
                title: `New ${type.charAt(0).toUpperCase() + type.slice(1)}`,
                parentId,
                position,
                metadata: {
                    description: '',
                    color: 'default',
                },
            };

            const response = await componentAPI.create(newComponentData);
            const newComponent = { ...response.data, id: response.data._id || response.data.id };

            // Update local state
            setComponents(prev => {
                const updated = [...prev, newComponent];

                // Update parent's children array if has parent
                if (parentId) {
                    return updated.map(comp =>
                        comp.id === parentId
                            ? { ...comp, children: [...(comp.children || []), newComponent.id] }
                            : comp
                    );
                }

                return updated;
            });

            return newComponent.id;
        } catch (err) {
            console.error('Error adding component:', err);
            setError(err.message || 'Failed to add component');
            return null;
        }
    }, []);

    // Update component
    const updateComponent = useCallback(async (id, updates) => {
        try {
            // Sanitize updates: Convert file objects to IDs for backend
            const sanitizedUpdates = { ...updates };
            if (sanitizedUpdates.metadata && Array.isArray(sanitizedUpdates.metadata.files)) {
                sanitizedUpdates.metadata = {
                    ...sanitizedUpdates.metadata,
                    files: sanitizedUpdates.metadata.files.map(f => (typeof f === 'object' && (f._id || f.id)) ? (f._id || f.id) : f)
                };
            }

            const response = await componentAPI.update(id, sanitizedUpdates);
            const updatedComponent = { ...response.data, id: response.data._id || response.data.id };

            setComponents(prev =>
                prev.map(comp =>
                    comp.id === id ? { ...comp, ...updatedComponent } : comp
                )
            );
        } catch (err) {
            console.error('Error updating component:', err);
            setError(err.message || 'Failed to update component');
        }
    }, []);

    // Delete component and its children recursively
    const deleteComponent = useCallback(async (id) => {
        try {
            await componentAPI.delete(id);

            // Remove from local state
            setComponents(prev => {
                const component = prev.find(c => c.id === id);
                const parentId = component?.parentId;

                // Filter out deleted component(s) - backend handles cascade
                const filtered = prev.filter(comp => comp.id !== id);

                // Remove from parent's children array
                if (parentId) {
                    return filtered.map(comp =>
                        comp.id === parentId
                            ? { ...comp, children: (comp.children || []).filter(cid => cid !== id) }
                            : comp
                    );
                }

                return filtered;
            });

            if (selectedId === id) {
                setSelectedId(null);
            }

            // Reload components to get accurate state after cascade delete
            await loadComponents();
        } catch (err) {
            console.error('Error deleting component:', err);
            setError(err.message || 'Failed to delete component');
        }
    }, [selectedId, loadComponents]);

    // Get component by ID
    const getComponent = useCallback((id) => {
        return components.find(comp => comp.id === id);
    }, [components]);

    // Get children of a component
    const getChildren = useCallback((id) => {
        const component = components.find(comp => comp.id === id);
        if (!component) return [];

        return (component.children || []).map(childId =>
            components.find(comp => comp.id === childId)
        ).filter(Boolean);
    }, [components]);

    // Clear entire workspace
    const clearWorkspace = useCallback(async () => {
        try {
            await componentAPI.deleteMany({ userId: 'current' }); // Assuming backend handles this
            setComponents([]);
            setSelectedId(null);
        } catch (err) {
            console.error('Error clearing workspace:', err);
            setError(err.message || 'Failed to clear workspace');
        }
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
        loading,
        error,
    };
};
