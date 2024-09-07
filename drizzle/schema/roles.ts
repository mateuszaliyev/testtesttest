import { relations } from 'drizzle-orm';
import { 
  pgTable,
  serial,
  timestamp, 
  varchar,
} from 'drizzle-orm/pg-core';
import { employments } from './employments';
  
export const roles = pgTable('roles', {
  id: serial('id').primaryKey().unique().notNull(),
  name: varchar('name', { length: 256 }).notNull(),
  created_at: timestamp("created_at", { mode: "string" }).notNull().defaultNow(),
  updated_at: timestamp("updated_at", { mode: "string" }).notNull().defaultNow(),
  deleted_at: timestamp("deleted_at", { mode: "string" })
});

export const rolesRelations = relations(roles, ({one}) => ({
  employments: one(employments),
}))