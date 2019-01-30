
import mongoose from 'mongoose';

const COMMENTSchema = mongoose.Schema({
    text: {
        type: String,
        required: 'Text is required'
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
})

const model = mongoose.model("Comment", COMMENTSchema);

export default model;