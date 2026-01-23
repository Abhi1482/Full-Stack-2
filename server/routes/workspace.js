import express from 'express';
import {
    exportWorkspace,
    importWorkspace,
    clearWorkspace,
} from '../controllers/workspaceController.js';
import { protect } from '../middleware/auth.js';

const router = express.Router();

// All routes are protected
router.use(protect);

router.get('/export', exportWorkspace);
router.post('/import', importWorkspace);
router.delete('/clear', clearWorkspace);

export default router;
