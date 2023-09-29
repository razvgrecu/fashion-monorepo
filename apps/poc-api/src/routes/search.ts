import { FastifyPluginAsync } from 'fastify';

const example: FastifyPluginAsync = async (fastify): Promise<void> => {
  fastify.get('/search', async function () {
    return 'this is an example2';
  });
};

export default example;
