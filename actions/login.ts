"use server"

import * as z from "zod";
import { LoginSchema } from "@/schemas"

export const login = async (values: z.infer<typeof LoginSchema>) => {
    const valitedFields = LoginSchema.safeParse(values);

    if(!valitedFields.success) {
        return { error: "Invalid fields!" } ;
    }

    return { success: "Email sent!" };
}