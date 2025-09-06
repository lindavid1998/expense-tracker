import React, { useState } from "react";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "@radix-ui/react-label";
import axios from "axios";

/* Handle user input and send to API */
interface ExpenseFormProps {
  onClose?: () => void;
}

interface CreateExpenseRequest {
  amount: number;
  categoryId: number;
  userId: number;
}

function ExpenseForm({ onClose }: ExpenseFormProps) {
  const [amount, setAmount] = useState<number>(0);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log("submit form data to api");
    console.log(`${import.meta.env.VITE_BACKEND_HOST}/transactions`);

    const data: CreateExpenseRequest = {
      // hard coded for now
      amount: 10,
      userId: 1,
      categoryId: 1,
    };

    try {
      await axios.post(
        `${import.meta.env.VITE_BACKEND_HOST}/transactions`,
        data
      );
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Card className="max-w-[600px]">
      <CardHeader>
        <CardTitle>Add expense</CardTitle>
        {/* <CardDescription>Card Description</CardDescription> */}
        {/* <CardAction>Card Action</CardAction> */}
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit}>
          {/* amount */}
          <Label htmlFor="amount">Amount</Label>
          <Input
            type="number"
            value={amount}
            placeholder="Enter amount"
            id="amount"
            // TODO: fix
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setAmount(Number(e.target.value))
            }
          />

          {/* category selector */}
          <Select>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Enter a category" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="1">1</SelectItem>
              <SelectItem value="2">2</SelectItem>
              <SelectItem value="3">3</SelectItem>
            </SelectContent>
          </Select>

          {/* actions buttons */}
          <div className="mt-2 flex gap-2 justify-end">
            <Button variant="secondary" type="button" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit">Submit</Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}

export default ExpenseForm;
