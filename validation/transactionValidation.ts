import { z } from 'zod';

export const transactionSchema = z.object({
    title: z.string().min(1, "Title is required"),
    amount: z.number().positive("Amount must be greater than 0"),
    date: z.date().optional(),
    type: z.enum(["INCOME", "EXPENSE"]),
    description: z.string().optional(),
    source: z.string().optional(),
});