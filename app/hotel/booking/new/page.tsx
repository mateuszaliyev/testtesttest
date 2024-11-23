"use client";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {guests, GuestSchema} from "@/schemas/guest-schema";
import Boilerplate from "@/components/hotel/boilerplate";
import FormWrapper from "@/components/hotel/new-booking/guest-form/form-wrapper";
import FormContent from "@/components/hotel/new-booking/guest-form/form-content";

const NewBooking = () => {
    const form = useForm<z.infer<typeof guests>>({
        resolver: zodResolver(guests),
        defaultValues: [
            {
                first_name: "",
                last_name: "",
                pesel: "",
                email: "",
                phone: "",
            },
        ],
    });

    return (
        <Boilerplate pageName="Booking" showCard>
            <div className="w-full p-3 mb-5">
                <FormWrapper form={form}>
                    <FormContent index={1} form={form}/>
                </FormWrapper>
            </div>
        </Boilerplate>
    );
};

export default NewBooking;
