import { Config, IAppConfig } from '../../config/config.json';

export interface IConfig {
  appConfig: IAppConfig;
}

export class ConfigurationModule implements IConfig {
  public appConfig: IAppConfig;

  constructor() {
    this.appConfig = Config;
  }
}
