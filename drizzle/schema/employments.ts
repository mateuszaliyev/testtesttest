
import { relations } from 'drizzle-orm';
import { 
    pgTable,
    serial,
    timestamp, 
    integer
} from 'drizzle-orm/pg-core';

import { hotels } from './hotels';
import { roles } from './roles';
import { users } from './users';
  
export const employments = pgTable('employments', {
    id: serial('id').primaryKey().unique().notNull(),
    hotel_id: integer('hotel_id').references(()=>hotels.id),
    role_id: integer('role_id').notNull().references(()=>roles.id),
    user_id: integer('user_id').notNull().references(()=>users.id),
    created_at: timestamp("created_at", { mode: "string" }).notNull().defaultNow(),
    updated_at: timestamp("updated_at", { mode: "string" }).notNull().defaultNow(),
    deleted_at: timestamp("deleted_at", { mode: "string" })
});

export const employmentsRelations = relations(employments, ({one, many}) => ({
    role: one(roles, {
        fields: [employments.role_id],
        references: [roles.id],
    }),

    hotel: one(hotels, {
        fields: [employments.hotel_id],
        references: [hotels.id],
    }),

    user: one(users, {
        fields: [employments.user_id],
        references: [users.id],
    }),
}));