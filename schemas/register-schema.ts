import * as z from "zod";

export const RegisterSchema = z
  .object({
    email: z.string().email({ message: "Email is required" }),
    password: z.string().min(6, { message: "Minimum 6 characters required" }),
    first_name: z.string().min(2, { message: "First name is required" }),
    last_name: z.string().min(2, { message: "Last name is required" }),
    repeat_password: z
      .string()
      .min(6, { message: "Minimum 6 characters required" }),
    role: z.enum(["owner", "employee"], { message: "Role is required" }),
    acceptedToS: z.boolean().refine((val) => val === true, {
      message: "You must accept the terms and conditions",
    }),
  })
  .refine((data) => data.password === data.repeat_password, {
    message: "Passwords don't match",
    path: ["repeat_password"],
  });
