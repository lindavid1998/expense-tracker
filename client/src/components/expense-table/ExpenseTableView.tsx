import { type Expense } from "@/types";
import ExpenseRow from "./ExpenseRow";

function ExpenseTableView({ expenses }: { expenses: Expense[] }) {
  return (
    <div className="flex flex-col">
      {expenses.map((expense, index) => (
        <ExpenseRow key={index} expense={expense}></ExpenseRow>
      ))}
    </div>
  );
}

export default ExpenseTableView;
