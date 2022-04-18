import { promises } from "fs";
import { ILogger } from "../../models/logger";
import { IncomingHttpHeaders, OutgoingHttpHeaders } from "http";
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
}

export interface IClonerResponse {
  headers: OutgoingHttpHeaders;
  data: any;
  statusCode: number;
}

export class Cloner {
  private mirrorMiddleware: RequestHandler;
  private clonerMiddleware: RequestHandler;

  public get middleware() {
    return this.mirrorMiddleware;
  }

  constructor(private config: IClonerConfig, private logger: ILogger) {
    promises
      .mkdir(this.config.cloneDir, { recursive: true })
      .catch((err) => {});

    this.mirrorMiddleware = this.createMirrorMiddleware();
    this.clonerMiddleware = this.createClonerMiddleware();
  }

  private createMirrorMiddleware(): RequestHandler {
    return async (req, res, next) => {
      if (await this.hasMirror(req.url, req.method)) {
        const mirror = await this.mirror(req.method, req.url);
        res.status(mirror.statusCode).send(mirror.data);
      } else {
        this.clonerMiddleware(req, res, next);
      }
    };
  }

  private createClonerMiddleware(): RequestHandler {
    return createProxyMiddleware({
      logProvider: (provider) => this.logger,
      target: this.config.target,
      changeOrigin: true,
      secure: false,
      selfHandleResponse: true,
      onProxyRes: responseInterceptor(async (buffer, proxyRes, req, res) => {
        try {
          await this.clone(
            res.statusCode,
            req.method,
            req.url,
            req.headers,
            JSON.parse(buffer.toString('utf8'))
          );
        } catch {}
        return buffer.toString('utf8');
      })
    });
  }

  public getMirrorDirectory(url: string): string {
    return path.join(
      this.config.cloneDir,
      `${this.config.targetName.replace(' ', '_')}`,
      url.toLowerCase()
    );
  }

  public getMirrorFile(url: string, method: string): string {
    return path.join(
      this.getMirrorDirectory(url),
      `${method.toLowerCase()}.json`
    );
  }

  public async hasMirror(url: string, method: string): Promise<boolean> {
    try {
      await promises.stat(this.getMirrorFile(url, method));
      return true;
    } catch {
      return false;
    }
  }

  public async mirror(
    method: string,
    urlpath: string
  ): Promise<IClonerResponse> {
    const responseFile = this.getMirrorFile(urlpath, method);

    try {
      const responseFromFile: IClonerResponse = JSON.parse(
        await promises.readFile(responseFile, 'utf8')
      );
      this.logger.info(`[Mirror] <- ${responseFile}`);

      return responseFromFile;
    } catch (error) {
      this.logger.error('Error while mirroring response.');
      this.logger.error(error);
    }
  }

  public async clone(
    statusCode: number,
    method: string,
    urlpath: string,
    headers: IncomingHttpHeaders,
    data: any
  ): Promise<IClonerResponse> {
    try {
      const responseFile = this.getMirrorFile(urlpath, method);

      await promises.mkdir(this.getMirrorDirectory(urlpath), {
        recursive: true
      });

      const responseFromHttp: IClonerResponse = {
        headers: headers,
        statusCode: statusCode,
        data: data
      };

      await promises.writeFile(
        responseFile,
        JSON.stringify(responseFromHttp, null, 2)
      );

      this.logger.info(`[Clone] ->  ${responseFile}`);

      return responseFromHttp;
    } catch (error) {
      this.logger.error('Error while cloning response.');
      this.logger.error(error);
    }
  }
}
