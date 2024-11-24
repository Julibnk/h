import { FastifyInstance } from 'fastify';
import { ZodTypeProvider } from 'fastify-type-provider-zod';
import { z } from 'zod';
import { InsuranceCompanySchema } from './insurance-companies-schemas.js';

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
        include: { policies: true },
      });
      if (!insurance) {
        res.status(404);
        return;
      }
      return insurance;
    },
  });
}
