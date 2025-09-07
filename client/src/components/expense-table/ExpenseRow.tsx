import { type Expense } from "@/types";
import { format } from "date-fns";
import { Button } from "../ui/button";
import { Trash } from "lucide-react";

interface ExpenseRowProps {
  expense: Expense;
  onDelete: () => void;
}

function ExpenseRow({ expense, onDelete }: ExpenseRowProps) {
  const handleDelete = () => {
    console.log('deleting expense:', expense.id)
    onDelete();
  }

  return (
    <div className="flex flex-row gap-2 items-center">
      <div className="w-20">ID: {expense.id}</div>
      <div className="w-40">${expense.amount}</div>
      <div className="w-80">Category: {expense.category}</div>
      <div className="w-40">
        Date: {format(new Date(expense.timestamp), "MM/dd/yyyy")}
      </div>
      <Button onClick={handleDelete} variant="secondary" size="icon" className="size-8">
        <Trash />
      </Button>
    </div>
  );
}

export default ExpenseRow;
