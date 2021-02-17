import express from 'express';

import { getFormers, getFormer, createFormer, updateFormer, deleteFormer } from '../controllers/formers.js';

const router = express.Router();

router.get('/', getFormers);
router.post('/', createFormer);
router.get('/:id', getFormer);
router.patch('/:id', updateFormer);
router.delete('/:id', deleteFormer);

export default router;