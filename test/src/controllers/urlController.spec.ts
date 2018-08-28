import { expect } from 'chai';
import sinon from 'sinon';
import * as httpMocks from 'node-mocks-http';

import UrlController from '../../../src/controllers/urlController';

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
                    "some": "getbody"
                }
            });
            const mockResponse = httpMocks.createResponse();

            // act
            UrlController.getSomething(mockRequest, mockResponse);
            const actualBody = mockResponse._getData();

            // assert
            expect(actualBody).to.deep.equal(mockRequest.body);
        });
    });
    describe('postSomething()', () => {
        it('Should return response on success', () => {
            // arrange
            const mockRequest = httpMocks.createRequest({
                method: 'POST',
                url: '/',
                ip: '2.2.3.4',
                route: {
                    path: '/'
                },
                "body": {
                    "some": "postbody"
                }
            });
            const mockResponse = httpMocks.createResponse();

            // act
            UrlController.postSomething(mockRequest, mockResponse);
            const actualBody = mockResponse._getData();

            // assert
            expect(actualBody).to.deep.equal(mockRequest.body);
        });
    });
    describe('putSomething()', () => {
        it('Should return response on success', () => {
            // arrange
            const mockRequest = httpMocks.createRequest({
                method: 'PUT',
                url: '/',
                ip: '3.2.3.4',
                route: {
                    path: '/'
                },
                "body": {
                    "some": "putbody"
                }
            });
            const mockResponse = httpMocks.createResponse();

            // act
            UrlController.putSomething(mockRequest, mockResponse);
            const actualBody = mockResponse._getData();

            // assert
            expect(actualBody).to.deep.equal(mockRequest.body);
        });
    });
});