import { FastifyInstance } from 'fastify';

export default async function (server: FastifyInstance) {
  server.get('/api/healthcheck', async () => {
    return { ok: true };
  });

  server.post('/api/echo', {}, async (request, res) => {
    res.status(201);
    return request.body;
  });
}
