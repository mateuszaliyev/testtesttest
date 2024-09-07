import { 
    pgTable,
    serial,
    timestamp, 
    numeric,
    integer
  } from 'drizzle-orm/pg-core';

import { hotels } from './hotels';
import { relations } from 'drizzle-orm';
import { reservations } from './reservations';
  
export const rooms = pgTable('rooms', {
    id: serial('id').primaryKey().unique().notNull(),
    hotel_id: integer('hotel_id').notNull().references(()=>hotels.id),
    number: numeric('number').notNull(),
    created_at: timestamp("created_at", { mode: "string" }).notNull().defaultNow(),
    updated_at: timestamp("updated_at", { mode: "string" }).notNull().defaultNow(),
    deleted_at: timestamp("deleted_at", { mode: "string" })
});

export const roomsRelations = relations(rooms, ({one}) => ({
  hotel: one(hotels, {
    fields: [rooms.hotel_id],
    references: [hotels.id],
  }),
  
  reservations: one(rooms),
}));
  