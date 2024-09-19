import { relations } from 'drizzle-orm';
import { 
  boolean,
  integer,
  pgTable,
  serial,
  timestamp, 
  varchar,
} from 'drizzle-orm/pg-core';
import { tasks } from './tasks';
import { employments } from './employments';

export const users = pgTable('users', {
  id: serial('id').primaryKey().unique().notNull(),
  email: varchar('email', { length: 256 }).notNull(),
  image: varchar('image', { length: 256 }), // saving link to image (uploadthing.com)
  first_name: varchar('first_name', { length: 256 }).notNull(),
  last_name: varchar('last_name', { length: 256 }).notNull(),
  password: varchar('password', { length: 256 }).notNull(),
  is_new: boolean("is_new").default(true).notNull(),
  is_owner: boolean("is_owner").notNull(),
  created_at: timestamp("created_at", { mode: "string" }).notNull().defaultNow(),
  updated_at: timestamp("updated_at", { mode: "string" }).notNull().defaultNow(),
  deleted_at: timestamp("deleted_at", { mode: "string" })
});

export const userRelations = relations(users, ({one}) => ({
  tasks: one(tasks),
  employments: one(employments),
}))