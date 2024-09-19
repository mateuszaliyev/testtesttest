"use server"

import * as z from "zod";
import { RegisterSchema } from "@/schemas"
import bcrypt from "bcryptjs";
import { db } from "@/lib/db";
import { employments, roles, users } from "@/drizzle";
import { createUser, getUserByEmail } from "@/data/user";
import { eq } from "drizzle-orm";

export const register = async (values: z.infer<typeof RegisterSchema>) => {
    const validatedFields = RegisterSchema.safeParse(values);

    if(!validatedFields.success) {
        return { error: "Invalid fields!" } ;
    }

    const { email, password, first_name, last_name, repeat_password, role } = validatedFields.data;

    if (password !== repeat_password) {
        return { error: "The passwords are different from each other." };
      }

    const hashedPassword = await bcrypt.hash(password, 10);

    const existingUser = await getUserByEmail(email);
      
    if(existingUser) {
        return { error: "Email already in use!" };
    } else {
      const newUser = await createUser({firstName: first_name, lastName: last_name, email: email, hashedPassword: hashedPassword, role: role, acceptedToS: true});
      return { success: "User created successfully!" };
    }
    return { error: "Error during registration!" };
}