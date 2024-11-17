import { MortageType } from 'prisma/client/index.js';
import z from 'zod';

export const BankSchema = z.object({
  id: z.string(),
  name: z.string(),
});
export const BankOfferSchema = z.object({
  id: z.string(),
  version: z.number(),
  propertyPrice: z.number(),
  percentage: z.number(),
  requestedAmoung: z.number(),
  type: z.nativeEnum(MortageType),
  bankId: z.string(),
});
