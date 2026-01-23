import Component from '../models/Component.js';

// @desc    Get all components for user
// @route   GET /api/components
// @access  Private
export const getComponents = async (req, res, next) => {
    try {
        const components = await Component.find({ userId: req.user.id })
            .populate('children')
            .populate('metadata.files')
            .sort({ createdAt: 1 });

        res.status(200).json({
            success: true,
            count: components.length,
            data: components,
        });
    } catch (error) {
        next(error);
    }
};

// @desc    Create new component
// @route   POST /api/components
// @access  Private
export const createComponent = async (req, res, next) => {
    try {
        const { type, title, parentId, position, metadata } = req.body;

        // Create component
        const component = await Component.create({
            userId: req.user.id,
            type,
            title,
            parentId: parentId || null,
            position: position || { x: 100, y: 100 },
            metadata: metadata || {},
        });

        // If has parent, update parent's children array
        if (parentId) {
            await Component.findByIdAndUpdate(
                parentId,
                { $push: { children: component._id } },
                { new: true }
            );
        }

        res.status(201).json({
            success: true,
            message: 'Component created successfully',
            data: component,
        });
    } catch (error) {
        next(error);
    }
};

// @desc    Get single component
// @route   GET /api/components/:id
// @access  Private
export const getComponent = async (req, res, next) => {
    try {
        const component = await Component.findById(req.params.id)
            .populate('children')
            .populate('metadata.files');

        if (!component) {
            return res.status(404).json({
                success: false,
                message: 'Component not found',
            });
        }

        // Make sure user owns component
        if (component.userId.toString() !== req.user.id) {
            return res.status(403).json({
                success: false,
                message: 'Not authorized to access this component',
            });
        }

        res.status(200).json({
            success: true,
            data: component,
        });
    } catch (error) {
        next(error);
    }
};

// @desc    Update component
// @route   PUT /api/components/:id
// @access  Private
export const updateComponent = async (req, res, next) => {
    try {
        let component = await Component.findById(req.params.id);

        if (!component) {
            return res.status(404).json({
                success: false,
                message: 'Component not found',
            });
        }

        // Make sure user owns component
        if (component.userId.toString() !== req.user.id) {
            return res.status(403).json({
                success: false,
                message: 'Not authorized to update this component',
            });
        }

        // Update component
        component = await Component.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true, runValidators: true }
        ).populate('metadata.files');

        res.status(200).json({
            success: true,
            message: 'Component updated successfully',
            data: component,
        });
    } catch (error) {
        next(error);
    }
};

// @desc    Delete component (cascade to children)
// @route   DELETE /api/components/:id
// @access  Private
export const deleteComponent = async (req, res, next) => {
    try {
        const component = await Component.findById(req.params.id);

        if (!component) {
            return res.status(404).json({
                success: false,
                message: 'Component not found',
            });
        }

        // Make sure user owns component
        if (component.userId.toString() !== req.user.id) {
            return res.status(403).json({
                success: false,
                message: 'Not authorized to delete this component',
            });
        }

        // Get all descendants
        const descendants = await Component.getDescendants(component._id);
        const allToDelete = [component._id, ...descendants];

        // Delete all components
        await Component.deleteMany({ _id: { $in: allToDelete } });

        // Remove from parent's children array if has parent
        if (component.parentId) {
            await Component.findByIdAndUpdate(
                component.parentId,
                { $pull: { children: component._id } }
            );
        }

        res.status(200).json({
            success: true,
            message: 'Component and children deleted successfully',
            data: {
                deletedCount: allToDelete.length,
            },
        });
    } catch (error) {
        next(error);
    }
};

// @desc    Get children of a component
// @route   GET /api/components/:id/children
// @access  Private
export const getChildren = async (req, res, next) => {
    try {
        const component = await Component.findById(req.params.id);

        if (!component) {
            return res.status(404).json({
                success: false,
                message: 'Component not found',
            });
        }

        // Make sure user owns component
        if (component.userId.toString() !== req.user.id) {
            return res.status(403).json({
                success: false,
                message: 'Not authorized to access this component',
            });
        }

        const children = await Component.find({
            _id: { $in: component.children }
        });

        res.status(200).json({
            success: true,
            count: children.length,
            data: children,
        });
    } catch (error) {
        next(error);
    }
};
