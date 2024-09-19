import { employments, roles, users } from "@/drizzle";
import { db } from "@/lib/db";
import { eq } from "drizzle-orm";
export const runtime = 'edge';

export const getRole = async (user_id: number) => {
    try {
        const isOwner = await db.select({isOwner: users.is_owner}).from(users);
        return isOwner ? "Owner" : "Employee"
    } catch {
        return null;
    }
}