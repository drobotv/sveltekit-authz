import {
  text,
  sqliteTable,
  uniqueIndex,
  integer,
  index,
} from "drizzle-orm/sqlite-core";
import { defaultPrimaryKey, organizationRoles, timestamps } from "./shared";
import { user } from "./auth";

export const organization = sqliteTable(
  "organization",
  {
    id: defaultPrimaryKey,
    ownerId: text("owner_id")
      .notNull()
      .references(() => user.id),
    name: text("name").notNull(),
    verified: integer("verified", { mode: "boolean" }).notNull(),
    description: text("description").notNull(),
    ...timestamps,
  },
  (table) => ({
    ownerIndex: index("org_owner_idx").on(table.ownerId),
  }),
);

export const member = sqliteTable(
  "member",
  {
    organizationId: text("organization_id")
      .notNull()
      .references(() => organization.id),
    userId: text("user_id")
      .notNull()
      .references(() => user.id),
    role: text("role", { enum: organizationRoles }).notNull(),
    ...timestamps,
  },
  (table) => ({
    userIndex: index("member_user_idx").on(table.userId),
    organizationIndex: index("member_org_idx").on(table.organizationId),
  }),
);

export const invitation = sqliteTable(
  "invitation",
  {
    id: defaultPrimaryKey,
    token: text("token").notNull(),
    organizationId: text("organization_id")
      .notNull()
      .references(() => organization.id),
    email: text("email").notNull(),
    role: text("role", { enum: organizationRoles }).notNull(),
    expiresAt: text("expires_at").notNull(),
    ...timestamps,
  },
  (table) => ({
    tokenIndex: uniqueIndex("inv_token_idx").on(table.token),
    organizationIndex: index("inv_org_idx").on(table.organizationId),
    emailIndex: uniqueIndex("inv_email_idx").on(table.email),
  }),
);
