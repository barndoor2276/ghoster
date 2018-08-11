import * as mocha from 'mocha';
import { expect } from 'chai';
import sinon from 'sinon';
import request from 'supertest';

import server from './server';
import logger from './util/logger';

var logger_info = sinon.stub(logger, 'info');

before(() => {
    server.Start(9867, '127.0.0.1', () => {});
});

afterEach(() => {
    logger_info.reset();
});

after(() => {
    server.Stop();
});

describe('Index', () => {
    describe('Initialize app', () => {
        it('should log message', (done) => {
            expect(logger_info.callCount).to.equal(1);
            done();
        });
    });
    describe('GET /random-url', () => {
        it('should return 404', (done) => {
            request(server.express).get('/random-url')
                .expect(404, done);
        });
    });
});