import path from 'path';
import winston from 'winston';
import DailyRotateFile from 'winston-daily-rotate-file';

const { combine, timestamp, json, printf, colorize, align } = winston.format;
const timestampFormat = 'MMM-DD-YYYY HH:mm:ss';


const format = combine(
    colorize(),
    timestamp({ format: timestampFormat }),
    align(),
    json(),
    printf(({ timestamp, level, message, ...data }) => {
        const response = {
            level,
            timestamp,
            message,
            data,
        };
        return JSON.stringify(response);
    })
);

const transport = new DailyRotateFile({
    filename: `${path.join(__dirname, '../../', 'logs')}/application-%DATE%.log`,
    datePattern: 'YYYY-MM-DD-HH',
    zippedArchive: true,
    maxFiles: '14d',
    maxSize: '20m',
    level: 'debug'
})

export default winston.createLogger({
    format,
    // store logs in the console
    transports: [
        new winston.transports.Console(),
        transport
    ],
})