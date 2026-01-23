import mongoose from 'mongoose';

const componentSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
        index: true,
    },
    type: {
        type: String,
        required: true,
        enum: ['course', 'part', 'subject', 'notes', 'assignment', 'test', 'ai'],
        index: true,
    },
    title: {
        type: String,
        required: true,
        trim: true,
        maxlength: 200,
    },
    parentId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Component',
        default: null,
        index: true,
    },
    children: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Component',
    }],
    position: {
        x: {
            type: Number,
            default: 100,
        },
        y: {
            type: Number,
            default: 100,
        },
    },
    metadata: {
        description: {
            type: String,
            default: '',
            maxlength: 1000,
        },
        color: {
            type: String,
            default: 'default',
        },
        files: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'File',
        }],
    },
}, {
    timestamps: true,
});

// Compound index for efficient queries
componentSchema.index({ userId: 1, type: 1 });
componentSchema.index({ userId: 1, parentId: 1 });

// Method to check if component can be deleted (has no children)
componentSchema.methods.canDelete = function () {
    return this.children.length === 0;
};

// Static method to get all descendants
componentSchema.statics.getDescendants = async function (componentId) {
    const descendants = [];
    const queue = [componentId];

    while (queue.length > 0) {
        const currentId = queue.shift();
        const component = await this.findById(currentId);

        if (component && component.children.length > 0) {
            descendants.push(...component.children);
            queue.push(...component.children);
        }
    }

    return descendants;
};

const Component = mongoose.model('Component', componentSchema);

export default Component;
