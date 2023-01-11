"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.subscriberSchema = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const validator_1 = __importDefault(require("validator"));
// include date created in database
// include the site the subscriber came from - ? can get this from req.protocol.host
exports.subscriberSchema = new mongoose_1.default.Schema({
    name: {
        type: String,
        required: [true, 'Please tell us your name!'],
        trim: true,
    },
    email: {
        type: String,
        required: [true, 'Please tell use your email!'],
        validate: [validator_1.default.isEmail, 'Please provide a valid email!'],
    },
    createdAt: {
        type: Date,
        default: Date.now(),
    },
    websiteFrom: {
        type: String,
        required: true,
    },
});
// const Subscriber = mongoose.model('subscriber', subscriberSchema);
// module.exports = Subscriber;
