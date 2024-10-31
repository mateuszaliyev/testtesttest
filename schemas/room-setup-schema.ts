import * as z from "zod";

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