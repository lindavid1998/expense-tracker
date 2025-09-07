import { type Expense } from "@/types";

function ExpenseTableView({ expenses }: { expenses: Expense[] }) {
  return <div>{JSON.stringify(expenses)}</div>;
}

export default ExpenseTableView;