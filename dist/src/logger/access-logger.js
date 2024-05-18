"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorLogger = exports.accessLogger = void 0;
const morgan_1 = __importDefault(require("morgan"));
const path_1 = __importDefault(require("path"));
const rotating_file_stream_1 = require("rotating-file-stream");
const accessLogStream = (0, rotating_file_stream_1.createStream)('access.log', {
    interval: '1d',
    path: path_1.default.join(__dirname, "/tmp", 'logs')
});
const errorLogStream = (0, rotating_file_stream_1.createStream)('error.log', {
    interval: '1d',
    path: path_1.default.join(__dirname, "/tmp", 'logs')
});
const accessLogger = (0, morgan_1.default)('combined', { stream: accessLogStream });
exports.accessLogger = accessLogger;
const errorLogger = (0, morgan_1.default)('dev', {
    skip: function (req, res) { return res.statusCode < 400; },
    stream: errorLogStream
});
exports.errorLogger = errorLogger;
