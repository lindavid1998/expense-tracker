import AddEditExpenseDialog from "./components/AddEditExpenseDialog";
import ExpenseTable from "./components/expense-table/ExpenseTable";
import { Card } from "./components/ui/card";
import { Toaster } from 'sonner';

function App() {
  return (
    <div className="min-h-screen w-screen flex flex-col bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800">
      {/* Main Content */}
      <main className="w-full px-4 sm:px-6 lg:px-8 py-8 flex items-center justify-center">
        <div className="max-w-4xl">
          <div className="space-y-8">
            {/* Welcome Section */}
            <div className="text-center space-y-4">
              <h2 className="text-3xl font-bold text-foreground">
                Track Your Expenses
              </h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Keep track of your spending habits and manage your budget
                effectively. Add, edit, and monitor your expenses with ease.
              </p>
            </div>

            {/* Action Bar */}
            <Card className="p-6 bg-white/50 dark:bg-slate-800/50 backdrop-blur-sm border-0 shadow-lg">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-semibold text-foreground">
                    Your Expenses
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    Add new expenses or manage existing ones
                  </p>
                </div>
                <AddEditExpenseDialog />
              </div>
            </Card>

            {/* Expenses Table */}
            <Card className="p-6 bg-white/50 dark:bg-slate-800/50 backdrop-blur-sm border-0 shadow-lg">
              <ExpenseTable />
            </Card>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t bg-white/80 dark:bg-slate-900/80 backdrop-blur-sm mt-auto">
        <div className="w-full px-4 sm:px-6 lg:px-8 py-6">
          <div className="text-center text-sm text-muted-foreground">
            <p>© 2024 ExpenseTracker. Built with React & NestJS.</p>
          </div>
        </div>
      </footer>

      <Toaster theme="dark" position="top-center" />
    </div>
  );
}

export default App;
