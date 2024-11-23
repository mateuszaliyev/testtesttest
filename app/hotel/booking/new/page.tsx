"use client";
import { z } from "zod";
import { useFieldArray, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { guests } from "@/schemas/guest-schema";
import Boilerplate from "@/components/hotel/boilerplate";
import FormWrapper from "@/components/hotel/new-booking/guest-form/form-wrapper";
import FormContent from "@/components/hotel/new-booking/guest-form/form-content";
import { Button } from "@/components/ui/button";

const initialGuest: z.infer<typeof guests>["guests"][number] = {
    email: "",
    first_name: "",
    last_name: "",
    pesel: "",
    phone: "",
};

const NewBooking = () => {
    const form = useForm<z.infer<typeof guests>>({
        resolver: zodResolver(guests),
        defaultValues: {
            guests: [initialGuest],
        },
    });

    const { append, fields, remove } = useFieldArray({
        control: form.control,
        name: "guests",
    });

    return (
        <Boilerplate pageName="Booking" showCard>
            <div className="w-full p-3 mb-5">
                <Button onClick={() => append(initialGuest)}>Add</Button>
                <FormWrapper form={form}>
                    {fields.map((field, index) => (
                        <FormContent
                            form={form}
                            index={index}
                            key={field.id}
                            remove={remove}
                        />
                    ))}
                </FormWrapper>
            </div>
        </Boilerplate>
    );
};

export default NewBooking;
