import { expect } from 'chai';
import sinon from 'sinon';
import * as httpMocks from 'node-mocks-http';

import { UrlController } from '../../controllers/url/urlController';

after(() => {
	delete require.cache[require.resolve('../../controllers/urlController')];
});

describe('UrlController', () => {

});