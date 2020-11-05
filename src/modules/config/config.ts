import { IConfig } from "../../models/config/IConfig";

export class Config {
	private static config: IConfig;
	constructor() {
		if (!Config.config) {
			Config.config = require('../../config/config.json');
		}
	}
	getConfig(): IConfig {
		return Config.config;
	}
}
export default new Config().getConfig();