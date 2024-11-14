import path, { dirname, join } from 'path';
import { fileURLToPath } from 'url';
import fastifyAccepts from '@fastify/accepts';
import autoload from '@fastify/autoload';
import cors from '@fastify/cors';
import helmet from '@fastify/helmet';
import fastify from 'fastify';
import { PrismaClient } from '../prisma/client/index.js';
import { env } from './env.js';
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

if (env.CORS !== '') {
  server.register(cors, { origin: env.CORS.split(',') });
}

//const opts: RouteShorthandOptions = {
//  schema: {
//    description: 'post some data',
//    tags: ['user', 'code'],
//
//    // params: {
//    //   type: 'object',
//    //   properties: {
//    //     id: {
//    //       type: 'string',
//    //       description: 'user id',
//    //     },
//    //   },
//    // },
//    body: {
//      type: 'object',
//      required: ['name', 'parentId', 'requiredKey'],
//      additionalProperties: false,
//      properties: {
//        hello: { type: 'string' },
//        obj: {
//          type: 'object',
//          properties: {
//            some: { type: 'string' },
//          },
//        },
//      },
//    },
//    response: {
//      201: {
//        description: 'Successful response',
//        type: 'object',
//        properties: {
//          hello: { type: 'string' },
//        },
//      },
//    },
//    // security: [
//    //   {
//    //     apiKey: [],
//    //   },
//    // ],
//  },
//};
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
