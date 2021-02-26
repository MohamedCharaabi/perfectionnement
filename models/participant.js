import mongoose from 'mongoose';
import { ThemeSchema } from './theme';

const participantSchema = new mongoose.Schema({
    name: String,
    lastName: String,
    email: String,
    establishment: String,
    theme: ThemeSchema,
});


export default mongoose.model('Participant', participantSchema);