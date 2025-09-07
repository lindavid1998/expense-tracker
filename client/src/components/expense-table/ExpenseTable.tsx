import { type Expense } from "@/types";
import ExpenseTableView from "./ExpenseTableView";
import { useEffect, useState } from "React";
import axios from "axios";

// const expenses: Expense[] = [
//   {
//     amount: 50,
//     category: "Food",
//     timestamp: new Date(),
//   },
//   {
//     amount: 150,
//     category: "Groceries",
//     timestamp: new Date(),
//   },
// ];

const userId = 1; // HARD CODED

function ExpenseTable() {
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchExpenses = async () => {
      try {
        setLoading(true);
        const response = await axios.get(
          `${import.meta.env.VITE_BACKEND_HOST}/expenses/user/${userId}`
        );
        setExpenses(response.data);
        console.log(response.data);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    fetchExpenses();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <ExpenseTableView expenses={expenses} />
    </div>
  );
}

export default ExpenseTable;
