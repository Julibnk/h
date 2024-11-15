import { FastifyInstance } from 'fastify';
import { ZodTypeProvider } from 'fastify-type-provider-zod';
import { InsuranceCompanyResponseSchema } from './insurance-companies-schemas.js';

export default async function (server: FastifyInstance) {
  server.withTypeProvider<ZodTypeProvider>().route({
    method: 'GET',
    url: '/',
    schema: { response: { 200: InsuranceCompanyResponseSchema.array() } },
    handler: async () => {
      const insurance = await server.prisma.insuranceCompany.findMany();
      return insurance;
    },
  });
}
