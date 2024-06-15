import { sql } from "drizzle-orm";
import { text } from "drizzle-orm/sqlite-core";
import { generateIdFromEntropySize } from "lucia";

export const userRoles = ["admin", "user"] as const;
export type Role = (typeof userRoles)[number];
export const organizationRoles = ["member", "manager", "owner"] as const;
export type OrganizationRole = (typeof organizationRoles)[number];

export const defaultPrimaryKey = text("id")
  .notNull()
  .primaryKey()
  .$defaultFn(() => generateIdFromEntropySize(16));

export const timestamps = {
  createdAt: text("created_at").notNull().default(sql`CURRENT_TIMESTAMP`),
  updatedAt: text("updated_at")
    .notNull()
    .default(sql`CURRENT_TIMESTAMP`)
    .$onUpdateFn(() => sql`CURRENT_TIMESTAMP`),
};
