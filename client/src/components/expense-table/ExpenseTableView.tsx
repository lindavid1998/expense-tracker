import { type Expense } from "@/types";
import ExpenseRow from "./ExpenseRow";

function ExpenseTableView({ expenses }: { expenses: Expense[] }) {
  const handleDelete = () => {};
  return (
    <div className="flex flex-col gap-4">
      {expenses.map((expense, index) => (
        <ExpenseRow key={index} expense={expense} onDelete={handleDelete} />
      ))}
    </div>
  );
}

export default ExpenseTableView;
