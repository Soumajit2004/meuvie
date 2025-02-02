import * as Joi from 'joi';
import { ConfigModuleOptions } from '@nestjs/config';

export const envValidationSchema = Joi.object({
  PORT: Joi.number().default(3000),
  STAGE: Joi.string().required(),
  DB_HOST: Joi.string().required(),
  DB_PORT: Joi.number().default(5432),
  DB_USERNAME: Joi.string().required(),
  DB_PASSWORD: Joi.string().required(),
  DB_DATABASE: Joi.string().required(),
  CSRF_SECRET: Joi.string().required(),
  SESSION_SECRET: Joi.string().required(),
});

export const configModuleOptions: ConfigModuleOptions = {
  ignoreEnvFile: process.env.STAGE === 'prod',
  envFilePath: [`.env.stage.${process.env.STAGE}`, '.env'],
  validationSchema: envValidationSchema,
  expandVariables: true,
};
