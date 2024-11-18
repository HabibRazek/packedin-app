import { columns, Transaction } from "./columns"; // Ensure this path is correct
import { DataTable } from "./data-table";
import { getAllTransactions } from "@/actions/transaction.actions";

export default async function TransactionPage() {
    // Fetch transactions from the server
    const transactions: Transaction[] = await getAllTransactions();

    return (
        <div className="container mx-auto py-10">
            <h1 className="text-2xl font-bold mb-4">Transactions</h1>
            <DataTable columns={columns} data={transactions} />
        </div>
    );
}
