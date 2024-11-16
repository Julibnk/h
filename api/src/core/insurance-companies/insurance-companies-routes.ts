import { FastifyInstance } from 'fastify';
import { ZodTypeProvider } from 'fastify-type-provider-zod';
import { z } from 'zod';
import { InsuranceCompanySchema, InsuranceSchema } from './insurance-companies-schemas.js';

export default async function (server: FastifyInstance) {
  server.withTypeProvider<ZodTypeProvider>().route({
    method: 'GET',
    url: '/',
    schema: { response: { 200: InsuranceCompanySchema.array() } },
    handler: async () => {
      const insurance = await server.prisma.insuranceCompany.findMany();
      return insurance;
    },
  });
  server.withTypeProvider<ZodTypeProvider>().route({
    method: 'GET',
    url: '/:id',
    schema: {
      params: z.object({ id: z.string().uuid() }),
      response: {
        200: InsuranceCompanySchema,
        404: z.null(),
      },
    },
    handler: async (req, res) => {
      const insurance = await server.prisma.insuranceCompany.findUnique({
        where: { id: req.params.id },
      });
      if (!insurance) {
        res.status(404);
        return;
      }
      return insurance;
    },
  });

  server.withTypeProvider<ZodTypeProvider>().route({
    method: 'POST',
    url: '/:id/policy',
    schema: {
      params: z.object({ id: z.string().uuid() }),
      body: InsuranceSchema,
      response: {
        201: InsuranceSchema,
        404: z.null(),
      },
    },
    handler: async (req, res) => {
      const insurance = await server.prisma.insurance.create({
        data: {
          id: req.body.id,
          cost: req.body.cost,
          type: req.body.type,
          insuranceCompany: { connect: { id: req.params.id } },
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
  //server.withTypeProvider<ZodTypeProvider>().route({
  //  method: 'GET',
  //  url: '/',
  //  schema: { response: { 200: InsuranceCompanyResponseSchema.array() } },
  //  handler: async () => {
  //    const insurance = await server.prisma.insuranceCompany.findMany();
  //    return insurance;
  //  },
  //});
}
