import z from 'zod';

export const InsuranceCompanyResponseSchema = z.object({
  id: z.string(),
  name: z.string(),
});
