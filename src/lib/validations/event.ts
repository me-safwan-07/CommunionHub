import * as z from 'zod';

export const eventSchema = z.object({
  title: z.string()
    .min(3, 'Title must be at least 3 characters')
    .max(100, 'Title must be less than 100 characters'),
  date: z.string()
    .refine((date) => new Date(date) >= new Date(new Date().setHours(0, 0, 0, 0)), {
      message: 'Date must be today or in the future',
    }),
  location: z.string()
    .min(3, 'Location must be at least 3 characters')
    .max(100, 'Location must be less than 100 characters'),
  description: z.string()
    .min(10, 'Description must be at least 10 characters')
    .max(500, 'Description must be less than 500 characters'),
  category: z.enum(['religious', 'social', 'charity']),
});

export type EventFormData = z.infer<typeof eventSchema>;