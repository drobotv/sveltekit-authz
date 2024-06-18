import { fail, redirect } from "@sveltejs/kit";
import type { PageServerLoad } from "./$types";
import { db } from "$lib/server/db";
import { organization } from "$lib/server/db/schema";
import { and, eq, sql } from "drizzle-orm";

export const load: PageServerLoad = async (event) => {
  return {};
};

export const actions = {
  default: async (event) => {
    const { user } = event.locals;
    if (!user) redirect(302, "/");
    const id = event.params.id;
    const verified =
      (await event.request.formData()).get("verified") === "on" ? 1 : 0;

    console.log("id", id);
    console.log("verified", verified);

    if (!id) {
      return fail(400, {});
    }

    const org = await db
      .update(organization)
      .set({ verified })
      .where(and(eq(organization.id, id), eq(organization.ownerId, user.id)))
      .returning()
      .get();

    if (!org) {
      return fail(500, {});
    }

    redirect(302, `/dashboard/${id}/general`);
  },
};
