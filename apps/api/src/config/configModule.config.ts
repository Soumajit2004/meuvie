import * as Joi from 'joi';
import { ConfigModuleOptions } from '@nestjs/config';

export const envValidationSchema = Joi.object({
  PORT: Joi.number().default(3000),
  NODE_ENV: Joi.string().required(),
  DB_HOST: Joi.string().required(),
  DB_PORT: Joi.number().default(5432),
  DB_USERNAME: Joi.string().required(),
  DB_PASSWORD: Joi.string().required(),
  DB_DATABASE: Joi.string().required(),
  CSRF_SECRET: Joi.string().required(),
  SESSION_SECRET: Joi.string().required(),
  AWS_REGION: Joi.string().required(),
  AWS_ACCESS_KEY_ID: Joi.string().required(),
  AWS_SECRET_ACCESS_KEY: Joi.string().required(),
});

export const configModuleOptions: ConfigModuleOptions = {
  ignoreEnvFile: process.env.NODE_ENV === 'production',
  envFilePath: ['.env'],
  validationSchema: envValidationSchema,
  expandVariables: true,
};
