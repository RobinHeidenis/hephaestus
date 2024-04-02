import { integer, sqliteTable, text } from "drizzle-orm/sqlite-core";

export const links = sqliteTable("links", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  title: text("title").notNull(),
  url: text("url").notNull(),
  isArchived: integer("is_archived", { mode: "boolean" }).default(false),
});

export type Link = typeof links.$inferSelect;
