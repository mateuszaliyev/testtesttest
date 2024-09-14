"use server"

import * as z from "zod";
import { LoginSchema } from "@/schemas"
import { signIn } from "@/auth";
import { DEFAULT_LOGIN_REDIRECT, EMPLOYEE_SETUP_REDIRECT, OWNER_SETUP_REDIRECT } from "@/routes";
import { AuthError } from "next-auth";
import { db } from "@/lib/db";
import { employments, roles, users } from "@/drizzle";
import { eq } from "drizzle-orm";


export const login = async (values: z.infer<typeof LoginSchema>) => {
    const validatedFields = LoginSchema.safeParse(values);

    if(!validatedFields.success) {
        return { error: "Invalid fields!" } ;
    }

    const { email, password} = validatedFields.data;

    try {
        const user = await db.select()
                            .from(users)
                            .where(eq(users.email, email))
                            .limit(1);

        if (!user || user.length === 0) {
            return { error: "User not found!" };
          }
      
          const userId = user[0].id;
          const isNewUser = user[0].is_new;
      
          const employment = await db.select({
            roleId: employments.role_id
          })
            .from(employments)
            .where(eq(employments.user_id, userId))
            .limit(1);
      
          if (!employment || employment.length === 0) {
            return { error: "No role assigned to the user!" };
          }
      
          const roleId = employment[0].roleId;
      
          const role = await db.select({
            roleName: roles.name 
          })
            .from(roles)
            .where(eq(roles.id, roleId))
            .limit(1);
      
          const roleName = role[0].roleName;
      
          let redirectingTo;
          console.log("Is new:", isNewUser);
          console.log("roleName:", roleName);
          console.log("Is new:", isNewUser);
          if(isNewUser && roleName === "owner") redirectingTo = OWNER_SETUP_REDIRECT;
          else if (isNewUser && roleName === "employee") redirectingTo = EMPLOYEE_SETUP_REDIRECT;
          else redirectingTo = DEFAULT_LOGIN_REDIRECT;
          console.log("redirectingTo:", redirectingTo);

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