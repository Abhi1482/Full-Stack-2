import express from 'express';
import {
    getComponents,
    createComponent,
    getComponent,
    updateComponent,
    deleteComponent,
    getChildren,
} from '../controllers/componentController.js';
import { protect } from '../middleware/auth.js';
import { validate } from '../middleware/validate.js';
import {
    validateComponent,
    validateComponentUpdate,
    validateMongoId,
} from '../utils/validators.js';

const router = express.Router();

// All routes are protected
router.use(protect);

router.route('/')
    .get(getComponents)
    .post(validateComponent, validate, createComponent);

router.route('/:id')
    .get(validateMongoId, validate, getComponent)
    .put(validateMongoId, validateComponentUpdate, validate, updateComponent)
    .delete(validateMongoId, validate, deleteComponent);

router.route('/:id/children')
    .get(validateMongoId, validate, getChildren);

export default router;
