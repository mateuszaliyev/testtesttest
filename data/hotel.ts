import { addresses, employments, hotels } from "@/drizzle";
import { db } from "@/lib/db";
import { and, eq } from "drizzle-orm";

interface HotelProps {
    name: string;
    country: string;
    street: string;
    zipcode: string;
    city: string;
    streetNumber: string;
}
export const doesHotelExist = async ({
    name = "doesnt matter",
    country,
    street,
    zipcode,
    city,
    streetNumber
} : HotelProps) => {
    try {
        const mergedAddress = `${street} ${streetNumber}`;
        const hotel = await db
                            .select()
                            .from(addresses)
                            .where(
                                and(
                                    eq(addresses.address, mergedAddress),
                                    eq(addresses.city, city),
                                    eq(addresses.zipcode, zipcode),
                                    eq(addresses.country, country)
                                )
                            )
                            .limit(1);
        return hotel.length > 0;
    } catch {
        return null;
    }
}

export const createHotel = async ({
    name,
    country,
    city,
    street,
    zipcode,
    streetNumber
} : HotelProps, userId: string | undefined) => {
    try {
        if(userId) {
        const mergedAddress = `${street} ${streetNumber}`;
        const newAddress = await db
                            .insert(addresses)
                            .values({
                                address: mergedAddress,
                                city: city,
                                country: country,
                                zipcode: zipcode,
                                state: "123"
                            })
                            .returning({ id: addresses.id });

        
        console.log('Address inserted:', newAddress);

        const addressId = newAddress[0].id;

        const newHotel = await db
                            .insert(hotels)
                            .values({
                                address_id: addressId,
                                name: name,
                            }).returning({ id: hotels.id });

        console.log('Hotel inserted:', newHotel);
        
        const updateEmployment = await db
                                    .update(employments)
                                    .set({hotel_id: newHotel[0].id})
                                    .where(eq(employments.user_id, Number(userId)))
                                    console.log("Updated employment", updateEmployment);

        }
    } catch(error) {
        console.error("Error during insertion -createHotel-", error);
    }
}