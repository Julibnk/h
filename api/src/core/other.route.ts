import { FastifyInstance } from 'fastify';

export default async function (server: FastifyInstance) {
  server.get('/healthcheck2', async () => {
    return { ok: true };
  });

  server.post('/echo2', {}, async (request, res) => {
    res.status(201);
    return request.body;
  });

  server.post('/post2', {}, async (request, res) => {
    try {
      await server.prisma.user.create({ data: { name: 'Heloworld', surname: 'afdads' } });
    } catch (e) {
      console.log(e);
    }
    res.status(201);
    return request.body;
  });

  server.get('/get_all2', {}, async () => {
    const users = server.prisma.user.findMany();
    return users;
  });
}
