import { FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { UseFormReturn } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { z } from "zod";
import {guests, GuestSchema} from "@/schemas/guest-schema";

interface FormContentProps {
    index: number;
    form: UseFormReturn<z.infer<typeof guests>>;
}

const FormContent = ({ index, form }: FormContentProps) => {
    return (
        <div className="grid grid-cols-12 gap-4">
            <div className="col-span-6">
                <FormField
                    control={form.control}
                    name={`${index}.first_name`}
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>First Name</FormLabel>
                            <FormControl>
                                <Input
                                    placeholder="John"
                                    {...field}
                                />
                            </FormControl>
                            <FormDescription>Enter the guests first name.</FormDescription>
                            <FormMessage />
                        </FormItem>
                    )}
                />
            </div>

            <div className="col-span-6">
                <FormField
                    control={form.control}
                    name={`${index}.last_name`}
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Last Name</FormLabel>
                            <FormControl>
                                <Input
                                    placeholder="Doe"
                                    {...field}
                                />
                            </FormControl>
                            <FormDescription>Enter the guests last name.</FormDescription>
                            <FormMessage />
                        </FormItem>
                    )}
                />
            </div>
        </div>
    );
};

export default FormContent;
