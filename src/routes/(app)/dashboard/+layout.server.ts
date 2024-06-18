import { db } from "$lib/server/db";
import { member, organization } from "$lib/server/db/schema";
import { redirect } from "@sveltejs/kit";
import type { LayoutServerLoad } from "./$types";
import { eq } from "drizzle-orm";

export const load: LayoutServerLoad = async (event) => {
  const { user } = event.locals;

  if (!user) {
    redirect(302, "/login");
  }

  const organizations = await db.transaction(async (tx) => {
    return tx
      .select()
      .from(member)
      .where(eq(member.userId, user.id))
      .leftJoin(organization, eq(member.organizationId, organization.id));
  });

  return {
    user: event.locals.user,
    organizations,
  };
};
