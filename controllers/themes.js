import express from 'express';

import mongoose from 'mongoose';
import Theme from '../models/theme.js';
import Former from '../models/former.js'

const router = express.Router();


export const getThemes = async (req, res) => {
    try {
        const themes = await Theme.find();
        res.status(200).json({ data: themes });

    } catch (error) {
        res.status(404).json({ message: error.message });

    }
}

export const getTheme = async (req, res) => {

    const { id } = req.params;
    try {
        const theme = await Theme.findById(id);
        res.status(200).json(theme);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}

export const createTheme = async (req, res) => {
    const { name, days, formers } = req.body;
    const newTheme = new Theme({ name: name, days: days, formers: formers });

    // let x = 1;

    // formers.map(async (formerId) => {
    //     const formerExist = await Former.exists({ _id: formerId });
    //     if (!formerExist) {
    //         // return res.json({ message: 'Former unfound' });
    //         x = 0;
    //     }
    // });

    try {
        await newTheme.save();
        res.status(201).json(newTheme);


    } catch (error) {
        res.status(409).json({ message: error.message });
    }
}

export const updateTheme = async (req, res) => {
    const { id } = req.params;
    const { name, days, formers } = req.body;

    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No theme with id: ${id}`);


    const updatedTheme = { name, days, formers, _id: id };

    await Theme.findByIdAndUpdate(id, updatedTheme, { new: true });

    res.json(updatedTheme);


}

export const deleteTheme = async (req, res) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No former with id: ${id}`);

    await Theme.findByIdAndRemove(id);

    res.json({ message: "Theme deleted successfully." });
}









export default router;