import { expect } from 'chai';
import sinon from 'sinon';
import * as httpMocks from 'node-mocks-http';

import * as defaultController from '../../../src/controllers/defaultController';

after(() => {
    delete require.cache[require.resolve('../../../src/controllers/defaultController')];
});

describe('DefaultController', () => {
    describe('getSomething()', () => {
        it('Should return response on success', () => {
            // arrange
            const mockRequest = httpMocks.createRequest({
                method: 'GET',
                url: '/',
                ip: '1.2.3.4',
                route: {
                    path: '/'
                }
            });
            const mockResponse = httpMocks.createResponse();
            const expectedBody = {
                some: "thing"
            };

            // act
            defaultController.getSomething(mockRequest, mockResponse);
            const actualBody = mockResponse._getData();

            // assert
            expect(actualBody).to.deep.equal(expectedBody);
        });
    });
});