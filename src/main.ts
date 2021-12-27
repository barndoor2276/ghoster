import 'source-map-support/register';

import { App } from './app';
import { ConfigurationModule } from './modules/config/config';

var server: App = new App(new ConfigurationModule());

server.start();
