import File from '../models/File.js';
import Component from '../models/Component.js';
import fs from 'fs';
import path from 'path';

// @desc    Upload files to component
// @route   POST /api/components/:componentId/files
// @access  Private
export const uploadFiles = async (req, res, next) => {
    try {
        const { componentId } = req.params;

        // Check if component exists and user owns it
        const component = await Component.findById(componentId);
        if (!component) {
            return res.status(404).json({
                success: false,
                message: 'Component not found',
            });
        }

        if (component.userId.toString() !== req.user.id) {
            return res.status(403).json({
                success: false,
                message: 'Not authorized to upload files to this component',
            });
        }

        // Check if files were uploaded
        if (!req.files || req.files.length === 0) {
            return res.status(400).json({
                success: false,
                message: 'Please upload at least one file',
            });
        }

        // Create file records
        const fileRecords = [];
        for (const file of req.files) {
            const fileRecord = await File.create({
                userId: req.user.id,
                componentId,
                originalName: file.originalname,
                storedName: file.filename,
                mimeType: file.mimetype,
                size: file.size,
                path: file.path,
            });

            fileRecords.push(fileRecord);

            // Add file reference to component
            await Component.findByIdAndUpdate(
                componentId,
                { $push: { 'metadata.files': fileRecord._id } }
            );
        }

        res.status(201).json({
            success: true,
            message: 'Files uploaded successfully',
            count: fileRecords.length,
            data: fileRecords,
        });
    } catch (error) {
        next(error);
    }
};

// @desc    Get files for a component
// @route   GET /api/components/:componentId/files
// @access  Private
export const getComponentFiles = async (req, res, next) => {
    try {
        const { componentId } = req.params;

        // Check if component exists and user owns it
        const component = await Component.findById(componentId);
        if (!component) {
            return res.status(404).json({
                success: false,
                message: 'Component not found',
            });
        }

        if (component.userId.toString() !== req.user.id) {
            return res.status(403).json({
                success: false,
                message: 'Not authorized to access files from this component',
            });
        }

        const files = await File.find({ componentId });

        res.status(200).json({
            success: true,
            count: files.length,
            data: files,
        });
    } catch (error) {
        next(error);
    }
};

// @desc    Get/download single file
// @route   GET /api/files/:fileId
// @access  Private
export const getFile = async (req, res, next) => {
    try {
        const file = await File.findById(req.params.fileId);

        if (!file) {
            return res.status(404).json({
                success: false,
                message: 'File not found',
            });
        }

        // Make sure user owns the file
        if (file.userId.toString() !== req.user.id) {
            return res.status(403).json({
                success: false,
                message: 'Not authorized to access this file',
            });
        }

        // Check if file exists on disk
        if (!fs.existsSync(file.path)) {
            return res.status(404).json({
                success: false,
                message: 'File not found on server',
            });
        }

        // Send file
        res.setHeader('Content-Type', file.mimeType);
        res.setHeader('Content-Disposition', `inline; filename="${file.originalName}"`);
        res.sendFile(path.resolve(file.path));
    } catch (error) {
        next(error);
    }
};

// @desc    Delete file
// @route   DELETE /api/files/:fileId
// @access  Private
export const deleteFile = async (req, res, next) => {
    try {
        const file = await File.findById(req.params.fileId);

        if (!file) {
            return res.status(404).json({
                success: false,
                message: 'File not found',
            });
        }

        // Make sure user owns the file
        if (file.userId.toString() !== req.user.id) {
            return res.status(403).json({
                success: false,
                message: 'Not authorized to delete this file',
            });
        }

        // Remove from component
        await Component.findByIdAndUpdate(
            file.componentId,
            { $pull: { 'metadata.files': file._id } }
        );

        // Delete from disk
        if (fs.existsSync(file.path)) {
            fs.unlinkSync(file.path);
        }

        // Delete from database
        await File.findByIdAndDelete(req.params.fileId);

        res.status(200).json({
            success: true,
            message: 'File deleted successfully',
        });
    } catch (error) {
        next(error);
    }
};
