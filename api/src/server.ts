import path from 'path';
import fastifyAccepts from '@fastify/accepts';
import autoload from '@fastify/autoload';
import cors from '@fastify/cors';
import helmet from '@fastify/helmet';
import swagger from '@fastify/swagger';
import swaggerUi from '@fastify/swagger-ui';
import fastify from 'fastify';
import { PrismaClient } from '../prisma/client/index.js';
import { env } from './env.js';
import { getRequestLogger } from './logger.js';

const server = fastify({
  loggerInstance: getRequestLogger(),
  ignoreDuplicateSlashes: true,
  ignoreTrailingSlash: true,
});

//type a typeof server;
// Normally you would need to load by hand each plugin. `fastify-autoload` is an utility
// we wrote to solve this specific problems. It loads all the content from the specified
// folder, even the subfolders. Take at look at its documentation, as it's doing a lot more!
// First of all, we require all the plugins that we'll need in our application.
//server.register(AutoLoad, {
//  dir: join(import.meta.url, 'plugins'),
//  options: Object.assign({}, opts),
//});

server.register(helmet);
server.register(fastifyAccepts);

// Register plugins
server.register(autoload, {
  dir: path.join(__dirname, 'plugins'),
});

// Register routes in modules folder that has *route*.ts name
server.register(autoload, {
  dir: path.join(__dirname, 'modules'),
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
  server.get('/api/healthcheck', async () => {
    return { ok: true };
  });

  server.post('/api/echo', {}, async (request, res) => {
    res.status(201);
    return request.body;
  });

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
