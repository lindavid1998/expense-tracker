import { type Expense } from "@/types";
import { format } from "date-fns";

function ExpenseRow({ expense }: { expense: Expense }) {
  return (
    <div className="flex flex-row gap-2">
      <div className="w-20">ID: {expense.id}</div>
      <div className="w-40">${expense.amount}</div>
      <div className="w-80">Category: {expense.category}</div>
      <div className="w-40">
        Date: {format(new Date(expense.timestamp), "MM/dd/yyyy")}
      </div>
    </div>
  );
}

export default ExpenseRow;
