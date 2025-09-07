import { type Expense } from "@/types";
import ExpenseTableView from "./ExpenseTableView";

const expenses: Expense[] = [
  {
    amount: 50,
    category: "Food",
    timestamp: new Date(),
  },
  {
    amount: 150,
    category: "Groceries",
    timestamp: new Date(),
  },
];

function ExpenseTable() {
  return (
    <div>
      <ExpenseTableView expenses={expenses} />
    </div>
  );
}

export default ExpenseTable;
