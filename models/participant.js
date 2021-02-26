import mongoose from 'mongoose';
import { themeSchema } from './theme.js';

const participantSchema = new mongoose.Schema({
    name: String,
    lastName: String,
    email: String,
    establishment: String,
    theme: themeSchema,
});


export default mongoose.model('Participant', participantSchema);