import { FastifyPluginAsync } from 'fastify';
import { velvet } from '../handlers/example-handler';

const example: FastifyPluginAsync = async (fastify): Promise<void> => {
  fastify.get('/', async function () {
    return velvet();
  });
};

export default example;
