import express from 'express';
import {
    uploadFiles,
    getComponentFiles,
    getFile,
    deleteFile,
} from '../controllers/fileController.js';
import { protect } from '../middleware/auth.js';
import upload from '../middleware/upload.js';
import { validate } from '../middleware/validate.js';
import {
    validateComponentId,
    validateFileId,
} from '../utils/validators.js';

const router = express.Router();

// All routes are protected
router.use(protect);

// Component file routes
router.route('/components/:componentId/files')
    .post(validateComponentId, validate, upload.array('files', 10), uploadFiles)
    .get(validateComponentId, validate, getComponentFiles);

// Individual file routes
router.route('/files/:fileId')
    .get(validateFileId, validate, getFile)
    .delete(validateFileId, validate, deleteFile);

export default router;
