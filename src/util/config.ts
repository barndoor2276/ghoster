import { IConfig } from "../models/config/IConfig.js";
import { default as config } from "../config/config.json";

export class Config {
	getConfig(): IConfig {
		return config;
	}
}
export default new Config().getConfig();