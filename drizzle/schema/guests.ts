import { 
  pgTable,
  serial,
  timestamp, 
  varchar,
  integer
} from 'drizzle-orm/pg-core';
import { addresses } from './addresses';
import { relations } from 'drizzle-orm';
  
export const guests = pgTable('guests', {
  id: serial('id').primaryKey().unique().notNull(),
  address_id: integer('address_id').notNull().references(()=>addresses.id),
  passport_number: varchar('passport_number', { length: 256 }).notNull(),
  first_name: varchar('first_name', { length: 256 }).notNull(),
  last_name: varchar('last_name', { length: 256 }).notNull(),
  phone: varchar('phone', { length: 256 }).notNull(),
  created_at: timestamp("created_at", { mode: "string" }).notNull().defaultNow(),
  updated_at: timestamp("updated_at", { mode: "string" }).notNull().defaultNow(),
  deleted_at: timestamp("deleted_at", { mode: "string" })
});

export const guestsRelations = relations(guests, ({one}) => ({
  address: one(addresses, {
    fields: [guests.address_id],
    references: [addresses.id],
  })
}))