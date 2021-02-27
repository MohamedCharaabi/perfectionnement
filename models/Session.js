import mongoose from 'mongoose';


export const sessionSchema = new mongoose.Schema({
    theme: String,
    date: String,
    participants: [String],

});


export default mongoose.model('Session', sessionSchema);