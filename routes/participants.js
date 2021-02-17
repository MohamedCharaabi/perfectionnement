import express from 'express';

import { getParticipants, getParticipant, createParticipant, updateParticipant, deleteParticipant } from '../controllers/participants.js';

const router = express.Router();

router.get('/', getParticipants);
router.post('/', createParticipant);
router.get('/:id', getParticipant);
router.patch('/:id', updateParticipant);
router.delete('/:id', deleteParticipant);

export default router;