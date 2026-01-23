import Component from '../models/Component.js';
import File from '../models/File.js';
import fs from 'fs';

// @desc    Export workspace (all components)
// @route   GET /api/workspace/export
// @access  Private
export const exportWorkspace = async (req, res, next) => {
    try {
        const components = await Component.find({ userId: req.user.id })
            .populate('metadata.files')
            .lean();

        res.status(200).json({
            success: true,
            message: 'Workspace exported successfully',
            data: {
                exportDate: new Date().toISOString(),
                componentCount: components.length,
                components,
            },
        });
    } catch (error) {
        next(error);
    }
};

// @desc    Import workspace
// @route   POST /api/workspace/import
// @access  Private
export const importWorkspace = async (req, res, next) => {
    try {
        const { components } = req.body;

        if (!components || !Array.isArray(components)) {
            return res.status(400).json({
                success: false,
                message: 'Invalid workspace data',
            });
        }

        // Map old IDs to new IDs
        const idMap = new Map();
        const createdComponents = [];

        // First pass: create all components
        for (const comp of components) {
            const newComponent = await Component.create({
                userId: req.user.id,
                type: comp.type,
                title: comp.title,
                parentId: null, // Will be updated in second pass
                position: comp.position,
                metadata: {
                    description: comp.metadata?.description || '',
                    color: comp.metadata?.color || 'default',
                    files: [], // Files need to be re-uploaded
                },
            });

            idMap.set(comp._id || comp.id, newComponent._id);
            createdComponents.push({ old: comp, new: newComponent });
        }

        // Second pass: update parent-child relationships
        for (const { old, new: newComp } of createdComponents) {
            if (old.parentId) {
                const newParentId = idMap.get(old.parentId);
                if (newParentId) {
                    await Component.findByIdAndUpdate(newComp._id, { parentId: newParentId });
                    await Component.findByIdAndUpdate(newParentId, {
                        $push: { children: newComp._id },
                    });
                }
            }
        }

        res.status(201).json({
            success: true,
            message: 'Workspace imported successfully',
            data: {
                importedCount: createdComponents.length,
            },
        });
    } catch (error) {
        next(error);
    }
};

// @desc    Clear entire workspace
// @route   DELETE /api/workspace/clear
// @access  Private
export const clearWorkspace = async (req, res, next) => {
    try {
        // Get all user's files
        const files = await File.find({ userId: req.user.id });

        // Delete all files from disk
        for (const file of files) {
            if (fs.existsSync(file.path)) {
                fs.unlinkSync(file.path);
            }
        }

        // Delete all files from database
        await File.deleteMany({ userId: req.user.id });

        // Delete all components
        const result = await Component.deleteMany({ userId: req.user.id });

        res.status(200).json({
            success: true,
            message: 'Workspace cleared successfully',
            data: {
                deletedComponents: result.deletedCount,
                deletedFiles: files.length,
            },
        });
    } catch (error) {
        next(error);
    }
};
