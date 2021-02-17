import express from 'express';

import mongoose from 'mongoose';
import Participant from '../models/participant.js';
const router = express.Router();



export const getParticipants = async (req, res) => {
    try {
        const participants = await Participant.find();
        res.status(200).json(participants);

    } catch (error) {
        res.status(404).json({ message: error.message });

    }
}

export const getParticipant = async (req, res) => {

    const { id } = req.params;
    try {
        const participant = await Participant.findById(id);
        res.status(200).json(participant);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}

export const createParticipant = async (req, res) => {
    const { name, lastName, email, establishment } = req.body;
    const newParticipant = new Participant({ name: name, lastName: lastName, email: email, establishment: establishment });

    try {
        await newParticipant.save();
        res.status(201).json(newParticipant);


    } catch (error) {
        res.status(409).json({ message: error.message });
    }
}

export const updateParticipant = async (req, res) => {
    const { id } = req.params;
    const { name, lastName, email, establishment } = req.body;

    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No participant with id: ${id}`);


    const updatedParticipant = { name, lastName, email, establishment, _id: id };

    await Participant.findByIdAndUpdate(id, updatedParticipant, { new: true });

    res.json(updatedParticipant);


}

export const deleteParticipant = async (req, res) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No participant with id: ${id}`);

    await Participant.findByIdAndRemove(id);

    res.json({ message: "Participant deleted successfully." });
}









export default router;