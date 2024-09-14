import * as z from "zod";

export const LoginSchema = z.object({
  email: z.string().email({
    message: "Email is required",
  }),
  password: z.string().min(1),
});

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

export const OrganizationDetailsSchema = z.object({
  hotel_name: z.string({
    message: "Hotel name is required",
  }),
  hotel_street: z.string({
    message: "Street is required",
  }),
  hotel_city: z.string({
    message: "Hotel name is required",
  }),
  hotel_country: z.string({
    message: "Street is required",
  }),
  hotel_postal_code: z.string({
    message: "Hotel name is required",
  }),
  hotel_house_number: z.string({
    message: "Street is required",
  }),
});

export const RoomSetupSchema = z.object({
  hotel_name: z.string().email({
    message: "Hotel name is required",
  }),
  hotel_street: z.string({
    message: "Street is required",
  }),
  hotel_city: z.string().email({
    message: "Hotel name is required",
  }),
  hotel_country: z.string({
    message: "Street is required",
  }),
  hotel_postal_code: z.string().email({
    message: "Hotel name is required",
  }),
  hotel_house_number: z.string({
    message: "Street is required",
  }),
});
