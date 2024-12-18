"use server";

import prisma from "@/lib/prismaClient";
import { z } from "zod";
import { transactionSchema } from "@/validation/transactionValidation";

// Get all transactions
export async function getAllTransactions() {
    const transactions = await prisma.transaction.findMany();
    return transactions;
}

// Get transaction by ID
export async function getTransactionById(id: string) { // Use `string` for UUID
    const transaction = await prisma.transaction.findUnique({
        where: { id },
    });
    return transaction;
}

// Create a new transaction
export async function createTransaction(data: z.infer<typeof transactionSchema>) {
    const validatedData = transactionSchema.parse(data);

    const transaction = await prisma.transaction.create({
        data: validatedData,
    });

    return transaction;
}

// Update a transaction
export async function updateTransaction(id: string, data: z.infer<typeof transactionSchema>) { // Use `string` for UUID
    const validatedData = transactionSchema.parse(data);

    const transaction = await prisma.transaction.update({
        where: { id },
        data: validatedData,
    });

    return transaction;
}

// Delete a transaction
export async function deleteTransaction(id: string) { // Use `string` for UUID
    await prisma.transaction.delete({
        where: { id },
    });
    return true;
}
