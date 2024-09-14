"use server"

import * as z from "zod";
import { RegisterSchema } from "@/schemas"
import bcrypt from "bcryptjs";
import { db } from "@/lib/db";
import { employments, roles, users } from "@/drizzle";
import { getUserByEmail } from "@/data/user";
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
    }

    const newUser = await db.insert(users).values({
        email,
        password: hashedPassword,
        first_name,
        last_name,
      }).returning({ id: users.id });

      if (!newUser.length) {
        return { error: "Failed to create user!" };
      }

      const userId = newUser[0].id;

      const roleData = await db.select({ id: roles.id })
    .from(roles)
    .where(eq(roles.name, role)) 
    .limit(1);


    if (!roleData.length) {
        return { error: "Role not found!" };
      }
    
      const roleId = roleData[0].id;
    
 
      await db.insert(employments).values({
        user_id: userId,
        role_id: roleId,
        hotel_id: null, 
      });

    return { success: "User created successfully!" };
}