import * as z from "zod";

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