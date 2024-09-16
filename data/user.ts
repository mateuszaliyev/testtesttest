import { users } from "@/drizzle";
import { db } from "@/lib/db";
import { eq } from "drizzle-orm";
export const runtime = 'edge'

export const getUserByEmail = async (email: string) => {
    try {
        const user = await db.select().from(users).where(eq(users.email, email));
        return user.length > 0 ? user[0] : null;  
    } catch {
        return null;
    }
}

export const getUserById = async (id: number) => {
    try {
        const user = await db.select().from(users).where(eq(users.id, id));
        return user.length > 0 ? user[0] : null;  
    } catch {
        return null;
    }
}

export const setUserToConfigured = async (id: number) => {
    try {
        await db.update(users).set({is_new: false}).where(eq(users.id, id));
    } catch (error) {
        console.error("Error updating user: ", error);
    }
}