import mongoose from 'mongoose';

const participantSchema = new mongoose.Schema({
    name: String,
    lastName: String,
    email: String,
    establishment: String,
});


export default mongoose.model('Participant', participantSchema);