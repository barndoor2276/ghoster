import { promises } from "fs";
import { IConfig } from "../../models/config/config";
import { IncomingHttpHeaders, IncomingMessage } from "http";
import { Logger as WinstonLogger } from "winston";
import deepmerge from "deepmerge";
import path from "path";

export class Cloner {
  constructor(private config: IConfig, private logger: WinstonLogger) {
    promises.mkdir(this.config.cloner, { recursive: true }).catch((err) => {});
  }

  public async clone(
    code: number,
    method: string,
    urlpath: string,
    headers: IncomingHttpHeaders,
    buffer: Buffer
  ) {
    // const statusCode = proxyRes.statusCode;
    // const data = await new Promise((resolve) => {
    //   let chunks: any[] = [];
    //   proxyRes.on("data", (chunk) => chunks.push(chunk));
    //   proxyRes.on("end", () => resolve(chunks.join("")));
    // });

    const resPath = path.join(
      this.config.cloner,
      `${this.config.targetName}.json`
    );

    let file: any;
    try {
      file = JSON.parse(await promises.readFile(resPath, "utf8"));
    } catch {
      file = {};
    }

    if (file[urlpath.toLowerCase()]) {
      if (file[urlpath.toLowerCase()][method.toLowerCase()]) {
        return JSON.stringify(
          file[urlpath.toLowerCase()][method.toLowerCase()].data
        );
      }
    }

    const dataObj = JSON.parse(buffer.toString("utf8"));

    let responseObj: {
      [key: string]: {
        [key: string]: {
          headers: IncomingHttpHeaders;
          statusCode: number;
          data: any;
        };
      };
    } = {
      [urlpath.toLowerCase()]: {
        [method.toLowerCase()]: {
          headers: headers,
          statusCode: code,
          data: dataObj,
        },
      },
    };

    await promises
      .writeFile(resPath, JSON.stringify(deepmerge(responseObj, file), null, 2))
      .catch(this.logger.error);

    return JSON.stringify(dataObj);
  }
}
