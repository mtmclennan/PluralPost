"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.connect2DB = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const emailModel_1 = require("./emailModel");
const contentModel_1 = require("./contentModel");
const subscriberModel_1 = require("./subscriberModel");
const connect2DB = (website) => __awaiter(void 0, void 0, void 0, function* () {
    const DB = process.env.DATABASE.replace('<password>', process.env.DATABASE_PASSWORD);
    const conn = mongoose_1.default.connection.useDb(website, { useCache: true });
    // console.log('DB 2 connected conn2');
    // const conn = await mongoDb.useDb(website);
    conn.model('Subscribers', subscriberModel_1.subscriberSchema);
    conn.model('Post', contentModel_1.postSchema);
    conn.model('Email', emailModel_1.emailSchema);
    return conn;
});
exports.connect2DB = connect2DB;
