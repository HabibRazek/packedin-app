export interface TransactionFormProps {
    initialData?: {
        id: number;
        title: string;
        amount: number;
        type: "INCOME" | "EXPENSE";
        description?: string;
        source?: string;
    } | null;
}
