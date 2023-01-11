"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.postSchema = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
exports.postSchema = new mongoose_1.default.Schema({
    title: {
        type: String,
        default: 'A New Post',
        trim: true,
    },
    featuredImage: {
        type: String,
    },
    photoCaption: {
        type: String,
    },
    tags: {
        type: String,
    },
    slug: {
        type: String,
        trim: true,
        unique: true,
    },
    author: {
        type: String,
    },
    dateModified: {
        type: Date,
        default: new Date().toISOString(),
        required: true,
    },
    datePublished: {
        type: Date,
    },
    description: {
        type: String,
    },
    postBody: {
        type: String,
    },
    published: {
        type: String,
        default: 'draft',
    },
});
// const Post = mongoose.model('Post', postSchema);
// module.exports = Post;
