import mongoose from 'mongoose';
import { themeSchema } from './theme.js';

const participantSchema = new mongoose.Schema({
    name: String,
    lastName: String,
    email: String,
    proffesion: String,
    phone: Number,
    establishment: String,
    theme: String,
});


export default mongoose.model('Participant', participantSchema);