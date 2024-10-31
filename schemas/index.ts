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

export const FormDataSchema = z.object({
  firstName: z.string().min(1, 'First name is required'),
  lastName: z.string().min(1, 'Last name is required'),
  email: z.string().min(1, 'Email is required').email('Invalid email address'),
  country: z.string().min(1, 'Country is required'),
  street: z.string().min(1, 'Street is required'),
  city: z.string().min(1, 'City is required'),
  state: z.string().min(1, 'State is required'),
  zip: z.string().min(1, 'Zip is required')
})

export const ReservationData = z.object({
  date: z.object({
      dateFrom: z.string().nonempty("Check-in date is required"),
      dateTo: z.string().nonempty("Check-out date is required"),
  }),
  guests: z.object({
      adults: z.number().min(1, "At least one adult is required"),
      children: z.number().min(0),
      infants: z.number().min(0),
      pets: z.number().min(0),
  }),
  extraServices: z.array(z.string()).default(["None"]),
  contactInfo: z.string().optional().default("atPlace"),
  reservationType: z.enum(["atPlace", "email", "phone"]), 
});
  /*
  dateFrom: z.string().min(1, ' is required'),
  dateTo: z.string().min(1, ' is required'),
  adultAmount: z.number().min(1, ' is required'),
  childrenAmount: z.number().min(1, 'is required'),
  infantAmount: z.number().min(1, ' is required'),
  petAmount: z.number().min(1, 'is required'),
  typeOfReservation: z.string().min(1, ' is required'),
  extraServices: z.string(),*/