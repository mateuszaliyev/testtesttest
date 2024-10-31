import type { NextAuthConfig } from "next-auth"
import Credentials from "next-auth/providers/credentials";
import { LoginSchema } from "./schemas/login-schema";
import { getUserByEmail } from "@/data/user";

import bcrypt from "bcryptjs";

export default {
    providers: [
        Credentials({
            async authorize(credentials) {
                if(!credentials) return null;

                const validatedFields = LoginSchema.safeParse(credentials);
                
                if(validatedFields.success) {
                    const {email, password} = validatedFields.data;

                    const user = await getUserByEmail(email);                   

                    if(!user || !user.password) return null;

                    const passwordsMatch = await bcrypt.compare(
                        password,
                        user.password,
                    );

                    if(passwordsMatch) return {
                        ...user,
                        id: String(user.id),
                      };
                }
                  
                return null;
            }
        })
    ],
} satisfies NextAuthConfig