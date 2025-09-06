import { toast } from "sonner";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import axios from "axios";

/* The benefit of using react hook form
- only need to worry about:
    defining schema, validation rules, default values
    registering form fields to be managed by the hook
    placeholder
- validation, state mangement is handled by the hook
*/

const formSchema = z.object({
  categoryId: z.coerce.number<number>().int().min(1).max(4),
  amount: z.coerce.number<number>().int().positive(),
});

export default function ExpenseForm() {
  // define the form
  // form has properties: handleSubmit, control, formState, ...
  // control connects form fields to state management
  // i.e. values, dirty, onChange, validation
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      amount: 0,
    },
  });

  // submit handler
  async function onSubmit(values: z.infer<typeof formSchema>) {
    // Do something with the form values.
    try {
      const data = {
        amount: values.amount,
        categoryId: values.categoryId,
        userId: 1, // hard coded
      };

      const url = `${import.meta.env.VITE_BACKEND_HOST}/transactions`;
      const response = await axios.post(url, data);
      console.log(response)

      console.log("Form data", values);
      toast(
        <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
          <code className="text-white">{JSON.stringify(values, null, 2)}</code>
        </pre>
      );
    } catch (error) {
      console.error("Form submission error", error);
      toast.error("Failed to submit the form. Please try again.");
    }
  }

  return (
    <Form {...form}>
      <form
        // handleSubmit validates input before calling onSubmit
        onSubmit={form.handleSubmit(onSubmit)}
        className="w-full space-y-8 max-w-xl mx-auto py-2"
      >
        <FormField
          control={form.control} // register the form field
          name="amount"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Amount</FormLabel>
              <FormControl>
                {/* field object passes in props for value, onChange, onBlur, etc */}
                <Input placeholder="Enter an amount" type="number" {...field} />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="categoryId"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Category</FormLabel>
              <Select onValueChange={field.onChange}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a category" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="1">Food</SelectItem>
                  <SelectItem value="2">Transportation</SelectItem>
                  <SelectItem value="3">Entertainment</SelectItem>
                  <SelectItem value="4">Groceries</SelectItem>
                </SelectContent>
              </Select>

              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit">Submit</Button>
      </form>
    </Form>
  );
}
