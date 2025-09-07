import { type Expense } from "@/types";
import ExpenseRow from "./ExpenseRow";
import axios from "axios";
import { useState } from "react";

function ExpenseTableView({ expenses }: { expenses: Expense[] }) {
  const [expensesToDisplay, setExpensesToDisplay] =
    useState<Expense[]>(expenses);

  const handleDelete = async (id: number) => {
    try {
      // delete from database
      await axios.delete(`http://localhost:3000/expenses/${id}`);

      // remove from UI
      setExpensesToDisplay((prev) =>
        prev.filter((expenses) => expenses.id != id)
      );
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="flex flex-col gap-4">
      {expensesToDisplay.map((expense, index) => (
        <ExpenseRow key={index} expense={expense} onDelete={handleDelete} />
      ))}
    </div>
  );
}

export default ExpenseTableView;
