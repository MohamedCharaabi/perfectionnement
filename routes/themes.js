import express from 'express';

import { getThemes, getTheme, createTheme, updateTheme, deleteTheme } from '../controllers/themes.js';

const router = express.Router();

router.get('/', getThemes);
router.post('/', createTheme);
router.get('/:id', getTheme);
router.patch('/:id', updateTheme);
router.delete('/:id', deleteTheme);

export default router;