import { db } from "$lib/server/db";
import { organization } from "$lib/server/db/schema";
import type { LayoutServerLoad } from "./$types";
import { eq } from "drizzle-orm";

export const load: LayoutServerLoad = async (event) => {
  return {
    user: event.locals.user,
    listedOrgs: await db
      .select()
      .from(organization)
      .where(eq(organization.verified, 1)),
  };
};
