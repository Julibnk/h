import { FastifyPluginAsync } from 'fastify';
import fp from 'fastify-plugin';
import { PrismaClient } from 'prisma/client/index.js';
import { logger } from '@/logger.js';

// Use TypeScript module augmentation to declare the type of server.prisma to be PrismaClient
declare module 'fastify' {
  interface FastifyInstance {
    prisma: PrismaClient;
  }
}

const prismaPlugin: FastifyPluginAsync = fp(async (server) => {
  const prisma = new PrismaClient({ log: ['query', 'info'] });
  //prisma.$on('query', (e) => {
  //  logger.debug('Prisma', e);
  //});

  await prisma.$connect();

  logger.info('Prisma startup');
  // Make Prisma Client available through the fastify server instance: server.prisma
  server.decorate('prisma', prisma);

  server.addHook('onClose', async (server) => {
    await server.prisma.$disconnect();
  });
});
export default prismaPlugin;
