import { 
    pgTable,
    serial,
    timestamp, 
    numeric,
    integer,
    pgEnum,
    jsonb
  } from 'drizzle-orm/pg-core';

export const roomTypes = pgTable('room_types', {
    id: serial('id').primaryKey().unique().notNull(),
    contains: jsonb('contains'),
    created_at: timestamp("created_at", { mode: "string" }).notNull().defaultNow(),
    updated_at: timestamp("updated_at", { mode: "string" }).notNull().defaultNow(),
    deleted_at: timestamp("deleted_at", { mode: "string" })
});
  