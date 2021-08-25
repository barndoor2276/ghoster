import { Config, IAppConfig } from "../../config/config.json";
import { ServerOptions } from "http-proxy";

export interface IConfig {
  appConfig: IAppConfig;
  mode: RUN_MODE;
}

export const enum RUN_MODE {
  /**
   * App will clone new endpoints and return cloned data when available
   */
  LEARN = "learn",

  /**
   * App will only proxy requests and not return or record cloned data
   */
  PROXY = "proxy",

  /**
   * App will not proxy any requests and only returned available cloned data
   */
  MIRROR = "mirror",
}

export class ConfigurationModule implements IConfig {
  public appConfig: IAppConfig;
  public mode: RUN_MODE;

  constructor() {
    this.appConfig = Config;
    this.mode = this.getBootMode(process.argv);
  }

  private getBootMode(argv: string[]) {
    if (argv.includes(`--${RUN_MODE.PROXY}`)) {
      return RUN_MODE.PROXY;
    } else if (argv.includes(`--${RUN_MODE.MIRROR}`)) {
      return RUN_MODE.MIRROR;
    } else {
      return RUN_MODE.LEARN;
    }
  }
}
