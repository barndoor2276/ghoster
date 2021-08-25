import { IConfig } from "../models/config/config";
import { resolve } from "path";

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
