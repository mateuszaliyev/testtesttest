import { FeaturesProps } from "@/actions/setup-hotel";
import { addresses, employments, hotels, users } from "@/drizzle";
import { db } from "@/lib/db";
import { and, eq } from "drizzle-orm";
import { getUserById } from "./user";

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

// TODO CHANGE SCHEMA FOR HOTEL OWNER
export const getHotelByOwnerId = async (ownerId: string | undefined) => {
    if (ownerId) {
    const query = db.select({
        id: users.id,
        first_name: users.first_name,
        last_name: users.last_name,
        email: users.email,
        role_id: employments.role_id,
        hotel_id: employments.hotel_id
      })
      .from(users)
      .leftJoin(employments, eq(employments.user_id, users.id))
      .where(and(eq(employments.role_id, 1), eq(users.id, Number(ownerId))))

    
      return query;
      }
      return null;
}

export const getHotelById = async (hotelId: string | undefined) => {
    const query = await db.select().from(hotels).where(eq(hotels.id, Number(hotelId))).limit(1);
    return query;
}

export const setupFeatures = async (ownerId: string | undefined, features: FeaturesProps) => {
    try {
        console.log("trying");
        if(ownerId) {
            const hotelOwner = await getHotelByOwnerId(ownerId);
            const hotel = await getHotelById("1");
            if(hotelOwner) {
                const featuresInsert = await db.update(hotels).set({ features }).where(eq(hotels.id, 1)); // Specify the hotel by its hotel_id
                return featuresInsert;
            } 
        }
    } catch(error) {

    }
}