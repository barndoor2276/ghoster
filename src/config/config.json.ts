import { resolve } from "path";
import { ServerOptions } from "http-proxy";

export interface IConfig {
  app: {
    port: number;
  };
  targetName: string;
  serverOptions: ServerOptions;
  corsHeaders: string[];
  winston: {
    transports: any[];
  };
  cloner: string;
}

export default {
  app: {
    port: 8008,
  },
  targetName: "xkcd",
  serverOptions: {
    target: "https://xkcd.com/",
  },
  corsHeaders: ["Link"],
  winston: {
    transports: [
      {
        name: "console1",
        type: "console",
        options: {
          level: "debug",
        },
      },
      {
        name: "file1",
        type: "file",
        options: {
          level: "debug",
          filename: "./dist/log/ghoster.log",
          tailable: true,
        },
      },
    ],
  },
  cloner: resolve(".clones"),
} as IConfig;
