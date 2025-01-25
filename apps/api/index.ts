import 'reflect-metadata';

import express from 'express';
import morgan from 'morgan';
import {InversifyExpressServer} from "inversify-express-utils";

import logger from "./logger";
import {container} from "./di-container";

const morganFormat = ":method :url :status :response-time ms";

export class Application {
  setup() {
    const server = new InversifyExpressServer(container);

    server.setConfig((app) => {
      app.use(express.json());

      app.use(
        morgan(morganFormat, {
          stream: {
            write: (message) => {
              const logObject = {
                method: message.split(" ")[0],
                url: message.split(" ")[1],
                status: message.split(" ")[2],
                responseTime: message.split(" ")[3],
              };

              logger.info(`[HTTP] ${logObject.method} ${logObject.url} ${logObject.status} ${logObject.responseTime} ms`);
            },
          },
        })
      );
    });

    const app = server.build();

    app.listen(3000, () => {
      logger.info('Server is running on port 3000');
    });
  }
}