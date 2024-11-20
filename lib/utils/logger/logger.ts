import { pino, LoggerOptions } from 'pino';

const isProduction = process.env.NODE_ENV === 'production';

let options: LoggerOptions = {
    level: 'info',
};

if (!isProduction) {
    options = {
        level: 'debug',
    };
}

const logger = pino(options);

export { logger };
