import FormTitle from "@/components/hotel/new-booking/guest-form/form-title";
import { UseFormReturn } from "react-hook-form";
import { z } from "zod";
import {GuestSchema, guests} from "@/schemas/guest-schema";
import {Button} from "@/components/ui/button";

interface GuestFormProps {
    type: string;
    index: number;
    form: UseFormReturn<z.infer<typeof guests>>;
}

const GuestForm = ({ type, index, form}: GuestFormProps) => {
    return (
        <div className="w-full flex flex-col space-y-3">
            <FormTitle index={index} type={type} />
        </div>
    );
};

export default GuestForm;
