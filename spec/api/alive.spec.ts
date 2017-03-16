process.env['NODE_ENV'] = 'test';
process.env['NODE_CONFIG_DIR'] = '../config';

import server = require('../../server/server');

export function serverStart(): void {
    server.start();
}

export function serverStop(): void {
    server.stop();
}

export function beforeTestSuite(done: any): void {
    serverStart();
}

export function afterTestSuite(done: any): void {
    serverStop();
}