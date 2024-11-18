export interface TransactionFormProps {
    initialData?: {
        id: string; 
        title: string;
        amount: number;
        type: "INCOME" | "EXPENSE";
        description?: string;
        source?: string;
    } | null;
}
