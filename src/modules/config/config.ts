import { IConfig } from "../../config/config.json";

export class Config {
  private static config: IConfig;
  public static getConfig(): IConfig {
    if (!Config.config) {
      Config.config = require("../../config/config.json").default;
    }
    return Config.config;
  }
}
export default Config.getConfig();
