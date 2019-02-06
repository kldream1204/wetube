import mongoose from 'mongoose';

const VIDEOSchema = new mongoose.Schema({
    fileUrl: {
        type: String,
        required: 'File URL is required'
    },
    title: {
        type: String,
        required: 'Title is required'
    },
    description: String,
    views: {
        type: Number,
        default: 0
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    comments: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Comment'
    }],
    creator: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user"
    }
});

const model = mongoose.model("Video", VIDEOSchema);

export default model;