import { InsuranceType } from 'prisma/client/index.js';
import z from 'zod';

export const PolicySchema = z.object({
  id: z.string().uuid(),
  cost: z.number(),
  type: z.nativeEnum(InsuranceType),
  insuranceCompanyId: z.string().uuid(),
});
