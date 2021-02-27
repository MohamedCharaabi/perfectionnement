import express from 'express';
import mongoose from 'mongoose';

import Session from '../models/Session.js'

const router = express.Router();

export const getSessions = async (req, res) => {
    try {
        const sessions = await Session.find();
        res.status(200).json(sessions);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}


export const getSession = async (req, res) => {

    const { id } = req.params;
    try {
        const session = await Session.findById(id);
        res.status(200).json(session);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}


export const createSession = async (req, res) => {
    const { theme, date, participants } = req.body;
    const newSession = new Session({ theme: theme, date: date, participants: participants });

    try {
        await newSession.save();
        res.status(201).json(newSession);
    } catch (error) {
        res.status(409).json({ message: error.message });
    }
}

export const updateSession = async (req, res) => {
    const { id } = req.params;
    const { theme, date, participants } = req.body;

    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No session with id: ${id}`);


    const updatedSession = { theme, date, participants, _id: id };

    await Session.findByIdAndUpdate(id, updatedSession, { new: true });

    res.json(updatedSession);


}

export const deleteSession = async (req, res) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No Session with id: ${id}`);

    await Session.findByIdAndRemove(id);

    res.json({ message: "Session deleted successfully." });
}



export default router;
