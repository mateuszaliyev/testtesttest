"use server"

import * as z from "zod";
import { RegisterSchema } from "@/schemas"

export const register = async (values: z.infer<typeof RegisterSchema>) => {
    const valitedFields = RegisterSchema.safeParse(values);

    if(!valitedFields.success) {
        return { error: "Invalid fields!" } ;
    }

    return { success: "Email sent!" };
}