import { FastifyInstance, FastifyReply, FastifyRequest, RouteHandlerMethod } from 'fastify';
import { ZodTypeProvider } from 'fastify-type-provider-zod';
import { Decimal } from 'prisma/client/runtime/library.js';
import { z } from 'zod';
import { BankOfferSchema, BankSchema } from './banks-schemas.js';

// Define the handler type
//type GetBanksHandler = (
//  request: FastifyRequest<{
//    Querystring: typeof querySchema._output;
//    Params: typeof paramsSchema._output;
//  }>,
//  response: FastifyReply<>
//
//
//) => Promise<void>;

//const a: RouteHandlerMethod = {};
export default async function (server: FastifyInstance) {
  server.withTypeProvider<ZodTypeProvider>().route({
    method: 'GET',
    url: '/',
    schema: { response: { 200: BankSchema.array() } },
    handler: async () => {
      const insurance = await server.prisma.bank.findMany();
      return insurance;
    },
  });
  server.withTypeProvider<ZodTypeProvider>().route({
    method: 'POST',
    url: '/:bankId/offers',
    schema: {
      params: z.object({ bankId: z.string().uuid() }),
      body: BankOfferSchema,
      response: {
        201: BankOfferSchema,
        404: z.null(),
      },
    },
    handler: async (req, res) => {
      const bankOffer = await server.prisma.bankOffer.create({
        data: {
          id: req.body.id,
          version: req.body.version,
          propertyPrice: new Decimal(req.body.propertyPrice),
          percentage: new Decimal(req.body.percentage),
          requestedAmount: new Decimal(req.body.requestedAmount),
          type: req.body.type,
          bank: { connect: { id: req.params.bankId } },
        },
      });
      if (!bankOffer) {
        res.status(404);
        return;
      }
      return bankOffer;
    },
  });

  server.withTypeProvider<ZodTypeProvider>().route({
    method: 'GET',
    url: '/:id/offers',
    schema: {
      params: z.object({ id: z.string().uuid() }),
      response: {
        200: BankOfferSchema,
        404: z.null(),
      },
    },
    handler: async (req, res) => {
      const bankOffers = await server.prisma.bankOffer.findMany({
        where: { bankId: req.params.id },
      });
      if (!baknOffers) {
        res.status(404);
        return;
      }
      return bankOffers;
    },
  });
  //server.withTypeProvider<ZodTypeProvider>().route({
  //  method: 'POST',
  //  url: '/:id/policy',
  //  schema: {
  //    params: z.object({ id: z.string().uuid() }),
  //    body: InsuranceSchema,
  //    response: {
  //      201: InsuranceSchema,
  //      404: z.null(),
  //    },
  //  },
  //  handler: async (req, res) => {
  //    const insurance = await server.prisma.insurance.create({
  //      data: {
  //        id: req.body.id,
  //        cost: req.body.cost,
  //        type: req.body.type,
  //        insuranceCompany: { connect: { id: req.params.id } },
  //      },
  //    });
  //    if (!insurance) {
  //      res.status(404);
  //      return;
  //    }
  //    res.status(201);
  //    //return insurance;
  //  },
  //});
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
