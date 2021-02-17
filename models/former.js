import mongoose from 'mongoose';


export const formerSchema = new mongoose.Schema({
    name: String,
    lastName: String,
    email: String,

});


export default mongoose.model('Former', formerSchema);