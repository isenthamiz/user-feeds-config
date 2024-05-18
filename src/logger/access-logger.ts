import morgan from 'morgan';
import path from 'path';
import { createStream } from 'rotating-file-stream';
import { Request, Response } from 'express';

const accessLogStream = createStream('access.log', {
    interval: '1d',
    path: path.join(__dirname, "/tmp", 'logs')
});

const errorLogStream = createStream('error.log', {
    interval: '1d',
    path: path.join(__dirname, "/tmp", 'logs')
});

const accessLogger = morgan('combined', { stream: accessLogStream });
const errorLogger = morgan('dev', {
    skip: function (req: Request, res: Response) { return res.statusCode < 400 },
    stream: errorLogStream
});

export {
    accessLogger,
    errorLogger
}