import UAParser from 'ua-parser-js';

const parser = new UAParser();
export const result = parser.getResult();
