"use client"

import {Form} from "@/components/ui/form";
import {UseFormReturn} from "react-hook-form";
import {z} from "zod";
import {GuestSchema, guests} from "@/schemas/guest-schema";
import {Button} from "@/components/ui/button";
import {useEffect} from "react";
import GuestForm from "@/components/hotel/new-booking/guest-form/index";

interface FormWrapperProps {
    children: React.ReactNode;
    form: UseFormReturn<z.infer<typeof guests>>;
}

const FormWrapper = ({ children, form }: FormWrapperProps) => {

    const submitData = (data: z.infer<typeof guests>) => {
        console.log("Form Submitted:");
        console.log(JSON.stringify(data, null, 2));
    };

    useEffect(() => {
        console.log(form.formState.errors);
    }, [form.formState.errors]);

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(submitData)}>
                {children}
                <Button
                    type="submit"
                    disabled={form.formState.isSubmitting}
                >
                    Submit
                </Button>
            </form>
        </Form>
    );
}

export default FormWrapper;