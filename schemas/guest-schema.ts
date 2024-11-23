import { z } from "zod";

export const GuestSchema = z.object({
    first_name: z.string().min(1, "First name is required"),
    last_name: z.string().min(1, "Last name is required"),
    pesel: z.string().min(1, "Pesel is required"),
    email: z.string().email("Invalid email").optional(),
    phone: z.string().optional(),
});

export const guests = z.array(GuestSchema);
