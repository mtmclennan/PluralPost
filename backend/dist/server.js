"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config({ path: './config.env' });
const app_1 = __importDefault(require("./app"));
process.on('uncaughtException', (err) => {
    console.log('UNHANDLED EXCEPTION!  SHUTING DOWN');
    console.log(err);
    process.exit(1);
});
if (process.env.DATABASE && process.env.DATABASE_PASSWORD) {
    const DB = process.env.DATABASE.replace('<password>', process.env.DATABASE_PASSWORD);
    const mongoDb = mongoose_1.default.connect(DB).then(() => {
        console.log('DB connection successful');
    });
    // const options = {
    //   // dbName: website,
    //   dbName: 'yardOasis',
    // };
    // // const conn2 = mongoose
    // //   .createConnection(DB, options)
    // //   .asPromise()
    // //   .then(() => {
    // //     console.log('DB 2 Connected server');
    // //   });
    // // module.exports = conn2;
    const port = process.env.PORT || 3030;
    const server = app_1.default.listen(port, () => {
        console.log(`App running on ${port}......`);
    });
    process.on('unhandledRejection', (err) => {
        console.log(err);
        console.log('UNHANDLED REJECTION!  SHUTING DOWN');
        console.log(err.name);
        server.close(() => process.exit(1));
    });
}
else {
    console.log('ERROR!! No Database or Password');
}
