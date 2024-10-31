"use server"

import * as z from "zod";
import { LoginSchema } from "@/schemas"
import { signIn } from "@/auth";
import { DEFAULT_LOGIN_REDIRECT, EMPLOYEE_SETUP_REDIRECT, OWNER_SETUP_REDIRECT } from "@/routes";
import { AuthError } from "next-auth";
import { db } from "@/lib/db";
import { employments, roles, users } from "@/drizzle";
import { eq } from "drizzle-orm";
import { getUserByEmail } from "@/data/user";

export const login = async (values: z.infer<typeof LoginSchema>) => {
    const validatedFields = LoginSchema.safeParse(values);

    if(!validatedFields.success) {
        return { error: "Invalid fields!" } ;
    }

    const { email, password} = validatedFields.data;

    try {
      const user = await getUserByEmail(email);

      if (!user) return { error: "User not found!" };
      
      let redirectingTo;
      

      /* JUST FOR A WHILE COMMENTED OUT 
      if(user.is_new && user.is_owner) redirectingTo = OWNER_SETUP_REDIRECT;
      else if (user.is_new && !user.is_owner) redirectingTo = EMPLOYEE_SETUP_REDIRECT;
      else redirectingTo = DEFAULT_LOGIN_REDIRECT;
        */

      redirectingTo = DEFAULT_LOGIN_REDIRECT;

      
      await signIn("credentials", {
        email,
        password,
        redirectTo: redirectingTo,
      });
    } catch (error) {
        if ( error instanceof AuthError) {
            switch(error.type) {
                case "CredentialsSignin":
                    return { error: "Invalid credentials!" }
                default:
                    return { error: "Something went wrong!" }
            }
        }
        throw error;
    }
};