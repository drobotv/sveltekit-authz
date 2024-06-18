import { db } from "$lib/server/db";
import { member, organization } from "$lib/server/db/schema";
import { eq, sql } from "drizzle-orm";
import type { PageServerLoad } from "./$types";
import { fail, redirect } from "@sveltejs/kit";
import { superValidate } from "sveltekit-superforms";
import { valibot } from "sveltekit-superforms/adapters";
import { createOrganizationSchema } from "$lib/valibot-schema";

export const load: PageServerLoad = async (event) => {
  const { user } = event.locals;

  if (!user) {
    redirect(302, "/login");
  }

  const organizations = await db.transaction(async (tx) => {
    return tx
      .select()
      .from(member)
      .where(eq(member.userId, user.id))
      .innerJoin(organization, eq(member.organizationId, organization.id));
  });

  return {
    user: event.locals.user,
    organizations,
    form: await superValidate(valibot(createOrganizationSchema)),
  };
};

export const actions = {
  create: async (event) => {
    const { user } = event.locals;
    if (!user) redirect(302, "/");
    const form = await superValidate(event, valibot(createOrganizationSchema));

    if (!form.valid) {
      return fail(400, {
        form,
      });
    }

    await db.transaction(async (tx) => {
      const [org] = await tx
        .insert(organization)
        .values({
          ownerId: user.id,
          name: form.data.name,
          description: form.data.description,
          verified: 0,
        })
        .returning();
      if (!org) {
        tx.rollback();
        return fail(500, {
          form,
        });
      }

      await tx.insert(member).values({
        userId: user.id,
        organizationId: org.id,
        role: "owner",
      });
    });

    redirect(302, "/dashboard");
  },
};
