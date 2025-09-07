import AddEditExpenseDialog from "./components/AddEditExpenseDialog";
import ExpenseTable from "./components/expense-table/ExpenseTable";

function App() {
  return (
    <div className="w-screen h-screen">
      <AddEditExpenseDialog />
      <ExpenseTable />
    </div>
  );
}

export default App;
