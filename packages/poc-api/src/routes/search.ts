import { FastifyPluginAsync } from 'fastify';
import { lensQuery } from '@fashion-search/lens/dist/client';
import { GetSearchResultsByUrlRequest } from '@fashion-search/common/dist/rest/get-search-results';
const example: FastifyPluginAsync = async (fastify): Promise<void> => {
  fastify.post<{ Body: GetSearchResultsByUrlRequest }>(
    '/search',
    async function (request, reply) {
      const result = await lensQuery(request.body);
      reply.code(200);
      return result;
    },
  );
};

export default example;
