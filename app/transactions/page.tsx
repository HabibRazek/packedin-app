import { columns, Transaction } from "./columns"; 
import { DataTable } from "./data-table";
import { getAllTransactions } from "@/actions/transaction.actions";
import { CiBank } from "react-icons/ci";

export default async function TransactionPage() {
    // Fetch transactions from the server
    const transactions: Transaction[] = await getAllTransactions();

    return (
        <div className="container mx-auto py-10 px-4 sm:px-6 lg:px-8">
            <div className="mb-6">
                <h1 className="text-3xl font-extrabold flex items-center gap-2">
                    <CiBank className="text-blue-700 font-semibold" size={32} />
                    Transactions
                </h1>
                <p className="text-sm text-gray-600 mt-1">
                    Keep track of all your transactions in one place. View, sort, and manage them easily.
                </p>
            </div>
            <DataTable columns={columns} data={transactions} />
        </div>
    );
}
