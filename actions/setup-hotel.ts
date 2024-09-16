"use server"

import * as z from "zod";
import { OrganizationDetailsSchema } from "@/schemas"
import { db } from "@/lib/db";
import { createHotel, doesHotelExist, setupFeatures } from "@/data/hotel";
import { employments, users } from "@/drizzle";
import { setUserToConfigured } from "@/data/user";

export interface FeaturesProps {
    [key: string]: boolean;
}

export const setupHotel = async (values: z.infer<typeof OrganizationDetailsSchema>, userId: string | undefined) => {
    const validatedFields = OrganizationDetailsSchema.safeParse(values);
    
    console.log({formFields: validatedFields});

    if(!validatedFields.success) {
        return { error: "Invalid fields!" } ;
    }

    const { hotel_name, hotel_country, hotel_city, hotel_postal_code, hotel_street,  hotel_house_number} = validatedFields.data;

    const existingHotel = await doesHotelExist({name: "", city: hotel_city, country: hotel_country, zipcode: hotel_postal_code, city: hotel_city, street: hotel_street, streetNumber: hotel_house_number});

    if(existingHotel) return { error: "Hotel already exists" };
    else await createHotel({name: hotel_name, country: hotel_country, city: hotel_city, street: hotel_street, streetNumber: hotel_house_number, zipcode: hotel_postal_code}, userId);

    return { success: "Hotel setup successfully!" };
}



export const setupHotelDetails = async (userId: string | undefined , features: FeaturesProps) => {
    const test = await setupFeatures(userId, features);
    if(test) {
        await setUserToConfigured(Number(userId));
        return { success: "Hotel setup successfully!" };
    }
    return {error: "Error during setup"};
}