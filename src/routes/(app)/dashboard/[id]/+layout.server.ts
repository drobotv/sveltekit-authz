import { db } from "$lib/server/db/index.js";
import { organization } from "$lib/server/db/schema/organization.js";
import { error, redirect } from "@sveltejs/kit";
import { and, eq } from "drizzle-orm";

export const load = async (event) => {
  const { user } = event.locals;
  if (!user) redirect(302, "/login");

  const org = await db
    .select()
    .from(organization)
    .where(
      and(
        eq(organization.ownerId, user.id),
        eq(organization.id, event.params.id),
      ),
    )
    .get();

  if (!org) error(401, "Unauthorized");
  return { org };
};
