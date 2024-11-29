import mongoose from 'mongoose';

const CommentSchema = new mongoose.Schema({
    content: {
        type: String,
        required: true
    },
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }
}, { timestamps: true });

const BlogpostSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, 'Please provide a title'],
        trim: true,
    },
    description: {
        type: String,
        required: [true, 'Please provide a description']
    },
    slug: {
        type: String,
        required: true,
        unique: true
    },
    date: {
        type: Date,
        default: Date.now
    },
    author: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: [true, 'Please provide an image URL']
    },
    content: {
        type: String,
        required: [true, 'Please provide content']
    },
    comments: [CommentSchema]
}, {
    timestamps: true
});

const Blogpost = mongoose.models.Blogpost || mongoose.model('Blogpost', BlogpostSchema);
export default Blogpost;
