import { expect } from 'chai';
import sinon from 'sinon';
import httpMocks from 'node-mocks-http';
import proxyquire from 'proxyquire';

describe('DefaultRouter', () => {
    var mockController;

    before(() => {
        mockController = proxyquire('../../../src/controllers/defaultController', {
            getSomething: function() {},
            '@noCallThru': true
        });
    });

    afterEach(() => {
        sinon.restore();
    });

    after(() => {
        delete require.cache[require.resolve('../../../src/routes/defaultRouter')];
    });

    describe('init()', () => {
        it('Should attach routes', () => {
            // arrange
            var testRouter = require('../../../src/routes/defaultRouter');
            const mockRequest = httpMocks.createRequest({
                method: 'GET',
                url: '/',
                ip: '1.2.3.4',
                route: {
                    path: '/'
                }
            });
            const mockResponse = httpMocks.createResponse();

            // act
            testRouter.default(mockRequest, mockResponse);

            // assert
            expect(testRouter).to.not.be.null;
        });
    });
});