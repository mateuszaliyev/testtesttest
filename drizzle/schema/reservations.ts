import { 
    pgTable,
    serial,
    timestamp, 
    varchar,
    numeric,
    integer
  } from 'drizzle-orm/pg-core';
import { guests } from './guests';
import { hotels } from './hotels';
import { rooms } from './rooms';
import { relations } from 'drizzle-orm';

export const reservations = pgTable('reservations', {
    id: serial('id').primaryKey().unique().notNull(),
    from: timestamp('from').defaultNow().notNull(),
    to: timestamp('to').defaultNow().notNull(),
    guest_id: integer('guest_id').notNull().references(()=>guests.id),
    guests: numeric('guests').notNull(),
    hotel_id: integer('hotel_id').notNull().references(()=>hotels.id),
    room_id: integer('room_id').notNull().references(()=>rooms.id),
    status: varchar('status').notNull(),
    created_at: timestamp("created_at", { mode: "string" }).notNull().defaultNow(),
    updated_at: timestamp("updated_at", { mode: "string" }).notNull().defaultNow(),
    deleted_at: timestamp("deleted_at", { mode: "string" })
});

export const reservationsRelations = relations(reservations, ({one, many}) => ({
  hotel: one(hotels, {
    fields: [reservations.hotel_id],
    references: [hotels.id],
  }),

  room: one(rooms, {
    fields: [reservations.room_id],
    references: [rooms.id],
  }),

  guests: many(guests),
}))