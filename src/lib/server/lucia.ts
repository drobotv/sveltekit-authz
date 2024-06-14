import { dev } from "$app/environment";
import { DrizzleSQLiteAdapter } from "@lucia-auth/adapter-drizzle";
import { db } from "./db";
import { sessionTable, userTable } from "./db/schema";
import { Lucia, TimeSpan } from "lucia";

const adapter = new DrizzleSQLiteAdapter(db, sessionTable, userTable);

export const lucia = new Lucia(adapter, {
  sessionExpiresIn: new TimeSpan(2, "w"),
  sessionCookie: {
    attributes: {
      secure: !dev,
    },
  },
  // TODO: Declare Lucia module/namespace
  // getUserAttributes: (attributes) => ({
  //   id: attributes.id,
  //   email: attributes.email,
  //   name: attributes.name,
  // })
});

declare module "lucia" {
  interface Register {
    Lucia: typeof lucia;
    // TODO: Infer types from database schema
    // DatabaseSessionAttributes: DatabaseSessionAttributes;
    // DatabaseUserAttributes: DatabaseUserAttributes;
  }
}
