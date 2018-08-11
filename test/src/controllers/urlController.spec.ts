import { expect } from 'chai';
import sinon from 'sinon';
import * as httpMocks from 'node-mocks-http';

import * as urlController from '../../../src/controllers/urlController';

after(() => {
    delete require.cache[require.resolve('../../../src/controllers/urlController')];
});

describe('UrlController', () => {
    describe('getSomething()', () => {
        it('Should return response on success', () => {
            // arrange
            const mockRequest = httpMocks.createRequest({
                method: 'GET',
                url: '/',
                ip: '1.2.3.4',
                route: {
                    path: '/'
                },
                "body": {
                    "some": "body"
                }
            });
            const mockResponse = httpMocks.createResponse();
            var expectedBody = {
                "body": mockRequest.body,
                "headers": mockRequest.headers,
                "base-url": mockRequest.baseUrl
            }

            // act
            urlController.getSomething(mockRequest, mockResponse);
            const actualBody = mockResponse._getData();

            // assert
            expect(actualBody).to.deep.equal(expectedBody.body);
        });
    });
});