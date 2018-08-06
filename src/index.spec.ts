import * as mocha from 'mocha';
import { expect } from 'chai';
import sinon from 'sinon';
import request from 'supertest';

import app from './index';
import logger from './util/logger';

var logger_info = sinon.stub(logger, 'info');

afterEach(() => {
    logger_info.reset();
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
            request(app).get('/random-url')
                .expect(404, done);
        });
    });
});