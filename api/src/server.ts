import { dirname, join } from 'path';
import { fileURLToPath } from 'url';
import fastifyAccepts from '@fastify/accepts';
import autoload from '@fastify/autoload';
import cors from '@fastify/cors';
import helmet from '@fastify/helmet';
import fastify from 'fastify';
import { serializerCompiler, validatorCompiler } from 'fastify-type-provider-zod';
import { env } from '@/env.js';
import { getRequestLogger } from './logger.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const server = fastify({
  loggerInstance: getRequestLogger(),
  ignoreDuplicateSlashes: true,
  ignoreTrailingSlash: true,
});

//ZOD compiler
server.setValidatorCompiler(validatorCompiler);
server.setSerializerCompiler(serializerCompiler);

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
  dir: join(__dirname, 'core'),
  matchFilter: /.*route.*\.ts$/,
  options: { prefix: '/api' },
});

server.addHook('onRequest', (request, reply, done) => {
  if (!request.accepts().type(['application/json'])) {
    reply.code(415).send({ message: 'Unsupported Media Type' });
  } else {
    done();
  }
});

export { server };
