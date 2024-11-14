import { FastifyInstance } from 'fastify';

export default async function (server: FastifyInstance) {
  server.get('/healthcheck', async () => {
    return { ok: true };
  });

  server.post('/echo', {}, async (request, res) => {
    res.status(201);
    return request.body;
  });

  server.post('/post', {}, async (request, res) => {
    try {
      await server.prisma.user.create({ data: { name: 'Heloworld', surname: 'afdads' } });
    } catch (e) {
      console.log(e);
    }
    res.status(201);
    return request.body;
  });

  server.get('/get_all', {}, async () => {
    const users = server.prisma.user.findMany();
    return users;
  });
}
