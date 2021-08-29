import { Config, IAppConfig } from '../../config/config.json';
import { RUN_MODE } from '../../models/run-mode';

export interface IConfig {
  appConfig: IAppConfig;
  mode: RUN_MODE;
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
