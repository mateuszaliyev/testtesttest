"use server"

import * as z from "zod";
import { RegisterSchema } from "@/schemas"
import bcrypt from "bcryptjs";
import { db } from "@/lib/db";
import { users } from "@/drizzle";
import { getUserByEmail } from "@/data/user";

export const register = async (values: z.infer<typeof RegisterSchema>) => {
    const validatedFields = RegisterSchema.safeParse(values);

    if(!validatedFields.success) {
        return { error: "Invalid fields!" } ;
    }

    const { email, password, first_name, last_name, phone} = validatedFields.data;
    const hashedPassword = await bcrypt.hash(password, 10);

    const existingUser = await getUserByEmail(email);
      
    if(existingUser) {
        return { error: "Email already in use!" };
    }

    await db.insert(users).values({
        email,
        password: hashedPassword,
        first_name,
        last_name,
        phone,
        image: 'default-image-url',  
    });

    return { success: "User created successfully!" };
}