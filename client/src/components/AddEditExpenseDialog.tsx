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
import { useState } from "react";

function AddEditExpenseDialog({ expense }: { expense?: Expense }) {
  const isEdit = !!expense; // if expense is passed in, set edit mode to true
  const [open, setOpen] = useState(false);

  const toggleDialog = () => {
    setOpen((prev) => !prev);
  };

  const closeDialog = () => {
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={toggleDialog}>
      <DialogTrigger asChild>
        {isEdit ? (
          <Button variant="secondary" size="icon" className="size-8">
            <Edit />
          </Button>
        ) : (
          <Button variant="outline">Add Expense</Button>
        )}
      </DialogTrigger>

      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>{isEdit ? "Edit" : "Add"} expense</DialogTitle>
          <DialogDescription>Enter the amount and category</DialogDescription>
        </DialogHeader>

        {isEdit && expense ? (
          <ExpenseForm
            initialValues={{
              amount: expense.amount,
              categoryId: expense.categoryId,
            }}
            expenseId={expense.id}
            onSuccess={closeDialog}
          />
        ) : (
          <ExpenseForm onSuccess={closeDialog} />
        )}
      </DialogContent>
    </Dialog>
  );
}

export default AddEditExpenseDialog;
