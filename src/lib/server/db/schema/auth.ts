import {
  text,
  integer,
  sqliteTable,
  uniqueIndex,
} from "drizzle-orm/sqlite-core";
import { defaultPrimaryKey, timestamps, userRoles } from "./shared";

export const user = sqliteTable(
  "user",
  {
    id: defaultPrimaryKey,
    email: text("email").notNull().unique(),
    name: text("name").notNull(),
    role: text("role", { enum: userRoles }).notNull(),
    hashedPassword: text("hashed_password").notNull(),
    ...timestamps,
  },
  (table) => ({
    emailIndex: uniqueIndex("user_email_idx").on(table.email),
  }),
);

export const session = sqliteTable("session", {
  id: text("id").notNull().primaryKey(),
  userId: text("user_id")
    .notNull()
    .references(() => user.id),
  expiresAt: integer("expires_at").notNull(),
});
