
import { relations } from 'drizzle-orm';
import { 
  pgTable,
  serial,
  timestamp, 
  varchar,
  integer
} from 'drizzle-orm/pg-core';

import { employments } from './employments';
import { guests } from './guests';
import { hotels } from './hotels';
  
export const tasks = pgTable('tasks', {
    id: serial('id').primaryKey().unique().notNull(),
    assigner_id: integer('assigner_id').references(()=>employments.id),
    guest_id: integer('guest_id').notNull().references(()=>guests.id),
    description: varchar('description', { length: 256 }).notNull(),
    hotel_id: integer('hotel_id').notNull().references(()=>hotels.id),
    status: varchar('status', { length: 256 }).notNull(),
    created_at: timestamp("created_at", { mode: "string" }).notNull().defaultNow(),
    updated_at: timestamp("updated_at", { mode: "string" }).notNull().defaultNow(),
    deleted_at: timestamp("deleted_at", { mode: "string" })
});

export const tasksRelations = relations(tasks, ({one}) => ({
  employments: one(employments, {
    fields: [tasks.assigner_id],
    references: [employments.id],
  }),
  
  guests: one(guests, {
    fields: [tasks.guest_id],
    references: [guests.id],
  }),

  hotels: one(hotels, {
    fields: [tasks.hotel_id],
    references: [hotels.id],
  }),
}))