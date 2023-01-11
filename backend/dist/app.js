"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const path_1 = __importDefault(require("path"));
const userRoutes_1 = __importDefault(require("./routes/userRoutes"));
const websiteRoutes_1 = __importDefault(require("./routes/websiteRoutes"));
const subscribeRoutes_1 = __importDefault(require("./routes/subscribeRoutes"));
const contentRoutes_1 = __importDefault(require("./routes/contentRoutes"));
const emailRoutes_1 = __importDefault(require("./routes/emailRoutes"));
const morgan_1 = __importDefault(require("morgan"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const express_rate_limit_1 = __importDefault(require("express-rate-limit"));
const express_mongo_sanitize_1 = __importDefault(require("express-mongo-sanitize"));
const xss_clean_1 = __importDefault(require("xss-clean"));
const hpp_1 = __importDefault(require("hpp"));
const cors_1 = __importDefault(require("cors"));
const helmet_1 = __importDefault(require("helmet"));
const appError_1 = __importDefault(require("./utils/appError"));
const errorController_1 = __importDefault(require("./controllers/errorController"));
const app = (0, express_1.default)();
app.set('views', path_1.default.join(__dirname, 'views'));
//Globel Middleware
// Set security headers
// app.use(
//   helmet({ crossOriginEmbedderPolicy: false, crossOriginResourcePolicy: false })
// );
const scriptSources = ["'self'", "'unsafe-inline'", 'https://unpkg.com'];
const styleSources = [
    "'self'",
    'https://fonts.googleapis.com',
    'https://fonts.gstatic.com',
];
app.use((0, cors_1.default)({
    credentials: true,
    origin: [
        'http://localhost:3000',
        'http://localhost:3030',
        'http://localhost:3003',
    ],
}));
app.use(helmet_1.default.contentSecurityPolicy({
    useDefaults: false,
    directives: {
        defaultSrc: [
            'self',
            'http://localhost:3000',
            'http://localhost:3030',
            'http://localhost:3003',
        ],
        fontSrc: [
            'self',
            'https://fonts.gstatic.com',
            'https://fonts.googleapis.com',
        ],
        scriptSrc: scriptSources,
        scriptSrcElem: scriptSources,
        styleSrc: styleSources,
    },
}));
app.use(express_1.default.static(path_1.default.join(__dirname, 'public')));
// Development logging
console.log(process.env.NODE_ENV);
if (process.env.NODE_ENV === 'development') {
    app.use((0, morgan_1.default)('dev'));
}
//Limit requests from same API
const limiter = (0, express_rate_limit_1.default)({
    max: 100,
    windowMs: 1 * 60 * 1000,
    message: 'Too many requests from this IP, please try again in 15min!',
});
app.use('/api', limiter);
// body parser, reading data from body into req.body
app.use(express_1.default.json({
    limit: '10kb',
}));
// Unencode data from html form submited to server
app.use(express_1.default.urlencoded({ extended: true, limit: '10kb' }));
app.use((0, cookie_parser_1.default)());
// Data sanitization against NOSQL query injection
app.use((0, express_mongo_sanitize_1.default)());
//Data sanitization against XSS
app.use((0, xss_clean_1.default)());
// Protection from HTTP paramater pollution (hpp)
app.use((0, hpp_1.default)());
// Serving static files
// app.use(express.static(`${__dirname}/public`));
//Test middlware
// app.use((req, res, next) => {
//   req.requestTime = new Date().toISOString();
//   // console.log(req.cookies);
//   next();
// });
// app.use((req, res, next) => {
//   res.header('Access-Control-Allow-Origin', 'http://localhost:3000');
//   res.header(
//     'Access-Control-Allow-Headers',
//     'Origin, X-Requested-With, Content-Type, Accept'
//   );
//   next();
// });
//route handlers
// 3) ROUTES
app.use('/api/v1/subscribers', subscribeRoutes_1.default);
app.use('/api/v1/websites', websiteRoutes_1.default);
app.use('/api/v1/users', userRoutes_1.default);
app.use('/api/v1/content', contentRoutes_1.default);
app.use('/api/v1/email', emailRoutes_1.default);
app.all('*', (req, res, next) => {
    next(new appError_1.default(`Can't find ${req.originalUrl} on the server!`, 404));
});
app.use(errorController_1.default);
exports.default = app;
