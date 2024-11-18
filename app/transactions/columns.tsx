"use client";

import { ColumnDef } from "@tanstack/react-table";
import { format } from "date-fns";
import { ArrowUpDown } from "lucide-react";

// Define the shape of your transaction data
export type Transaction = {
    id: string;
    title: string;
    amount: number;
    type: "INCOME" | "EXPENSE";
    date: Date;
    description?: string | null;
    source?: string | null;
};

// Define columns
export const columns: ColumnDef<Transaction>[] = [
    {
        accessorKey: "title",
        header: ({ column }) => (
            <div
                className="flex items-center gap-2 cursor-pointer"
                onClick={() =>
                    column.toggleSorting(column.getIsSorted() === "asc")
                }
            >
                Title
                <ArrowUpDown className="h-4 w-4" />
            </div>
        ),
        cell: ({ row }) => (
            <div
                className="truncate whitespace-nowrap"
                title={row.getValue("title")}
            >
                {row.getValue("title")}
            </div>
        ),
        size: 250,
    },
    {
        accessorKey: "amount",
        header: () => <div className="text-left">Amount</div>,
        cell: ({ row }) => {
            const amount = row.getValue<number>("amount");
            return (
                <div className="text-left font-medium">
                    {new Intl.NumberFormat("fr-TN", {
                        style: "currency",
                        currency: "TND",
                    }).format(amount)}
                </div>
            );
        },
        size: 150,
    },
    {
        accessorKey: "type",
        header: "Type",
        size: 100,
    },
    {
        accessorKey: "date",
        header: ({ column }) => (
            <div
                className="flex items-center gap-2 cursor-pointer"
                onClick={() =>
                    column.toggleSorting(column.getIsSorted() === "asc")
                }
            >
                Date
                <ArrowUpDown className="h-4 w-4" />
            </div>
        ),
        cell: ({ row }) => {
            const date = row.getValue<Date>("date");
            return <div>{format(new Date(date), "yyyy-MM-dd")}</div>;
        },
        size: 150,
    },
    {
        accessorKey: "description",
        header: "Description",
        cell: ({ row }) => (
            <div
                className="truncate whitespace-nowrap"
                title={row.getValue("description")}
            >
                {row.getValue("description")}
            </div>
        ),
        size: 250,
    },
    {
        accessorKey: "source",
        header: "Source",
        cell: ({ row }) => (
            <div
                className="truncate whitespace-nowrap"
                title={row.getValue("source")}
            >
                {row.getValue("source")}
            </div>
        ),
        size: 150,
    },
];
