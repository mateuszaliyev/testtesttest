"use client";

import {
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { UseFieldArrayRemove, UseFormReturn } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { z } from "zod";
import { guests } from "@/schemas/guest-schema";
import { Button } from "@/components/ui/button";

interface FormContentProps {
    index: number;
    form: UseFormReturn<z.infer<typeof guests>>;
    remove: UseFieldArrayRemove;
}

const FormContent = ({ index, form, remove }: FormContentProps) => {
    return (
        <div className="grid grid-cols-[1fr_1fr_auto] gap-4">
            <div>
                <FormField
                    control={form.control}
                    name={`guests.${index}.first_name`}
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>First Name</FormLabel>
                            <FormControl>
                                <Input placeholder="John" {...field} />
                            </FormControl>
                            <FormDescription>
                                Enter the guests first name.
                            </FormDescription>
                            <FormMessage />
                        </FormItem>
                    )}
                />
            </div>

            <div>
                <FormField
                    control={form.control}
                    name={`guests.${index}.last_name`}
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Last Name</FormLabel>
                            <FormControl>
                                <Input placeholder="Doe" {...field} />
                            </FormControl>
                            <FormDescription>
                                Enter the guests last name.
                            </FormDescription>
                            <FormMessage />
                        </FormItem>
                    )}
                />
            </div>
            <Button onClick={() => remove(index)} type="button">
                Remove
            </Button>
        </div>
    );
};

export default FormContent;
