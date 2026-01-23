import mongoose from 'mongoose';

const fileSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
        index: true,
    },
    componentId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Component',
        required: true,
        index: true,
    },
    originalName: {
        type: String,
        required: true,
    },
    storedName: {
        type: String,
        required: true,
        unique: true,
    },
    mimeType: {
        type: String,
        required: true,
    },
    size: {
        type: Number,
        required: true,
    },
    path: {
        type: String,
        required: true,
    },
}, {
    timestamps: true,
});

// Compound index for efficient queries
fileSchema.index({ userId: 1, componentId: 1 });

const File = mongoose.model('File', fileSchema);

export default File;
