import { 
  pgTable,
  serial,
  timestamp, 
  varchar,
  integer,
  jsonb
} from 'drizzle-orm/pg-core';

import { addresses } from './addresses';
import { relations } from 'drizzle-orm';
import { reservations } from './reservations';
import { rooms } from './rooms';
import { tasks } from './tasks';
import { employments } from './employments';
import { features } from 'process';
import { users } from './users';

export const hotels = pgTable('hotels', {
  id: serial('id').primaryKey().unique().notNull(),
  address_id: integer('address_id').notNull().references(()=>addresses.id),
  name: varchar('name', { length: 256 }).notNull(),
  features: jsonb('features'),
  created_at: timestamp("created_at", { mode: "string" }).notNull().defaultNow(),
  updated_at: timestamp("updated_at", { mode: "string" }).notNull().defaultNow(),
  deleted_at: timestamp("deleted_at", { mode: "string" })
});

export const hotelsRelations = relations(hotels, ({one, many}) => ({
  address: one(addresses, {
    fields: [hotels.address_id],
    references: [addresses.id],
  }),

  reservations: many(reservations),
  rooms: many(rooms),
  tasks: many(tasks),
  employments: many(employments),
}))