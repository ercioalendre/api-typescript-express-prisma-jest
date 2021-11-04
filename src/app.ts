import "dotenv/config";
import "reflect-metadata";
import "express-async-errors";
import winston from "winston";
import helmet from "helmet";
import cors from "cors";
import router from "src/router";
import AppError, { isOperationalError } from "src/components/errors/AppError";
import express, { Express, NextFunction, Request, Response } from "express";

class AppController {
  express: Express;

  constructor() {
    process.on("unhandledRejection", error => {
      throw error;
    });

    process.on("uncaughtException", error => {
      console.error(error);

      if (!isOperationalError(error)) {
        process.exit(1);
      }
    });

    this.express = express();
    this.express.use(express.urlencoded({ extended: true }));
    this.express.use(express.json());
    this.express.use(helmet());
    this.express.use(cors());
    this.routes();
    this.errorHandler();
  }

  routes() {
    this.express.use(router);
  }

  errorHandler() {
    this.express.use(
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      (error: Error, req: Request, res: Response, next: NextFunction) => {
        const format = winston.format.combine(
          winston.format.timestamp({
            format: "DD MMM YYYY HH:mm:ss",
          }),
          winston.format.printf(info => {
            const clientIp = req.headers["x-forwarded-for"] || req.socket.remoteAddress;
            const route = req.originalUrl;
            const operationalError = error instanceof AppError ? true : false;
            const dateTime = info.timestamp;
            const message = info.message;

            return `[ Client IP: ${clientIp} ]\n[ Route: ${route} ]\n[ Operational: ${operationalError} ]\n[ Date and time: ${dateTime} ]\n[ Message: ${message} ]\n\n`;
          }),
        );

        const errorLogSettings = {
          transports: [
            new winston.transports.File({
              filename: "logs/error.log",
            }),
          ],
          format,
        };

        const infoLogSettings = {
          transports: [
            new winston.transports.File({
              filename: "logs/info.log",
            }),
          ],
          format,
        };

        const errorLogger = winston.createLogger(errorLogSettings);
        const infoLogger = winston.createLogger(infoLogSettings);

        if (error instanceof AppError) {
          infoLogger.log({
            message: error.message,
            level: "info",
          });

          if (error.inputError && error.inputError.length >= 1) {
            return res.status(error.statusCode).json({
              status: "error",
              message: error.message,
              inputError: error.inputError,
            });
          } else {
            return res.status(error.statusCode).json({
              status: "error",
              message: error.message,
            });
          }
        } else {
          errorLogger.log({
            message: error.message,
            level: "error",
          });

          console.log(error);

          return res.status(500).json({
            status: "error",
            message: "Internal server error",
          });
        }
      },
    );
  }
}

export default new AppController().express;
