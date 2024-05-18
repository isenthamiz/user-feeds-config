"use strict";
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const path_1 = __importDefault(require("path"));
const winston_1 = __importDefault(require("winston"));
const winston_daily_rotate_file_1 = __importDefault(require("winston-daily-rotate-file"));
const { combine, timestamp, json, printf, colorize, align } = winston_1.default.format;
const timestampFormat = 'MMM-DD-YYYY HH:mm:ss';
const format = combine(colorize(), timestamp({ format: timestampFormat }), align(), json(), printf((_a) => {
    var { timestamp, level, message } = _a, data = __rest(_a, ["timestamp", "level", "message"]);
    const response = {
        level,
        timestamp,
        message,
        data,
    };
    return JSON.stringify(response);
}));
const transport = new winston_daily_rotate_file_1.default({
    filename: `${path_1.default.join(__dirname, '../../', 'logs')}/application-%DATE%.log`,
    datePattern: 'YYYY-MM-DD-HH',
    zippedArchive: true,
    maxFiles: '14d',
    maxSize: '20m',
    level: 'debug'
});
exports.default = winston_1.default.createLogger({
    format,
    // store logs in the console
    transports: [
        new winston_1.default.transports.Console(),
        transport
    ],
});
