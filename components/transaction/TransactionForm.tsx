"use client";

import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { transactionSchema } from "@/validation/transactionValidation";
import { z } from "zod";
import { createTransaction, updateTransaction } from "@/actions/transaction.actions";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { TransactionFormProps } from "@/interfaces/transaction.interface";
import { FaMoneyCheck, FaPaperPlane } from "react-icons/fa";
import {
    Dialog,
    DialogTrigger,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogFooter,
} from "@/components/ui/dialog";
import { Separator } from "@/components/ui/separator";
import {
    Select,
    SelectTrigger,
    SelectValue,
    SelectContent,
    SelectItem,
} from "@/components/ui/select";

type TransactionFormValues = z.infer<typeof transactionSchema>;

const TransactionForm: React.FC<TransactionFormProps> = ({ initialData }) => {
    const { toast } = useToast();

    const {
        register,
        handleSubmit,
        setValue,
        watch,
        reset, // React Hook Form reset function
        formState: { errors, isSubmitting },
    } = useForm<TransactionFormValues>({
        resolver: zodResolver(transactionSchema),
        defaultValues: initialData
            ? { ...initialData }
            : {
                title: "",
                amount: 0,
                date: new Date(),
                type: "INCOME",
                description: "",
                source: "",
            },
    });

    const onSubmit = async (data: TransactionFormValues) => {
        try {
            if (initialData?.id) {
                await updateTransaction(initialData.id, data);
                toast({
                    title: "Success",
                    description: "Transaction updated successfully!",
                });
            } else {
                await createTransaction(data);
                toast({
                    title: "Success",
                    description: "Transaction created successfully!",
                });
                reset({
                    title: "",
                    amount: 0,
                    date: new Date(),
                    type: "INCOME",
                    description: "",
                    source: "",
                });
            }
        } catch {
            toast({
                title: "Error",
                description: "An error occurred. Please try again.",
                variant: "destructive",
            });
        }
    };

    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button className="mt-4">Add Transaction</Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>
                        <span className="text-2xl font-extrabold flex items-center gap-2">
                            <FaMoneyCheck /> Add Transaction
                        </span>
                        <p className="text-sm text-muted-foreground">Fill the form below to add a new transaction.</p>
                    </DialogTitle>
                    <Separator />
                </DialogHeader>
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                    <div>
                        <Label htmlFor="title">Title</Label>
                        <Input
                            id="title"
                            placeholder="Transaction Title"
                            {...register("title")}
                        />
                        {errors.title && (
                            <p className="text-red-500 text-sm mt-1">{errors.title.message}</p>
                        )}
                    </div>

                    <div>
                        <Label htmlFor="amount">Amount</Label>
                        <Input
                            id="amount"
                            type="number"
                            placeholder="Transaction Amount"
                            {...register("amount", { valueAsNumber: true })}
                        />
                        {errors.amount && (
                            <p className="text-red-500 text-sm mt-1">{errors.amount.message}</p>
                        )}
                    </div>

                    <div>
                        <Label htmlFor="type">Type</Label>
                        <Select
                            onValueChange={(value) =>
                                setValue("type", value as "INCOME" | "EXPENSE", {
                                    shouldValidate: true,
                                })
                            }
                            defaultValue={watch("type") || "INCOME"}
                        >
                            <SelectTrigger id="type">
                                <SelectValue placeholder="Select type" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="INCOME">Income</SelectItem>
                                <SelectItem value="EXPENSE">Expense</SelectItem>
                            </SelectContent>
                        </Select>
                        {errors.type && (
                            <p className="text-red-500 text-sm mt-1">{errors.type.message}</p>
                        )}
                    </div>

                    <div>
                        <Label htmlFor="description">Description</Label>
                        <textarea
                            id="description"
                            placeholder="Description"
                            {...register("description")}
                            className="border rounded px-2 py-1 w-full"
                        />
                        {errors.description && (
                            <p className="text-red-500 text-sm mt-1">
                                {errors.description.message}
                            </p>
                        )}
                    </div>

                    <div>
                        <Label htmlFor="source">Source</Label>
                        <Input
                            id="source"
                            placeholder="Source (optional)"
                            {...register("source")}
                        />
                        {errors.source && (
                            <p className="text-red-500 text-sm mt-1">{errors.source.message}</p>
                        )}
                    </div>

                    <DialogFooter>
                        <Button
                            type="submit"
                            disabled={isSubmitting}
                            className="w-full flex items-center justify-center gap-2"
                        >
                            {initialData ? "Update Transaction" : "Create Transaction"}
                            <FaPaperPlane className="ml-2" />
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
};

export default TransactionForm;
