import { FastifyInstance } from 'fastify';
import { ZodTypeProvider } from 'fastify-type-provider-zod';
import { z } from 'zod';
import { PolicySchema } from './policies-schemas.js';

export default async function (server: FastifyInstance) {
  server.withTypeProvider<ZodTypeProvider>().route({
    method: 'GET',
    url: '/',
    schema: {
      response: {
        200: PolicySchema.array(),
        404: z.null(),
      },
    },
    handler: async () => await server.prisma.insurance.findMany(),
  });

  server.withTypeProvider<ZodTypeProvider>().route({
    method: 'POST',
    url: '/',
    schema: {
      body: PolicySchema,
      response: {
        201: PolicySchema,
        404: z.null(),
      },
    },
    handler: async (req, res) => {
      const insurance = await server.prisma.insurance.create({
        data: {
          id: req.body.id,
          cost: req.body.cost,
          type: req.body.type,
          insuranceCompany: { connect: { id: req.body.insuranceCompanyId } },
        },
      });
      if (!insurance) {
        res.status(404);
        return;
      }
      res.status(201);
      //return insurance;
    },
  });
}
