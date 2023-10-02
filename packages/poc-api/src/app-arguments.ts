import { AutoloadPluginOptions } from '@fastify/autoload';
import { FastifyServerOptions } from 'fastify';
// import pino from "pino";

export interface AppArguments
  extends FastifyServerOptions,
    Partial<AutoloadPluginOptions> {}

export const appOptions: AppArguments = {
  logger: true,
} as const;
