import { FastifyPluginAsync } from 'fastify';
import { join } from 'path';
import AutoLoad from '@fastify/autoload';
import { appOptions, AppArguments } from './app-arguments';

const app: FastifyPluginAsync<AppArguments> = async (
  fastify,
  opts,
): Promise<void> => {
  void fastify.register(AutoLoad, {
    dir: join(__dirname, 'plugins'),
    options: opts,
  });
  void fastify.register(AutoLoad, {
    dir: join(__dirname, 'routes'),
    options: opts,
  });
};

export default app;
export { app, appOptions };
