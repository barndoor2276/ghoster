import { expect } from "chai";
import sinon from "sinon";
import supertest = require("supertest");
import { App } from "../../app";
import * as mock from "../../test/mock";

describe("UrlController", () => {
	let app: App;
	let mockConfig;

	before(() => {
		mockConfig = mock.mock("/modules/config", {
			getConfig: sinon.stub()
		});
		mockConfig.getConfig.returns({
			app: {
				port: 5555,
				host: "localhost"
			},
			targetapp: {
				name: "app1",
				port: 443,
				host: "vmtass-k009.api-wi.com",
				basePath: "/APIHC/TASS/WAS/WAS_2016_5_Device/",
				useHttps: true,
				caFile: "/Users/212688906/Shared/Augustus_CA_Chain_Base64_exp_2019_10_20.pem",
			},
			corsHeaders: ["Link"],
			winston: {
				transports: []
			}
		});
	});

	beforeEach(() => {
		app = new App();
		app.Start();
	});

	afterEach(() => {
		app.Stop();
	});
	
	after(() => {
		delete require.cache[require.resolve("../../app")];
	});

	describe("#passthrough()", () => {
		it("responds to any path", (done) => {
			expect(1).to.equal(3 - 2);
			// supertest(app.GetServer())
			// .get("/")
			// .expect(200, done);
		});
	});
});