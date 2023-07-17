import { z } from 'zod';

export const supportMessageSchema = z.object({
  email: z.string().email('Please enter a valid email address'),
  message: z.string().min(10, 'Mesaage is not Long Enough'),
});
export type SupportMessageType = z.infer<typeof supportMessageSchema>;
