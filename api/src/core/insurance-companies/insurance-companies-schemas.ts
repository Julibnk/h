import z from 'zod';
import { PolicySchema } from '../policies/policies-schemas.js';

export const InsuranceCompanySchema = z.object({
  id: z.string(),
  name: z.string(),
  insurances: PolicySchema.array().nullish(),
});
