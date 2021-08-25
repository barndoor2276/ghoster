import { promises } from "fs";
import { IConfig } from "../../models/config/config";
import { IncomingHttpHeaders } from "http";
import { Logger as WinstonLogger } from "winston";
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
    const responseDirectory = path.join(
      this.config.cloner,
      `${this.config.targetName}`,
      urlpath.toLowerCase()
    );

    const responseFile = path.join(
      responseDirectory,
      `${method.toLowerCase()}.json`
    );

    await promises.mkdir(responseDirectory, { recursive: true });

    try {
      return JSON.stringify(
        JSON.parse(await promises.readFile(responseFile, "utf8")).data
      );
    } catch (error) {}

    const dataObj = JSON.parse(buffer.toString("utf8"));

    await promises
      .writeFile(
        responseFile,
        JSON.stringify(
          {
            headers: headers,
            statusCode: code,
            data: dataObj,
          },
          null,
          2
        )
      )
      .catch(this.logger.error);

    return JSON.stringify(dataObj);
  }
}
