"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const websiteSchema = new mongoose_1.default.Schema({
    name: {
        type: String,
        required: [true, 'Please input a website name.'],
        trim: true,
        unique: true,
    },
    url: {
        type: String,
        required: true,
        trim: true,
        unique: true,
    },
    category: {
        type: String,
        trim: true,
    },
    slogan: {
        type: String,
        trim: true,
    },
    email: {
        type: String,
        trim: true,
    },
    emailFromSite: {
        type: Boolean,
        default: true,
    },
    logo: {
        type: String,
        default: 'http://localhost:3030/img/websites/default.svg',
    },
    createdAt: {
        type: Date,
        default: Date.now(),
    },
});
const Website = mongoose_1.default.model('Website', websiteSchema);
exports.default = Website;
// export type WebsiteType = typeof Website;
