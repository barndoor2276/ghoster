import { promises } from "fs";
import { RUN_MODE } from "../../models/run-mode";
import { ILogger } from "../../models/logger";
import { IncomingHttpHeaders } from "http";
import path from "path";
import {
  createProxyMiddleware,
  responseInterceptor,
} from "http-proxy-middleware";
import { RequestHandler } from "express";

export interface IClonerConfig {
  cloneDir: string;
  target: string;
  targetName: string;
  mode: RUN_MODE;
}

export class Cloner {
  public middleware: RequestHandler;

  constructor(private config: IClonerConfig, private logger: ILogger) {
    promises
      .mkdir(this.config.cloneDir, { recursive: true })
      .catch((err) => {});

    this.middleware = createProxyMiddleware({
      logProvider: (provider) => this.logger,
      target: this.config.target,
      changeOrigin: true,
      secure: false,
      selfHandleResponse: true,
      onProxyRes: responseInterceptor(async (buffer, proxyRes, req, res) => {
        try {
          res.setHeader("content-type", "application/json; charset=utf-8");
          return await this.clone(
            res.statusCode,
            req.method,
            req.url,
            req.headers,
            buffer
          );
        } catch {
          return JSON.stringify({});
        }
      }),
    });
  }

  public async clone(
    code: number,
    method: string,
    urlpath: string,
    headers: IncomingHttpHeaders,
    buffer: Buffer
  ) {
    const dataObj = JSON.parse(buffer.toString("utf8"));

    if (this.config.mode != RUN_MODE.PROXY) {
      const responseDirectory = path.join(
        this.config.cloneDir,
        `${this.config.targetName.replace(" ", "_")}`,
        urlpath.toLowerCase()
      );

      const responseFile = path.join(
        responseDirectory,
        `${method.toLowerCase()}.json`
      );

      await promises.mkdir(responseDirectory, { recursive: true });

      try {
        const dataString = JSON.stringify(
          JSON.parse(await promises.readFile(responseFile, "utf8")).data
        );
        this.logger.info(`[Mirror] ${responseFile}`);
        return dataString;
      } catch (error) {}

      if (this.config.mode == RUN_MODE.LEARN) {
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
      }
    }

    this.logger.info(
      `[Proxy] ${method}: ${path.join(this.config.target, urlpath)}`
    );
    return JSON.stringify(dataObj);
  }
}
