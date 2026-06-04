import { pgTable, serial, text, boolean, integer, timestamp } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const productsTable = pgTable("products", {
  id: serial("id").primaryKey(),
  slug: text("slug").unique().notNull(),
  name: text("name").notNull(),
  category: text("category").notNull(),
  brand: text("brand").notNull().default(""),
  short_desc: text("short_desc").notNull().default(""),
  long_desc: text("long_desc").notNull().default(""),
  images: text("images").notNull().default("[]"),
  features: text("features").notNull().default("[]"),
  tag: text("tag"),
  tag_color: text("tag_color"),
  rating: integer("rating").notNull().default(5),
  featured: boolean("featured").notNull().default(false),
  sort_order: integer("sort_order").notNull().default(0),
  created_at: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
});

export const insertProductSchema = createInsertSchema(productsTable).omit({ id: true, created_at: true });
export type InsertProduct = z.infer<typeof insertProductSchema>;
export type Product = typeof productsTable.$inferSelect;
