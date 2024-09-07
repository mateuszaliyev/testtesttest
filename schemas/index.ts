import * as z from "zod";

export const LoginSchema = z.object({
    email: z.string().email({
        message: "Email is required"
    }),
    password: z.string().min(1)
});

export const RegisterSchema = z.object({
    email: z.string().email({
        message: "Email is required"
    }),
    password: z.string().min(6, {
        message: "Minimum 6 characters required",
    }),
    first_name: z.string().min(2, {
        message: "Name is required",
    }),
    last_name: z.string().min(2, {
        message: "Name is required",
    }),
    phone: z.string().min(2, {
        message: "Phone is required",
    }),
});