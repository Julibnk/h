import { InsuranceType } from 'prisma/client/index.js';
import z from 'zod';

//enum InsuranceType {
//  HOME = 'HOME',
//  LIFE = 'LIFE',
//}
export const InsuranceSchema = z.object({
  id: z.string(),
  cost: z.number(),
  type: z.nativeEnum(InsuranceType),
  //insuranceCompanyId: z.string().uuid(),
});
export const InsuranceCompanySchema = z.object({
  id: z.string(),
  name: z.string(),
  insurances: InsuranceSchema.array().nullish(),
});
