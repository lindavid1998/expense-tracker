import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import ExpenseForm from "./ExpenseForm";
import { type Expense } from "@/types";
import { Edit } from "lucide-react";

function EditExpenseDialog({ expense }: { expense: Expense }) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="secondary" size="icon" className="size-8">
          <Edit />
        </Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Edit expense</DialogTitle>
          <DialogDescription>Enter the amount and category</DialogDescription>
        </DialogHeader>

        <ExpenseForm
          isEdit={true}
          initialValues={{
            amount: expense.amount,
            categoryId: expense.categoryId,
          }}
          expenseId={expense.id}
        />
      </DialogContent>
    </Dialog>
  );
}

export default EditExpenseDialog;
