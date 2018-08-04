"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const logger_1 = __importDefault(require("./util/logger"));
var config = require('./config/config.json');
// Controllers
const defaultController = __importStar(require("./controllers/default"));
const urlController = __importStar(require("./controllers/url"));
// Create Express Server
const app = express_1.default();
app.use(body_parser_1.default.json());
app.use(body_parser_1.default.urlencoded({ extended: true }));
/**
 * App Routes - Default
 */
app.get('/', defaultController.getSomething);
/**
 * App Routes - Default
 */
app.get('/url', urlController.getSomething);
app.listen(config.app.port, config.app.ip, function () {
    logger_1.default.info('App listening at ' + config.app.ip + ':' + config.app.port);
});
exports.default = app;
//# sourceMappingURL=index.js.map