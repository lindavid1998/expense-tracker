import { AddExpenseDialog } from "./components/AddExpenseDialog";
import ExpenseTable from "./components/expense-table/ExpenseTable";

function App() {
  return (
    <div className="w-screen h-screen">
      <AddExpenseDialog />
      <ExpenseTable />
    </div>
  );
}

export default App;
