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
import { useState, useEffect } from "react";
import { type Category } from "@/types";

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

interface ExpenseFormProps {
  initialValues?: z.infer<typeof formSchema>;
  expenseId?: number;
  onSuccess: () => void;
}

export default function ExpenseForm({
  initialValues,
  expenseId,
  onSuccess,
}: ExpenseFormProps) {
  const isEdit = !!expenseId; // if expenseId is passed in, set edit mode to true
  const [categories, setCategories] = useState<Category[]>();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        console.log("fetching categories...");
        setLoading(true);
        const response = await axios.get(
          `${import.meta.env.VITE_BACKEND_HOST}/categories`
        );
        const data = response.data;
        setCategories(data);
        console.log("loaded categories");
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

  // define the form
  // form has properties: handleSubmit, control, formState, ...
  // control connects form fields to state management
  // i.e. values, dirty, onChange, validation
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    // load initial values here?
    defaultValues: initialValues || {
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

      const url = `${import.meta.env.VITE_BACKEND_HOST}/expenses`;

      if (isEdit) {
        await axios.patch(`${url}/${expenseId}`, data);
      } else {
        const response = await axios.post(url, data);
        console.log(response);
      }

      console.log("Form data", values);
      toast.success(`Successfully ${isEdit ? "edited" : "added"} expense`);
      onSuccess();
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
              <Select
                onValueChange={field.onChange}
                defaultValue={field.value?.toString()}
              >
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a category" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {loading ? (
                    <div className="text-sm">Loading categories...</div>
                  ) : (
                    <>
                      {categories?.map((category) => (
                        <SelectItem key={category.id} value={`${category.id}`}>
                          {category.name}
                        </SelectItem>
                      ))}
                    </>
                  )}
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
