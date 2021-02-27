import express from 'express';

import { getSessions, getSession, createSession, updateSession, deleteSession } from '../controllers/sessions.js';

const router = express.Router();

router.get('/', getSessions);
router.post('/', createSession);
router.get('/:id', getSession);
router.patch('/:id', updateSession);
router.delete('/:id', deleteSession);

export default router;