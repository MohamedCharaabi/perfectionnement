import express from 'express';
import mongoose from 'mongoose';

import Former from '../models/former.js'

const router = express.Router();

export const getFormers = async (req, res) => {
    try {
        const formers = await Former.find();
        res.status(200).json(formers);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}


export const getFormer = async (req, res) => {

    const { id } = req.params;
    try {
        const former = await Former.findById(id);
        res.status(200).json(former);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}


export const createFormer = async (req, res) => {
    const { name, lastName, email } = req.body;
    const newFormer = new Former({ name: name, lastName: lastName, email: email });

    try {
        await newFormer.save();
        res.status(201).json(newFormer);
    } catch (error) {
        res.status(409).json({ message: error.message });
    }
}

export const updateFormer = async (req, res) => {
    const { id } = req.params;
    const { name, lastName, email } = req.body;

    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No former with id: ${id}`);


    const updatedFormer = { name, lastName, email, _id: id };

    await Former.findByIdAndUpdate(id, updatedFormer, { new: true });

    res.json(updatedFormer);


}

export const deleteFormer = async (req, res) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No former with id: ${id}`);

    await Former.findByIdAndRemove(id);

    res.json({ message: "Former deleted successfully." });
}



export default router;
