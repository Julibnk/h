import swagger from '@fastify/swagger';
import swaggerUi from '@fastify/swagger-ui';
import { FastifyInstance } from 'fastify';
import { env } from '../env.js';

export default async function (app: FastifyInstance) {
  await app.register(swagger, {
    openapi: {
      openapi: '3.0.0',
      info: {
        title: 'Test swagger',
        description: 'Testing the Fastify swagger API',
        version: '0.1.0',
      },
      // servers: [
      //   {
      //     url: 'http://localhost:3000',
      //     description: 'Development server',
      //   },
      // ],
      tags: [
        // { name: 'api', description: 'User related end-points' },
        // { name: 'code', description: 'Code related end-points' },
      ],
      components: {
        securitySchemes: {
          apiKey: {
            type: 'apiKey',
            name: 'apiKey',
            in: 'header',
          },
        },
      },
      externalDocs: {
        url: 'https://swagger.io',
        description: 'Find more info here',
      },
    },
  });
  if (env.NODE_ENV !== 'production') {
    app.register(swaggerUi, {
      routePrefix: '/documentation',
      uiConfig: {
        docExpansion: 'full',
        deepLinking: false,
      },
      //uiHooks: {
      //  onRequest: function (request, reply, next) {
      //    next();
      //  },
      //  preHandler: function (request, reply, next) {
      //    next();
      //  },
      //},
      staticCSP: true,
      //transformStaticCSP: (header: any) => header,
      //transformSpecification: (swaggerObject: any) => {
      //  return swaggerObject;
      //},
      transformSpecificationClone: true,
    });
  }
}
