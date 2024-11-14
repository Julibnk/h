import { dirname, join } from 'path';
import { fileURLToPath } from 'url';
import fastifyAccepts from '@fastify/accepts';
import autoload from '@fastify/autoload';
import cors from '@fastify/cors';
import helmet from '@fastify/helmet';
import fastify from 'fastify';
import { env } from '@/env.js';
import { PrismaClient } from '../prisma/client/index.js';
import { getRequestLogger } from './logger.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const server = fastify({
  loggerInstance: getRequestLogger(),
  ignoreDuplicateSlashes: true,
  ignoreTrailingSlash: true,
});

server.register(helmet);
server.register(fastifyAccepts);
if (env.CORS !== '') {
  server.register(cors, { origin: env.CORS.split(',') });
}
// Register plugins
server.register(autoload, {
  dir: join(__dirname, 'plugins'),
});

// Register routes in modules folder that has *route*.ts name
server.register(autoload, {
  dir: join(__dirname, 'modules'),
  matchFilter: /.*route.*\.ts$/,
});

server.addHook('onRequest', (request, reply, done) => {
  if (!request.accepts().type(['application/json'])) {
    reply.code(415).send({ message: 'Unsupported Media Type' });
  } else {
    done();
  }
});

const prisma = new PrismaClient();
server.register((server, _opts, done) => {
  server.post('/api/post', {}, async (request, res) => {
    try {
      await prisma.user.create({ data: { name: 'Heloworld', surname: 'afdads' } });
    } catch (e) {
      console.log(e);
    }
    res.status(201);
    return request.body;
  });
  server.get('/api/get_all', {}, async () => {
    const users = prisma.user.findMany();
    return users;
  });
  done();
});

export { server };
