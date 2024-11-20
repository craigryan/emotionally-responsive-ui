/* eslint-disable */

import '@testing-library/jest-dom';

global.setImmediate =
    global.setImmediate ||
    ((fn: any, ...args: any[]) => {
        return setTimeout(fn, 0, ...args);
    });
