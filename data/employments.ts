import { employments, roles, users } from "@/drizzle";
import { db } from "@/lib/db";
import { eq } from "drizzle-orm";
export const runtime = 'edge';

export const getRole = async (user_id: number) => {
    try {
        const result = await db
            .select({
                roleName: roles.name,
            })
            .from(users)
            .innerJoin(employments, eq(employments.user_id, users.id))
            .innerJoin(roles, eq(roles.id, employments.role_id))
            .where(eq(users.id, user_id));
        
        return result.length > 0 ? result[0].roleName : null;
    } catch {
        return null;
    }
}