import { FastifyInstance } from 'fastify';

export default async function (server: FastifyInstance) {
  server.get('/healthcheck', async () => {
    return { ok: true };
  });

  server.post('/echo', {}, async (request, res) => {
    res.status(201);
    return request.body;
  });
}
