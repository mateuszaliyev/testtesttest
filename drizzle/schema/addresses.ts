
import { relations } from 'drizzle-orm';
import { 
    pgTable,
    serial,
    timestamp, 
    varchar,
} from 'drizzle-orm/pg-core';
import { hotels } from './hotels';
import { guests } from './guests';
  
export const addresses = pgTable('addresses', {
  id: serial('id').primaryKey().unique().notNull(),
  address: varchar('address', { length: 256 }).notNull(),
  city: varchar('city', { length: 256 }).notNull(),
  country: varchar('country', { length: 256 }).notNull(),
  zipcode: varchar('zipcode', { length: 256 }).notNull(),
  created_at: timestamp("created_at", { mode: "string" }).notNull().defaultNow(),
  updated_at: timestamp("updated_at", { mode: "string" }).notNull().defaultNow(),
  deleted_at: timestamp("deleted_at", { mode: "string" })
});

export const addressesRelations = relations(addresses, ({one, many}) => ({
  hotels: one(hotels),
  guests: many(guests),
}))